# Namespace: Result

## Table of contents

### Functions

- [fromThrowable](Result.md#fromthrowable)

## Functions

### <a id="fromthrowable" name="fromthrowable"></a> fromThrowable

▸ **fromThrowable**<`Fn`, `E`\>(`fn`, `errorFn?`): (...`args`: `Parameters`<`Fn`\>) => [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

Wraps a function with a try catch, creating a new function with the same
arguments but returning `Ok` if successful, `Err` if the function throws

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Fn` | extends (...`args`: readonly `any`[]) => `any` |
| `E` | `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `Fn` | function to wrap with ok on success or err on failure |
| `errorFn?` | (`e`: `unknown`) => `E` | when an error is thrown, this will wrap the error result if provided |

#### Returns

`fn`

▸ (...`args`): [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`Fn`\> |

##### Returns

[`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>
