# Interface: SwitchType

## Hierarchy

- [`ControlType`](ControlType.md)

  ↳ **`SwitchType`**

## Implemented by

- [`SwitchClass`](../classes/SwitchClass.md)

## Table of contents

### Properties

- [\_formulaContext](SwitchType.md#_formulacontext)
- [\_meta](SwitchType.md#_meta)
- [checked](SwitchType.md#checked)
- [disabled](SwitchType.md#disabled)
- [fn](SwitchType.md#fn)
- [kind](SwitchType.md#kind)
- [onChange](SwitchType.md#onchange)
- [persistence](SwitchType.md#persistence)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

[ControlType](ControlType.md).[_formulaContext](ControlType.md#_formulacontext)

#### Defined in

[packages/formula/src/controls/types.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L25)

___

### <a id="_meta" name="_meta"></a> \_meta

• **\_meta**: [`VariableMetadata`](VariableMetadata.md)

#### Inherited from

[ControlType](ControlType.md).[_meta](ControlType.md#_meta)

#### Defined in

[packages/formula/src/controls/types.ts:26](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L26)

___

### <a id="checked" name="checked"></a> checked

• **checked**: `boolean`

#### Defined in

[packages/formula/src/controls/types.ts:225](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L225)

___

### <a id="disabled" name="disabled"></a> disabled

• **disabled**: `boolean`

#### Inherited from

[ControlType](ControlType.md).[disabled](ControlType.md#disabled)

#### Defined in

[packages/formula/src/controls/types.ts:28](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L28)

___

### <a id="fn" name="fn"></a> fn

• **fn**: `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\>

#### Defined in

[packages/formula/src/controls/types.ts:226](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L226)

___

### <a id="kind" name="kind"></a> kind

• **kind**: ``"Switch"``

#### Overrides

[ControlType](ControlType.md).[kind](ControlType.md#kind)

#### Defined in

[packages/formula/src/controls/types.ts:224](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L224)

___

### <a id="onchange" name="onchange"></a> onChange

• `Optional` **onChange**: (`bool`: `boolean`) => `void`

#### Type declaration

▸ (`bool`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `bool` | `boolean` |

##### Returns

`void`

#### Defined in

[packages/formula/src/controls/types.ts:227](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L227)

___

### <a id="persistence" name="persistence"></a> persistence

• **persistence**: () => [`ControlInitializer`](ControlInitializer.md)

#### Type declaration

▸ (): [`ControlInitializer`](ControlInitializer.md)

##### Returns

[`ControlInitializer`](ControlInitializer.md)

#### Inherited from

[ControlType](ControlType.md).[persistence](ControlType.md#persistence)

#### Defined in

[packages/formula/src/controls/types.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L29)
