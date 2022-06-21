# Interface: SuccessParseResult

## Hierarchy

- [`BaseParseResult`](BaseParseResult.md)

  ↳ **`SuccessParseResult`**

## Table of contents

### Properties

- [completions](SuccessParseResult.md#completions)
- [errorMessages](SuccessParseResult.md#errormessages)
- [errorType](SuccessParseResult.md#errortype)
- [expressionType](SuccessParseResult.md#expressiontype)
- [inputImage](SuccessParseResult.md#inputimage)
- [parseImage](SuccessParseResult.md#parseimage)
- [success](SuccessParseResult.md#success)
- [variableParseResult](SuccessParseResult.md#variableparseresult)

## Properties

### <a id="completions" name="completions"></a> completions

• **completions**: [`Completion`](../README.md#completion)[]

#### Inherited from

[BaseParseResult](BaseParseResult.md).[completions](BaseParseResult.md#completions)

#### Defined in

[packages/formula/src/grammar/core.ts:39](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L39)

___

### <a id="errormessages" name="errormessages"></a> errorMessages

• **errorMessages**: []

#### Overrides

[BaseParseResult](BaseParseResult.md).[errorMessages](BaseParseResult.md#errormessages)

#### Defined in

[packages/formula/src/grammar/core.ts:44](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L44)

___

### <a id="errortype" name="errortype"></a> errorType

• `Optional` **errorType**: [`ParseErrorType`](../README.md#parseerrortype)

#### Inherited from

[BaseParseResult](BaseParseResult.md).[errorType](BaseParseResult.md#errortype)

#### Defined in

[packages/formula/src/grammar/core.ts:37](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L37)

___

### <a id="expressiontype" name="expressiontype"></a> expressionType

• **expressionType**: [`FormulaCheckType`](../README.md#formulachecktype)

#### Inherited from

[BaseParseResult](BaseParseResult.md).[expressionType](BaseParseResult.md#expressiontype)

#### Defined in

[packages/formula/src/grammar/core.ts:36](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L36)

___

### <a id="inputimage" name="inputimage"></a> inputImage

• **inputImage**: `string`

#### Inherited from

[BaseParseResult](BaseParseResult.md).[inputImage](BaseParseResult.md#inputimage)

#### Defined in

[packages/formula/src/grammar/core.ts:34](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L34)

___

### <a id="parseimage" name="parseimage"></a> parseImage

• **parseImage**: `string`

#### Inherited from

[BaseParseResult](BaseParseResult.md).[parseImage](BaseParseResult.md#parseimage)

#### Defined in

[packages/formula/src/grammar/core.ts:35](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L35)

___

### <a id="success" name="success"></a> success

• **success**: ``true``

#### Overrides

[BaseParseResult](BaseParseResult.md).[success](BaseParseResult.md#success)

#### Defined in

[packages/formula/src/grammar/core.ts:43](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L43)

___

### <a id="variableparseresult" name="variableparseresult"></a> variableParseResult

• **variableParseResult**: [`VariableParseResult`](VariableParseResult.md) & { `cst`: `CstNode` ; `kind`: ``"constant"`` \| ``"expression"`` \| ``"unknown"`` ; `valid`: ``true``  }

#### Overrides

[BaseParseResult](BaseParseResult.md).[variableParseResult](BaseParseResult.md#variableparseresult)

#### Defined in

[packages/formula/src/grammar/core.ts:45](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L45)
