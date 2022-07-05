# Interface: ControlType

## Hierarchy

- **`ControlType`**

  ↳ [`ButtonType`](ButtonType.md)

  ↳ [`SwitchType`](SwitchType.md)

## Table of contents

### Properties

- [\_formulaContext](ControlType.md#_formulacontext)
- [\_meta](ControlType.md#_meta)
- [disabled](ControlType.md#disabled)
- [kind](ControlType.md#kind)
- [persistence](ControlType.md#persistence)

## Properties

### <a id="_formulacontext" name="_formulacontext"></a> \_formulaContext

• **\_formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Defined in

[packages/formula/src/controls/types.ts:27](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L27)

---

### <a id="_meta" name="_meta"></a> \_meta

• **\_meta**: [`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/controls/types.ts:28](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L28)

---

### <a id="disabled" name="disabled"></a> disabled

• **disabled**: `boolean`

#### Defined in

[packages/formula/src/controls/types.ts:30](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L30)

---

### <a id="kind" name="kind"></a> kind

• **kind**: `"Button"` \| `"Switch"`

#### Defined in

[packages/formula/src/controls/types.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L29)

---

### <a id="persistence" name="persistence"></a> persistence

• **persistence**: () => [`ControlInitializer`](ControlInitializer.md)

#### Type declaration

▸ (): [`ControlInitializer`](ControlInitializer.md)

##### Returns

[`ControlInitializer`](ControlInitializer.md)

#### Defined in

[packages/formula/src/controls/types.ts:31](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L31)
