#!/usr/bin/env bash
set -euo pipefail

registries=()
IFS=' ' read -ra registries <<<"$GHA_REGISTRY"

registry_accounts=()
IFS=' ' read -ra registry_accounts <<<"$GHA_REGISTRY_ACCOUNT_NAME"

registry_tokens=()
IFS=' ' read -ra registry_tokens <<<"$GHA_REGISTRY_ACCOUNT_TOKEN"

# shellcheck disable=SC2055
if [[ "${#registries[@]}" != "${#registry_accounts[@]}" || "${#registries[@]}" != "${#registry_tokens[@]}" ]]; then
    echo "Number of registries, accounts and tokens must match; (GHA_REGISTRY=\"${#registries[@]}\" != GHA_REGISTRY_ACCOUNT_NAME=\"${#registry_accounts[@]}\" != GHA_REGISTRY_ACCOUNT_TOKEN=\"${#registry_tokens[@]}\"). Exiting..."
    exit 1
fi

tags=()
IFS=' ' read -ra tags <<<"$GHA_TAG"

for tag in "${tags[@]}"; do
    podman manifest exists "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"
done

# TODO: Remove
podman image list

# Release container images
for i in "${!registries[@]}"; do
    registry="${registries[$i]}"
    account="${registry_accounts[$i]}"
    token="${registry_tokens[$i]}"

    podman login --username "$account" --password-stdin "$registry" <<<"$token"

    for tag in "${tags[@]}"; do
        podman manifest push --all --tls-verify --digestfile=./container-image_digest.txt \
            "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" \
            "docker://$registry/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"
    done

    podman logout --all
done

# Cleanup
for tag in "${tags[@]}"; do
    # TODO: Replace error redir with "--ignore" on podman v5?
    podman manifest rm --ignore "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" 2>/dev/null || true
done

for id in $(podman images --format="{{.ID}}" --filter=reference="localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE*"); do
    # TODO: Replace error redir with "--ignore" on podman v5?
    podman rmi "$id" 2>/dev/null || true
done

# TODO: Remove
podman image list

# If running locally, we are done
set +u
if [[ -z "$GITHUB_OUTPUT" ]]; then
    exit 0
fi
set -u

# If running in GHA, set output variables
echo "digest=./container-image_digest.txt" >>"$GITHUB_OUTPUT"
echo "registries=[$(printf '"%s",' "${registries[@]}" | sed 's/,$//')]" >>"$GITHUB_OUTPUT"
