# dagger-for-github

Github action to run Dagger

```yaml
- name: Dagger
  uses: dagger/dagger-for-github@v5
  with:
    module: github.com/kpenfound/greetings-api/ci
    args: ci --commit $GITHUB_SHA
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
```

or with more options:

```yaml
- name: Dagger
  uses: dagger/dagger-for-github@v5
  with:
    module: github.com/kpenfound/greetings-api/ci
    args: ci --commit $GITHUB_SHA
    cloud-token: ${{ secrets.DAGGER_CLOUD_TOKEN }}
    version: "0.9.3"
    verb: call
```
