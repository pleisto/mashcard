# MashCard - A bicycle of the mind to Internet OS

[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Crowdin](https://badges.crowdin.net/mashcard/localized.svg)](https://crowdin.com/project/mashcard)[![codecov](https://codecov.io/gh/mashcard/mashcard/branch/main/graph/badge.svg?token=x3u3HXQA0P)](https://codecov.io/gh/mashcard/mashcard)
[![Linting Code](https://github.com/mashcard/mashcard/actions/workflows/linting.yml/badge.svg)](https://github.com/mashcard/mashcard/mashcard/workflows/linting.yml)
[![Unit Test](https://github.com/mashcard/mashcard/actions/workflows/unit_test.yml/badge.svg)](https://github.com/mashcard/mashcard/actions/workflows/unit_test.yml)

> :warning: **Note:** This software is currently under active development. Some features may be available in the future, and the API and interface may change.

MashCard is an all-in-one workspace and low-code platform with Compound Document at its core. It's not only an open source alternative to Coda and Notion but also an Internet OS of an age when SaaS is eating the world.

![MashCard Screenshot](https://pub.user-owns-data.net/corp/github-growthing/mashcard-1.0-demo.webp)

## Highlights

- **All your data is under your control** - MashCard is free and open-source software that can be hosted on your own server or from a cloud provider. As a [Solid](https://solidproject.org/) inspired decentralized data store, any access to the structured data and regular files stored can be granted or revoked as needed to any extent.
- **Meet Human-machine collaboration** - Create applications in the MashCard as if they were documents and apply AI to aid in actions like using excel-like formulas to import live data in apps or calling in external APIs. Enhancing synergy in modern productivity tools is a movement that will give rise to a platform shift where humans and machines complement each other.
- **Renaissance of the [mashup](<https://en.wikipedia.org/wiki/Mashup_(web_application_hybrid)>)** - Integrate everything into one place, and ensure interoperability between them as easily as copy & paste.
- **Plugin architecture** - MashCard is an Internet OS with micro-kernel architecture that provides a WordPress-like plugin system to build, customize and express on top of it for an enhanced experience.

## Demo

> :warning: Early access to mashcard.cloud will be available soon. Please check back later.

You can request a free trial on our SaaS platform [here](https://mashcard.cloud/).

## Installation

The only official way to install MashCard is to use [Docker](https://www.docker.io/). And we recommend to use [Helm](https://helm.sh/docs/intro/quickstart/) for installing MashCard on Kubernetes.

```bash
helm install ${release-name} ./tools/helm-charts/mashcard --set-some-variable=some-value
```

Instructions on how to set up the environment for development are available [here](./docs/SETUP_DEV_ENV.md).

## Contributing

MashCard is an open source project and we are very happy to accept community contributions. To contribute to MashCard, you have to agree with the MashCard Contributor License Agreement.Please refer to [Contributing Documentation](./docs/CONTRIBUTING.md) for more details.

## Copyright/License

Copyright © 2022, Brickdoc Inc. - Released under the Apache 2.0 License

- All content residing under the "docs/" directory of this repository is licensed under "Creative Commons: CC BY-SA 4.0 license".
- All third party components incorporated into the MashCard Software are licensed under the original license provided by the owner of the applicable component.
- All content that resides under the "packages/_", "apps/_" or "plugins/\*" directory of this repository, if that directory exists, is licensed under the license defined in "/LICENSE" in the corresponding directory.
- Content outside of the above mentioned directories or restrictions above is available under the "Apache 2.0" license as defined below.
