#!/usr/bin/env bash
set -euo pipefail

IFS=' ' read -ra registries <<<"$GHA_REGISTRY"
IFS=' ' read -ra registry_accounts <<<"$GHA_REGISTRY_ACCOUNT_NAME"
IFS=' ' read -ra registry_tokens <<<"$GHA_REGISTRY_ACCOUNT_TOKEN"

if [[ "${#registries[@]}" != "${#registry_accounts[@]}" || "${#registries[@]}" != "${#registry_tokens[@]}" ]]; then
    echo "Number of registries, accounts and tokens must match; (\"${#registries[@]}\" != \"${#registry_accounts[@]}\" != \"${#registry_tokens[@]}\"). Exiting..."
    exit 1
fi

IFS=' ' read -ra tags <<<"$GHA_TAG"

# Release container images
for i in "${!registries[@]}"; do
    registry="${registries[$i]}"
    account="${registry_accounts[$i]}"
    token="${registry_tokens[$i]}"

    buildah login --username "$account" --password-stdin "$registry" <<<"$token"

    for tag in "${tags[@]}"; do
        buildah manifest push --digestfile "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tag}_${registry}_digest.txt" \
            "localhost/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag" "oci://$registry/$GHA_CONTAINER_ORGANIZATION/$GHA_CONTAINER_IMAGE:$tag"

        digest="$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tag}_${registry}_digest.txt")"
        digest_cmp="$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tags[0]}_${registry}_digest.txt")"

        # digests should be the same independent of the registry/tags used but just in case
        if [[ "$digest" != "$digest_cmp" ]]; then
            echo "Digests do not match for $tag; (\"$digest\" != \"$digest_cmp\"). Exiting..."
            exit 1
        fi
    done
done

# If running locally, we are done
set +u
if [[ -z "$GITHUB_OUTPUT" ]]; then
    exit 0
fi
set -u

# If running in GHA, set output variables
echo "digest=$(cat "./$GHA_CONTAINER_ORGANIZATION-$GHA_CONTAINER_IMAGE-${tags[0]}_${registry}_digest.txt")" >>"$GITHUB_OUTPUT"
echo "registries=[$(printf '"%s",' "${registries[@]}" | sed 's/,$//')]" >>"$GITHUB_OUTPUT"
