# @brickdoc/nestjs-redis

[node-redis4](https://github.com/redis/node-redis) module for NestJS.

## Installation

```bash
yarn add @brickdoc/nestjs-redis
```

## Getting Started

Once installed, you can import the module into the root `AppModule`.

```typescript
import { Module } from '@nestjs/common'
import { RedisModule } from '@brickdoc/nestjs-redis'

@Module({
  imports: [RedisModule.forRoot(someOptions)]
})
export class AppModule {}
```

And, you can use RedisService like this:

```typescript
import { Injectable } from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
@Injectable()
class FooService {
  constructor(private readonly redisService: RedisService) {}
  async someMethod() {
    await this.redisService.get(key)
    await this.redisService.get(key, { encrypted: true })
    await this.redisService.set(key, value)
    await this.redisService.del(key)

    // Or you can use node-redis client instance directly
    await this.redisService.client.quit()
  }
}
```

## Options

| Property                 | Default                                  | Description                                                                                                                                                                                                                                         |
| ------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                      |                                          | `redis[s]://[[username][:password]@][host][:port][/db-number]` (see [`redis`](https://www.iana.org/assignments/uri-schemes/prov/redis) and [`rediss`](https://www.iana.org/assignments/uri-schemes/prov/rediss) IANA registration for more details) |
| socket                   |                                          | Object defining socket connection properties. Any [`net.createConnection`](https://nodejs.org/api/net.html#netcreateconnectionoptions-connectlistener) option that is not listed here is supported as well                                          |
| socket.port              | `6379`                                   | Port to connect to                                                                                                                                                                                                                                  |
| socket.host              | `'localhost'`                            | Hostname to connect to                                                                                                                                                                                                                              |
| socket.family            | `0`                                      | Version of IP stack. Must be `4 \| 6 \| 0`. The value `0` indicates that both IPv4 and IPv6 addresses are allowed.                                                                                                                                  |
| socket.path              |                                          | UNIX Socket to connect to                                                                                                                                                                                                                           |
| socket.connectTimeout    | `5000`                                   | The timeout for connecting to the Redis Server (in milliseconds)                                                                                                                                                                                    |
| socket.noDelay           | `true`                                   | Enable/disable the use of [`Nagle's algorithm`](https://nodejs.org/api/net.html#net_socket_setnodelay_nodelay)                                                                                                                                      |
| socket.keepAlive         | `5000`                                   | Enable/disable the [`keep-alive`](https://nodejs.org/api/net.html#net_socket_setkeepalive_enable_initialdelay) functionality                                                                                                                        |
| socket.tls               |                                          | See explanation and examples [below](#TLS)                                                                                                                                                                                                          |
| socket.reconnectStrategy | `retries => Math.min(retries * 50, 500)` | A function containing the [Reconnect Strategy](#reconnect-strategy) logic                                                                                                                                                                           |
| username                 |                                          | ACL username ([see ACL guide](https://redis.io/topics/acl))                                                                                                                                                                                         |
| password                 |                                          | ACL password or the old "--requirepass" password                                                                                                                                                                                                    |
| name                     |                                          | Connection name ([see `CLIENT SETNAME`](https://redis.io/commands/client-setname))                                                                                                                                                                  |
| database                 |                                          | Database number to connect to (see [`SELECT`](https://redis.io/commands/select) command)                                                                                                                                                            |
| modules                  |                                          | Object defining which [Redis Modules](https://raw.githubusercontent.com/redis/node-redis/master/README.md#packages) to include                                                                                                                      |
| scripts                  |                                          | Object defining Lua Scripts to use with this client (see [Lua Scripts](../README.md#lua-scripts))                                                                                                                                                   |
| commandsQueueMaxLength   |                                          | Maximum length of the client's internal command queue                                                                                                                                                                                               |
| disableOfflineQueue      | `false`                                  | Disables offline queuing, see the [FAQ](https://raw.githubusercontent.com/redis/node-redis/master/docs/FAQ.md#what-happens-when-the-network-goes-down) for details                                                                                  |
| readonly                 | `false`                                  | Connect in [`READONLY`](https://redis.io/commands/readonly) mode                                                                                                                                                                                    |
| legacyMode               | `false`                                  | Maintain some backwards compatibility (see the [Migration Guide](https://raw.githubusercontent.com/redis/node-redis/master/docs/v3-to-v4.md))                                                                                                       |
| isolationPoolOptions     |                                          | See the [Isolated Execution Guide](https://raw.githubusercontent.com/redis/node-redis/master/docs/isolated-execution.md)                                                                                                                            |
| cryptoService            | undefined                                | cryptoService is optional, if you want to use encryption and data masking, you can pass in a cryptoService that implements the [CryptoService interface](./src/redis.interface.ts).                                                                 |
