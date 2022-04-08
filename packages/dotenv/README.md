# @brickdoc/dotenv

Smart load environment variables from a dotenv files. Same behavior as [ruby version's dotenv](https://github.com/bkeepers/dotenv).

```typescript
import { config } from '@brickdoc/dotenv';
config()
```

or work with ESM:

```typescript
import '@brickdoc/dotenv/config';
```

## How to use variable expansion?

```.env
FOO=bar
BAR=${FOO}-bar
```

## What other .env* files can I use?

`@brickdoc/dotenv` will override in the following order (highest defined variable overrides lower):

| Hierarchy Priority | Filename                 | Environment          | Should I `.gitignore`it?                            | Notes                                                        |
| ------------------ | ------------------------ | -------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| 1st (highest)      | `.env.development.local` | Development          | Yes!                                                | Local overrides of environment-specific settings.            |
| 1st                | `.env.test.local`        | Test                 | Yes!                                                | Local overrides of environment-specific settings.            |
| 1st                | `.env.production.local`  | Production           | Yes!                                                | Local overrides of environment-specific settings.            |
| 2nd                | `.env.local`             | Wherever the file is | Definitely.                                         | Local overrides. This file is loaded for all environments _except_ `test`. |
| 3rd                | `.env.development`       | Development          | No.                                                 | Shared environment-specific settings                         |
| 3rd                | `.env.test`              | Test                 | No.                                                 | Shared environment-specific settings                         |
| 3rd                | `.env.production`        | Production           | No.                                                 | Shared environment-specific settings                         |
| Last               | `.env`                   | All Environments     | Depends (See [below](#should-i-commit-my-env-file)) | The Original®                                                |

## Should I commit my .env file?

Credentials should only be accessible on the machines that need access to them. Never commit sensitive information to a repository that is not needed by every development machine and server.

## Why is it not overriding existing `ENV` variables?

By default, it **won't** overwrite existing environment variables as dotenv assumes the deployment environment has more knowledge about configuration than the application does. To overwrite existing environment variables you can use `overload` options.
