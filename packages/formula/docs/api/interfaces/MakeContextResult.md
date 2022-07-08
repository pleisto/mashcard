# Interface: MakeContextResult

## Hierarchy

- `Omit`<[`FunctionContext`](FunctionContext.md), ``"meta"``\>

  ↳ **`MakeContextResult`**

## Table of contents

### Properties

- [buildMeta](MakeContextResult.md#buildmeta)
- [fetchUUID](MakeContextResult.md#fetchuuid)
- [formulaContext](MakeContextResult.md#formulacontext)
- [interpretContext](MakeContextResult.md#interpretcontext)

## Properties

### <a id="buildmeta" name="buildmeta"></a> buildMeta

• **buildMeta**: (`args`: [`BaseTestCase`](BaseTestCase.md)<{}\>) => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (`args`): [`VariableMetadata`](VariableMetadata.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/tests/testType.ts:225](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L225)

___

### <a id="fetchuuid" name="fetchuuid"></a> fetchUUID

• **fetchUUID**: (`uuid`: [`MockedUUIDV4`](../README.md#mockeduuidv4)) => `string`

#### Type declaration

▸ (`uuid`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | [`MockedUUIDV4`](../README.md#mockeduuidv4) |

##### Returns

`string`

#### Defined in

[packages/formula/src/tests/testType.ts:226](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L226)

___

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• `Readonly` **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

Omit.formulaContext

#### Defined in

[packages/formula/src/type/index.ts:402](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L402)

___

### <a id="interpretcontext" name="interpretcontext"></a> interpretContext

• `Readonly` **interpretContext**: [`InterpretContext`](InterpretContext.md)

#### Inherited from

Omit.interpretContext

#### Defined in

[packages/formula/src/type/index.ts:407](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L407)
