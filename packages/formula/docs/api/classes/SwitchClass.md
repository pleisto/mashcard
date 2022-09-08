# Class: SwitchClass

## Implements

- [`SwitchType`](../interfaces/SwitchType.md)

## Table of contents

### Constructors

- [constructor](SwitchClass.md#constructor)

### Properties

- [\_formulaContext](SwitchClass.md#_formulacontext)
- [\_meta](SwitchClass.md#_meta)
- [checked](SwitchClass.md#checked)
- [disabled](SwitchClass.md#disabled)
- [fn](SwitchClass.md#fn)
- [kind](SwitchClass.md#kind)
- [onChange](SwitchClass.md#onchange)

### Methods

- [persistence](SwitchClass.md#persistence)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SwitchClass**(`ctx`, `__namedParameters`)

#### Parameters

| Name                | Type                                                      |
| :------------------ | :-------------------------------------------------------- |
| `ctx`               | [`FunctionContext`](../interfaces/FunctionContext.md)     |
| `__namedParameters` | [`SwitchInitializer`](../interfaces/SwitchInitializer.md) |

#### Defined in

[packages/formula/src/controls/switch.ts:14](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L14)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](../interfaces/ContextInterface.md)

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[\_formulaContext](../interfaces/SwitchType.md#_formulacontext)

#### Defined in

[packages/formula/src/controls/switch.ts:7](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L7)

---

### <a id="_meta" name="_meta"></a> \_meta

• **\_meta**: [`VariableMetadata`](../interfaces/VariableMetadata.md)

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[\_meta](../interfaces/SwitchType.md#_meta)

#### Defined in

[packages/formula/src/controls/switch.ts:8](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L8)

---

### <a id="checked" name="checked"></a> checked

• **checked**: `boolean`

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[checked](../interfaces/SwitchType.md#checked)

#### Defined in

[packages/formula/src/controls/switch.ts:6](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L6)

---

### <a id="disabled" name="disabled"></a> disabled

• **disabled**: `boolean`

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[disabled](../interfaces/SwitchType.md#disabled)

#### Defined in

[packages/formula/src/controls/switch.ts:11](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L11)

---

### <a id="fn" name="fn"></a> fn

• **fn**: `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[fn](../interfaces/SwitchType.md#fn)

#### Defined in

[packages/formula/src/controls/switch.ts:10](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L10)

---

### <a id="kind" name="kind"></a> kind

• **kind**: `"Switch"`

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[kind](../interfaces/SwitchType.md#kind)

#### Defined in

[packages/formula/src/controls/switch.ts:9](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L9)

---

### <a id="onchange" name="onchange"></a> onChange

• `Optional` **onChange**: (`bool`: `boolean`) => `void`

#### Type declaration

▸ (`bool`): `void`

##### Parameters

| Name   | Type      |
| :----- | :-------- |
| `bool` | `boolean` |

##### Returns

`void`

#### Implementation of

[SwitchType](../interfaces/SwitchType.md).[onChange](../interfaces/SwitchType.md#onchange)

#### Defined in

[packages/formula/src/controls/switch.ts:12](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L12)

## Methods

### <a id="persistence" name="persistence"></a> persistence

▸ **persistence**(): [`SwitchInitializer`](../interfaces/SwitchInitializer.md)

#### Returns

[`SwitchInitializer`](../interfaces/SwitchInitializer.md)

#### Implementation of

SwitchType.persistence

#### Defined in

[packages/formula/src/controls/switch.ts:33](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/switch.ts#L33)
