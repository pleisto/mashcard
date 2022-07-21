# Interface: VariableDisplayData

## Table of contents

### Properties

- [definition](VariableDisplayData.md#definition)
- [result](VariableDisplayData.md#result)
- [type](VariableDisplayData.md#type)

## Properties

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Defined in

[packages/formula/src/type/index.ts:649](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L649)

---

### <a id="result" name="result"></a> result

• **result**: `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](ErrorMessage.md) ; `result`: [`ErrorMessage`](ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/type/index.ts:650](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L650)

---

### <a id="type" name="type"></a> type

• **type**: [`FormulaSourceType`](../README.md#formulasourcetype)

#### Defined in

[packages/formula/src/type/index.ts:651](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L651)
