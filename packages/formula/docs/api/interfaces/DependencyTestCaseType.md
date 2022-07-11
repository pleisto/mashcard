# Interface: DependencyTestCaseType<T\>

## Type parameters

| Name | Type                      |
| :--- | :------------------------ |
| `T`  | extends `DependencyTypes` |

## Hierarchy

- `RequireField`<[`BaseTestCase`](BaseTestCase.md)<{}\>, `"namespaceId"` \| `"name"`\>

  ↳ **`DependencyTestCaseType`**

## Table of contents

### Properties

- [currentGroupOption](DependencyTestCaseType.md#currentgroupoption)
- [definition](DependencyTestCaseType.md#definition)
- [expected](DependencyTestCaseType.md#expected)
- [expressionType](DependencyTestCaseType.md#expressiontype)
- [groupOptions](DependencyTestCaseType.md#groupoptions)
- [jestTitle](DependencyTestCaseType.md#jesttitle)
- [label](DependencyTestCaseType.md#label)
- [name](DependencyTestCaseType.md#name)
- [namespaceId](DependencyTestCaseType.md#namespaceid)
- [newAbbrevInput](DependencyTestCaseType.md#newabbrevinput)
- [position](DependencyTestCaseType.md#position)
- [richType](DependencyTestCaseType.md#richtype)
- [testCases](DependencyTestCaseType.md#testcases)
- [todoMessage](DependencyTestCaseType.md#todomessage)
- [type](DependencyTestCaseType.md#type)
- [variableId](DependencyTestCaseType.md#variableid)

## Properties

### <a id="currentgroupoption" name="currentgroupoption"></a> currentGroupOption

• `Optional` **currentGroupOption**: `any`

#### Inherited from

RequireField.currentGroupOption

#### Defined in

[packages/formula/src/tests/testType.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L118)

---

### <a id="definition" name="definition"></a> definition

• `Optional` **definition**: `string`

#### Inherited from

RequireField.definition

#### Defined in

[packages/formula/src/tests/testType.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L114)

---

### <a id="expected" name="expected"></a> expected

• `Optional` **expected**: readonly [`ExpectedType`<{}\>, `ExpectedType`<{}\>]

#### Inherited from

RequireField.expected

#### Defined in

[packages/formula/src/tests/testType.ts:120](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L120)

---

### <a id="expressiontype" name="expressiontype"></a> expressionType

• `Optional` **expressionType**: [`ExpressionType`](../README.md#expressiontype)

#### Inherited from

RequireField.expressionType

#### Defined in

[packages/formula/src/tests/testType.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L117)

---

### <a id="groupoptions" name="groupoptions"></a> groupOptions

• `Optional` **groupOptions**: `GroupOption`[]

#### Inherited from

RequireField.groupOptions

#### Defined in

[packages/formula/src/tests/testType.ts:116](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L116)

---

### <a id="jesttitle" name="jesttitle"></a> jestTitle

• `Optional` **jestTitle**: `string`

#### Inherited from

RequireField.jestTitle

#### Defined in

[packages/formula/src/tests/testType.ts:127](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L127)

---

### <a id="label" name="label"></a> label

• `Optional` **label**: `string`

#### Inherited from

RequireField.label

#### Defined in

[packages/formula/src/tests/testType.ts:119](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L119)

---

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

RequireField.name

#### Defined in

[packages/formula/src/tests/testType.ts:123](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L123)

[packages/formula/src/tests/testType.ts:123](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L123)

---

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string` \| `symbol`

#### Inherited from

RequireField.namespaceId

#### Defined in

[packages/formula/src/tests/testType.ts:121](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L121)

[packages/formula/src/tests/testType.ts:121](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L121)

---

### <a id="newabbrevinput" name="newabbrevinput"></a> newAbbrevInput

• `Optional` **newAbbrevInput**: `string`

#### Inherited from

RequireField.newAbbrevInput

#### Defined in

[packages/formula/src/tests/testType.ts:115](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L115)

---

### <a id="position" name="position"></a> position

• `Optional` **position**: `number`

#### Inherited from

RequireField.position

#### Defined in

[packages/formula/src/tests/testType.ts:125](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L125)

---

### <a id="richtype" name="richtype"></a> richType

• `Optional` **richType**: [`VariableRichType`](../README.md#variablerichtype)

#### Inherited from

RequireField.richType

#### Defined in

[packages/formula/src/tests/testType.ts:124](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L124)

---

### <a id="testcases" name="testcases"></a> testCases

• **testCases**: [`DependencyTestCase`<`T`\>, ...DependencyTestCase<T\>[]]

#### Defined in

[packages/formula/src/tests/testType.ts:217](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L217)

---

### <a id="todomessage" name="todomessage"></a> todoMessage

• `Optional` **todoMessage**: `string`

#### Inherited from

RequireField.todoMessage

#### Defined in

[packages/formula/src/tests/testType.ts:126](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L126)

---

### <a id="type" name="type"></a> type

• **type**: `T`

#### Defined in

[packages/formula/src/tests/testType.ts:216](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L216)

---

### <a id="variableid" name="variableid"></a> variableId

• `Optional` **variableId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

RequireField.variableId

#### Defined in

[packages/formula/src/tests/testType.ts:122](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L122)
