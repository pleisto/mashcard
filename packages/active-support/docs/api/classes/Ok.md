# Class: Ok<T, E\>

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Implements

- `IResult`<`T`, `E`\>

## Table of contents

### Constructors

- [constructor](Ok.md#constructor)

### Properties

- [value](Ok.md#value)

### Methods

- [\_unsafeUnwrap](Ok.md#_unsafeunwrap)
- [\_unsafeUnwrapErr](Ok.md#_unsafeunwraperr)
- [andThen](Ok.md#andthen)
- [asyncAndThen](Ok.md#asyncandthen)
- [asyncMap](Ok.md#asyncmap)
- [isErr](Ok.md#iserr)
- [isOk](Ok.md#isok)
- [map](Ok.md#map)
- [mapErr](Ok.md#maperr)
- [match](Ok.md#match)
- [orElse](Ok.md#orelse)
- [unwrapOr](Ok.md#unwrapor)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Ok**<`T`, `E`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

node_modules/neverthrow/dist/index.d.ts:175

## Properties

### <a id="value" name="value"></a> value

• `Readonly` **value**: `T`

#### Defined in

node_modules/neverthrow/dist/index.d.ts:174

## Methods

### <a id="_unsafeunwrap" name="_unsafeunwrap"></a> \_unsafeUnwrap

▸ **_unsafeUnwrap**(`_?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_?` | `ErrorConfig` |

#### Returns

`T`

#### Implementation of

IResult.\_unsafeUnwrap

#### Defined in

node_modules/neverthrow/dist/index.d.ts:188

___

### <a id="_unsafeunwraperr" name="_unsafeunwraperr"></a> \_unsafeUnwrapErr

▸ **_unsafeUnwrapErr**(`config?`): `E`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `ErrorConfig` |

#### Returns

`E`

#### Implementation of

IResult.\_unsafeUnwrapErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:189

___

### <a id="andthen" name="andthen"></a> andThen

▸ **andThen**<`R`\>(`f`): [`Result`](../README.md#result)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`Result`](../README.md#result)<`unknown`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `R` |

#### Returns

[`Result`](../README.md#result)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Implementation of

IResult.andThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:180

▸ **andThen**<`U`, `F`\>(`f`): [`Result`](../README.md#result)<`U`, `E` \| `F`\>

#### Type parameters

| Name |
| :------ |
| `U` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => [`Result`](../README.md#result)<`U`, `F`\> |

#### Returns

[`Result`](../README.md#result)<`U`, `E` \| `F`\>

#### Implementation of

IResult.andThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:181

___

### <a id="asyncandthen" name="asyncandthen"></a> asyncAndThen

▸ **asyncAndThen**<`U`, `F`\>(`f`): [`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Type parameters

| Name |
| :------ |
| `U` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => [`ResultAsync`](ResultAsync.md)<`U`, `F`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Implementation of

IResult.asyncAndThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:184

___

### <a id="asyncmap" name="asyncmap"></a> asyncMap

▸ **asyncMap**<`U`\>(`f`): [`ResultAsync`](ResultAsync.md)<`U`, `E`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `Promise`<`U`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`U`, `E`\>

#### Implementation of

IResult.asyncMap

#### Defined in

node_modules/neverthrow/dist/index.d.ts:185

___

### <a id="iserr" name="iserr"></a> isErr

▸ **isErr**(): this is Err<T, E\>

#### Returns

this is Err<T, E\>

#### Implementation of

IResult.isErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:177

___

### <a id="isok" name="isok"></a> isOk

▸ **isOk**(): this is Ok<T, E\>

#### Returns

this is Ok<T, E\>

#### Implementation of

IResult.isOk

#### Defined in

node_modules/neverthrow/dist/index.d.ts:176

___

### <a id="map" name="map"></a> map

▸ **map**<`A`\>(`f`): [`Result`](../README.md#result)<`A`, `E`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`t`: `T`) => `A` |

#### Returns

[`Result`](../README.md#result)<`A`, `E`\>

#### Implementation of

IResult.map

#### Defined in

node_modules/neverthrow/dist/index.d.ts:178

___

### <a id="maperr" name="maperr"></a> mapErr

▸ **mapErr**<`U`\>(`_f`): [`Result`](../README.md#result)<`T`, `U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_f` | (`e`: `E`) => `U` |

#### Returns

[`Result`](../README.md#result)<`T`, `U`\>

#### Implementation of

IResult.mapErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:179

___

### <a id="match" name="match"></a> match

▸ **match**<`A`\>(`ok`, `_err`): `A`

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

`A`

#### Implementation of

IResult.match

#### Defined in

node_modules/neverthrow/dist/index.d.ts:187

___

### <a id="orelse" name="orelse"></a> orElse

▸ **orElse**<`R`\>(`_f`): [`Result`](../README.md#result)<`T`, `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`Result`](../README.md#result)<`unknown`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_f` | (`e`: `E`) => `R` |

#### Returns

[`Result`](../README.md#result)<`T`, `InferErrTypes`<`R`\>\>

#### Implementation of

IResult.orElse

#### Defined in

node_modules/neverthrow/dist/index.d.ts:182

▸ **orElse**<`A`\>(`_f`): [`Result`](../README.md#result)<`T`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_f` | (`e`: `E`) => [`Result`](../README.md#result)<`T`, `A`\> |

#### Returns

[`Result`](../README.md#result)<`T`, `A`\>

#### Implementation of

IResult.orElse

#### Defined in

node_modules/neverthrow/dist/index.d.ts:183

___

### <a id="unwrapor" name="unwrapor"></a> unwrapOr

▸ **unwrapOr**<`A`\>(`_v`): `T` \| `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_v` | `A` |

#### Returns

`T` \| `A`

#### Implementation of

IResult.unwrapOr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:186
