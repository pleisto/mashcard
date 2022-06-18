# Interface: LiteralParseResult

## Hierarchy

- [`BaseParseResult`](BaseParseResult.md)

  ↳ **`LiteralParseResult`**

## Table of contents

### Properties

- [completions](LiteralParseResult.md#completions)
- [errorMessages](LiteralParseResult.md#errormessages)
- [errorType](LiteralParseResult.md#errortype)
- [expressionType](LiteralParseResult.md#expressiontype)
- [inputImage](LiteralParseResult.md#inputimage)
- [parseImage](LiteralParseResult.md#parseimage)
- [success](LiteralParseResult.md#success)
- [variableParseResult](LiteralParseResult.md#variableparseresult)

## Properties

### <a id="completions" name="completions"></a> completions

• **completions**: [`Completion`](../README.md#completion)[]

#### Inherited from

[BaseParseResult](BaseParseResult.md).[completions](BaseParseResult.md#completions)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:39](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L39)

___

### <a id="errormessages" name="errormessages"></a> errorMessages

• **errorMessages**: []

#### Overrides

[BaseParseResult](BaseParseResult.md).[errorMessages](BaseParseResult.md#errormessages)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:54](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L54)

___

### <a id="errortype" name="errortype"></a> errorType

• `Optional` **errorType**: [`ParseErrorType`](../README.md#parseerrortype)

#### Inherited from

[BaseParseResult](BaseParseResult.md).[errorType](BaseParseResult.md#errortype)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:37](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L37)

___

### <a id="expressiontype" name="expressiontype"></a> expressionType

• **expressionType**: [`FormulaCheckType`](../README.md#formulachecktype)

#### Inherited from

[BaseParseResult](BaseParseResult.md).[expressionType](BaseParseResult.md#expressiontype)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:36](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L36)

___

### <a id="inputimage" name="inputimage"></a> inputImage

• **inputImage**: `string`

#### Inherited from

[BaseParseResult](BaseParseResult.md).[inputImage](BaseParseResult.md#inputimage)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:34](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L34)

___

### <a id="parseimage" name="parseimage"></a> parseImage

• **parseImage**: `string`

#### Inherited from

[BaseParseResult](BaseParseResult.md).[parseImage](BaseParseResult.md#parseimage)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:35](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L35)

___

### <a id="success" name="success"></a> success

• **success**: ``true``

#### Overrides

[BaseParseResult](BaseParseResult.md).[success](BaseParseResult.md#success)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:53](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L53)

___

### <a id="variableparseresult" name="variableparseresult"></a> variableParseResult

• **variableParseResult**: [`VariableParseResult`](VariableParseResult.md) & { `cst`: `undefined` ; `kind`: ``"literal"`` ; `valid`: ``true``  }

#### Overrides

[BaseParseResult](BaseParseResult.md).[variableParseResult](BaseParseResult.md#variableparseresult)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:55](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L55)
