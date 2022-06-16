# Interface: VariableParseResult

## Table of contents

### Properties

- [async](VariableParseResult.md#async)
- [blockDependencies](VariableParseResult.md#blockdependencies)
- [codeFragments](VariableParseResult.md#codefragments)
- [cst](VariableParseResult.md#cst)
- [definition](VariableParseResult.md#definition)
- [effect](VariableParseResult.md#effect)
- [eventDependencies](VariableParseResult.md#eventdependencies)
- [flattenVariableDependencies](VariableParseResult.md#flattenvariabledependencies)
- [functionDependencies](VariableParseResult.md#functiondependencies)
- [kind](VariableParseResult.md#kind)
- [nameDependencies](VariableParseResult.md#namedependencies)
- [persist](VariableParseResult.md#persist)
- [position](VariableParseResult.md#position)
- [pure](VariableParseResult.md#pure)
- [valid](VariableParseResult.md#valid)
- [variableDependencies](VariableParseResult.md#variabledependencies)
- [version](VariableParseResult.md#version)

## Properties

### <a id="async" name="async"></a> async

• **async**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:826](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L826)

___

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:838](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L838)

___

### <a id="codefragments" name="codefragments"></a> codeFragments

• **codeFragments**: [`CodeFragment`](../README.md#codefragment)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:834](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L834)

___

### <a id="cst" name="cst"></a> cst

• **cst**: `undefined` \| `CstNode`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:833](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L833)

___

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:824](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L824)

___

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:827](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L827)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:839](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L839)

___

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:835](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L835)

___

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:840](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L840)

___

### <a id="kind" name="kind"></a> kind

• **kind**: [`VariableKind`](../README.md#variablekind)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:830](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L830)

___

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](NameDependency.md)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:836](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L836)

___

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:829](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L829)

___

### <a id="position" name="position"></a> position

• **position**: `number`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:825](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L825)

___

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:828](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L828)

___

### <a id="valid" name="valid"></a> valid

• **valid**: `boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:832](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L832)

___

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:837](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L837)

___

### <a id="version" name="version"></a> version

• **version**: `number`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:831](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L831)
