# Set up your development environment

## Prerequisites

### Toolchain

#### NodeJS

We high recommended using [volta](https://volta.sh/) to manage your nodejs environment.

Volta better than nvm because it could automatically detect the Node.js version required by our project.

```bash
curl https://get.volta.sh | bash
volta install node@16
```

#### Rust

Rust is a required dependency for building some native node modules.And, [rustup](https://www.rust-lang.org/tools/install) is a recommended way to install rust toolchain.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### VS Code

Sure you can use any other editor/IDE you like, but we highly recommend [VSCode](https://code.visualstudio.com/) for a better out-of-the-box experience.

### Database

> TIPS: you can run docker compose to quickly start a local database.

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

1. Run `yarn install` to install all dependencies.
2. Run `yarn dev generate dotenv` to initialize the dotenv file.
3. Run `yarn dev dev db:create && yarn dev db:migrate` to updates your database using migrations.
4. Run `yarn start` to start the development server.
5. Visit `http://localhost:3000`, and you should now see the login page.

- To lint your code, run `yarn lint`
- To run unit tests: `yarn test:jest`
- To run frond end E2E tests: `yarn test:playwright`

## Commands Reference

```bash
yarn commit # Instead of `git commit`, equivalent to `git add . && git-cz`

yarn lint # Lint code with eslint and run typescript check

yarn lint:fix # Run eslint --fix
yarn lint:type # Run TypeScript checking only

yarn cleanup # Clean up all the building artifacts / intermediates

yarn graphql # Generate GraphQL schema and run graphql-codegen

# API Server
yarn api start
yarn dev console # Rails-like console
yarn dev db:{create | migrate | drop} # Create or drop database

# Generator
yarn dev g {dotenv} # Angular schematics tools

# Other packages
yarn ${package-name} build
yarn ${package-name} test
```
