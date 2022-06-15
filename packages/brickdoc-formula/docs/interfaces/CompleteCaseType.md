# Interface: CompleteCaseType

## Hierarchy

- [`BaseTestCase`](BaseTestCase.md)<{}\>

  ↳ **`CompleteCaseType`**

## Table of contents

### Properties

- [completes](CompleteCaseType.md#completes)
- [currentGroupOption](CompleteCaseType.md#currentgroupoption)
- [definition](CompleteCaseType.md#definition)
- [definitionWithCursor](CompleteCaseType.md#definitionwithcursor)
- [expected](CompleteCaseType.md#expected)
- [firstCompletion](CompleteCaseType.md#firstcompletion)
- [firstNonSpaceCodeFragment](CompleteCaseType.md#firstnonspacecodefragment)
- [groupOptions](CompleteCaseType.md#groupoptions)
- [jestTitle](CompleteCaseType.md#jesttitle)
- [label](CompleteCaseType.md#label)
- [name](CompleteCaseType.md#name)
- [namespaceId](CompleteCaseType.md#namespaceid)
- [newAbbrevInput](CompleteCaseType.md#newabbrevinput)
- [position](CompleteCaseType.md#position)
- [richType](CompleteCaseType.md#richtype)
- [secondNonSpaceCodeFragment](CompleteCaseType.md#secondnonspacecodefragment)
- [thirdNonSpaceCodeFragment](CompleteCaseType.md#thirdnonspacecodefragment)
- [todo](CompleteCaseType.md#todo)
- [variableId](CompleteCaseType.md#variableid)

## Properties

### <a id="completes" name="completes"></a> completes

• **completes**: [`CompleteInput`](CompleteInput.md)[]

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:133](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L133)

___

### <a id="currentgroupoption" name="currentgroupoption"></a> currentGroupOption

• `Optional` **currentGroupOption**: `any`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[currentGroupOption](BaseTestCase.md#currentgroupoption)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:104](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L104)

___

### <a id="definition" name="definition"></a> definition

• `Optional` **definition**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[definition](BaseTestCase.md#definition)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:101](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L101)

___

### <a id="definitionwithcursor" name="definitionwithcursor"></a> definitionWithCursor

• **definitionWithCursor**: `string`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:128](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L128)

___

### <a id="expected" name="expected"></a> expected

• `Optional` **expected**: [`ExpectedType`<{}\>, ...ExpectedType<Object\>[]]

#### Inherited from

[BaseTestCase](BaseTestCase.md).[expected](BaseTestCase.md#expected)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:106](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L106)

___

### <a id="firstcompletion" name="firstcompletion"></a> firstCompletion

• **firstCompletion**: `Partial`<[`Completion`](../README.md#completion)\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:129](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L129)

___

### <a id="firstnonspacecodefragment" name="firstnonspacecodefragment"></a> firstNonSpaceCodeFragment

• `Optional` **firstNonSpaceCodeFragment**: `Partial`<[`CodeFragment`](../README.md#codefragment)\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:130](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L130)

___

### <a id="groupoptions" name="groupoptions"></a> groupOptions

• `Optional` **groupOptions**: `GroupOption`[]

#### Inherited from

[BaseTestCase](BaseTestCase.md).[groupOptions](BaseTestCase.md#groupoptions)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:103](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L103)

___

### <a id="jesttitle" name="jesttitle"></a> jestTitle

• `Optional` **jestTitle**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[jestTitle](BaseTestCase.md#jesttitle)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:113](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L113)

___

### <a id="label" name="label"></a> label

• `Optional` **label**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[label](BaseTestCase.md#label)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:105](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L105)

___

### <a id="name" name="name"></a> name

• `Optional` **name**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[name](BaseTestCase.md#name)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:109](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L109)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` **namespaceId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

[BaseTestCase](BaseTestCase.md).[namespaceId](BaseTestCase.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:107](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L107)

___

### <a id="newabbrevinput" name="newabbrevinput"></a> newAbbrevInput

• `Optional` **newAbbrevInput**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[newAbbrevInput](BaseTestCase.md#newabbrevinput)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:102](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L102)

___

### <a id="position" name="position"></a> position

• `Optional` **position**: `number`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[position](BaseTestCase.md#position)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:111](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L111)

___

### <a id="richtype" name="richtype"></a> richType

• `Optional` **richType**: [`VariableRichType`](../README.md#variablerichtype)

#### Inherited from

[BaseTestCase](BaseTestCase.md).[richType](BaseTestCase.md#richtype)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:110](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L110)

___

### <a id="secondnonspacecodefragment" name="secondnonspacecodefragment"></a> secondNonSpaceCodeFragment

• `Optional` **secondNonSpaceCodeFragment**: `Partial`<[`CodeFragment`](../README.md#codefragment)\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:131](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L131)

___

### <a id="thirdnonspacecodefragment" name="thirdnonspacecodefragment"></a> thirdNonSpaceCodeFragment

• `Optional` **thirdNonSpaceCodeFragment**: `Partial`<[`CodeFragment`](../README.md#codefragment)\>

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:132](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L132)

___

### <a id="todo" name="todo"></a> todo

• `Optional` **todo**: `string`

#### Inherited from

[BaseTestCase](BaseTestCase.md).[todo](BaseTestCase.md#todo)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:112](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L112)

___

### <a id="variableid" name="variableid"></a> variableId

• `Optional` **variableId**: [`MockedUUIDV4`](../README.md#mockeduuidv4)

#### Inherited from

[BaseTestCase](BaseTestCase.md).[variableId](BaseTestCase.md#variableid)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:108](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L108)
