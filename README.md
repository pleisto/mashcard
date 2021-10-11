# Brickdoc

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Crowdin](https://badges.crowdin.net/brickdoc/localized.svg)](https://crowdin.com/project/brickdoc)
[![linting](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/linting.yml)
[![Monolith Application CI](https://github.com/brickdoc/brickdoc/actions/workflows/monolith_ci.yml/badge.svg)](https://github.com/brickdoc/brickdoc/actions/workflows/monolith_ci.yml)
[![codecov](https://codecov.io/gh/brickdoc/brickdoc/branch/master/graph/badge.svg?token=BE6RWP2F9E)](https://codecov.io/gh/brickdoc/brickdoc)

> Brickdoc is built on an open core model. This is Brickdoc **Community Edition** mono repository.

BrickDoc is an open-source human intellect application and collaboration platform to Break the boundary between documents, spreadsheets, and software.

## Development

Prerequisites:

- Ruby 3.0+ (we've setup `.ruby-version` to use with `rbenv`)
- NodeJS 14+
- Yarn
- Docker / Docker Compose
- Rust (as the build tooling for some dependent gems)

To start development:

1. Run `yarn install` & `bundle install` to install dependencies (if `pg` gem failed to install, you probably need to `brew install postgresql` / `sudo apt install libpq-dev`).
2. Start postgres & redis locally with `docker-compose up`
3. `cp .env.local.template .env.local`
4. Edit `.env.local` to fill up your [GitHub](https://github.com/settings/developers) key / secret, [Unsplash](https://unsplash.com/oauth/applications) key / secret, etc.
5. Run `./bin/generate-reversible-int-hash-seed` to generate `SECURITY_REVERSIBLE_INT_*` vars, and fill in `.env.local`.
6. (Optionally) `cp .env.local .env.test.local` to make these environment variables also available during test running.
7. Run `./bin/rails db:create db:migrate` to create the db schema, then `./bin/rails db:seed` to seed the db.
8. (Optionally) Run `RAILS_ENV=test ./bin/rails db:migrate` and `RAILS_ENV=test ./bin/rails db:seed` to seed the db for tests.
9. Execute `./bin/rails server` to start the back end server, and `yarn start` to start the front end server.
10. Visit `http://127.0.0.1:3000`, and you should now see the login page.

- To run back end tests: `bundle exec rspec`
- To run frond end unit tests: `yarn test:jest`
- To run frond end E2E tests: `yarn dist:test`, `RAILS_ENV=test ./bin/rails server`, and then `yarn cypress run`

### yarn scripts

```bash
# global
yarn commit # instead of `git commit`, equivalent to `git add . && git-cz`
yarn lint # lint code with eslint / rubocop / brakeman / packwerk
yarn tsc:check # run TypeScript checking
yarn test # run tsc:check / lint / jest / rspec
yarn test:cypress # open Cypress GUI
yarn cleanup # clean up all the building artifacts / intermediates

# webapp
yarn start # start vite dev
yarn dist # build dist
yarn graphql # generate GraphQL schema and run graphql-codegen


# other npm packages
yarn $(package-dir-name) build
yarn $(package-dir-name) test
```

## Documentation

Detailed documentation is available at https://brickdoc.com/about/community-edition

- If you want to set up a Brickdoc for production use, see our [Install Guide](https://brickdoc.com/about/install)
- If you're looking for business support or hosting service, see [Brickdoc Enterprise Edition](https://brickdoc.com/pricing)

## Contributing

Brickdoc is an open source project and we are very happy to accept community contributions. To contribute to Brickdoc, you have to agree with the Brickdoc Contributor License Agreement.Please refer to [Contributing Documentation](CONTRIBUTING.md) for more details.

## Licensing

Brickdoc Community Edition is open source with an Apache 2.0 license.

Brickdoc Enterprise Edition and SaaS Service are built on top of Community Edition: it uses the same core but adds additional features and functionality on top of that. This is under a proprietary license.
