# Interface: BaseFormula

## Hierarchy

- `Required`<[`FormulaDefinition`](FormulaDefinition.md)\>

  ↳ **`BaseFormula`**

## Table of contents

### Properties

- [blockId](BaseFormula.md#blockid)
- [cacheValue](BaseFormula.md#cachevalue)
- [definition](BaseFormula.md#definition)
- [id](BaseFormula.md#id)
- [meta](BaseFormula.md#meta)
- [name](BaseFormula.md#name)
- [type](BaseFormula.md#type)
- [version](BaseFormula.md#version)

## Properties

### <a id="blockid" name="blockid"></a> blockId

• **blockId**: `string`

#### Defined in

[packages/formula/src/type/index.ts:189](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L189)

---

### <a id="cachevalue" name="cachevalue"></a> cacheValue

• **cacheValue**: `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](ErrorMessage.md) ; `result`: [`ErrorMessage`](ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/type/index.ts:191](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L191)

---

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Inherited from

Required.definition

#### Defined in

[packages/formula/src/type/index.ts:184](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L184)

---

### <a id="id" name="id"></a> id

• **id**: `string`

#### Defined in

[packages/formula/src/type/index.ts:190](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L190)

---

### <a id="meta" name="meta"></a> meta

• **meta**: `object`

#### Inherited from

Required.meta

#### Defined in

[packages/formula/src/type/index.ts:185](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L185)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

Required.name

#### Defined in

[packages/formula/src/type/index.ts:186](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L186)

---

### <a id="type" name="type"></a> type

• **type**: `string`

#### Defined in

[packages/formula/src/type/index.ts:193](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L193)

---

### <a id="version" name="version"></a> version

• **version**: `number`

#### Defined in

[packages/formula/src/type/index.ts:192](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L192)
