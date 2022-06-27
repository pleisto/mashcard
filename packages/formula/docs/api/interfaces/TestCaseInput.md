# Interface: TestCaseInput

## Table of contents

### Properties

- [completeTestCases](TestCaseInput.md#completetestcases)
- [dependencyTestCases](TestCaseInput.md#dependencytestcases)
- [errorTestCases](TestCaseInput.md#errortestcases)
- [eventTestCases](TestCaseInput.md#eventtestcases)
- [formatTestCases](TestCaseInput.md#formattestcases)
- [options](TestCaseInput.md#options)
- [successTestCases](TestCaseInput.md#successtestcases)

## Properties

### <a id="completetestcases" name="completetestcases"></a> completeTestCases

• **completeTestCases**: `RequireField`<`CompleteTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:236](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L236)

---

### <a id="dependencytestcases" name="dependencytestcases"></a> dependencyTestCases

• **dependencyTestCases**: `RequireField`<`AnyDependencyTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:239](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L239)

---

### <a id="errortestcases" name="errortestcases"></a> errorTestCases

• **errorTestCases**: `RequireField`<`ErrorTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:235](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L235)

---

### <a id="eventtestcases" name="eventtestcases"></a> eventTestCases

• **eventTestCases**: `RequireField`<[`EventTestCaseType`](EventTestCaseType.md), `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:238](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L238)

---

### <a id="formattestcases" name="formattestcases"></a> formatTestCases

• **formatTestCases**: `RequireField`<`FormatTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:237](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L237)

---

### <a id="options" name="options"></a> options

• **options**: `RequireField`<[`MakeContextOptions`](MakeContextOptions.md), `"initializeOptions"` \| `"pages"`\>

#### Defined in

[packages/formula/src/tests/testType.ts:233](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L233)

---

### <a id="successtestcases" name="successtestcases"></a> successTestCases

• **successTestCases**: `RequireField`<`SuccessTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:234](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L234)
