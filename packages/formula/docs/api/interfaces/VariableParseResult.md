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

[packages/formula/src/type/index.ts:688](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L688)

___

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[]

#### Defined in

[packages/formula/src/type/index.ts:700](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L700)

___

### <a id="codefragments" name="codefragments"></a> codeFragments

• **codeFragments**: [`CodeFragment`](../README.md#codefragment)[]

#### Defined in

[packages/formula/src/type/index.ts:696](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L696)

___

### <a id="cst" name="cst"></a> cst

• **cst**: `undefined` \| `CstNode`

#### Defined in

[packages/formula/src/type/index.ts:695](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L695)

___

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Defined in

[packages/formula/src/type/index.ts:686](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L686)

___

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:689](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L689)

___

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>[]

#### Defined in

[packages/formula/src/type/index.ts:701](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L701)

___

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:697](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L697)

___

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[]

#### Defined in

[packages/formula/src/type/index.ts:702](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L702)

___

### <a id="kind" name="kind"></a> kind

• **kind**: [`VariableKind`](../README.md#variablekind)

#### Defined in

[packages/formula/src/type/index.ts:692](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L692)

___

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](NameDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:698](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L698)

___

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:691](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L691)

___

### <a id="position" name="position"></a> position

• **position**: `number`

#### Defined in

[packages/formula/src/type/index.ts:687](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L687)

___

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:690](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L690)

___

### <a id="valid" name="valid"></a> valid

• **valid**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:694](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L694)

___

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:699](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L699)

___

### <a id="version" name="version"></a> version

• **version**: `number`

#### Defined in

[packages/formula/src/type/index.ts:693](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L693)
