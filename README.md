# GitHub action to run Dagger

## Usage Examples

### `dagger call` (default)

```yaml
- name: Hello
  uses: dagger/dagger-for-github@8.0.0
  with:
    module: github.com/shykes/daggerverse/hello
    call: hello --greeting Hola --name Jeremy
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
    version: "latest"  # semver vX.Y.Z
```

### `dagger run`

```yaml
- name: Integration Test
  uses: dagger/dagger-for-github@8.0.0
  with:
    workdir: db-service
    verb: run
    args: node build.js
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
    version: "latest"  # semver vX.Y.Z
```

### Staying in sync with the `latest` version

By setting the version to `latest`, this action will install the latest version of Dagger.

### All `with:` input parameter options

| Key            | Description                                                 | Required | Default            |
| -------------- | ----------------------------------------------------------- | -------- | ------------------ |
| `version`      | Dagger Version                                              | true    | n/a use semver x.y.z or 'latest'
| `commit`       | Dagger Dev Commit (overrides `version`)                     | false    | ''                 |
| `dagger-flags` | Dagger CLI Flags                                            | false    | '--progress plain' |
| `verb`         | CLI verb (call, run, download, up, functions, shell, query) | false    | 'call'             |
| `workdir`      | The working directory in which to run the Dagger CLI        | false    | '.'                |
| `cloud-token`  | Dagger Cloud Token                                          | false    | ''                 |
| `module`       | Dagger module to call. Local or Git                         | false    | ''                 |
| `args`         | Arguments to pass to CLI                                    | false    | ''                 |
| `call`         | Arguments to pass to CLI (Alias for args)                   | false    | ''                 |
