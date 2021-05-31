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

```yaml
steps:
  -
    name: Install Dagger
    uses: dagger/dagger-action@v1
    with:
      install-only: true
  -
    name: Show Dagger version
    run: dagger version
```

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
