![Dagger](.github/dagger.png)

[![GitHub release](https://img.shields.io/github/release/dagger/dagger-action.svg?style=flat-square)](https://github.com/dagger/dagger-action/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-dagger--action-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/dagger-action)
[![Test workflow](https://img.shields.io/github/workflow/status/dagger/dagger-action/test?label=test&logo=github&style=flat-square)](https://github.com/dagger/dagger-action/actions?workflow=test)
[![Codecov](https://img.shields.io/codecov/c/github/dagger/dagger-action?logo=codecov&style=flat-square)](https://codecov.io/gh/dagger/dagger-action)

## About

GitHub Action for [Dagger](https://dagger.io), a programmable deployment system.

![Screenshot](.github/dagger-action.png)

___

* [Usage](#usage)
  * [Basic](#basic)
  * [Install Only](#install-only)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [License](#license)

## Usage

### Basic

```yaml
name: dagger

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v2
      -
        name: Dagger
        uses: dagger/dagger-action@v1
        with:
          age-key: ${{ secrets.DAGGER_AGE_KEY }}
          args: up
```

### Install Only

The `age-key` located in your `~/.config/dagger/keys.txt` decrypts your locally encrypted secrets

```yaml
steps:
  -
    name: Install Dagger
    uses: dagger/dagger-action@v1
    with:
      age-key: ${{ secrets.DAGGER_AGE_KEY_TEST }} (optional, but mandatory to interact with inputs)
      install-only: true
  -
    name: Show Dagger version
    run: dagger version
```

Add this key as a Github Secret (`DAGGER_AGE_KEY_TEST` in the example above) to allow your CI to interact with your locally encrypted inputs

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name             | Type    | Default      | Description                                                      |
|------------------|---------|--------------|------------------------------------------------------------------|
| `version`        | String  | `latest`     | Dagger version                                                   |
| `age-key`        | String  |              | Dagger private key                                               |
| `args`           | String  |              | Arguments to pass to Dagger                                      |
| `workdir`        | String  | `.`          | Working directory (below repository root)                        |
| `install-only`   | Bool    | `false`      | Just install Dagger                                              |
| `cleanup`        | Bool    | `true`       | Cleanup Dagger home folder at the end of a job                   |

All the keys above have to be used in conjunction with the `args` key, except `install-only` that may be used standalone or in combination with `age-key` (cf. example above)

## Development

```shell
# format code and build javascript artifacts
docker buildx bake pre-checkin

# validate all code has correctly formatted and built
docker buildx bake validate

# run tests
docker buildx bake test
```

## License

MIT. See `LICENSE` for more details.
