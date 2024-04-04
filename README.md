# GitHub action to run Dagger

## Usage Examples

### `dagger call` (default)

```yaml
- name: Hello
  uses: dagger/dagger-for-github@v5
  with:
    verb: call 
    module: github.com/shykes/daggerverse/hello
    args: with-greeting --greeting Hola with-name --name Jeremy message
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
```

### `dagger run`

```yaml
- name: Integration Test
  uses: dagger/dagger-for-github@v5
  with:
    workdir: db-service
    verb: run
    args: node build.js
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
    version: "0.11.0"
```

### All `with:` input parameter options

| Key             | Description                                                   | Required   | Default               |
| --------------- | ------------------------------------------------------------- | ---------- | --------------------- |
| `version`       | Dagger Version                                                | false      | '0.11.0'              |
| `dagger-flags`  | Dagger CLI Flags                                              | false      | '--progress plain'    |
| `verb`          | CLI verb (call, run, download, up, functions, shell, query)   | false      | 'call'                |
| `workdir`       | The working directory in which to run the Dagger CLI          | false      | '.'                   |
| `cloud-token`   | Dagger Cloud Token                                            | false      | ''                    |
| `module`        | Dagger module to call. Local or Git                           | false      | ''                    |
| `args`          | Arguments to pass to CLI                                      | false      | ''                    |
| `engine-stop`   | Whether to stop the Dagger Engine after this run              | false      | 'true'                |
