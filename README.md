# Brickdoc

[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![crowdin](https://badges.crowdin.net/brickdoc/localized.svg)](https://crowdin.com/project/brickdoc)
[![linting](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml)
[![CI](https://github.com/brickdoc/brickdoc/actions/workflows/ci.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/ci.yml)
[![E2E Testing](https://github.com/brickdoc/brickdoc/actions/workflows/e2e.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/e2e.yml)
[![codecov](https://codecov.io/gh/brickdoc/brickdoc/branch/master/graph/badge.svg?token=BE6RWP2F9E)](https://codecov.io/gh/brickdoc/brickdoc)

Brickdoc is an open-source human intellect application and collaboration platform to Break the boundary between documents, spreadsheets, and software.

## Demo

You can request a free trial on our SaaS platform [here](https://brickdoc.com/).

## Installation

The only official way to install Brickdoc is to use [Docker](https://www.docker.io/). And we recommend to use [Helm](https://helm.sh/docs/intro/quickstart/) for installing Brickdoc on Kubernetes.

```bash
helm install ${release-name} ./tools/helm-charts/brickdoc --set-some-variable=some-value
```

Instructions on how to set up the environment for development are available [here](./docs/SETUP_DEV_ENV.md).

## Contributing

Brickdoc is an open source project and we are very happy to accept community contributions. To contribute to Brickdoc, you have to agree with the Brickdoc Contributor License Agreement.Please refer to [Contributing Documentation](CONTRIBUTING.md) for more details.

## Licensing

Brickdoc is open source with an Apache 2.0 license.
