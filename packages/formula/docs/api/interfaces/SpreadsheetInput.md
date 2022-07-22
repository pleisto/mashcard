# Interface: SpreadsheetInput<ColumnCount, RowCount\>

## Type parameters

| Name          | Type             |
| :------------ | :--------------- |
| `ColumnCount` | extends `number` |
| `RowCount`    | extends `number` |

## Table of contents

### Properties

- [columns](SpreadsheetInput.md#columns)
- [getCell](SpreadsheetInput.md#getcell)
- [name](SpreadsheetInput.md#name)
- [rows](SpreadsheetInput.md#rows)
- [spreadsheetId](SpreadsheetInput.md#spreadsheetid)

## Properties

### <a id="columns" name="columns"></a> columns

• **columns**: `FixedLengthTuple`<[`ColumnInput`](ColumnInput.md)<`RowCount`\>, `ColumnCount`, []\>

#### Defined in

[packages/formula/src/tests/testType.ts:76](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L76)

---

### <a id="getcell" name="getcell"></a> getCell

• `Optional` **getCell**: (`__namedParameters`: { `columnId`: `string` ; `columnIndex`: `number` ; `rowId`: `string` ; `rowIndex`: `number` }) => [`Cell`](Cell.md)

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

[packages/formula/src/tests/testType.ts:78](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L78)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Defined in

[packages/formula/src/tests/testType.ts:75](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L75)

---

### <a id="rows" name="rows"></a> rows

• `Optional` **rows**: `FixedLengthTuple`<[`RowInput`](RowInput.md), `RowCount`, []\>

#### Defined in

[packages/formula/src/tests/testType.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L77)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• `Optional` **spreadsheetId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Defined in

[packages/formula/src/tests/testType.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L74)
