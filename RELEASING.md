# Releasing

This describes how to release `dagger-for-github`.

The action's `README.md` and `action.yml` should be relatively evergreen now,
so we don't need to bump with Dagger releases anymore, just if there is a fix
to `dagger-for-github`. We'll use `8.0.0` style versions for the action going
forward to comply with GitHub immutable actions standards. Should not need
separate `v8` tag. Should automatically get `v8`, `v8.0`, `v8.0.0` as well as
`8.0.0` resolved by GitHub.

## Let the team know

- [ ] When preparing a release (as mentioned in `dagger/dagger`'s
      [`RELEASING.md`](https://github.com/dagger/dagger/blob/main/RELEASING.md),
      include whether there should be a new `dagger-for-github` release as well.

- [ ] Take a peek at the action or mention it in the release thread on Discord
      to determine if there are updates to reflect in the docs.

- [ ] Create/push a new patch tag for fixes/changes to `dagger-for-github`

  ```console
  # Find the latest released patch https://github.com/dagger/dagger-for-github/releases
  # or via the `gh` CLI. Use that to figure out the NEXT_VERSION.
  gh release view --repo dagger/dagger-for-github --json tagName,publishedAt

  NEXT_VERSION=vX.Y.Z # e.g. v1.2.3

  # Sign the tag, using the date as the comment, e.g. 2024-07-22
  git tag --sign -m $(date '+%Y-%m-%d') $NEXT_VERSION
  git push origin $NEXT_VERSION #shouldn't need to force since new tag
  ```

- [ ] Create a new release from the patch tag (auto-fill release notes via the
      GitHub UI or via the `gh` CLI)

  ```console
  # --verify-tag will ensure the last tag creation step was done
  gh release create --generate-notes --verify-tag <NEXT_PATCH_VERSION>
  ```

- [ ] Submit PR to change the version mentioned in Dagger docs. See example [here](https://github.com/dagger/dagger/pull/9705/files)
