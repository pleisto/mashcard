# @brickdoc/nestjs-slonik

[slonik](https://github.com/gajus/slonik) module for NestJS.

Forked from [@brickdoc/nestjs-slonik](https://github.com/mkorobkov/@brickdoc/nestjs-slonik). Copyright (c) 2021 Mikhail Korobkov <m@korobkov.io>, MIT License.

## Installation

```bash
yarn add @brickdoc/@brickdoc/nestjs-slonik
```

## Getting Started

Once installed, you can import the module into the root `AppModule`.

```typescript
import { Module } from '@nestjs/common'
import { SlonikModule } from '@brickdoc/nestjs-slonik'

@Module({
  imports: [SlonikModule.forRoot({
      connectionUri: 'postgres://postgres:some-pwd@localhost/foo',
    })]
})
export class AppModule {}
```

The `forRoot()` method supports configuration properties described below.

* `connectionUri`: [Connection URI](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
* `clientConfiguration`: [Slonik configuration object](https://github.com/gajus/slonik#api)
* `name`: Connection pool name. Used to inject different db connections (default: `default`)
* `verboseRetryLog`: If `true`, will show verbose error messages on each connection retry (default: `false`)
* `retryAttempts`: Number of attempts to connect to the database (default: `10`)
* `retryDelay`: Delay between connection retry attempts (ms) (default: `3000`)

Once this is done, the Slonik pool will be available to inject across the entire project (without needing to
import any modules), for example:

> app.service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { InjectPool, sql, DatabasePool } from '@brickdoc/nestjs-slonik';

@Injectable()
export class AppService {
  constructor(@InjectPool() private pool: DatabasePool) {}

  getHello(): Promise<string> {
    return this.pool.oneFirst<string>(sql`SELECT 'Hello World!';`);
  }
}
```

### Multiple databases

Some projects require multiple database connections. This can also be achieved with this module.
To work with multiple pools, first create the pools. In this case, pool naming becomes **mandatory**.

```typescript
@Module({
  imports: [
    SlonikModule.forRoot({
      connectionUri: 'postgres://user:pwd@user_db_host:5432/users',
    }),
    SlonikModule.forRoot({
      name: 'albumsConnection',
      connectionUri: 'postgres://user:pwd@album_db_host:5432/albums',
    }),
  ],
})
export class AppModule {}
```

> **Notice** If you don't set the `name` for a pool, its name is set to `default`. Please note that you shouldn't
> have multiple pools without a name, or with the same name, otherwise they will get overridden.

Now you can inject the Slonik pool for a given pool name:

```typescript
@Injectable()
export class AlbumsService {
  constructor(
    @InjectPool()
    private usersPool: DatabasePool,
    @InjectPool('albumsConnection')
    private albumsPool: DatabasePool,
  ) {}
}
```

It's also possible to inject any Slonik pool instance to the providers:

```typescript
import { getPoolToken, DatabasePool } from '@brickdoc/nestjs-slonik';

@Module({
  providers: [
    {
      provide: AlbumsService,
      useFactory: (albumsConnection: DatabasePool) => {
        return new AlbumsService(albumsConnection);
      },
      inject: [getPoolToken('albumsConnection')],
    },
  ],
})
export class AlbumsModule {}
```

### Testing

When it comes to unit testing an application, we usually want to avoid making a database connection,
keeping our test suites independent and their execution process as fast as possible. But our classes might
depend on Slonik pool instance. How do we handle that? The solution is to create mock pool. In order to achieve
that, we set up [custom providers](https://docs.nestjs.com/fundamentals/custom-providers).
Each registered pool is automatically represented by an `<poolName='default'>SlonikPool` token.

The `@brickdoc/nestjs-slonik` package exposes the `getPoolToken()` function which returns a prepared token based on a given
pool name.

```typescript
@Module({
  providers: [
    UsersService,
    {
      provide: getPoolToken(),
      useValue: mockPool,
    },
  ],
})
export class UsersModule {}
```

Now a substitute `mockPool` will be used as the Slonik pool. Whenever any class asks for Slonik pool using
an `@InjectPool()` decorator, Nest will use the registered `mockPool` object.

#### How to create mockPool

* <https://github.com/gajus/slonik#mocking-slonik>
* <https://github.com/oguimbal/pg-mem/wiki/Libraries-adapters#-slonik>

> example of pg-mem usage

```typescript
import { newDb } from 'pg-mem';

const mockDb = newDb();
mockDb.public.none(`create table users(id text);
                    insert into users values ('john doe');`);
const mockPool = mockDb.adapters.createSlonik();
```

You can read more about pg-mem [here](https://github.com/oguimbal/pg-mem#-usage)

### Async configuration

You may want to pass your `SlonikModule` options asynchronously instead of statically.
In this case, use the `forRootAsync()` method, which provides several ways to deal with async configuration.

One approach is to use a factory function:

```typescript
SlonikModule.forRootAsync({
  useFactory: () => ({
    connectionUri: 'postgres://root:root@0.0.0.0:5432/test',
  }),
});
```

Our factory behaves like any other [asynchronous provider](https://docs.nestjs.com/fundamentals/async-providers)
(e.g., it can be `async` and it's able to inject dependencies through `inject`).

```typescript
SlonikModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    connectionUri: configService.get('DATABASE_URL'),
    clientConfigurationInput: {
      interceptors: [
        createFieldNameTransformationInterceptor({ format: 'CAMEL_CASE' }),
      ],
    },
  }),
  inject: [ConfigService],
});
```

Alternatively, you can use the `useClass` syntax:

```typescript
SlonikModule.forRootAsync({
  useClass: SlonikConfigService,
});
```

The construction above will instantiate `SlonikConfigService` inside `SlonikModule` and use it to provide
an options object by calling `createSlonikOptions()`. Note that this means that the `SlonikConfigService`
has to implement the `SlonikOptionsFactory` interface, as shown below:

```typescript
@Injectable()
class SlonikConfigService implements SlonikOptionsFactory {
  createSlonikOptions(): SlonikModuleOptions {
    return {
      connectionUri: 'postgres://root:root@localhost/test',
    };
  }
}
```

In order to prevent the creation of `SlonikConfigService` inside `SlonikModule` and use a provider imported
from a different module, you can use the `useExisting` syntax.

```typescript
SlonikModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
});
```

This construction works the same as `useClass` with one critical difference - `SlonikModule` will lookup
imported modules to reuse an existing `ConfigService` instead of instantiating a new one.

> Make sure that the `name` property is defined at the same level as the `useFactory`, `useClass`, or
> `useValue` property. This will allow Nest to properly register the pool under the appropriate injection token.

### Routing queries to different connections

Read more about this pattern here: [Slonik docs](https://github.com/gajus/slonik#routing-queries-to-different-connections)

```typescript
@Module({
  imports: [
    SlonikModule.forRoot({
      name: 'slave',
      connectionUri: 'postgres://slave',
    }),
    SlonikModule.forRootAsync({
      inject: [getPoolToken('slave')],
      useFactory: (slavePool: DatabasePool) => ({
        connectionUri: 'postgres://master',
        clientConfigurationInput: {
          interceptors: [
            {
              beforePoolConnection: async (connectionContext) => {
                if (connectionContext?.query?.sql?.includes('SELECT')) {
                  return slavePool;
                }
              },
            },
          ],
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

We register `master` pool as the default pool, but use Slonik interceptors to return
`slave` pool on SELECT queries.

> app.controller.ts

```typescript
import { Controller, Get } from '@nestjs/common';
import { InjectPool, sql, DatabasePool } from '@brickdoc/nestjs-slonik';

@Controller()
export class AppController {
  constructor(@InjectPool() private readonly pool: DatabasePool) {}

  @Get()
  async getHello() {
    await this.pool.query(sql`UPDATE 1`);
    return this.pool.oneFirst(sql`SELECT 1`);
  }
}
```

The first query will use `postgres://master` connection.

The second query will use `postgres://slave` connection.

## Helpers

The module exports several objects that group types of functionality.

### `values`

Create a list of values from an object.

```ts
import { sql, values } from "@brickdoc/nestjs-slonik"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  INSERT INTO table (col1, col2)
  VALUES (${values.fromObject(payload)})
`
```

#### `fromMap()`

Convenience for passing a `Map<string, any>`.

```ts
import { sql, values } from "@brickdoc/nestjs-slonik"

const payload = new Map([
  ["col1", "first value"],
  ["col2", 222],
])

const query = sql`
  INSERT INTO table (col1, col2)
  VALUES (${values.fromMap(payload)})
`
```

### `identifiers`

Create a set of identifiers from an array of strings.

```ts
import { sql, identifiers } from "@brickdoc/nestjs-slonik"

const query = sql`
  SELECT ${identifiers.fromArray(['col1', 'col2'], 'table')}
  FROM table
`
```

Create a set of identifiers from an object.

```ts
import { sql, identifiers } from "@brickdoc/nestjs-slonik"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  SELECT ${identifiers.fromObject(payload, 'table')}
  FROM table
`
```

#### `fromSet()`

Convenience for passing a `Set<string>` (behaves the same as `fromArray()`).

```ts
import { identifiers } from "@brickdoc/nestjs-slonik"

const PUBLIC_COLUMNS = identifiers.fromSet(new Set(["col_1", "col_2", "col_3"]), "table")
```

### `assignment`

Create an assignment statement from an object for an update.

```ts
import { sql, assignment } from "@brickdoc/nestjs-slonik"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  UPDATE table SET ${assignment.fromObject(payload)}
`
```

#### `fromMap()`

Convenience for passing a `Map<string, any>`.

```ts
import { sql, assignment } from "@brickdoc/nestjs-slonik"

const payload = new Map([
  ["col1", "first value"],
  ["col2", 222],
])

const query = sql`
  UPDATE table SET ${assignment.fromMap(payload)}
`
```

### `TranslateFn`

Methods that insert values into `sql` statements accept an optional `translate` argument as a function. You can use this as a callback to modify the value inserted into the statement. This allows making sure the value is handled with the proper `sql` query building helper.

```ts
import { sql, assignment } from "@brickdoc/nestjs-slonik"

const payload = {
  col1: "val1",
  col2: {
    nested1: "val2",
    nested2: "val3",
  },
  col4: 'val4'
}

const expression = assignment.fromObject(payload, (col, val) => {
  switch (col) {
    case 'col2':
      return sql.json(val) // val is { nested1: "val2", nested2: "val3" }
    case 'col3':
      return sql.binary(Buffer.from(val)) // val is 'val4'
    default:
      return val
  }
})

const query = sql`
  UPDATE table
  SET ${expression}
`
```

#### Returning a Tuple

The `TranslateFn` function type also allows returning a Tuple with arity-2 where the first element is a `string` and the second element the translated value (any `ValueExpressionType` from slonik). This allows translation of the column name at the same time as value translation.

```ts
import { sql, assignment } from "@brickdoc/nestjs-slonik"
import { snakeCase } from "@brickdoc/active-support" // or from "lodash"
const payload = {
  myColumn: "val1",
  anotherColumn: "val2",
}

const expression = assignment.fromObject(payload, (col, val) => [snakeCase(col), val])

const query = sql`
  UPDATE table
  SET ${expression}
`
```
