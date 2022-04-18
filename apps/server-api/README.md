# Brickdoc API Server

## Get Started

* `yarn dev`: Starts the server in development mode with node debugger and hot reloading.
* `yarn start`: Starts the server in production mode.
* `yarn cli {sub-command}`: Use the CLI to run commands.
* `yarn g {schematics}`: Use the schematics to generate files.
* `yarn g --list-schematics`: List all available schematics.

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

### schematics

* `dotenv`: Generate or update .env.local file.
* `migration`: Generate a db migration file.

e.g. `yarn g migration --name create-users`

### Required Environment Variables

* `NODE_ENV`: The environment to run the server in.
* `SECRET_KEY_SEED`: The secret key seed used to generate the secret key.
* `REDIS_URL`: The url of the redis server.
* `DATABASE_URL_BASE`: The url of the database server without the database name.
* `DATABASE_NAME`: The name of the database.
