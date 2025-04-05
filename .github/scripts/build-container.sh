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

    podman build --platform "$platform" --format=oci --layers --identity-label=false \
        --label=org.opencontainers.image.created="$timestamp_iso" \
        --label=org.opencontainers.image.revision="$GHA_SHA" \
        --label=org.opencontainers.image.version="$version" \
        -f ./Dockerfile \
        -t "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$arch-pure" \
        .

    podman build --platform "$platform" --format=oci --layers --squash --identity-label=false \
        --label=org.opencontainers.image.created="$timestamp_iso" \
        --label=org.opencontainers.image.revision="$GHA_SHA" \
        --label=org.opencontainers.image.version="$version" \
        -f ./Dockerfile \
        -t "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$arch" \
        .
done

# Create manifests
for tag in "${tags[@]}"; do
    podman manifest rm --ignore "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"
    podman manifest create "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"

    for platform in "${platforms[@]}"; do
        arch=$(echo "$platform" | cut --delimiter='/' --fields=2)

        podman manifest add \
            "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" \
            "$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$arch"
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
