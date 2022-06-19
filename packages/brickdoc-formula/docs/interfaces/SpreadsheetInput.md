# Interface: SpreadsheetInput<ColumnCount, RowCount\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `ColumnCount` | extends `number` |
| `RowCount` | extends `number` |

## Table of contents

### Properties

- [columns](SpreadsheetInput.md#columns)
- [name](SpreadsheetInput.md#name)
- [rows](SpreadsheetInput.md#rows)
- [spreadsheetId](SpreadsheetInput.md#spreadsheetid)

## Properties

### <a id="columns" name="columns"></a> columns

• **columns**: `FixedLengthTuple`<[`ColumnInput`](ColumnInput.md)<`RowCount`\>, `ColumnCount`, []\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:70](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L70)

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:69](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L69)

___

### <a id="rows" name="rows"></a> rows

• `Optional` **rows**: `FixedLengthTuple`<[`RowInput`](RowInput.md), `RowCount`, []\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:71](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L71)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> spreadsheetId

• `Optional` **spreadsheetId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:68](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L68)
