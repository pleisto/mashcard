# Interface: ContextInterface

## Implemented by

- [`FormulaContext`](../classes/FormulaContext.md)

## Table of contents

### Properties

- [backendActions](ContextInterface.md#backendactions)
- [cleanup](ContextInterface.md#cleanup)
- [commitVariable](ContextInterface.md#commitvariable)
- [completions](ContextInterface.md#completions)
- [dirtyFormulas](ContextInterface.md#dirtyformulas)
- [domain](ContextInterface.md#domain)
- [features](ContextInterface.md#features)
- [findBlockById](ContextInterface.md#findblockbyid)
- [findColumn](ContextInterface.md#findcolumn)
- [findFunctionClause](ContextInterface.md#findfunctionclause)
- [findNames](ContextInterface.md#findnames)
- [findReference](ContextInterface.md#findreference)
- [findRow](ContextInterface.md#findrow)
- [findSpreadsheet](ContextInterface.md#findspreadsheet)
- [findVariableById](ContextInterface.md#findvariablebyid)
- [findVariableByName](ContextInterface.md#findvariablebyname)
- [findVariableDisplayDataById](ContextInterface.md#findvariabledisplaydatabyid)
- [findViewRender](ContextInterface.md#findviewrender)
- [getDefaultVariableName](ContextInterface.md#getdefaultvariablename)
- [invoke](ContextInterface.md#invoke)
- [listVariables](ContextInterface.md#listvariables)
- [removeBlock](ContextInterface.md#removeblock)
- [removeName](ContextInterface.md#removename)
- [removeSpreadsheet](ContextInterface.md#removespreadsheet)
- [removeVariable](ContextInterface.md#removevariable)
- [reservedNames](ContextInterface.md#reservednames)
- [resetFormula](ContextInterface.md#resetformula)
- [reverseFunctionDependencies](ContextInterface.md#reversefunctiondependencies)
- [reverseVariableDependencies](ContextInterface.md#reversevariabledependencies)
- [setName](ContextInterface.md#setname)
- [setSpreadsheet](ContextInterface.md#setspreadsheet)
- [variableCount](ContextInterface.md#variablecount)

## Properties

### <a id="backendactions" name="backendactions"></a> backendActions

• **backendActions**: `undefined` \| [`BackendActions`](BackendActions.md)

#### Defined in

[packages/formula/src/type/index.ts:368](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L368)

___

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: `VoidFunction`

#### Defined in

[packages/formula/src/type/index.ts:392](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L392)

___

### <a id="commitvariable" name="commitvariable"></a> commitVariable

• **commitVariable**: (`__namedParameters`: { `variable`: [`VariableInterface`](VariableInterface.md)  }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.variable` | [`VariableInterface`](VariableInterface.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:388](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L388)

___

### <a id="completions" name="completions"></a> completions

• **completions**: (`namespaceId`: `string`, `variableId`: `undefined` \| `string`) => [`Completion`](../README.md#completion)[]

#### Type declaration

▸ (`namespaceId`, `variableId`): [`Completion`](../README.md#completion)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `undefined` \| `string` |

##### Returns

[`Completion`](../README.md#completion)[]

#### Defined in

[packages/formula/src/type/index.ts:371](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L371)

___

### <a id="dirtyformulas" name="dirtyformulas"></a> dirtyFormulas

• **dirtyFormulas**: `Record`<\`#${string}.${string}\`, [`DirtyFormulaInfo`](DirtyFormulaInfo.md)\>

#### Defined in

[packages/formula/src/type/index.ts:363](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L363)

___

### <a id="domain" name="domain"></a> domain

• **domain**: `string`

#### Defined in

[packages/formula/src/type/index.ts:361](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L361)

___

### <a id="features" name="features"></a> features

• **features**: `string`[]

#### Defined in

[packages/formula/src/type/index.ts:362](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L362)

___

### <a id="findblockbyid" name="findblockbyid"></a> findBlockById

• **findBlockById**: (`blockId`: `string`) => `undefined` \| [`BlockType`](BlockType.md)

#### Type declaration

▸ (`blockId`): `undefined` \| [`BlockType`](BlockType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `string` |

##### Returns

`undefined` \| [`BlockType`](BlockType.md)

#### Defined in

[packages/formula/src/type/index.ts:373](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L373)

___

### <a id="findcolumn" name="findcolumn"></a> findColumn

• **findColumn**: (`spreadsheetId`: `string`, `key`: [`FindKey`](FindKey.md)) => `undefined` \| [`ColumnType`](ColumnType.md)

#### Type declaration

▸ (`spreadsheetId`, `key`): `undefined` \| [`ColumnType`](ColumnType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |
| `key` | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`ColumnType`](ColumnType.md)

#### Defined in

[packages/formula/src/type/index.ts:379](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L379)

___

### <a id="findfunctionclause" name="findfunctionclause"></a> findFunctionClause

• **findFunctionClause**: (`group`: `string`, `name`: `string`) => `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Type declaration

▸ (`group`, `name`): `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

##### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `string` |
| `name` | `string` |

##### Returns

`undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Defined in

[packages/formula/src/type/index.ts:390](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L390)

___

### <a id="findnames" name="findnames"></a> findNames

• **findNames**: (`namespaceId`: `string`, `name`: `string`) => [`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Type declaration

▸ (`namespaceId`, `name`): [`NameDependencyWithKind`](NameDependencyWithKind.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `name` | `string` |

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Defined in

[packages/formula/src/type/index.ts:377](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L377)

___

### <a id="findreference" name="findreference"></a> findReference

• **findReference**: (`namespaceId`: `string`, `variableId`: `string`) => [`VariableDependency`](VariableDependency.md)[]

#### Type declaration

▸ (`namespaceId`, `variableId`): [`VariableDependency`](VariableDependency.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

##### Returns

[`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:381](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L381)

___

### <a id="findrow" name="findrow"></a> findRow

• **findRow**: (`spreadsheetId`: `string`, `key`: [`FindKey`](FindKey.md)) => `undefined` \| [`RowType`](RowType.md)

#### Type declaration

▸ (`spreadsheetId`, `key`): `undefined` \| [`RowType`](RowType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |
| `key` | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`RowType`](RowType.md)

#### Defined in

[packages/formula/src/type/index.ts:380](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L380)

___

### <a id="findspreadsheet" name="findspreadsheet"></a> findSpreadsheet

• **findSpreadsheet**: (`key`: [`FindKey`](FindKey.md)) => `undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Type declaration

▸ (`key`): `undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/formula/src/type/index.ts:378](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L378)

___

### <a id="findvariablebyid" name="findvariablebyid"></a> findVariableById

• **findVariableById**: (`namespaceId`: `string`, `variableId`: `string`) => `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Type declaration

▸ (`namespaceId`, `variableId`): `undefined` \| [`VariableInterface`](VariableInterface.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

##### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/type/index.ts:385](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L385)

___

### <a id="findvariablebyname" name="findvariablebyname"></a> findVariableByName

• **findVariableByName**: (`namespaceId`: `string`, `name`: `string`) => `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Type declaration

▸ (`namespaceId`, `name`): `undefined` \| [`VariableInterface`](VariableInterface.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `name` | `string` |

##### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/type/index.ts:387](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L387)

___

### <a id="findvariabledisplaydatabyid" name="findvariabledisplaydatabyid"></a> findVariableDisplayDataById

• **findVariableDisplayDataById**: (`namespaceId`: `string`, `variableId`: `string`) => `undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Type declaration

▸ (`namespaceId`, `variableId`): `undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

##### Returns

`undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Defined in

[packages/formula/src/type/index.ts:386](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L386)

___

### <a id="findviewrender" name="findviewrender"></a> findViewRender

• **findViewRender**: (`viewType`: `string`) => `undefined` \| [`ViewRender`](../README.md#viewrender)

#### Type declaration

▸ (`viewType`): `undefined` \| [`ViewRender`](../README.md#viewrender)

##### Parameters

| Name | Type |
| :------ | :------ |
| `viewType` | `string` |

##### Returns

`undefined` \| [`ViewRender`](../README.md#viewrender)

#### Defined in

[packages/formula/src/type/index.ts:372](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L372)

___

### <a id="getdefaultvariablename" name="getdefaultvariablename"></a> getDefaultVariableName

• **getDefaultVariableName**: (`namespaceId`: `string`, `type`: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``) => \`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`column${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Type declaration

▸ (`namespaceId`, `type`): \`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`column${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `type` | ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"`` |

##### Returns

\`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`column${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Defined in

[packages/formula/src/type/index.ts:370](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L370)

___

### <a id="invoke" name="invoke"></a> invoke

• **invoke**: (`name`: `string`, `ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `any`[]) => `Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"#N/A"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Type declaration

▸ (`name`, `ctx`, ...`args`): `Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"#N/A"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `ctx` | [`FunctionContext`](FunctionContext.md) |
| `...args` | `any`[] |

##### Returns

`Promise`<`Omit`<`FormulaRecordType`, ``"dump"``\> \| `Omit`<`FormulaErrorType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"string"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: ``"number"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: ``"boolean"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"null"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: ``"Block"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: ``"Date"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``"#N/A"`` ; `result`: ``"Blank"`` ; `type`: ``"Blank"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaArrayType`, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: ``"Spreadsheet"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: ``"Row"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: ``"Cell"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: ``"Column"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: ``"Range"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: ``"Cst"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: ``"Reference"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: ``"Function"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<`FormulaPredicateType`, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: ``"Button"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: ``"Switch"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"literal"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Pending"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: ``"Waiting"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\> \| `Omit`<{ `dump`: ``null`` ; `result`: ``null`` ; `type`: ``"NoPersist"`` ; `view?`: [`ViewData`](ViewData.md)<`string`\>  }, ``"dump"``\>\>

#### Defined in

[packages/formula/src/type/index.ts:367](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L367)

___

### <a id="listvariables" name="listvariables"></a> listVariables

• **listVariables**: (`namespaceId`: `string`) => [`VariableInterface`](VariableInterface.md)[]

#### Type declaration

▸ (`namespaceId`): [`VariableInterface`](VariableInterface.md)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |

##### Returns

[`VariableInterface`](VariableInterface.md)[]

#### Defined in

[packages/formula/src/type/index.ts:384](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L384)

___

### <a id="removeblock" name="removeblock"></a> removeBlock

• **removeBlock**: (`blockId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`blockId`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:374](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L374)

___

### <a id="removename" name="removename"></a> removeName

• **removeName**: (`id`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`id`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:376](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L376)

___

### <a id="removespreadsheet" name="removespreadsheet"></a> removeSpreadsheet

• **removeSpreadsheet**: (`spreadsheetId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`spreadsheetId`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:383](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L383)

___

### <a id="removevariable" name="removevariable"></a> removeVariable

• **removeVariable**: (`namespaceId`: `string`, `variableId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`namespaceId`, `variableId`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:389](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L389)

___

### <a id="reservednames" name="reservednames"></a> reservedNames

• **reservedNames**: `string`[]

#### Defined in

[packages/formula/src/type/index.ts:364](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L364)

___

### <a id="resetformula" name="resetformula"></a> resetFormula

• **resetFormula**: `VoidFunction`

#### Defined in

[packages/formula/src/type/index.ts:391](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L391)

___

### <a id="reversefunctiondependencies" name="reversefunctiondependencies"></a> reverseFunctionDependencies

• **reverseFunctionDependencies**: `Record`<`string`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/type/index.ts:366](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L366)

___

### <a id="reversevariabledependencies" name="reversevariabledependencies"></a> reverseVariableDependencies

• **reverseVariableDependencies**: `Record`<\`#${string}.${string}\`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/type/index.ts:365](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L365)

___

### <a id="setname" name="setname"></a> setName

• **setName**: (`nameDependency`: [`NameDependencyWithKind`](NameDependencyWithKind.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`nameDependency`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `nameDependency` | [`NameDependencyWithKind`](NameDependencyWithKind.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:375](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L375)

___

### <a id="setspreadsheet" name="setspreadsheet"></a> setSpreadsheet

• **setSpreadsheet**: (`spreadsheet`: [`SpreadsheetType`](SpreadsheetType.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`spreadsheet`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](SpreadsheetType.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/type/index.ts:382](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L382)

___

### <a id="variablecount" name="variablecount"></a> variableCount

• **variableCount**: () => `number`

#### Type declaration

▸ (): `number`

##### Returns

`number`

#### Defined in

[packages/formula/src/type/index.ts:369](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L369)
