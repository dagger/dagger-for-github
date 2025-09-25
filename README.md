# GitHub action to run Dagger

## Usage Examples

### `dagger call`

```yaml
- name: Hello
  uses: dagger/dagger-for-github@v8.2.0
  with:
    module: github.com/shykes/daggerverse/hello
    call: hello --greeting Hola --name Jeremy
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
    version: "latest"  # semver vX.Y.Z
```

### `dagger shell`

```yaml
- name: Hello
  uses: dagger/dagger-for-github@v8.2.0
  with:
    shell: container | from alpine | with-exec echo,"hello, world!" | stdout
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
```

### `dagger run`

```yaml
- name: Integration Test
  uses: dagger/dagger-for-github@v8.2.0
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

| Key                             | Description                                                       | Required | Default            |
| ------------------------------- | ----------------------------------------------------------------- | -------- | ------------------ |
| `version`                       | Dagger Version. Use semver vX.Y.Z or 'latest'                     | true     | 'latest'           |
| `commit`                        | Dagger Dev Commit (overrides `version`)                           | false    | ''                 |
| `dagger-flags`                  | Dagger CLI Flags                                                  | false    | '--progress plain' |
| `verb`                          | CLI verb (call, run, download, up, functions, shell, query)       | false    | 'call'             |
| `workdir`                       | The working directory in which to run the Dagger CLI              | false    | '.'                |
| `cloud-token`                   | Dagger Cloud Token                                                | false    | ''                 |
| `module`                        | Dagger module to call. Local or Git                               | false    | ''                 |
| `args`                          | Arguments to pass to CLI                                          | false    | ''                 |
| `call`                          | Arguments to pass to CLI (Alias for args with verb:call)          | false    | ''                 |
| `shell`                         | Arguments to pass to CLI (Alias for args with verb:shell)         | false    | ''                 |
| `summary-path`                  | File path to write the job summary to                             | false    | ''                 |
| `enable-github-summary`         | Whether to automatically write a GitHub Actions job summary       | false    | 'false'            |

### All output variables

| Key        | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `stdout`   | The standard output of the Dagger command                   |
| `traceURL` | Dagger Cloud trace URL                                      |
