# Set up your development environment

## Prerequisites

### Toolchain

#### Ruby

```bash
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-3.1
```

**Note:** If you are using a Apple Silicon M1 device, you may need execute the following command after installing Ruby:

```bash
brew install openssl@1.1
sudo ln -s $(brew --prefix openssl@1.1)/lib/libcrypto.dylib /usr/local/lib/
sudo ln -s $(brew --prefix openssl@1.1)/lib/libssl.dylib  /usr/local/lib
```

#### NodeJS

We high recommended using [volta](https://volta.sh/) to manage your nodejs environment.

Volta better than nvm because it could automatically detect the Node.js version required by our project.

```bash
curl https://get.volta.sh | bash
volta install node@18
```

#### Rust

Rust is a required dependency for building some native gems. And, [rustup](https://www.rust-lang.org/tools/install) is a recommended way to install rust toolchain.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### VS Code

Sure you can use any other editor/IDE you like, but we highly recommend [VSCode](https://code.visualstudio.com/) for a better out-of-the-box experience.

We provide an out-of-box workspace file for VSCode, which contains all the necessary settings to work with this monorepo. We recommend you open this monorepo by `File` menu -> `Open Workspace from File` -> select `workspace.code-workspace` file in the repo root.

### Database

> TIPS: you can run docker compose to quickly start a local database.
> See [This configure](../tools/scripts/docker-compose.yml) for more details.

[PostgreSQL 14+](https://www.postgresql.org/) is the only supported RDS.

We highly recommend run postgres on docker in development environment.

```bash
docker run -d --name testdb  -e POSTGRES_PASSWORD=local-test -p 5432:5432 postgres:alpine
```

Also, [Redis](https://redis.io/) is what we use for caching.

```bash
docker run -d --name redis  -p 6379:6379 redis:alpine
```

### Plugin dependencies

Some plugins require external dependencies such as api keys, credentials, etc. Your could edit dotenv file to add those dependencies.

## Start development

1. Run `yarn install && yarn server i` to install all dependencies and build rust native extensions for server.
2. Run `yarn server g dotenv` to initialize the dotenv file.
3. Run `yarn server db:create && yarn server db:migrate` to updates your database using migrations.
4. Run `yarn server s` && `yarn web start` to start the development server.
5. Visit `http://localhost:3000`, and you should now see the login page.

- To lint your code, run `yarn lint`
- To run unit tests: `yarn test:jest && yarn test:rspec`
- To run frond end E2E tests: `yarn test:playwright`

## Commands Reference

```bash
yarn commit # Instead of `git commit`, equivalent to `git add . && git-cz`

yarn lint # Lint code with eslint and run typescript check

yarn lint:fix # Run eslint --fix
yarn lint:type # Run TypeScript checking only

yarn cleanup # Clean up all the building artifacts / intermediates

# Generate GraphQL schema and run graphql-codegen
yarn server dump:graphql
yarn web generate:graphql

# Monolith Server
yarn server s # rails server
yarn server c # rails console
yarn server db:{create | migrate | drop} # Create or drop database
yarn server i # equivalent to `bundle install && rake rust:build`
yarn server g # equivalent to `rails generate`
yarn test:rspec # Run rspec tests
yarn lint:rubocop # Run rubocop
yarn lint:fix # Run rubocop --auto-correct
yarn lint:brakeman # Run brakeman
yarn lint:clippy # Run clippy in rust
yarn fmt:rust # Run rust-fmt
yarn build:dev # Build rust native extensions in dev profile
yarn server bundle # Run bundle in any monorepo directory
yarn server rake # Run rake in any monorepo directory


# Other packages
yarn ${package-name} build
yarn ${package-name} test
yarn ${package-name} lint:eslint
yarn ${package-name} lint:type
yarn ${package-name} test:jest
```
