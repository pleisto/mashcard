# Interface: SpreadsheetInitializer

## Table of contents

### Properties

- [columns](SpreadsheetInitializer.md#columns)
- [ctx](SpreadsheetInitializer.md#ctx)
- [dynamic](SpreadsheetInitializer.md#dynamic)
- [getCell](SpreadsheetInitializer.md#getcell)
- [name](SpreadsheetInitializer.md#name)
- [namespaceId](SpreadsheetInitializer.md#namespaceid)
- [rows](SpreadsheetInitializer.md#rows)
- [spreadsheetId](SpreadsheetInitializer.md#spreadsheetid)

## Properties

### <a id="columns" name="columns"></a> columns

• **columns**: [`Column`](Column.md)[]

#### Defined in

[packages/formula/src/controls/types.ts:160](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L160)

---

### <a id="ctx" name="ctx"></a> ctx

• **ctx**: [`BaseFunctionContext`](BaseFunctionContext.md)

#### Defined in

[packages/formula/src/controls/types.ts:157](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L157)

---

### <a id="dynamic" name="dynamic"></a> dynamic

• **dynamic**: `boolean`

#### Defined in

[packages/formula/src/controls/types.ts:158](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L158)

---

### <a id="getcell" name="getcell"></a> getCell

• **getCell**: (`__namedParameters`: { `columnId`: `string` ; `columnIndex`: `number` ; `rowId`: `string` ; `rowIndex`: `number` }) => [`Cell`](Cell.md)

#### Type declaration

▸ (`__namedParameters`): [`Cell`](Cell.md)

##### Parameters

| Name                            | Type     |
| :------------------------------ | :------- |
| `__namedParameters`             | `Object` |
| `__namedParameters.columnId`    | `string` |
| `__namedParameters.columnIndex` | `number` |
| `__namedParameters.rowId`       | `string` |
| `__namedParameters.rowIndex`    | `number` |

##### Returns

[`Cell`](Cell.md)

#### Defined in

[packages/formula/src/controls/types.ts:162](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L162)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:159](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L159)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:156](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L156)

---

### <a id="rows" name="rows"></a> rows

• **rows**: [`Row`](Row.md)[]

#### Defined in

[packages/formula/src/controls/types.ts:161](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L161)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• **spreadsheetId**: `string`

#### Defined in

[packages/formula/src/controls/types.ts:155](https://github.com/mashpod/mashcard/blob/main/packages/formula/src/controls/types.ts#L155)
