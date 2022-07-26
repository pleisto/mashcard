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

[packages/formula/src/type/index.ts:734](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L734)

---

### <a id="blockdependencies" name="blockdependencies"></a> blockDependencies

• **blockDependencies**: `string`[]

#### Defined in

[packages/formula/src/type/index.ts:746](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L746)

---

### <a id="codefragments" name="codefragments"></a> codeFragments

• **codeFragments**: [`CodeFragmentWithIndex`](../README.md#codefragmentwithindex)[]

#### Defined in

[packages/formula/src/type/index.ts:742](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L742)

---

### <a id="cst" name="cst"></a> cst

• **cst**: `undefined` \| `CstNode`

#### Defined in

[packages/formula/src/type/index.ts:741](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L741)

---

### <a id="definition" name="definition"></a> definition

• **definition**: `string`

#### Defined in

[packages/formula/src/type/index.ts:732](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L732)

---

### <a id="effect" name="effect"></a> effect

• **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:735](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L735)

---

### <a id="eventdependencies" name="eventdependencies"></a> eventDependencies

• **eventDependencies**: [`EventDependency`](EventDependency.md)<[`FormulaEventPayload`](FormulaEventPayload.md)<`any`\>\>[]

#### Defined in

[packages/formula/src/type/index.ts:747](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L747)

---

### <a id="flattenvariabledependencies" name="flattenvariabledependencies"></a> flattenVariableDependencies

• **flattenVariableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:743](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L743)

---

### <a id="functiondependencies" name="functiondependencies"></a> functionDependencies

• **functionDependencies**: [`AnyFunctionClauseWithKeyAndExample`](../README.md#anyfunctionclausewithkeyandexample)[]

#### Defined in

[packages/formula/src/type/index.ts:748](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L748)

---

### <a id="kind" name="kind"></a> kind

• **kind**: [`VariableKind`](../README.md#variablekind)

#### Defined in

[packages/formula/src/type/index.ts:738](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L738)

---

### <a id="namedependencies" name="namedependencies"></a> nameDependencies

• **nameDependencies**: [`NameDependency`](NameDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:744](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L744)

---

### <a id="persist" name="persist"></a> persist

• **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:737](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L737)

---

### <a id="position" name="position"></a> position

• **position**: `number`

#### Defined in

[packages/formula/src/type/index.ts:733](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L733)

---

### <a id="pure" name="pure"></a> pure

• **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:736](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L736)

---

### <a id="valid" name="valid"></a> valid

• **valid**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:740](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L740)

---

### <a id="variabledependencies" name="variabledependencies"></a> variableDependencies

• **variableDependencies**: [`VariableDependency`](VariableDependency.md)[]

#### Defined in

[packages/formula/src/type/index.ts:745](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L745)

---

### <a id="version" name="version"></a> version

• **version**: `number`

#### Defined in

[packages/formula/src/type/index.ts:739](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L739)
