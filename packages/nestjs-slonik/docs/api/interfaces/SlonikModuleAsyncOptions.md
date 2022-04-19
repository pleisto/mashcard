# Interface: SlonikModuleAsyncOptions

## Hierarchy

- `Pick`<`ModuleMetadata`, ``"imports"``\>

  ↳ **`SlonikModuleAsyncOptions`**

## Table of contents

### Properties

- [imports](SlonikModuleAsyncOptions.md#imports)
- [inject](SlonikModuleAsyncOptions.md#inject)
- [name](SlonikModuleAsyncOptions.md#name)
- [useClass](SlonikModuleAsyncOptions.md#useclass)
- [useExisting](SlonikModuleAsyncOptions.md#useexisting)

### Methods

- [useFactory](SlonikModuleAsyncOptions.md#usefactory)

## Properties

### <a id="imports" name="imports"></a> imports

• `Optional` **imports**: (`Type`<`any`\> \| `DynamicModule` \| `Promise`<`DynamicModule`\> \| `ForwardReference`<`any`\>)[]

Optional list of imported modules that export the providers which are
required in this module.

#### Inherited from

Pick.imports

#### Defined in

node_modules/@nestjs/common/interfaces/modules/module-metadata.interface.d.ts:18

___

### <a id="inject" name="inject"></a> inject

• `Optional` **inject**: `any`[]

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:45](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L45)

___

### <a id="name" name="name"></a> name

• `Optional` **name**: `string`

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:41](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L41)

___

### <a id="useclass" name="useclass"></a> useClass

• `Optional` **useClass**: `Type`<[`SlonikOptionsFactory`](SlonikOptionsFactory.md)\>

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:43](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L43)

___

### <a id="useexisting" name="useexisting"></a> useExisting

• `Optional` **useExisting**: `Type`<[`SlonikOptionsFactory`](SlonikOptionsFactory.md)\>

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:42](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L42)

## Methods

### <a id="usefactory" name="usefactory"></a> useFactory

▸ `Optional` **useFactory**(...`args`): [`SlonikModuleOptions`](SlonikModuleOptions.md) \| `Promise`<[`SlonikModuleOptions`](SlonikModuleOptions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

[`SlonikModuleOptions`](SlonikModuleOptions.md) \| `Promise`<[`SlonikModuleOptions`](SlonikModuleOptions.md)\>

#### Defined in

[packages/nestjs-slonik/src/slonik.interface.ts:44](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/slonik.interface.ts#L44)
