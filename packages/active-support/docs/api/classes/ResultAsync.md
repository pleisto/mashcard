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
| `promise` | `PromiseLike`<`T`\> |
| `errorFn` | (`e`: `unknown`) => `E` |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `E`\>

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
| `promise` | `PromiseLike`<`T`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`T`, `E`\>
