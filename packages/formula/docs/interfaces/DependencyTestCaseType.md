# Interface: DependencyTestCaseType<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `DependencyTypes` |

## Hierarchy

- `RequireField`<[`BaseTestCase`](BaseTestCase.md)<{}\>, ``"namespaceId"`` \| ``"name"``\>

  ↳ **`DependencyTestCaseType`**

## Table of contents

### Properties

- [currentGroupOption](DependencyTestCaseType.md#currentgroupoption)
- [definition](DependencyTestCaseType.md#definition)
- [expected](DependencyTestCaseType.md#expected)
- [groupOptions](DependencyTestCaseType.md#groupoptions)
- [jestTitle](DependencyTestCaseType.md#jesttitle)
- [label](DependencyTestCaseType.md#label)
- [name](DependencyTestCaseType.md#name)
- [namespaceId](DependencyTestCaseType.md#namespaceid)
- [newAbbrevInput](DependencyTestCaseType.md#newabbrevinput)
- [position](DependencyTestCaseType.md#position)
- [richType](DependencyTestCaseType.md#richtype)
- [testCases](DependencyTestCaseType.md#testcases)
- [todo](DependencyTestCaseType.md#todo)
- [type](DependencyTestCaseType.md#type)
- [variableId](DependencyTestCaseType.md#variableid)

## Properties

### <a id="currentgroupoption" name="currentgroupoption"></a> currentGroupOption

• `Optional` **currentGroupOption**: `any`

#### Inherited from

RequireField.currentGroupOption

#### Defined in

[packages/formula/src/tests/testType.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L105)

___

### <a id="definition" name="definition"></a> definition

• `Optional` **definition**: `string`

#### Inherited from

RequireField.definition

#### Defined in

[packages/formula/src/tests/testType.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L102)

___

### <a id="expected" name="expected"></a> expected

• `Optional` **expected**: [`ExpectedType`<{}\>, ...ExpectedType<Object\>[]]

#### Inherited from

RequireField.expected

#### Defined in

[packages/formula/src/tests/testType.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L107)

___

### <a id="groupoptions" name="groupoptions"></a> groupOptions

• `Optional` **groupOptions**: `GroupOption`[]

#### Inherited from

RequireField.groupOptions

#### Defined in

[packages/formula/src/tests/testType.ts:104](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L104)

___

### <a id="jesttitle" name="jesttitle"></a> jestTitle

• `Optional` **jestTitle**: `string`

#### Inherited from

RequireField.jestTitle

#### Defined in

[packages/formula/src/tests/testType.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L114)

___

### <a id="label" name="label"></a> label

• `Optional` **label**: `string`

#### Inherited from

RequireField.label

#### Defined in

[packages/formula/src/tests/testType.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L106)

___

### <a id="name" name="name"></a> name

• **name**: `string`

#### Inherited from

RequireField.name

#### Defined in

[packages/formula/src/tests/testType.ts:110](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L110)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• **namespaceId**: `string` \| `symbol`

#### Inherited from

RequireField.namespaceId

#### Defined in

[packages/formula/src/tests/testType.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L108)

___

### <a id="newabbrevinput" name="newabbrevinput"></a> newAbbrevInput

• `Optional` **newAbbrevInput**: `string`

#### Inherited from

RequireField.newAbbrevInput

#### Defined in

[packages/formula/src/tests/testType.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L103)

___

### <a id="position" name="position"></a> position

• `Optional` **position**: `number`

#### Inherited from

RequireField.position

#### Defined in

[packages/formula/src/tests/testType.ts:112](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L112)

___

### <a id="richtype" name="richtype"></a> richType

• `Optional` **richType**: [`VariableRichType`](../README.md#variablerichtype)

#### Inherited from

RequireField.richType

#### Defined in

[packages/formula/src/tests/testType.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L111)

___

### <a id="testcases" name="testcases"></a> testCases

• **testCases**: [`DependencyTestCase`<`T`\>, ...DependencyTestCase<T\>[]]

#### Defined in

[packages/formula/src/tests/testType.ts:171](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L171)

___

### <a id="todo" name="todo"></a> todo

• `Optional` **todo**: `string`

#### Inherited from

RequireField.todo

#### Defined in

[packages/formula/src/tests/testType.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L113)

___

### <a id="type" name="type"></a> type

• **type**: `T`

#### Defined in

[packages/formula/src/tests/testType.ts:170](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L170)

___

### <a id="variableid" name="variableid"></a> variableId

• `Optional` **variableId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

RequireField.variableId

#### Defined in

[packages/formula/src/tests/testType.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L109)
