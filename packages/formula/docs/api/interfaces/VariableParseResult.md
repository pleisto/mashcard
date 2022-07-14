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

[packages/formula/src/type/index.ts:708](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L708)

___

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[]

#### Defined in

[packages/formula/src/type/index.ts:720](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L720)

___

### <a id="codefragments" name="codefragments"></a> codeFragments

• **codeFragments**: [`CodeFragmentWithIndex`](../README.md#codefragmentwithindex)[]

#### Defined in

[packages/formula/src/type/index.ts:716](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L716)

___

### <a id="cst" name="cst"></a> cst

• **cst**: `undefined` \| `CstNode`

#### Defined in

[packages/formula/src/type/index.ts:715](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L715)

___

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Defined in

[packages/formula/src/type/index.ts:706](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L706)

___

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:709](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L709)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>[]

#### Defined in

[packages/formula/src/type/index.ts:721](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L721)

___

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:717](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L717)

___

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[]

#### Defined in

[packages/formula/src/type/index.ts:722](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L722)

___

### <a id="kind" name="kind"></a> kind

• **kind**: [`VariableKind`](../README.md#variablekind)

#### Defined in

[packages/formula/src/type/index.ts:712](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L712)

___

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](NameDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:718](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L718)

___

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:711](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L711)

___

### <a id="position" name="position"></a> position

• **position**: `number`

#### Defined in

[packages/formula/src/type/index.ts:707](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L707)

___

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:710](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L710)

___

### <a id="valid" name="valid"></a> valid

• **valid**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:714](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L714)

___

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:719](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L719)

___

### <a id="version" name="version"></a> version

• **version**: `number`

#### Defined in

[packages/formula/src/type/index.ts:713](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L713)
