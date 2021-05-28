# Brickdoc

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Crowdin](https://badges.crowdin.net/brickdoc/localized.svg)](https://crowdin.com/project/brickdoc)

> Brickdoc is built on an open core model. This is Brickdoc **Enterprise Edition** mono repository.


BrickDoc is an open-source human intellect application and collaboration platform to Break the boundary between documents, spreadsheets, and software.

## Development

Prerequisites:
* Yarn
* Ruby 3.0+
* Typescript 4.1+
* NodeJS 14+


**Run `yarn install && yarn init` initialize the development environment.**


### yarn scripts

```bash
# global
yarn commit # instead of `git commit`, equivalent to `git add . && git-cz`
yarn lint # run eslint and rubocop

# webapp
yarn webapp:dev # start dev server
yarn webapp:build # build dist

# other npm packages
yarn $(package-dir-name):build
yarn $(package-dir-name):spec
```


## Documentation

Detailed documentation is available at https://brickdoc.com/about/community-edition

* If you want to set up a Brickdoc for production use, see our [Install Guide](https://brickdoc.com/about/install)
* If you're looking for business support or hosting service, see [Brickdoc Enterprise Edition](https://brickdoc.com/pricing)

## Contributing

Brickdoc is an open source project and we are very happy to accept community contributions. To contribute to Brickdoc, you have to agree with the Brickdoc Contributor License Agreement.Please refer to [Contributing Documentation](CONTRIBUTING.md) for more details.


## Licensing

Brickdoc Community Edition is open source with an Apache 2.0 license.

Brickdoc Enterprise Edition and SaaS Service are built on top of Community Edition: it uses the same core but adds additional features and functionality on top of that. This is under a proprietary license.
