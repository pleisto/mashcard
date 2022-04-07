# Interface: SlonikModuleOptions

## Hierarchy

- [`SlonikOptions`](SlonikOptions.md)

  ↳ **`SlonikModuleOptions`**

## Table of contents

### Properties

- [camelCaseFieldNames](SlonikModuleOptions.md#camelcasefieldnames)
- [clientConfigurationInput](SlonikModuleOptions.md#clientconfigurationinput)
- [connectionUri](SlonikModuleOptions.md#connectionuri)
- [name](SlonikModuleOptions.md#name)
- [retryAttempts](SlonikModuleOptions.md#retryattempts)
- [retryDelay](SlonikModuleOptions.md#retrydelay)
- [verboseRetryLog](SlonikModuleOptions.md#verboseretrylog)

## Properties

### <a id="camelcasefieldnames" name="camelcasefieldnames"></a> camelCaseFieldNames

• `Optional` **camelCaseFieldNames**: `boolean`

open camelCaseFieldNameInterceptor

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:38](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L38)

___

### <a id="clientconfigurationinput" name="clientconfigurationinput"></a> clientConfigurationInput

• `Optional` **clientConfigurationInput**: `Partial`<[`ClientConfiguration`](../README.md#clientconfiguration)\>

#### Inherited from

[SlonikOptions](SlonikOptions.md).[clientConfigurationInput](SlonikOptions.md#clientconfigurationinput)

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:11](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L11)

___

### <a id="connectionuri" name="connectionuri"></a> connectionUri

• **connectionUri**: `string`

#### Inherited from

[SlonikOptions](SlonikOptions.md).[connectionUri](SlonikOptions.md#connectionuri)

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:10](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L10)

___

### <a id="name" name="name"></a> name

• `Optional` **name**: `string`

Connection pool name

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:18](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L18)

___

### <a id="retryattempts" name="retryattempts"></a> retryAttempts

• `Optional` **retryAttempts**: `number`

Number of times to retry connecting
Default: 10

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:28](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L28)

___

### <a id="retrydelay" name="retrydelay"></a> retryDelay

• `Optional` **retryDelay**: `number`

Delay between connection retry attempts (ms)
Default: 3000

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:33](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L33)

___

### <a id="verboseretrylog" name="verboseretrylog"></a> verboseRetryLog

• `Optional` **verboseRetryLog**: `boolean`

If `true`, will show verbose error messages on each connection retry.

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:23](https://github.com/brickdoc/brickdoc/blob/5e2ec65d/packages/nestjs-slonik/src/slonik.interface.ts#L23)
