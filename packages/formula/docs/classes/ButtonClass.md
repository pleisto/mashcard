# Class: ButtonClass

## Implements

- [`ButtonType`](../interfaces/ButtonType.md)

## Table of contents

### Constructors

- [constructor](ButtonClass.md#constructor)

### Properties

- [\_formulaContext](ButtonClass.md#_formulacontext)
- [\_meta](ButtonClass.md#_meta)
- [disabled](ButtonClass.md#disabled)
- [fn](ButtonClass.md#fn)
- [kind](ButtonClass.md#kind)
- [name](ButtonClass.md#name)
- [onClick](ButtonClass.md#onclick)

### Methods

- [persistence](ButtonClass.md#persistence)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ButtonClass**(`ctx`, `__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](../interfaces/FunctionContext.md) |
| `__namedParameters` | [`ButtonInitializer`](../interfaces/ButtonInitializer.md) |

#### Defined in

[packages/formula/src/controls/button.ts:14](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L14)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[_formulaContext](../interfaces/ButtonType.md#_formulacontext)

#### Defined in

[packages/formula/src/controls/button.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L7)

___

### <a id="_meta" name="_meta"></a> \_meta

• **\_meta**: [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[_meta](../interfaces/ButtonType.md#_meta)

#### Defined in

[packages/formula/src/controls/button.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L8)

___

### <a id="disabled" name="disabled"></a> disabled

• **disabled**: `boolean`

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[disabled](../interfaces/ButtonType.md#disabled)

#### Defined in

[packages/formula/src/controls/button.ts:11](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L11)

___

### <a id="fn" name="fn"></a> fn

• **fn**: [`FunctionResult`](../interfaces/FunctionResult.md)

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[fn](../interfaces/ButtonType.md#fn)

#### Defined in

[packages/formula/src/controls/button.ts:10](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L10)

___

### <a id="kind" name="kind"></a> kind

• **kind**: ``"Button"``

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[kind](../interfaces/ButtonType.md#kind)

#### Defined in

[packages/formula/src/controls/button.ts:9](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L9)

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[name](../interfaces/ButtonType.md#name)

#### Defined in

[packages/formula/src/controls/button.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L6)

___

### <a id="onclick" name="onclick"></a> onClick

• `Optional` **onClick**: `VoidFunction`

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[onClick](../interfaces/ButtonType.md#onclick)

#### Defined in

[packages/formula/src/controls/button.ts:12](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L12)

## Methods

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`ButtonInitializer`](../interfaces/ButtonInitializer.md)

#### Returns

[`ButtonInitializer`](../interfaces/ButtonInitializer.md)

#### Implementation of

[ButtonType](../interfaces/ButtonType.md).[persistence](../interfaces/ButtonType.md#persistence)

#### Defined in

[packages/formula/src/controls/button.ts:23](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/button.ts#L23)
