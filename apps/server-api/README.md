# Brickdoc API Server

## Get Started

- `yarn dev`: Starts the server in development mode with node debugger and hot reloading.
- `yarn start`: Starts the server in production mode.
- `yarn cli {sub-command}`: Use the CLI to run commands.
- `yarn g {schematics}`: Use the schematics to generate files.
- `yarn g --list-schematics`: List all available schematics.

### HTTPS in development

When `NODE_ENV=development`, the server will be served over HTTPS with a self-signed certificate. Learn how to bypass cert check for Chromium-based browsers: <https://stackoverflow.com/a/71236409/3542546>.

### CLI sub-commands

```bash
yarn cli help

Brickdoc API Server CLI

Commands:
  yarn cli server       Run Brickdoc API server.                    [aliases: s]
  yarn cli console      Deprecated: Use `NodeJS Debugger` instead.  [aliases: c]
  yarn cli db:create    Create a database based on current environment variable.
  yarn cli db:migrate   Run database migrations.
  yarn cli db:rollback  Rollback database migrations.
  yarn cli db:status    Show database migrate status.
  yarn cli db:repair    Repair hashes in the migration table.
  yarn cli db:dump      Dump the database schema to a file.
  yarn cli db:drop      Drop a database based on current environment variable.

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

To run `db:dump`, you need to have `pg_dump` installed locally. If you are running postgres via [docker-compose](../../docker-compose.yml), yan can create a script named `pg_dump` under `/usr/local/bin/` with the following content:

```sh
#!/bin/sh
docker exec brickdoc-postgres-1 pg_dump $@
```

### schematics

- `dotenv`: Generate or update .env.local file.
- `migration`: Generate a db migration file.

e.g. `yarn g migration --name create-users`

### Required Environment Variables

- `NODE_ENV`: The environment to run the server in.
- `SECRET_KEY_SEED`: The secret key seed used to generate the secret key.
- `REDIS_URL`: The url of the redis server.
- `DATABASE_URL_BASE`: The url of the database server without the database name.
- `DATABASE_NAME`: The name of the database.
