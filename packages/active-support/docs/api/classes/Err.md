# Class: Err<T, E\>

## Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

## Implements

- `IResult`<`T`, `E`\>

## Table of contents

### Constructors

- [constructor](Err.md#constructor)

### Properties

- [error](Err.md#error)

### Methods

- [\_unsafeUnwrap](Err.md#_unsafeunwrap)
- [\_unsafeUnwrapErr](Err.md#_unsafeunwraperr)
- [andThen](Err.md#andthen)
- [asyncAndThen](Err.md#asyncandthen)
- [asyncMap](Err.md#asyncmap)
- [isErr](Err.md#iserr)
- [isOk](Err.md#isok)
- [map](Err.md#map)
- [mapErr](Err.md#maperr)
- [match](Err.md#match)
- [orElse](Err.md#orelse)
- [unwrapOr](Err.md#unwrapor)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Err**<`T`, `E`\>(`error`)

#### Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `error` | `E`  |

#### Defined in

node_modules/neverthrow/dist/index.d.ts:193

## Properties

### <a id="error" name="error"></a> error

• `Readonly` **error**: `E`

#### Defined in

node_modules/neverthrow/dist/index.d.ts:192

## Methods

### <a id="_unsafeunwrap" name="_unsafeunwrap"></a> \_unsafeUnwrap

▸ **\_unsafeUnwrap**(`config?`): `T`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `config?` | `ErrorConfig` |

#### Returns

`T`

#### Implementation of

IResult.\_unsafeUnwrap

#### Defined in

node_modules/neverthrow/dist/index.d.ts:206

---

### <a id="_unsafeunwraperr" name="_unsafeunwraperr"></a> \_unsafeUnwrapErr

▸ **\_unsafeUnwrapErr**(`_?`): `E`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `_?` | `ErrorConfig` |

#### Returns

`E`

#### Implementation of

IResult.\_unsafeUnwrapErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:207

---

### <a id="andthen" name="andthen"></a> andThen

▸ **andThen**<`R`\>(`_f`): [`Result`](../README.md#result)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type                                                           |
| :--- | :------------------------------------------------------------- |
| `R`  | extends [`Result`](../README.md#result)<`unknown`, `unknown`\> |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `_f` | (`t`: `T`) => `R` |

#### Returns

[`Result`](../README.md#result)<`InferOkTypes`<`R`\>, `E` \| `InferErrTypes`<`R`\>\>

#### Implementation of

IResult.andThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:198

▸ **andThen**<`U`, `F`\>(`_f`): [`Result`](../README.md#result)<`U`, `E` \| `F`\>

#### Type parameters

| Name |
| :--- |
| `U`  |
| `F`  |

#### Parameters

| Name | Type                                                     |
| :--- | :------------------------------------------------------- |
| `_f` | (`t`: `T`) => [`Result`](../README.md#result)<`U`, `F`\> |

#### Returns

[`Result`](../README.md#result)<`U`, `E` \| `F`\>

#### Implementation of

IResult.andThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:199

---

### <a id="asyncandthen" name="asyncandthen"></a> asyncAndThen

▸ **asyncAndThen**<`U`, `F`\>(`_f`): [`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Type parameters

| Name |
| :--- |
| `U`  |
| `F`  |

#### Parameters

| Name | Type                                                     |
| :--- | :------------------------------------------------------- |
| `_f` | (`t`: `T`) => [`ResultAsync`](ResultAsync.md)<`U`, `F`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`U`, `E` \| `F`\>

#### Implementation of

IResult.asyncAndThen

#### Defined in

node_modules/neverthrow/dist/index.d.ts:202

---

### <a id="asyncmap" name="asyncmap"></a> asyncMap

▸ **asyncMap**<`U`\>(`_f`): [`ResultAsync`](ResultAsync.md)<`U`, `E`\>

#### Type parameters

| Name |
| :--- |
| `U`  |

#### Parameters

| Name | Type                          |
| :--- | :---------------------------- |
| `_f` | (`t`: `T`) => `Promise`<`U`\> |

#### Returns

[`ResultAsync`](ResultAsync.md)<`U`, `E`\>

#### Implementation of

IResult.asyncMap

#### Defined in

node_modules/neverthrow/dist/index.d.ts:203

---

### <a id="iserr" name="iserr"></a> isErr

▸ **isErr**(): this is Err<T, E\>

#### Returns

this is Err<T, E\>

#### Implementation of

IResult.isErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:195

---

### <a id="isok" name="isok"></a> isOk

▸ **isOk**(): this is Ok<T, E\>

#### Returns

this is Ok<T, E\>

#### Implementation of

IResult.isOk

#### Defined in

node_modules/neverthrow/dist/index.d.ts:194

---

### <a id="map" name="map"></a> map

▸ **map**<`A`\>(`_f`): [`Result`](../README.md#result)<`A`, `E`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `_f` | (`t`: `T`) => `A` |

#### Returns

[`Result`](../README.md#result)<`A`, `E`\>

#### Implementation of

IResult.map

#### Defined in

node_modules/neverthrow/dist/index.d.ts:196

---

### <a id="maperr" name="maperr"></a> mapErr

▸ **mapErr**<`U`\>(`f`): [`Result`](../README.md#result)<`T`, `U`\>

#### Type parameters

| Name |
| :--- |
| `U`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`e`: `E`) => `U` |

#### Returns

[`Result`](../README.md#result)<`T`, `U`\>

#### Implementation of

IResult.mapErr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:197

---

### <a id="match" name="match"></a> match

▸ **match**<`A`\>(`_ok`, `err`): `A`

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name  | Type              |
| :---- | :---------------- |
| `_ok` | (`t`: `T`) => `A` |
| `err` | (`e`: `E`) => `A` |

#### Returns

`A`

#### Implementation of

IResult.match

#### Defined in

node_modules/neverthrow/dist/index.d.ts:205

---

### <a id="orelse" name="orelse"></a> orElse

▸ **orElse**<`R`\>(`f`): [`Result`](../README.md#result)<`T`, `InferErrTypes`<`R`\>\>

#### Type parameters

| Name | Type                                                           |
| :--- | :------------------------------------------------------------- |
| `R`  | extends [`Result`](../README.md#result)<`unknown`, `unknown`\> |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`e`: `E`) => `R` |

#### Returns

[`Result`](../README.md#result)<`T`, `InferErrTypes`<`R`\>\>

#### Implementation of

IResult.orElse

#### Defined in

node_modules/neverthrow/dist/index.d.ts:200

▸ **orElse**<`A`\>(`f`): [`Result`](../README.md#result)<`T`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                                                     |
| :--- | :------------------------------------------------------- |
| `f`  | (`e`: `E`) => [`Result`](../README.md#result)<`T`, `A`\> |

#### Returns

[`Result`](../README.md#result)<`T`, `A`\>

#### Implementation of

IResult.orElse

#### Defined in

node_modules/neverthrow/dist/index.d.ts:201

---

### <a id="unwrapor" name="unwrapor"></a> unwrapOr

▸ **unwrapOr**<`A`\>(`v`): `T` \| `A`

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `v`  | `A`  |

#### Returns

`T` \| `A`

#### Implementation of

IResult.unwrapOr

#### Defined in

node_modules/neverthrow/dist/index.d.ts:204
