# Class: FormulaContext

## Implements

- [`ContextInterface`](../interfaces/ContextInterface.md)

## Table of contents

### Constructors

- [constructor](FormulaContext.md#constructor)

### Properties

- [blocks](FormulaContext.md#blocks)
- [dirtyFormulas](FormulaContext.md#dirtyformulas)
- [eventListeners](FormulaContext.md#eventlisteners)
- [features](FormulaContext.md#features)
- [functionClausesMap](FormulaContext.md#functionclausesmap)
- [functionWeights](FormulaContext.md#functionweights)
- [i18n](FormulaContext.md#i18n)
- [names](FormulaContext.md#names)
- [options](FormulaContext.md#options)
- [reservedNames](FormulaContext.md#reservednames)
- [reverseFunctionDependencies](FormulaContext.md#reversefunctiondependencies)
- [reverseVariableDependencies](FormulaContext.md#reversevariabledependencies)
- [spreadsheets](FormulaContext.md#spreadsheets)
- [tickKey](FormulaContext.md#tickkey)
- [username](FormulaContext.md#username)
- [variableNameStore](FormulaContext.md#variablenamestore)
- [variableWeights](FormulaContext.md#variableweights)
- [variables](FormulaContext.md#variables)
- [viewRenders](FormulaContext.md#viewrenders)
- [instance](FormulaContext.md#instance)

### Methods

- [checkName](FormulaContext.md#checkname)
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
- [findVariableByCellMeta](FormulaContext.md#findvariablebycellmeta)
- [findVariableById](FormulaContext.md#findvariablebyid)
- [findVariableByName](FormulaContext.md#findvariablebyname)
- [findVariableDisplayDataById](FormulaContext.md#findvariabledisplaydatabyid)
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
- [getFormulaInstance](FormulaContext.md#getformulainstance)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new FormulaContext**(`options`)

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `options` | [`FormulaContextArgs`](../interfaces/FormulaContextArgs.md) |

#### Defined in

[packages/formula/src/context/context.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L102)

## Properties

### <a id="blocks" name="blocks"></a> blocks

• **blocks**: `Record`<`string`, [`BlockType`](../interfaces/BlockType.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:93](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L93)

---

### <a id="dirtyformulas" name="dirtyformulas"></a> dirtyFormulas

• **dirtyFormulas**: `Record`<\`#${string}.${string}\`, [`DirtyFormulaInfo`](../interfaces/DirtyFormulaInfo.md)\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[dirtyFormulas](../interfaces/ContextInterface.md#dirtyformulas)

#### Defined in

[packages/formula/src/context/context.ts:86](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L86)

---

### <a id="eventlisteners" name="eventlisteners"></a> eventListeners

• **eventListeners**: `EventSubscribed`[] = `[]`

#### Defined in

[packages/formula/src/context/context.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L99)

---

### <a id="features" name="features"></a> features

• **features**: [`Features`](../README.md#features)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[features](../interfaces/ContextInterface.md#features)

#### Defined in

[packages/formula/src/context/context.ts:85](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L85)

---

### <a id="functionclausesmap" name="functionclausesmap"></a> functionClausesMap

• **functionClausesMap**: `Record`<`string`, [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L97)

---

### <a id="functionweights" name="functionweights"></a> functionWeights

• **functionWeights**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:89](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L89)

---

### <a id="i18n" name="i18n"></a> i18n

• **i18n**: [`I18N`](../README.md#i18n)

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[i18n](../interfaces/ContextInterface.md#i18n)

#### Defined in

[packages/formula/src/context/context.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L83)

---

### <a id="names" name="names"></a> names

• **names**: `Record`<`string`, [`NameDependencyWithKind`](../interfaces/NameDependencyWithKind.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:92](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L92)

---

### <a id="options" name="options"></a> options

• **options**: [`FormulaContextArgs`](../interfaces/FormulaContextArgs.md)

#### Defined in

[packages/formula/src/context/context.ts:81](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L81)

---

### <a id="reservednames" name="reservednames"></a> reservedNames

• **reservedNames**: `string`[] = `[]`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reservedNames](../interfaces/ContextInterface.md#reservednames)

#### Defined in

[packages/formula/src/context/context.ts:98](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L98)

---

### <a id="reversefunctiondependencies" name="reversefunctiondependencies"></a> reverseFunctionDependencies

• **reverseFunctionDependencies**: `Record`<`string`, [`VariableDependency`](../interfaces/VariableDependency.md)[]\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reverseFunctionDependencies](../interfaces/ContextInterface.md#reversefunctiondependencies)

#### Defined in

[packages/formula/src/context/context.ts:96](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L96)

---

### <a id="reversevariabledependencies" name="reversevariabledependencies"></a> reverseVariableDependencies

• **reverseVariableDependencies**: `Record`<\`#${string}.${string}\`, [`VariableDependency`](../interfaces/VariableDependency.md)[]\> = `{}`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[reverseVariableDependencies](../interfaces/ContextInterface.md#reversevariabledependencies)

#### Defined in

[packages/formula/src/context/context.ts:95](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L95)

---

### <a id="spreadsheets" name="spreadsheets"></a> spreadsheets

• **spreadsheets**: `Record`<`string`, [`SpreadsheetType`](../interfaces/SpreadsheetType.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:91](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L91)

---

### <a id="tickkey" name="tickkey"></a> tickKey

• **tickKey**: `string`

#### Defined in

[packages/formula/src/context/context.ts:84](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L84)

---

### <a id="username" name="username"></a> username

• **username**: `string`

#### Implementation of

[ContextInterface](../interfaces/ContextInterface.md).[username](../interfaces/ContextInterface.md#username)

#### Defined in

[packages/formula/src/context/context.ts:82](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L82)

---

### <a id="variablenamestore" name="variablenamestore"></a> variableNameStore

• **variableNameStore**: `StoreApi`<`VariableNameStore`\> = `variableNameStore`

#### Defined in

[packages/formula/src/context/context.ts:100](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L100)

---

### <a id="variableweights" name="variableweights"></a> variableWeights

• **variableWeights**: `Record`<\`#${string}.${string}\`, `number`\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:90](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L90)

---

### <a id="variables" name="variables"></a> variables

• **variables**: `Record`<\`#${string}.${string}\`, [`VariableInterface`](../interfaces/VariableInterface.md)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:87](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L87)

---

### <a id="viewrenders" name="viewrenders"></a> viewRenders

• **viewRenders**: `Record`<`string`, [`ViewRender`](../README.md#viewrender)\> = `{}`

#### Defined in

[packages/formula/src/context/context.ts:88](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L88)

---

### <a id="instance" name="instance"></a> instance

▪ `Static` `Private` `Optional` **instance**: [`FormulaContext`](FormulaContext.md)

#### Defined in

[packages/formula/src/context/context.ts:80](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L80)

## Methods

### <a id="checkname" name="checkname"></a> checkName

▸ **checkName**(`name`, `namespaceId`, `variableId`): `undefined` \| [`ErrorMessage`](../interfaces/ErrorMessage.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `name`        | `string` |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

`undefined` \| [`ErrorMessage`](../interfaces/ErrorMessage.md)

#### Implementation of

ContextInterface.checkName

#### Defined in

[packages/formula/src/context/context.ts:255](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L255)

---

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): `void`

#### Returns

`void`

#### Implementation of

ContextInterface.cleanup

#### Defined in

[packages/formula/src/context/context.ts:170](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L170)

---

### <a id="commitdirty" name="commitdirty"></a> commitDirty

▸ `Private` **commitDirty**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/context.ts:450](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L450)

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

ContextInterface.commitVariable

#### Defined in

[packages/formula/src/context/context.ts:393](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L393)

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

ContextInterface.completions

#### Defined in

[packages/formula/src/context/context.ts:189](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L189)

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

ContextInterface.findBlockById

#### Defined in

[packages/formula/src/context/context.ts:223](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L223)

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

ContextInterface.findColumn

#### Defined in

[packages/formula/src/context/context.ts:323](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L323)

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

ContextInterface.findFunctionClause

#### Defined in

[packages/formula/src/context/context.ts:428](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L428)

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

ContextInterface.findNames

#### Defined in

[packages/formula/src/context/context.ts:248](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L248)

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

ContextInterface.findReference

#### Defined in

[packages/formula/src/context/context.ts:227](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L227)

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

ContextInterface.findRow

#### Defined in

[packages/formula/src/context/context.ts:329](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L329)

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

ContextInterface.findSpreadsheet

#### Defined in

[packages/formula/src/context/context.ts:313](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L313)

---

### <a id="findvariablebycellmeta" name="findvariablebycellmeta"></a> findVariableByCellMeta

▸ **findVariableByCellMeta**(`meta`): `undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Parameters

| Name                 | Type     |
| :------------------- | :------- |
| `meta`               | `Object` |
| `meta.columnId`      | `string` |
| `meta.rowId`         | `string` |
| `meta.spreadsheetId` | `string` |

#### Returns

`undefined` \| [`VariableInterface`](../interfaces/VariableInterface.md)

#### Implementation of

ContextInterface.findVariableByCellMeta

#### Defined in

[packages/formula/src/context/context.ts:365](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L365)

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

ContextInterface.findVariableById

#### Defined in

[packages/formula/src/context/context.ts:361](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L361)

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

ContextInterface.findVariableByName

#### Defined in

[packages/formula/src/context/context.ts:382](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L382)

---

### <a id="findvariabledisplaydatabyid" name="findvariabledisplaydatabyid"></a> findVariableDisplayDataById

▸ **findVariableDisplayDataById**(`namespaceId`, `variableId`): `undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

`undefined` \| [`VariableDisplayData`](../interfaces/VariableDisplayData.md)

#### Implementation of

ContextInterface.findVariableDisplayDataById

#### Defined in

[packages/formula/src/context/context.ts:373](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L373)

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

ContextInterface.findViewRender

#### Defined in

[packages/formula/src/context/context.ts:219](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L219)

---

### <a id="getdefaultvariablename" name="getdefaultvariablename"></a> getDefaultVariableName

▸ **getDefaultVariableName**(`namespaceId`, `type`): `string`

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespaceId` | `string`                                                                                                                                                                                                                                                                                                                                                                             |
| `type`        | `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |

#### Returns

`string`

#### Implementation of

ContextInterface.getDefaultVariableName

#### Defined in

[packages/formula/src/context/context.ts:211](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L211)

---

### <a id="invoke" name="invoke"></a> invoke

▸ **invoke**(`name`, `ctx`, ...`args`): `Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `name`    | `string`                                              |
| `ctx`     | [`FunctionContext`](../interfaces/FunctionContext.md) |
| `...args` | `any`[]                                               |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](../interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](../interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](../interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](../interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](../interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`RowType`](../interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](../interfaces/Cell.md)] ; `result`: [`CellType`](../interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](../interfaces/FindKey.md)] ; `result`: [`ColumnType`](../interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](../interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](../interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Implementation of

ContextInterface.invoke

#### Defined in

[packages/formula/src/context/context.ts:177](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L177)

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

ContextInterface.listVariables

#### Defined in

[packages/formula/src/context/context.ts:389](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L389)

---

### <a id="parsecodefragments" name="parsecodefragments"></a> parseCodeFragments

▸ `Private` **parseCodeFragments**(`input`): [`CodeFragmentWithIndex`](../README.md#codefragmentwithindex)[]

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

[`CodeFragmentWithIndex`](../README.md#codefragmentwithindex)[]

#### Defined in

[packages/formula/src/context/context.ts:479](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L479)

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

ContextInterface.removeBlock

#### Defined in

[packages/formula/src/context/context.ts:239](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L239)

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

ContextInterface.removeName

#### Defined in

[packages/formula/src/context/context.ts:291](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L291)

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

ContextInterface.removeSpreadsheet

#### Defined in

[packages/formula/src/context/context.ts:353](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L353)

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

ContextInterface.removeVariable

#### Defined in

[packages/formula/src/context/context.ts:417](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L417)

---

### <a id="resetformula" name="resetformula"></a> resetFormula

▸ **resetFormula**(): `void`

#### Returns

`void`

#### Implementation of

ContextInterface.resetFormula

#### Defined in

[packages/formula/src/context/context.ts:435](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L435)

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

#### Defined in

[packages/formula/src/context/context.ts:232](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L232)

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

ContextInterface.setName

#### Defined in

[packages/formula/src/context/context.ts:270](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L270)

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

ContextInterface.setSpreadsheet

#### Defined in

[packages/formula/src/context/context.ts:335](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L335)

---

### <a id="tick" name="tick"></a> tick

▸ `Private` **tick**(`state`): `Promise`<`void`\>

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/context/context.ts:443](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L443)

---

### <a id="variablecount" name="variablecount"></a> variableCount

▸ **variableCount**(): `number`

#### Returns

`number`

#### Implementation of

ContextInterface.variableCount

#### Defined in

[packages/formula/src/context/context.ts:215](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L215)

---

### <a id="getformulainstance" name="getformulainstance"></a> getFormulaInstance

▸ `Static` **getFormulaInstance**(`args`): [`FormulaContext`](FormulaContext.md)

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `args` | [`FormulaContextArgs`](../interfaces/FormulaContextArgs.md) |

#### Returns

[`FormulaContext`](FormulaContext.md)

#### Defined in

[packages/formula/src/context/context.ts:503](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L503)
