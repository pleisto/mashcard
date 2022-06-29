# Interface: BaseParseResult

## Hierarchy

- **`BaseParseResult`**

  ↳ [`SuccessParseResult`](SuccessParseResult.md)

  ↳ [`LiteralParseResult`](LiteralParseResult.md)

  ↳ [`ErrorParseResult`](ErrorParseResult.md)

## Table of contents

### Properties

- [completions](BaseParseResult.md#completions)
- [errorMessages](BaseParseResult.md#errormessages)
- [errorType](BaseParseResult.md#errortype)
- [expressionType](BaseParseResult.md#expressiontype)
- [inputImage](BaseParseResult.md#inputimage)
- [parseImage](BaseParseResult.md#parseimage)
- [success](BaseParseResult.md#success)
- [variableParseResult](BaseParseResult.md#variableparseresult)

## Properties

### <a id="completions" name="completions"></a> completions

• **completions**: [`Completion`](../README.md#completion)[]

#### Defined in

[packages/formula/src/grammar/core.ts:39](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L39)

---

### <a id="errormessages" name="errormessages"></a> errorMessages

• **errorMessages**: [`ErrorMessage`](ErrorMessage.md)[]

#### Defined in

[packages/formula/src/grammar/core.ts:38](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L38)

---

### <a id="errortype" name="errortype"></a> errorType

• `Optional` **errorType**: [`ParseErrorType`](../README.md#parseerrortype)

#### Defined in

[packages/formula/src/grammar/core.ts:37](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L37)

---

### <a id="expressiontype" name="expressiontype"></a> expressionType

• **expressionType**: [`FormulaCheckType`](../README.md#formulachecktype)

#### Defined in

[packages/formula/src/grammar/core.ts:36](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L36)

---

### <a id="inputimage" name="inputimage"></a> inputImage

• **inputImage**: `string`

#### Defined in

[packages/formula/src/grammar/core.ts:34](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L34)

---

### <a id="parseimage" name="parseimage"></a> parseImage

• **parseImage**: `string`

#### Defined in

[packages/formula/src/grammar/core.ts:35](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L35)

---

### <a id="success" name="success"></a> success

• **success**: `boolean`

#### Defined in

[packages/formula/src/grammar/core.ts:33](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L33)

---

### <a id="variableparseresult" name="variableparseresult"></a> variableParseResult

• **variableParseResult**: [`VariableParseResult`](VariableParseResult.md)

#### Defined in

[packages/formula/src/grammar/core.ts:32](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L32)
