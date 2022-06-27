# Class: FormulaContext

## Implements

- [`ContextInterface`](../interfaces/ContextInterface.md)

## Table of contents

### Constructors

- [constructor](FormulaContext.md#constructor)

### Properties

- [backendActions](FormulaContext.md#backendactions)
- [blocks](FormulaContext.md#blocks)
- [dirtyFormulas](FormulaContext.md#dirtyformulas)
- [domain](FormulaContext.md#domain)
- [eventListeners](FormulaContext.md#eventlisteners)
- [features](FormulaContext.md#features)
- [functionClausesMap](FormulaContext.md#functionclausesmap)
- [functionWeights](FormulaContext.md#functionweights)
- [names](FormulaContext.md#names)
- [reservedNames](FormulaContext.md#reservednames)
- [reverseFunctionDependencies](FormulaContext.md#reversefunctiondependencies)
- [reverseVariableDependencies](FormulaContext.md#reversevariabledependencies)
- [spreadsheets](FormulaContext.md#spreadsheets)
- [tickKey](FormulaContext.md#tickkey)
- [tickTimeout](FormulaContext.md#ticktimeout)
- [variableNameCounter](FormulaContext.md#variablenamecounter)
- [variableWeights](FormulaContext.md#variableweights)
- [variables](FormulaContext.md#variables)
- [viewRenders](FormulaContext.md#viewrenders)
- [instance](FormulaContext.md#instance)

### Methods

- [cleanup](FormulaContext.md#cleanup)
- [commitDirty](FormulaContext.md#commitdirty)
- [commitVariable](FormulaContext.md#commitvariable)
- [completions](FormulaContext.md#completions)
- [findBlockById](FormulaContext.md#findblockbyid)
- [findColumn](FormulaContext.md#findcolumn)
- [findFunctionClause](FormulaContext.md#findfunctionclause)
- [findNames](FormulaContext.md#findnames)
- [findReference](FormulaContext.md#findreference)
- [findRow](FormulaContext.md#findrow)
- [findSpreadsheet](FormulaContext.md#findspreadsheet)
- [findVariableById](FormulaContext.md#findvariablebyid)
- [findVariableByName](FormulaContext.md#findvariablebyname)
- [findViewRender](FormulaContext.md#findviewrender)
- [getDefaultVariableName](FormulaContext.md#getdefaultvariablename)
- [invoke](FormulaContext.md#invoke)
- [listVariables](FormulaContext.md#listvariables)
- [parseCodeFragments](FormulaContext.md#parsecodefragments)
- [removeBlock](FormulaContext.md#removeblock)
- [removeName](FormulaContext.md#removename)
- [removeSpreadsheet](FormulaContext.md#removespreadsheet)
- [removeVariable](FormulaContext.md#removevariable)
- [resetFormula](FormulaContext.md#resetformula)
- [setBlock](FormulaContext.md#setblock)
- [setName](FormulaContext.md#setname)
- [setSpreadsheet](FormulaContext.md#setspreadsheet)
- [tick](FormulaContext.md#tick)
- [variableCount](FormulaContext.md#variablecount)
- [getInstance](FormulaContext.md#getinstance)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new FormulaContext**(`__namedParameters`)

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `__namedParameters` | [`FormulaContextArgs`](../interfaces/FormulaContextArgs.md) |

## Properties

### <a id="backendactions" name="backendactions"></a> backendActions

• **backendActions**: `undefined` \| [`BackendActions`](../interfaces/BackendActions.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[backendActions](../interfaces/ContextInterface.md#backendactions)

#### Defined in

[packages/formula/src/context/context.ts:159](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L159)

---

### <a id="blocks" name="blocks"></a> blocks

• **blocks**: `Record`<`string`, [`BlockType`](../interfaces/BlockType.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:125](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L125)

---

### <a id="dirtyformulas" name="dirtyformulas"></a> dirtyFormulas

• **dirtyFormulas**: `Record`<\`#${string}.${string}\`, [`DirtyFormulaInfo`](../interfaces/DirtyFormulaInfo.md)\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[dirtyFormulas](../interfaces/ContextInterface.md#dirtyformulas)

#### Defined in

[packages/formula/src/context/context.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L118)

---

### <a id="domain" name="domain"></a> domain

• **domain**: `string`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[domain](../interfaces/ContextInterface.md#domain)

#### Defined in

[packages/formula/src/context/context.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L114)

---

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/context.ts:161](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L161)

---

### <a id="features" name="features"></a> features

• **features**: [`Features`](../README.md#features)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[features](../interfaces/ContextInterface.md#features)

#### Defined in

[packages/formula/src/context/context.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L117)

---

### <a id="functionclausesmap" name="functionclausesmap"></a> functionClausesMap

• **functionClausesMap**: `Record`<`string`, [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L158)

---

### <a id="functionweights" name="functionweights"></a> functionWeights

• **functionWeights**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:121](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L121)

---

### <a id="names" name="names"></a> names

• **names**: `Record`<`string`, [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:124](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L124)

---

### <a id="reservednames" name="reservednames"></a> reservedNames

• **reservedNames**: `string`[] = `[]`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reservedNames](../interfaces/ContextInterface.md#reservednames)

#### Defined in

[packages/formula/src/context/context.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L160)

---

### <a id="reversefunctiondependencies" name="reversefunctiondependencies"></a> reverseFunctionDependencies

• **reverseFunctionDependencies**: `Record`<`string`, [`VariableDependency`](../interfaces/VariableDependency.md)[]\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reverseFunctionDependencies](../interfaces/ContextInterface.md#reversefunctiondependencies)

#### Defined in

[packages/formula/src/context/context.ts:157](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L157)

---

### <a id="reversevariabledependencies" name="reversevariabledependencies"></a> reverseVariableDependencies

• **reverseVariableDependencies**: `Record`<\`#${string}.${string}\`, [`VariableDependency`](../interfaces/VariableDependency.md)[]\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reverseVariableDependencies](../interfaces/ContextInterface.md#reversevariabledependencies)

#### Defined in

[packages/formula/src/context/context.ts:156](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L156)

---

### <a id="spreadsheets" name="spreadsheets"></a> spreadsheets

• **spreadsheets**: `Record`<`string`, [`SpreadsheetType`](../interfaces/SpreadsheetType.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:123](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L123)

---

### <a id="tickkey" name="tickkey"></a> tickKey

• **tickKey**: `string`

#### Defined in

[packages/formula/src/context/context.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L115)

---

### <a id="ticktimeout" name="ticktimeout"></a> tickTimeout

• **tickTimeout**: `number`

#### Defined in

[packages/formula/src/context/context.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L116)

---

### <a id="variablenamecounter" name="variablenamecounter"></a> variableNameCounter

• **variableNameCounter**: `Record`<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`, `Record`<`string`, `number`\>\>

#### Defined in

[packages/formula/src/context/context.ts:126](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L126)

---

### <a id="variableweights" name="variableweights"></a> variableWeights

• **variableWeights**: `Record`<\`#${string}.${string}\`, `number`\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:122](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L122)

---

### <a id="variables" name="variables"></a> variables

• **variables**: `Record`<\`#${string}.${string}\`, [`VariableInterface`](../interfaces/VariableInterface.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:119](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L119)

---

### <a id="viewrenders" name="viewrenders"></a> viewRenders

• **viewRenders**: `Record`<`string`, [`ViewRender`](../README.md#viewrender)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:120](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L120)

---

### <a id="instance" name="instance"></a> instance

▪ `Static` `Private` `Optional` **instance**: [`FormulaContext`](FormulaContext.md)

#### Defined in

[packages/formula/src/context/context.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L113)

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

ContextInterface.cleanup

---

### <a id="commitdirty" name="commitdirty"></a> commitDirty

▸ `Private` **commitDirty**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### <a id="commitvariable" name="commitvariable"></a> commitVariable

▸ **commitVariable**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                         | Type                                                      |
| :--------------------------- | :-------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                  |
| `__namedParameters.variable` | [`VariableInterface`](../interfaces/VariableInterface.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[commitVariable](../interfaces/ContextInterface.md#commitvariable)

---

### <a id="completions" name="completions"></a> completions

▸ **completions**(`namespaceId`, `variableId`): [`Completion`](../README.md#completion)[]

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `namespaceId` | `string`                |
| `variableId`  | `undefined` \| `string` |

#### Returns

[`Completion`](../README.md#completion)[]

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[completions](../interfaces/ContextInterface.md#completions)

---

### <a id="findblockbyid" name="findblockbyid"></a> findBlockById

▸ **findBlockById**(`blockId`): `undefined` \| [`BlockType`](../interfaces/BlockType.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `string` |

#### Returns

`undefined` \| [`BlockType`](../interfaces/BlockType.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findBlockById](../interfaces/ContextInterface.md#findblockbyid)

---

### <a id="findcolumn" name="findcolumn"></a> findColumn

▸ **findColumn**(`spreadsheetId`, `key`): `undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Parameters

| Name            | Type                                  |
| :-------------- | :------------------------------------ |
| `spreadsheetId` | `string`                              |
| `key`           | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`ColumnType`](../interfaces/ColumnType.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findColumn](../interfaces/ContextInterface.md#findcolumn)

---

### <a id="findfunctionclause" name="findfunctionclause"></a> findFunctionClause

▸ **findFunctionClause**(`group`, `name`): `undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `group` | `string` |
| `name`  | `string` |

#### Returns

`undefined` \| [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findFunctionClause](../interfaces/ContextInterface.md#findfunctionclause)

---

### <a id="findnames" name="findnames"></a> findNames

▸ **findNames**(`namespaceId`, `name`): [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)[]

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `name`        | `string` |

#### Returns

[`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)[]

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findNames](../interfaces/ContextInterface.md#findnames)

---

### <a id="findreference" name="findreference"></a> findReference

▸ **findReference**(`namespaceId`, `variableId`): [`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

[`VariableDependency`](../interfaces/VariableDependency.md)[]

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findReference](../interfaces/ContextInterface.md#findreference)

---

### <a id="findrow" name="findrow"></a> findRow

▸ **findRow**(`spreadsheetId`, `key`): `undefined` \| [`RowType`](../interfaces/RowType.md)

#### Parameters

| Name            | Type                                  |
| :-------------- | :------------------------------------ |
| `spreadsheetId` | `string`                              |
| `key`           | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`RowType`](../interfaces/RowType.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findRow](../interfaces/ContextInterface.md#findrow)

---

### <a id="findspreadsheet" name="findspreadsheet"></a> findSpreadsheet

▸ **findSpreadsheet**(`__namedParameters`): `undefined` \| [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Parameters

| Name                | Type                                  |
| :------------------ | :------------------------------------ |
| `__namedParameters` | [`FindKey`](../interfaces/FindKey.md) |

#### Returns

`undefined` \| [`SpreadsheetType`](../interfaces/SpreadsheetType.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findSpreadsheet](../interfaces/ContextInterface.md#findspreadsheet)

---

### <a id="findvariablebyid" name="findvariablebyid"></a> findVariableById

▸ **findVariableById**(`namespaceId`, `variableId`): `undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

`undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findVariableById](../interfaces/ContextInterface.md#findvariablebyid)

---

### <a id="findvariablebyname" name="findvariablebyname"></a> findVariableByName

▸ **findVariableByName**(`namespaceId`, `name`): `undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `name`        | `string` |

#### Returns

`undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findVariableByName](../interfaces/ContextInterface.md#findvariablebyname)

---

### <a id="findviewrender" name="findviewrender"></a> findViewRender

▸ **findViewRender**(`viewType`): `undefined` \| [`ViewRender`](../README.md#viewrender)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `viewType` | `string` |

#### Returns

`undefined` \| [`ViewRender`](../README.md#viewrender)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[findViewRender](../interfaces/ContextInterface.md#findviewrender)

---

### <a id="getdefaultvariablename" name="getdefaultvariablename"></a> getDefaultVariableName

▸ **getDefaultVariableName**(`namespaceId`, `type`): \`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`column${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespaceId` | `string`                                                                                                                                                                                                                                                                                                                                                                             |
| `type`        | `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |

#### Returns

\`function${number}\` \| \`null${number}\` \| \`block${number}\` \| \`void${number}\` \| \`array${number}\` \| \`spreadsheet${number}\` \| \`input${number}\` \| \`column${number}\` \| \`cst${number}\` \| \`predicate${number}\` \| \`range${number}\` \| \`record${number}\` \| \`str${number}\` \| \`num${number}\` \| \`bool${number}\` \| \`date${number}\` \| \`blank${number}\` \| \`row${number}\` \| \`cell${number}\` \| \`var${number}\` \| \`error${number}\` \| \`reference${number}\` \| \`button${number}\` \| \`switch${number}\` \| \`select${number}\` \| \`radio${number}\` \| \`rate${number}\` \| \`slider${number}\` \| \`pending${number}\` \| \`waiting${number}\` \| \`noPersist${number}\`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[getDefaultVariableName](../interfaces/ContextInterface.md#getdefaultvariablename)

---

### <a id="invoke" name="invoke"></a> invoke

▸ **invoke**(`name`, `ctx`, ...`args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `name`    | `string`                                              |
| `ctx`     | [`FunctionContext`](../interfaces/FunctionContext.md) |
| `...args` | `any`[]                                               |

#### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[invoke](../interfaces/ContextInterface.md#invoke)

---

### <a id="listvariables" name="listvariables"></a> listVariables

▸ **listVariables**(`namespaceId`): [`VariableInterface`](../interfaces/VariableInterface.md)[]

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |

#### Returns

[`VariableInterface`](../interfaces/VariableInterface.md)[]

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[listVariables](../interfaces/ContextInterface.md#listvariables)

---

### <a id="parsecodefragments" name="parsecodefragments"></a> parseCodeFragments

▸ `Private` **parseCodeFragments**(`input`): [`CodeFragment`](../README.md#codefragment)[]

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

[`CodeFragment`](../README.md#codefragment)[]

---

### <a id="removeblock" name="removeblock"></a> removeBlock

▸ **removeBlock**(`blockId`): `Promise`<`void`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[removeBlock](../interfaces/ContextInterface.md#removeblock)

---

### <a id="removename" name="removename"></a> removeName

▸ **removeName**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[removeName](../interfaces/ContextInterface.md#removename)

---

### <a id="removespreadsheet" name="removespreadsheet"></a> removeSpreadsheet

▸ **removeSpreadsheet**(`spreadsheetId`): `Promise`<`void`\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `spreadsheetId` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[removeSpreadsheet](../interfaces/ContextInterface.md#removespreadsheet)

---

### <a id="removevariable" name="removevariable"></a> removeVariable

▸ **removeVariable**(`namespaceId`, `variableId`): `Promise`<`void`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[removeVariable](../interfaces/ContextInterface.md#removevariable)

---

### <a id="resetformula" name="resetformula"></a> resetFormula

▸ **resetFormula**(): `void`

#### Returns

`void`

#### Implementation of

ContextInterface.resetFormula

---

### <a id="setblock" name="setblock"></a> setBlock

▸ `Private` **setBlock**(`blockId`, `name`): `Promise`<`void`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `string` |
| `name`    | `string` |

#### Returns

`Promise`<`void`\>

---

### <a id="setname" name="setname"></a> setName

▸ **setName**(`nameDependency`): `Promise`<`void`\>

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `nameDependency` | [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[setName](../interfaces/ContextInterface.md#setname)

---

### <a id="setspreadsheet" name="setspreadsheet"></a> setSpreadsheet

▸ **setSpreadsheet**(`spreadsheet`): `Promise`<`void`\>

#### Parameters

| Name          | Type                                                  |
| :------------ | :---------------------------------------------------- |
| `spreadsheet` | [`SpreadsheetType`](../interfaces/SpreadsheetType.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[setSpreadsheet](../interfaces/ContextInterface.md#setspreadsheet)

---

### <a id="tick" name="tick"></a> tick

▸ `Private` **tick**(`state`): `Promise`<`void`\>

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

`Promise`<`void`\>

---

### <a id="variablecount" name="variablecount"></a> variableCount

▸ **variableCount**(): `number`

#### Returns

`number`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[variableCount](../interfaces/ContextInterface.md#variablecount)

---

### <a id="getinstance" name="getinstance"></a> getInstance

▸ `Static` **getInstance**(`args`): [`FormulaContext`](FormulaContext.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `args` | [`FormulaContextArgs`](../interfaces/FormulaContextArgs.md) |

#### Returns

[`FormulaContext`](FormulaContext.md)
