# Namespace: Result

## Table of contents

### Functions

- [fromThrowable](Result.md#fromthrowable)

## Functions

### <a id="fromthrowable" name="fromthrowable"></a> fromThrowable

▸ **fromThrowable**<`Fn`, `E`\>(`fn`, `errorFn?`): (...`args`: `Parameters`<`Fn`\>) => [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Fn` | extends (...`args`: readonly `any`[]) => `any` |
| `E` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `Fn` |
| `errorFn?` | (`e`: `unknown`) => `E` |

#### Returns

`fn`

▸ (...`args`): [`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`Fn`\> |

##### Returns

[`Result`](../README.md#result)<`ReturnType`<`Fn`\>, `E`\>
