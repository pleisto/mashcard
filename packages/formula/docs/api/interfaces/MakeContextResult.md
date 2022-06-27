# Interface: MakeContextResult

## Hierarchy

- `Omit`<[`FunctionContext`](FunctionContext.md), `"meta"`\>

  ↳ **`MakeContextResult`**

## Table of contents

### Properties

- [formulaContext](MakeContextResult.md#formulacontext)
- [interpretContext](MakeContextResult.md#interpretcontext)

### Methods

- [buildMeta](MakeContextResult.md#buildmeta)
- [fetchUUID](MakeContextResult.md#fetchuuid)

## Properties

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• `Readonly` **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

Omit.formulaContext

#### Defined in

[packages/formula/src/types/index.ts:566](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L566)

---

### <a id="interpretcontext" name="interpretcontext"></a> interpretContext

• `Readonly` **interpretContext**: [`InterpretContext`](InterpretContext.md)

#### Inherited from

Omit.interpretContext

#### Defined in

[packages/formula/src/types/index.ts:571](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L571)

## Methods

### <a id="buildmeta" name="buildmeta"></a> buildMeta

▸ **buildMeta**(`args`): [`VariableMetadata`](VariableMetadata.md)

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

#### Returns

[`VariableMetadata`](VariableMetadata.md)

---

### <a id="fetchuuid" name="fetchuuid"></a> fetchUUID

▸ **fetchUUID**(`uuid`): `string`

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `uuid` | [`MockedUUIDV4`](../README.md#mockeduuidv4) |

#### Returns

`string`
