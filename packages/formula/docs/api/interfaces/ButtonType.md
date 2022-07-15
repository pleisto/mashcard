# Interface: ButtonType

## Hierarchy

- [`ControlType`](ControlType.md)

  ↳ **`ButtonType`**

## Implemented by

- [`ButtonClass`](../classes/ButtonClass.md)

## Table of contents

### Properties

- [\_formulaContext](ButtonType.md#_formulacontext)
- [\_meta](ButtonType.md#_meta)
- [disabled](ButtonType.md#disabled)
- [fn](ButtonType.md#fn)
- [kind](ButtonType.md#kind)
- [name](ButtonType.md#name)
- [onClick](ButtonType.md#onclick)
- [persistence](ButtonType.md#persistence)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

[ControlType](ControlType.md).[\_formulaContext](ControlType.md#_formulacontext)

#### Defined in

[packages/formula/src/controls/types.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L25)

---

### <a id="_meta" name="_meta"></a> \_meta

• **\_meta**: [`VariableMetadata`](VariableMetadata.md)

#### Inherited from

[ControlType](ControlType.md).[\_meta](ControlType.md#_meta)

#### Defined in

[packages/formula/src/controls/types.ts:26](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L26)

---

### <a id="disabled" name="disabled"></a> disabled

• **disabled**: `boolean`

#### Inherited from

[ControlType](ControlType.md).[disabled](ControlType.md#disabled)

#### Defined in

[packages/formula/src/controls/types.ts:28](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L28)

---

### <a id="fn" name="fn"></a> fn

• **fn**: `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/controls/types.ts:36](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L36)

---

### <a id="kind" name="kind"></a> kind

• **kind**: `"Button"`

#### Overrides

[ControlType](ControlType.md).[kind](ControlType.md#kind)

#### Defined in

[packages/formula/src/controls/types.ts:34](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L34)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:35](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L35)

---

### <a id="onclick" name="onclick"></a> onClick

• `Optional` **onClick**: `VoidFunction`

#### Defined in

[packages/formula/src/controls/types.ts:37](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L37)

---

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
