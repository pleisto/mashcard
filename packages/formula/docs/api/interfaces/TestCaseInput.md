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

[packages/formula/src/tests/testType.ts:246](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L246)

---

### <a id="dependencytestcases" name="dependencytestcases"></a> dependencyTestCases

• **dependencyTestCases**: `RequireField`<`AnyDependencyTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:249](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L249)

---

### <a id="errortestcases" name="errortestcases"></a> errorTestCases

• **errorTestCases**: `RequireField`<`ErrorTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:245](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L245)

---

### <a id="eventtestcases" name="eventtestcases"></a> eventTestCases

• **eventTestCases**: `RequireField`<[`EventTestCaseType`](EventTestCaseType.md), `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:248](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L248)

---

### <a id="formattestcases" name="formattestcases"></a> formatTestCases

• **formatTestCases**: `RequireField`<`FormatTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:247](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L247)

---

### <a id="options" name="options"></a> options

• **options**: `RequireField`<[`MakeContextOptions`](MakeContextOptions.md), `"initializeOptions"` \| `"pages"`\>

#### Defined in

[packages/formula/src/tests/testType.ts:243](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L243)

---

### <a id="successtestcases" name="successtestcases"></a> successTestCases

• **successTestCases**: `RequireField`<`SuccessTestCaseType`, `"groupOptions"` \| `"jestTitle"`\>[]

#### Defined in

[packages/formula/src/tests/testType.ts:244](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L244)
