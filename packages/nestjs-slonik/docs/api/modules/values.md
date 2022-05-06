# Namespace: values

Forked from https://github.com/aarongodin/slonik-iterable
MIT License | Aaron Godin <godinaaweb@gmail.com>"

## Table of contents

### Functions

- [fromMap](values.md#frommap)
- [fromObject](values.md#fromobject)

## Functions

### <a id="frommap" name="frommap"></a> fromMap

▸ **fromMap**(`payload`, `translate?`): [`SqlToken`](../README.md#sqltoken)

Create a list of values from Map<string, any>.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | `Map`<`string`, `any`\> | `undefined` |
| `translate` | (`column`: `string`, `value`: `any`) => `TranslationResult` | `translateValue` |

#### Returns

[`SqlToken`](../README.md#sqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/values.helper.ts:26](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/values.helper.ts#L26)

___

### <a id="fromobject" name="fromobject"></a> fromObject

▸ **fromObject**(`obj`, `translate?`): [`SqlToken`](../README.md#sqltoken)

Create a list of values from an object.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `Record`<`string`, `any`\> | `undefined` |
| `translate` | (`column`: `string`, `value`: `any`) => `TranslationResult` | `translateValue` |

#### Returns

[`SqlToken`](../README.md#sqltoken)

#### Defined in

[packages/nestjs-slonik/src/helpers/values.helper.ts:11](https://github.com/brickdoc/brickdoc/blob/master/packages/nestjs-slonik/src/helpers/values.helper.ts#L11)
