# Namespace: assignment

## Table of contents

### Functions

- [fromMap](assignment.md#frommap)
- [fromObject](assignment.md#fromobject)

## Functions

### <a id="frommap" name="frommap"></a> fromMap

▸ **fromMap**(`payload`): [`SqlToken`](../README.md#sqltoken)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `Map`<`string`, `any`\> |

#### Returns

[`SqlToken`](../README.md#sqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/assignment.helper.ts:15](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/assignment.helper.ts#L15)

___

### <a id="fromobject" name="fromobject"></a> fromObject

▸ **fromObject**(`payload`, `translate?`): [`SqlToken`](../README.md#sqltoken)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | `Record`<`string`, `any`\> | `undefined` |
| `translate` | (`column`: `string`, `value`: `any`) => `TranslationResult` | `translateValue` |

#### Returns

[`SqlToken`](../README.md#sqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/assignment.helper.ts:5](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/assignment.helper.ts#L5)
