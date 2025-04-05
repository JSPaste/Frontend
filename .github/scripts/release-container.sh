#!/usr/bin/env bash
set -euo pipefail

registries=()
registry_accounts=()
registry_tokens=()

IFS=' ' read -ra registries <<<"$GHA_REGISTRY"
IFS=' ' read -ra registry_accounts <<<"$GHA_REGISTRY_ACCOUNT_NAME"
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

    set -x
    for tag in "${tags[@]}"; do
        podman manifest push --all --rm --tls-verify --digestfile "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tag}_${registry}_digest.txt" \
            "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" "docker://$registry/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"

        digest="$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tag}_${registry}_digest.txt")"
        digest_cmp="$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tags[0]}_${registries[0]}_digest.txt")"

        # digests should be the same independent of the registry/tags used but just in case
        if [[ "$digest" != "$digest_cmp" ]]; then
            echo "Digests do not match for $tag; (\"$digest\" != \"$digest_cmp\"). Exiting..."
            exit 1
        fi
    done
    set +x

    podman logout --all
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
echo "digest=$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tags[0]}_${registries[0]}_digest.txt")" >>"$GITHUB_OUTPUT"
echo "registries=[$(printf '"%s",' "${registries[@]}" | sed 's/,$//')]" >>"$GITHUB_OUTPUT"
