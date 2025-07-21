#!/usr/bin/env bash
set -euo pipefail

# Target platforms
platforms=("linux/amd64" "linux/arm64")

timestamp="$(date +%Y.%m.%d)"
timestamp_iso="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
version="${timestamp}-${GHA_SHA_SHORT}"

# Tags
if [[ "${GHA_BRANCH}" == "stable" ]]; then
    tags+=("latest")
else
    tags+=("snapshot")
fi

tags+=("${GHA_SHA}")
tags+=("${version}")

# Build container images
for platform in "${platforms[@]}"; do
    arch=$(echo "$platform" | cut --delimiter='/' --fields=2)

    if [ "$GITHUB_ACTIONS" = "true" ]; then
        params_build_builder=" --cache-from=ghcr.io/$GHA_CONTAINER_ORGANIZATION/cache --cache-to=ghcr.io/$GHA_CONTAINER_ORGANIZATION/cache"
    fi

    # Tags
    params_build=" --tag=localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:latest"
    params_build+=" --tag=localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$DOCKER_TAG"

    # shellcheck disable=SC2086
    podman build --platform="$platform" --target=builder --format=oci --layers --identity-label=false \
        --label=org.opencontainers.image.created="$timestamp_iso" \
        --label=org.opencontainers.image.revision="$GHA_SHA" \
        --label=org.opencontainers.image.version="$version" \
        --tag="$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$arch-builder" \
        --file=./Dockerfile \
        $params_build_builder \
        .

    # shellcheck disable=SC2086
    podman build --platform="$platform" --format=oci --layers --squash-all --omit-history --identity-label=false \
        --label=org.opencontainers.image.created="$timestamp_iso" \
        --label=org.opencontainers.image.revision="$GHA_SHA" \
        --label=org.opencontainers.image.version="$version" \
        --file=./Dockerfile \
        $params_build \
        .
done

# Create manifests
for tag in "${tags[@]}"; do
    # TODO: Replace error redir with "--ignore" on podman v5?
    podman manifest rm "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" 2>/dev/null || true
    podman manifest create "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"

    for platform in "${platforms[@]}"; do
        arch=$(echo "$platform" | cut --delimiter='/' --fields=2)

        podman manifest add \
            "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" \
            "containers-storage:localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$arch"
    done
done

# If running locally, we are done
set +u
if [[ -z "$GITHUB_OUTPUT" ]]; then
    exit 0
fi
set -u

# If running in GHA, set output variables
echo "tags=${tags[*]}" >>"$GITHUB_OUTPUT"
