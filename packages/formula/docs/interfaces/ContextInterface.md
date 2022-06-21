# Interface: ContextInterface

## Implemented by

- [`FormulaContext`](../classes/FormulaContext.md)

## Table of contents

### Properties

- [backendActions](ContextInterface.md#backendactions)
- [cleanup](ContextInterface.md#cleanup)
- [dirtyFormulas](ContextInterface.md#dirtyformulas)
- [domain](ContextInterface.md#domain)
- [features](ContextInterface.md#features)
- [reservedNames](ContextInterface.md#reservednames)
- [resetFormula](ContextInterface.md#resetformula)
- [reverseFunctionDependencies](ContextInterface.md#reversefunctiondependencies)
- [reverseVariableDependencies](ContextInterface.md#reversevariabledependencies)

### Methods

- [commitVariable](ContextInterface.md#commitvariable)
- [completions](ContextInterface.md#completions)
- [findBlockById](ContextInterface.md#findblockbyid)
- [findColumn](ContextInterface.md#findcolumn)
- [findFunctionClause](ContextInterface.md#findfunctionclause)
- [findNames](ContextInterface.md#findnames)
- [findRow](ContextInterface.md#findrow)
- [findSpreadsheet](ContextInterface.md#findspreadsheet)
- [findVariableById](ContextInterface.md#findvariablebyid)
- [findVariableByName](ContextInterface.md#findvariablebyname)
- [findViewRender](ContextInterface.md#findviewrender)
- [getDefaultVariableName](ContextInterface.md#getdefaultvariablename)
- [invoke](ContextInterface.md#invoke)
- [listVariables](ContextInterface.md#listvariables)
- [removeBlock](ContextInterface.md#removeblock)
- [removeName](ContextInterface.md#removename)
- [removeSpreadsheet](ContextInterface.md#removespreadsheet)
- [removeVariable](ContextInterface.md#removevariable)
- [setName](ContextInterface.md#setname)
- [setSpreadsheet](ContextInterface.md#setspreadsheet)
- [variableCount](ContextInterface.md#variablecount)

## Properties

### <a id="backendactions" name="backendactions"></a> backendActions

• **backendActions**: `undefined` \| [`BackendActions`](BackendActions.md)

#### Defined in

[packages/formula/src/types/index.ts:509](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L509)

___

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:531](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L531)

___

### <a id="dirtyformulas" name="dirtyformulas"></a> dirtyFormulas

• **dirtyFormulas**: `Record`<\`#${string}.${string}\`, [`DirtyFormulaInfo`](DirtyFormulaInfo.md)\>

#### Defined in

[packages/formula/src/types/index.ts:504](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L504)

___

### <a id="domain" name="domain"></a> domain

• **domain**: `string`

#### Defined in

[packages/formula/src/types/index.ts:502](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L502)

___

### <a id="features" name="features"></a> features

• **features**: `string`[]

#### Defined in

[packages/formula/src/types/index.ts:503](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L503)

___

### <a id="reservednames" name="reservednames"></a> reservedNames

• **reservedNames**: `string`[]

#### Defined in

[packages/formula/src/types/index.ts:505](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L505)

___

### <a id="resetformula" name="resetformula"></a> resetFormula

• **resetFormula**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:530](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L530)

___

### <a id="reversefunctiondependencies" name="reversefunctiondependencies"></a> reverseFunctionDependencies

• **reverseFunctionDependencies**: `Record`<`string`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/types/index.ts:507](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L507)

___

### <a id="reversevariabledependencies" name="reversevariabledependencies"></a> reverseVariableDependencies

• **reverseVariableDependencies**: `Record`<\`#${string}.${string}\`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/types/index.ts:506](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L506)

## Methods

### <a id="commitvariable" name="commitvariable"></a> commitVariable

▸ **commitVariable**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.variable` | [`VariableInterface`](VariableInterface.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:527](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L527)

___

### <a id="completions" name="completions"></a> completions

▸ **completions**(`namespaceId`, `variableId`): [`Completion`](../README.md#completion)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `undefined` \| `string` |

#### Returns

[`Completion`](../README.md#completion)[]

#### Defined in

[packages/formula/src/types/index.ts:512](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L512)

___

### <a id="findblockbyid" name="findblockbyid"></a> findBlockById

▸ **findBlockById**(`blockId`): `undefined` \| [`BlockType`](BlockType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `string` |

#### Returns

`undefined` \| [`BlockType`](BlockType.md)

#### Defined in

[packages/formula/src/types/index.ts:514](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L514)

___

### <a id="findcolumn" name="findcolumn"></a> findColumn

▸ **findColumn**(`spreadsheetId`, `key`): `undefined` \| [`ColumnType`](ColumnType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |
| `key` | [`FindKey`](FindKey.md) |

#### Returns

`undefined` \| [`ColumnType`](ColumnType.md)

#### Defined in

[packages/formula/src/types/index.ts:520](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L520)

___

### <a id="findfunctionclause" name="findfunctionclause"></a> findFunctionClause

▸ **findFunctionClause**(`group`, `name`): `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `string` |
| `name` | `string` |

#### Returns

`undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Defined in

[packages/formula/src/types/index.ts:529](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L529)

___

### <a id="findnames" name="findnames"></a> findNames

▸ **findNames**(`namespaceId`, `name`): [`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `name` | `string` |

#### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Defined in

[packages/formula/src/types/index.ts:518](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L518)

___

### <a id="findrow" name="findrow"></a> findRow

▸ **findRow**(`spreadsheetId`, `key`): `undefined` \| [`RowType`](RowType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |
| `key` | [`FindKey`](FindKey.md) |

#### Returns

`undefined` \| [`RowType`](RowType.md)

#### Defined in

[packages/formula/src/types/index.ts:521](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L521)

___

### <a id="findspreadsheet" name="findspreadsheet"></a> findSpreadsheet

▸ **findSpreadsheet**(`key`): `undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`FindKey`](FindKey.md) |

#### Returns

`undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/formula/src/types/index.ts:519](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L519)

___

### <a id="findvariablebyid" name="findvariablebyid"></a> findVariableById

▸ **findVariableById**(`namespaceId`, `variableId`): `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

#### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:525](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L525)

___

### <a id="findvariablebyname" name="findvariablebyname"></a> findVariableByName

▸ **findVariableByName**(`namespaceId`, `name`): `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `name` | `string` |

#### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:526](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L526)

___

### <a id="findviewrender" name="findviewrender"></a> findViewRender

▸ **findViewRender**(`viewType`): `undefined` \| [`ViewRender`](../README.md#viewrender)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewType` | `string` |

#### Returns

`undefined` \| [`ViewRender`](../README.md#viewrender)

#### Defined in

[packages/formula/src/types/index.ts:513](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L513)

___

### <a id="getdefaultvariablename" name="getdefaultvariablename"></a> getDefaultVariableName

▸ **getDefaultVariableName**(`namespaceId`, `type`): \`function${number}\` \| \`block${number}\` \| \`null${number}\` \| \`void${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`cst${number}\` \| \`record${number}\` \| \`array${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`column${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`range${number}\` \| \`var${number}\` \| \`error${number}\` \| \`predicate${number}\` \| \`spreadsheet${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`input${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `type` | ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"Block"`` \| ``"null"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"`` |

#### Returns

\`function${number}\` \| \`block${number}\` \| \`null${number}\` \| \`void${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`cst${number}\` \| \`record${number}\` \| \`array${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`column${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`range${number}\` \| \`var${number}\` \| \`error${number}\` \| \`predicate${number}\` \| \`spreadsheet${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`input${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Defined in

[packages/formula/src/types/index.ts:511](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L511)

___

### <a id="invoke" name="invoke"></a> invoke

▸ **invoke**(`name`, `ctx`, ...`args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `ctx` | [`FunctionContext`](FunctionContext.md) |
| `...args` | `any`[] |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/formula/src/types/index.ts:508](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L508)

___

### <a id="listvariables" name="listvariables"></a> listVariables

▸ **listVariables**(`namespaceId`): [`VariableInterface`](VariableInterface.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |

#### Returns

[`VariableInterface`](VariableInterface.md)[]

#### Defined in

[packages/formula/src/types/index.ts:524](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L524)

___

### <a id="removeblock" name="removeblock"></a> removeBlock

▸ **removeBlock**(`blockId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:515](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L515)

___

### <a id="removename" name="removename"></a> removeName

▸ **removeName**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:517](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L517)

___

### <a id="removespreadsheet" name="removespreadsheet"></a> removeSpreadsheet

▸ **removeSpreadsheet**(`spreadsheetId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheetId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:523](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L523)

___

### <a id="removevariable" name="removevariable"></a> removeVariable

▸ **removeVariable**(`namespaceId`, `variableId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:528](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L528)

___

### <a id="setname" name="setname"></a> setName

▸ **setName**(`nameDependency`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameDependency` | [`NameDependencyWithKind`](NameDependencyWithKind.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:516](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L516)

___

### <a id="setspreadsheet" name="setspreadsheet"></a> setSpreadsheet

▸ **setSpreadsheet**(`spreadsheet`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](SpreadsheetType.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:522](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L522)

___

### <a id="variablecount" name="variablecount"></a> variableCount

▸ **variableCount**(): `number`

#### Returns

`number`

#### Defined in

[packages/formula/src/types/index.ts:510](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L510)
