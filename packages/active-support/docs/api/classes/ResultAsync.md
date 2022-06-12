# Class: ResultAsync<T, E\>

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Implements

- `PromiseLike`<[`Result`](../README.md#result)<`T`, `E`\>\>

## Table of contents

### Constructors

- [constructor](ResultAsync.md#constructor)

### Properties

- [\_promise](ResultAsync.md#_promise)

### Methods

- [andThen](ResultAsync.md#andthen)
- [map](ResultAsync.md#map)
- [mapErr](ResultAsync.md#maperr)
- [match](ResultAsync.md#match)
- [orElse](ResultAsync.md#orelse)
- [then](ResultAsync.md#then)
- [unwrapOr](ResultAsync.md#unwrapor)
- [fromPromise](ResultAsync.md#frompromise)
- [fromSafePromise](ResultAsync.md#fromsafepromise)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ResultAsync**<`T`, `E`\>(`res`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `Promise`<[`Result`](../README.md#result)<`T`, `E`\>\> |

#### Defined in

node_modules/neverthrow/dist/index.d.ts:3

## Properties

### <a id="_promise" name="_promise"></a> \_promise

• `Private` **\_promise**: `any`

#### Defined in

node_modules/neverthrow/dist/index.d.ts:2

## Methods

### <a id="andthen" name="andthen"></a> andThen

▸ **andThen**<`R`\>(`f`): [`ResultAsync`](ResultAsync.md)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`Result`](../README.md#result)<`unknown`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `R` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:8

▸ **andThen**<`R`\>(`f`): [`ResultAsync`](ResultAsync.md)<`InferAsyncOkTypes`<`R`\>, `E` \| `InferAsyncErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`ResultAsync`](ResultAsync.md)<`unknown`, `unknown`, `R`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `R` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`InferAsyncOkTypes`<`R`\>, `E` \| `InferAsyncErrTypes`<`R`\>\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:9

▸ **andThen**<`U`, `F`\>(`f`): [`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Type parameters

| Name |
| :------ |
| `U` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => [`Result`](../README.md#result)<`U`, `F`\> \| [`ResultAsync`](ResultAsync.md)<`U`, `F`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:10

___

### <a id="map" name="map"></a> map

▸ **map**<`A`\>(`f`): [`ResultAsync`](ResultAsync.md)<`A`, `E`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `A` \| `Promise`<`A`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`A`, `E`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:6

___

### <a id="maperr" name="maperr"></a> mapErr

▸ **mapErr**<`U`\>(`f`): [`ResultAsync`](ResultAsync.md)<`T`, `U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `E`) => `U` \| `Promise`<`U`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `U`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:7

___

### <a id="match" name="match"></a> match

▸ **match**<`A`\>(`ok`, `_err`): `Promise`<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`t`: `T`) => `A` |
| `_err` | (`e`: `E`) => `A` |

#### Returns

`Promise`<`A`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:14

___

### <a id="orelse" name="orelse"></a> orElse

▸ **orElse**<`R`\>(`f`): [`ResultAsync`](ResultAsync.md)<`T`, `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`Result`](../README.md#result)<`T`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `E`) => `R` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `InferErrTypes`<`R`\>\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:11

▸ **orElse**<`R`\>(`f`): [`ResultAsync`](ResultAsync.md)<`T`, `InferAsyncErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`ResultAsync`](ResultAsync.md)<`T`, `unknown`, `R`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `E`) => `R` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `InferAsyncErrTypes`<`R`\>\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:12

▸ **orElse**<`A`\>(`f`): [`ResultAsync`](ResultAsync.md)<`T`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `E`) => [`Result`](../README.md#result)<`T`, `A`\> \| [`ResultAsync`](ResultAsync.md)<`T`, `A`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `A`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:13

___

### <a id="then" name="then"></a> then

▸ **then**<`A`, `B`\>(`successCallback?`, `failureCallback?`): `PromiseLike`<`A` \| `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `successCallback?` | (`res`: [`Result`](../README.md#result)<`T`, `E`\>) => `A` \| `PromiseLike`<`A`\> |
| `failureCallback?` | (`reason`: `unknown`) => `B` \| `PromiseLike`<`B`\> |

#### Returns

`PromiseLike`<`A` \| `B`\>

#### Implementation of

PromiseLike.then

#### Defined in

node_modules/neverthrow/dist/index.d.ts:16

___

### <a id="unwrapor" name="unwrapor"></a> unwrapOr

▸ **unwrapOr**<`A`\>(`t`): `Promise`<`T` \| `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `A` |

#### Returns

`Promise`<`T` \| `A`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:15

___

### <a id="frompromise" name="frompromise"></a> fromPromise

▸ `Static` **fromPromise**<`T`, `E`\>(`promise`, `errorFn`): [`ResultAsync`](ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> |
| `errorFn` | (`e`: `unknown`) => `E` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `E`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:5

___

### <a id="fromsafepromise" name="fromsafepromise"></a> fromSafePromise

▸ `Static` **fromSafePromise**<`T`, `E`\>(`promise`): [`ResultAsync`](ResultAsync.md)<`T`, `E`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `E`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:4
