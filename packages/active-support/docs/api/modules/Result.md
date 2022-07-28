# Namespace: Result

## Table of contents

### Functions

- [combine](Result.md#combine)
- [combineWithAllErrors](Result.md#combinewithallerrors)
- [fromThrowable](Result.md#fromthrowable)

## Functions

### <a id="combine" name="combine"></a> combine

▸ **combine**<`T`\>(`resultList`): [`Result`](../README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`]\>

#### Type parameters

| Name | Type                                                                      |
| :--- | :------------------------------------------------------------------------ |
| `T`  | extends readonly [`Result`](../README.md#result)<`unknown`, `unknown`\>[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `resultList` | `T`  |

#### Returns

[`Result`](../README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`]\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:55

---

### <a id="combinewithallerrors" name="combinewithallerrors"></a> combineWithAllErrors

▸ **combineWithAllErrors**<`T`\>(`resultList`): [`Result`](../README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`][]\>

#### Type parameters

| Name | Type                                                                      |
| :--- | :------------------------------------------------------------------------ |
| `T`  | extends readonly [`Result`](../README.md#result)<`unknown`, `unknown`\>[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `resultList` | `T`  |

#### Returns

[`Result`](../README.md#result)<`ExtractOkTypes`<`T`\>, `ExtractErrTypes`<`T`\>[`number`][]\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:56

---

### <a id="fromthrowable" name="fromthrowable"></a> fromThrowable

▸ **fromThrowable**<`Fn`, `E`\>(`fn`, `errorFn?`): (...`args`: `Parameters`<`Fn`\>) => [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

Wraps a function with a try catch, creating a new function with the same
arguments but returning `Ok` if successful, `Err` if the function throws

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `Fn` | extends (...`args`: readonly `any`[]) => `any` |
| `E`  | `E`                                            |

#### Parameters

| Name       | Type                    | Description                                                          |
| :--------- | :---------------------- | :------------------------------------------------------------------- |
| `fn`       | `Fn`                    | function to wrap with ok on success or err on failure                |
| `errorFn?` | (`e`: `unknown`) => `E` | when an error is thrown, this will wrap the error result if provided |

#### Returns

`fn`

▸ (...`args`): [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

##### Parameters

| Name      | Type                |
| :-------- | :------------------ |
| `...args` | `Parameters`<`Fn`\> |

##### Returns

[`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

#### Defined in

node_modules/neverthrow/dist/index.d.ts:54
