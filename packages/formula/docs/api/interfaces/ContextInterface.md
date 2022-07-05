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

[packages/formula/src/types/index.ts:533](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L533)

---

### <a id="cleanup" name="cleanup"></a> cleanup

• **cleanup**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:557](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L557)

---

### <a id="commitvariable" name="commitvariable"></a> commitVariable

• **commitVariable**: (`__namedParameters`: { `variable`: [`VariableInterface`](VariableInterface.md) }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

##### Parameters

| Name                         | Type                                        |
| :--------------------------- | :------------------------------------------ |
| `__namedParameters`          | `Object`                                    |
| `__namedParameters.variable` | [`VariableInterface`](VariableInterface.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:553](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L553)

---

### <a id="completions" name="completions"></a> completions

• **completions**: (`namespaceId`: `string`, `variableId`: `undefined` \| `string`) => [`Completion`](../README.md#completion)[]

#### Type declaration

▸ (`namespaceId`, `variableId`): [`Completion`](../README.md#completion)[]

##### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `namespaceId` | `string`                |
| `variableId`  | `undefined` \| `string` |

##### Returns

[`Completion`](../README.md#completion)[]

#### Defined in

[packages/formula/src/types/index.ts:536](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L536)

---

### <a id="dirtyformulas" name="dirtyformulas"></a> dirtyFormulas

• **dirtyFormulas**: `Record`<\`#${string}.${string}\`, [`DirtyFormulaInfo`](DirtyFormulaInfo.md)\>

#### Defined in

[packages/formula/src/types/index.ts:528](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L528)

---

### <a id="domain" name="domain"></a> domain

• **domain**: `string`

#### Defined in

[packages/formula/src/types/index.ts:526](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L526)

---

### <a id="features" name="features"></a> features

• **features**: `string`[]

#### Defined in

[packages/formula/src/types/index.ts:527](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L527)

---

### <a id="findblockbyid" name="findblockbyid"></a> findBlockById

• **findBlockById**: (`blockId`: `string`) => `undefined` \| [`BlockType`](BlockType.md)

#### Type declaration

▸ (`blockId`): `undefined` \| [`BlockType`](BlockType.md)

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `string` |

##### Returns

`undefined` \| [`BlockType`](BlockType.md)

#### Defined in

[packages/formula/src/types/index.ts:538](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L538)

---

### <a id="findcolumn" name="findcolumn"></a> findColumn

• **findColumn**: (`spreadsheetId`: `string`, `key`: [`FindKey`](FindKey.md)) => `undefined` \| [`ColumnType`](ColumnType.md)

#### Type declaration

▸ (`spreadsheetId`, `key`): `undefined` \| [`ColumnType`](ColumnType.md)

##### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `spreadsheetId` | `string`                |
| `key`           | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`ColumnType`](ColumnType.md)

#### Defined in

[packages/formula/src/types/index.ts:544](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L544)

---

### <a id="findfunctionclause" name="findfunctionclause"></a> findFunctionClause

• **findFunctionClause**: (`group`: `string`, `name`: `string`) => `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Type declaration

▸ (`group`, `name`): `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

##### Parameters

| Name    | Type     |
| :------ | :------- |
| `group` | `string` |
| `name`  | `string` |

##### Returns

`undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Defined in

[packages/formula/src/types/index.ts:555](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L555)

---

### <a id="findnames" name="findnames"></a> findNames

• **findNames**: (`namespaceId`: `string`, `name`: `string`) => [`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Type declaration

▸ (`namespaceId`, `name`): [`NameDependencyWithKind`](NameDependencyWithKind.md)[]

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `name`        | `string` |

##### Returns

[`NameDependencyWithKind`](NameDependencyWithKind.md)[]

#### Defined in

[packages/formula/src/types/index.ts:542](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L542)

---

### <a id="findreference" name="findreference"></a> findReference

• **findReference**: (`namespaceId`: `string`, `variableId`: `string`) => [`VariableDependency`](VariableDependency.md)[]

#### Type declaration

▸ (`namespaceId`, `variableId`): [`VariableDependency`](VariableDependency.md)[]

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

##### Returns

[`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/types/index.ts:546](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L546)

---

### <a id="findrow" name="findrow"></a> findRow

• **findRow**: (`spreadsheetId`: `string`, `key`: [`FindKey`](FindKey.md)) => `undefined` \| [`RowType`](RowType.md)

#### Type declaration

▸ (`spreadsheetId`, `key`): `undefined` \| [`RowType`](RowType.md)

##### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `spreadsheetId` | `string`                |
| `key`           | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`RowType`](RowType.md)

#### Defined in

[packages/formula/src/types/index.ts:545](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L545)

---

### <a id="findspreadsheet" name="findspreadsheet"></a> findSpreadsheet

• **findSpreadsheet**: (`key`: [`FindKey`](FindKey.md)) => `undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Type declaration

▸ (`key`): `undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

##### Parameters

| Name  | Type                    |
| :---- | :---------------------- |
| `key` | [`FindKey`](FindKey.md) |

##### Returns

`undefined` \| [`SpreadsheetType`](SpreadsheetType.md)

#### Defined in

[packages/formula/src/types/index.ts:543](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L543)

---

### <a id="findvariablebyid" name="findvariablebyid"></a> findVariableById

• **findVariableById**: (`namespaceId`: `string`, `variableId`: `string`) => `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Type declaration

▸ (`namespaceId`, `variableId`): `undefined` \| [`VariableInterface`](VariableInterface.md)

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

##### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:550](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L550)

---

### <a id="findvariablebyname" name="findvariablebyname"></a> findVariableByName

• **findVariableByName**: (`namespaceId`: `string`, `name`: `string`) => `undefined` \| [`VariableInterface`](VariableInterface.md)

#### Type declaration

▸ (`namespaceId`, `name`): `undefined` \| [`VariableInterface`](VariableInterface.md)

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `name`        | `string` |

##### Returns

`undefined` \| [`VariableInterface`](VariableInterface.md)

#### Defined in

[packages/formula/src/types/index.ts:552](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L552)

---

### <a id="findvariabledisplaydatabyid" name="findvariabledisplaydatabyid"></a> findVariableDisplayDataById

• **findVariableDisplayDataById**: (`namespaceId`: `string`, `variableId`: `string`) => `undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Type declaration

▸ (`namespaceId`, `variableId`): `undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

##### Returns

`undefined` \| [`VariableDisplayData`](VariableDisplayData.md)

#### Defined in

[packages/formula/src/types/index.ts:551](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L551)

---

### <a id="findviewrender" name="findviewrender"></a> findViewRender

• **findViewRender**: (`viewType`: `string`) => `undefined` \| [`ViewRender`](../README.md#viewrender)

#### Type declaration

▸ (`viewType`): `undefined` \| [`ViewRender`](../README.md#viewrender)

##### Parameters

| Name       | Type     |
| :--------- | :------- |
| `viewType` | `string` |

##### Returns

`undefined` \| [`ViewRender`](../README.md#viewrender)

#### Defined in

[packages/formula/src/types/index.ts:537](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L537)

---

### <a id="getdefaultvariablename" name="getdefaultvariablename"></a> getDefaultVariableName

• **getDefaultVariableName**: (`namespaceId`: `string`, `type`: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`) => \`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`column${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Type declaration

▸ (`namespaceId`, `type`): \`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`column${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

##### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespaceId` | `string`                                                                                                                                                                                                                                                                                                                                                                             |
| `type`        | `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |

##### Returns

\`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`column${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Defined in

[packages/formula/src/types/index.ts:535](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L535)

---

### <a id="invoke" name="invoke"></a> invoke

• **invoke**: (`name`: `string`, `ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `any`[]) => `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Type declaration

▸ (`name`, `ctx`, ...`args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

##### Parameters

| Name      | Type                                    |
| :-------- | :-------------------------------------- |
| `name`    | `string`                                |
| `ctx`     | [`FunctionContext`](FunctionContext.md) |
| `...args` | `any`[]                                 |

##### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/formula/src/types/index.ts:532](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L532)

---

### <a id="listvariables" name="listvariables"></a> listVariables

• **listVariables**: (`namespaceId`: `string`) => [`VariableInterface`](VariableInterface.md)[]

#### Type declaration

▸ (`namespaceId`): [`VariableInterface`](VariableInterface.md)[]

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |

##### Returns

[`VariableInterface`](VariableInterface.md)[]

#### Defined in

[packages/formula/src/types/index.ts:549](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L549)

---

### <a id="removeblock" name="removeblock"></a> removeBlock

• **removeBlock**: (`blockId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`blockId`): `Promise`<`void`\>

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:539](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L539)

---

### <a id="removename" name="removename"></a> removeName

• **removeName**: (`id`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`id`): `Promise`<`void`\>

##### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:541](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L541)

---

### <a id="removespreadsheet" name="removespreadsheet"></a> removeSpreadsheet

• **removeSpreadsheet**: (`spreadsheetId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`spreadsheetId`): `Promise`<`void`\>

##### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `spreadsheetId` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:548](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L548)

---

### <a id="removevariable" name="removevariable"></a> removeVariable

• **removeVariable**: (`namespaceId`: `string`, `variableId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`namespaceId`, `variableId`): `Promise`<`void`\>

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:554](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L554)

---

### <a id="reservednames" name="reservednames"></a> reservedNames

• **reservedNames**: `string`[]

#### Defined in

[packages/formula/src/types/index.ts:529](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L529)

---

### <a id="resetformula" name="resetformula"></a> resetFormula

• **resetFormula**: `VoidFunction`

#### Defined in

[packages/formula/src/types/index.ts:556](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L556)

---

### <a id="reversefunctiondependencies" name="reversefunctiondependencies"></a> reverseFunctionDependencies

• **reverseFunctionDependencies**: `Record`<`string`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/types/index.ts:531](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L531)

---

### <a id="reversevariabledependencies" name="reversevariabledependencies"></a> reverseVariableDependencies

• **reverseVariableDependencies**: `Record`<\`#${string}.${string}\`, [`VariableDependency`](VariableDependency.md)[]\>

#### Defined in

[packages/formula/src/types/index.ts:530](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L530)

---

### <a id="setname" name="setname"></a> setName

• **setName**: (`nameDependency`: [`NameDependencyWithKind`](NameDependencyWithKind.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`nameDependency`): `Promise`<`void`\>

##### Parameters

| Name             | Type                                                  |
| :--------------- | :---------------------------------------------------- |
| `nameDependency` | [`NameDependencyWithKind`](NameDependencyWithKind.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:540](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L540)

---

### <a id="setspreadsheet" name="setspreadsheet"></a> setSpreadsheet

• **setSpreadsheet**: (`spreadsheet`: [`SpreadsheetType`](SpreadsheetType.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`spreadsheet`): `Promise`<`void`\>

##### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `spreadsheet` | [`SpreadsheetType`](SpreadsheetType.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/types/index.ts:547](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L547)

---

### <a id="variablecount" name="variablecount"></a> variableCount

• **variableCount**: () => `number`

#### Type declaration

▸ (): `number`

##### Returns

`number`

#### Defined in

[packages/formula/src/types/index.ts:534](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/types/index.ts#L534)
