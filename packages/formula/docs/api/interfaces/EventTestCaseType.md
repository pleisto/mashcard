# Interface: EventTestCaseType

## Hierarchy

- `RequireField`<[`BaseTestCase`](BaseTestCase.md)<{}\>, `"definition"`\>

  ↳ **`EventTestCaseType`**

## Table of contents

### Properties

- [currentGroupOption](EventTestCaseType.md#currentgroupoption)
- [definition](EventTestCaseType.md#definition)
- [events](EventTestCaseType.md#events)
- [expected](EventTestCaseType.md#expected)
- [groupOptions](EventTestCaseType.md#groupoptions)
- [jestTitle](EventTestCaseType.md#jesttitle)
- [label](EventTestCaseType.md#label)
- [name](EventTestCaseType.md#name)
- [namespaceId](EventTestCaseType.md#namespaceid)
- [newAbbrevInput](EventTestCaseType.md#newabbrevinput)
- [position](EventTestCaseType.md#position)
- [resultAfter](EventTestCaseType.md#resultafter)
- [resultAfterAsync](EventTestCaseType.md#resultafterasync)
- [resultBefore](EventTestCaseType.md#resultbefore)
- [richType](EventTestCaseType.md#richtype)
- [todoMessage](EventTestCaseType.md#todomessage)
- [variableId](EventTestCaseType.md#variableid)
- [variableParseResultAfter](EventTestCaseType.md#variableparseresultafter)

### Methods

- [saveEvents](EventTestCaseType.md#saveevents)
- [triggerEvents](EventTestCaseType.md#triggerevents)

## Properties

### <a id="currentgroupoption" name="currentgroupoption"></a> currentGroupOption

• `Optional` **currentGroupOption**: `any`

#### Inherited from

RequireField.currentGroupOption

#### Defined in

[packages/formula/src/tests/testType.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L111)

---

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Inherited from

RequireField.definition

#### Defined in

[packages/formula/src/tests/testType.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L108)

[packages/formula/src/tests/testType.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L108)

---

### <a id="events" name="events"></a> events

• **events**: ([``"empty_sync"``, `any`] \| [``"empty_async"``, `any`] \| [``"blockChangeName"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `name`: `string` ; `username`: `string` }) => `Promise`<`void`\>\>] \| [``"blockDelete"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `username`: `string` }) => `Promise`<`void`\>\>] \| [``"spreadsheetChangeName"``, `OmitUsername`<(`__namedParameters`: { `namespaceId`: `string` ; `spreadsheetId`: `string` ; `title`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| [``"spreadsheetDelete"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| [`"columnChange"`, `OmitUsername`<(`__namedParameters`: { `columns`: [`Column`](Column.md)[] ; `namespaceId`: `string` ; `spreadsheetId`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| [`"rowChange"`, `OmitUsername`<(`__namedParameters`: { `namespaceId`: `string` ; `rows`: [`Row`](Row.md)[] ; `spreadsheetId`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| [`"variableInsertOnly"`, [`BaseTestCase`](BaseTestCase.md)<{}\>] \| [`"variableInsertAndAwait"`, [`BaseTestCase`](BaseTestCase.md)<{}\>] \| [``"variableDelete"``, {}] \| [`"variableUpdateDefinition"`, [`FormulaDefinition`](FormulaDefinition.md)])[]

#### Defined in

[packages/formula/src/tests/testType.ts:168](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L168)

---

### <a id="expected" name="expected"></a> expected

• `Optional` **expected**: [`ExpectedType`<{}\>, ...ExpectedType<Object\>[]]

#### Inherited from

RequireField.expected

#### Defined in

[packages/formula/src/tests/testType.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L113)

---

### <a id="groupoptions" name="groupoptions"></a> groupOptions

• `Optional` **groupOptions**: `GroupOption`[]

#### Inherited from

RequireField.groupOptions

#### Defined in

[packages/formula/src/tests/testType.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L110)

---

### <a id="jesttitle" name="jesttitle"></a> jestTitle

• `Optional` **jestTitle**: `string`

#### Inherited from

RequireField.jestTitle

#### Defined in

[packages/formula/src/tests/testType.ts:120](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L120)

---

### <a id="label" name="label"></a> label

• `Optional` **label**: `string`

#### Inherited from

RequireField.label

#### Defined in

[packages/formula/src/tests/testType.ts:112](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L112)

---

### <a id="name" name="name"></a> name

• `Optional` **name**: `string`

#### Inherited from

RequireField.name

#### Defined in

[packages/formula/src/tests/testType.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L116)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` **namespaceId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

RequireField.namespaceId

#### Defined in

[packages/formula/src/tests/testType.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L114)

---

### <a id="newabbrevinput" name="newabbrevinput"></a> newAbbrevInput

• `Optional` **newAbbrevInput**: `string`

#### Inherited from

RequireField.newAbbrevInput

#### Defined in

[packages/formula/src/tests/testType.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L109)

---

### <a id="position" name="position"></a> position

• `Optional` **position**: `number`

#### Inherited from

RequireField.position

#### Defined in

[packages/formula/src/tests/testType.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L118)

---

### <a id="resultafter" name="resultafter"></a> resultAfter

• `Optional` **resultAfter**: `any`

#### Defined in

[packages/formula/src/tests/testType.ts:163](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L163)

---

### <a id="resultafterasync" name="resultafterasync"></a> resultAfterAsync

• `Optional` **resultAfterAsync**: `true`

#### Defined in

[packages/formula/src/tests/testType.ts:164](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L164)

---

### <a id="resultbefore" name="resultbefore"></a> resultBefore

• **resultBefore**: `any`

#### Defined in

[packages/formula/src/tests/testType.ts:162](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L162)

---

### <a id="richtype" name="richtype"></a> richType

• `Optional` **richType**: [`VariableRichType`](../README.md#variablerichtype)

#### Inherited from

RequireField.richType

#### Defined in

[packages/formula/src/tests/testType.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L117)

---

### <a id="todomessage" name="todomessage"></a> todoMessage

• `Optional` **todoMessage**: `string`

#### Inherited from

RequireField.todoMessage

#### Defined in

[packages/formula/src/tests/testType.ts:119](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L119)

---

### <a id="variableid" name="variableid"></a> variableId

• `Optional` **variableId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

RequireField.variableId

#### Defined in

[packages/formula/src/tests/testType.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L115)

---

### <a id="variableparseresultafter" name="variableparseresultafter"></a> variableParseResultAfter

• `Optional` **variableParseResultAfter**: `Partial`<[`VariableParseResult`](VariableParseResult.md)\>

#### Defined in

[packages/formula/src/tests/testType.ts:165](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L165)

## Methods

### <a id="saveevents" name="saveevents"></a> saveEvents

▸ `Optional` **saveEvents**(`ctx`): [`TriggerEvent`, ...TriggerEvent[]]

#### Parameters

| Name  | Type                                      |
| :---- | :---------------------------------------- |
| `ctx` | [`ExtendedCtx`](../README.md#extendedctx) |

#### Returns

[`TriggerEvent`, ...TriggerEvent[]]

---

### <a id="triggerevents" name="triggerevents"></a> triggerEvents

▸ `Optional` **triggerEvents**(`ctx`): [`TriggerEvent`, ...TriggerEvent[]]

#### Parameters

| Name  | Type                                      |
| :---- | :---------------------------------------- |
| `ctx` | [`ExtendedCtx`](../README.md#extendedctx) |

#### Returns

[`TriggerEvent`, ...TriggerEvent[]]
