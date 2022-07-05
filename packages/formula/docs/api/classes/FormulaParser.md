# Class: FormulaParser

## Hierarchy

- `CstParser`

  ↳ **`FormulaParser`**

## Table of contents

### Constructors

- [constructor](FormulaParser.md#constructor)

### Properties

- [Arguments](FormulaParser.md#arguments)
- [BooleanLiteralExpression](FormulaParser.md#booleanliteralexpression)
- [FunctionCall](FormulaParser.md#functioncall)
- [NumberLiteralExpression](FormulaParser.md#numberliteralexpression)
- [RECORDING_PHASE](FormulaParser.md#recording_phase)
- [accessExpression](FormulaParser.md#accessexpression)
- [additionExpression](FormulaParser.md#additionexpression)
- [arrayExpression](FormulaParser.md#arrayexpression)
- [atomicExpression](FormulaParser.md#atomicexpression)
- [blockExpression](FormulaParser.md#blockexpression)
- [chainExpression](FormulaParser.md#chainexpression)
- [combineExpression](FormulaParser.md#combineexpression)
- [compareExpression](FormulaParser.md#compareexpression)
- [concatExpression](FormulaParser.md#concatexpression)
- [constantExpression](FormulaParser.md#constantexpression)
- [equalCompareExpression](FormulaParser.md#equalcompareexpression)
- [errors](FormulaParser.md#errors)
- [expression](FormulaParser.md#expression)
- [inExpression](FormulaParser.md#inexpression)
- [input](FormulaParser.md#input)
- [keyExpression](FormulaParser.md#keyexpression)
- [lazyVariableExpression](FormulaParser.md#lazyvariableexpression)
- [multiplicationExpression](FormulaParser.md#multiplicationexpression)
- [notExpression](FormulaParser.md#notexpression)
- [parenthesisExpression](FormulaParser.md#parenthesisexpression)
- [predicateExpression](FormulaParser.md#predicateexpression)
- [rangeExpression](FormulaParser.md#rangeexpression)
- [recordExpression](FormulaParser.md#recordexpression)
- [recordField](FormulaParser.md#recordfield)
- [referenceExpression](FormulaParser.md#referenceexpression)
- [simpleAtomicExpression](FormulaParser.md#simpleatomicexpression)
- [startExpression](FormulaParser.md#startexpression)

### Methods

- [ACTION](FormulaParser.md#action)
- [AT_LEAST_ONE](FormulaParser.md#at_least_one)
- [AT_LEAST_ONE_SEP](FormulaParser.md#at_least_one_sep)
- [BACKTRACK](FormulaParser.md#backtrack)
- [CONSUME](FormulaParser.md#consume)
- [LA](FormulaParser.md#la)
- [MANY](FormulaParser.md#many)
- [MANY_SEP](FormulaParser.md#many_sep)
- [OPTION](FormulaParser.md#option)
- [OR](FormulaParser.md#or)
- [OR1](FormulaParser.md#or1)
- [OR2](FormulaParser.md#or2)
- [OR3](FormulaParser.md#or3)
- [OR4](FormulaParser.md#or4)
- [OR5](FormulaParser.md#or5)
- [OR6](FormulaParser.md#or6)
- [OR7](FormulaParser.md#or7)
- [OR8](FormulaParser.md#or8)
- [OR9](FormulaParser.md#or9)
- [OVERRIDE_RULE](FormulaParser.md#override_rule)
- [RULE](FormulaParser.md#rule)
- [SKIP_TOKEN](FormulaParser.md#skip_token)
- [SUBRULE](FormulaParser.md#subrule)
- [atLeastOne](FormulaParser.md#atleastone)
- [canTokenTypeBeDeletedInRecovery](FormulaParser.md#cantokentypebedeletedinrecovery)
- [canTokenTypeBeInsertedInRecovery](FormulaParser.md#cantokentypebeinsertedinrecovery)
- [computeContentAssist](FormulaParser.md#computecontentassist)
- [consume](FormulaParser.md#consume-1)
- [getBaseCstVisitorConstructor](FormulaParser.md#getbasecstvisitorconstructor)
- [getBaseCstVisitorConstructorWithDefaults](FormulaParser.md#getbasecstvisitorconstructorwithdefaults)
- [getGAstProductions](FormulaParser.md#getgastproductions)
- [getNextPossibleTokenTypes](FormulaParser.md#getnextpossibletokentypes)
- [getSerializedGastProductions](FormulaParser.md#getserializedgastproductions)
- [getTokenToInsert](FormulaParser.md#gettokentoinsert)
- [many](FormulaParser.md#many-1)
- [option](FormulaParser.md#option-1)
- [or](FormulaParser.md#or-1)
- [performSelfAnalysis](FormulaParser.md#performselfanalysis)
- [reset](FormulaParser.md#reset)
- [subrule](FormulaParser.md#subrule-1)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new FormulaParser**()

#### Overrides

CstParser.constructor

## Properties

### <a id="arguments" name="arguments"></a> Arguments

• **Arguments**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:318](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L318)

---

### <a id="booleanliteralexpression" name="booleanliteralexpression"></a> BooleanLiteralExpression

• **BooleanLiteralExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:300](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L300)

---

### <a id="functioncall" name="functioncall"></a> FunctionCall

• **FunctionCall**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:304](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L304)

---

### <a id="numberliteralexpression" name="numberliteralexpression"></a> NumberLiteralExpression

• **NumberLiteralExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:289](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L289)

---

### <a id="recording_phase" name="recording_phase"></a> RECORDING_PHASE

• **RECORDING_PHASE**: `boolean`

Flag indicating the Parser is at the recording phase.
Can be used to implement methods similar to BaseParser.ACTION
Or any other logic to requires knowledge of the recording phase.
See:

- https://chevrotain.io/docs/guide/internals.html#grammar-recording
  to learn more on the recording phase and how Chevrotain works.

#### Inherited from

CstParser.RECORDING_PHASE

#### Defined in

node_modules/@chevrotain/types/api.d.ts:40

---

### <a id="accessexpression" name="accessexpression"></a> accessExpression

• **accessExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:149](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L149)

---

### <a id="additionexpression" name="additionexpression"></a> additionExpression

• **additionExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:133](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L133)

---

### <a id="arrayexpression" name="arrayexpression"></a> arrayExpression

• **arrayExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:215](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L215)

---

### <a id="atomicexpression" name="atomicexpression"></a> atomicExpression

• **atomicExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:206](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L206)

---

### <a id="blockexpression" name="blockexpression"></a> blockExpression

• **blockExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:267](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L267)

---

### <a id="chainexpression" name="chainexpression"></a> chainExpression

• **chainExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:174](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L174)

---

### <a id="combineexpression" name="combineexpression"></a> combineExpression

• **combineExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:93](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L93)

---

### <a id="compareexpression" name="compareexpression"></a> compareExpression

• **compareExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L109)

---

### <a id="concatexpression" name="concatexpression"></a> concatExpression

• **concatExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:125](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L125)

---

### <a id="constantexpression" name="constantexpression"></a> constantExpression

• **constantExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:272](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L272)

---

### <a id="equalcompareexpression" name="equalcompareexpression"></a> equalCompareExpression

• **equalCompareExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:101](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L101)

---

### <a id="errors" name="errors"></a> errors

• **errors**: `IRecognitionException`[]

#### Inherited from

CstParser.errors

#### Defined in

node_modules/@chevrotain/types/api.d.ts:30

---

### <a id="expression" name="expression"></a> expression

• **expression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:85](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L85)

---

### <a id="inexpression" name="inexpression"></a> inExpression

• **inExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:117](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L117)

---

### <a id="input" name="input"></a> input

• **input**: `IToken`[]

#### Inherited from

CstParser.input

#### Defined in

node_modules/@chevrotain/types/api.d.ts:857

---

### <a id="keyexpression" name="keyexpression"></a> keyExpression

• **keyExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:186](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L186)

---

### <a id="lazyvariableexpression" name="lazyvariableexpression"></a> lazyVariableExpression

• **lazyVariableExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:256](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L256)

---

### <a id="multiplicationexpression" name="multiplicationexpression"></a> multiplicationExpression

• **multiplicationExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:141](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L141)

---

### <a id="notexpression" name="notexpression"></a> notExpression

• **notExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:158](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L158)

---

### <a id="parenthesisexpression" name="parenthesisexpression"></a> parenthesisExpression

• **parenthesisExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:281](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L281)

---

### <a id="predicateexpression" name="predicateexpression"></a> predicateExpression

• **predicateExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:242](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L242)

---

### <a id="rangeexpression" name="rangeexpression"></a> rangeExpression

• **rangeExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:166](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L166)

---

### <a id="recordexpression" name="recordexpression"></a> recordExpression

• **recordExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:223](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L223)

---

### <a id="recordfield" name="recordfield"></a> recordField

• **recordField**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:236](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L236)

---

### <a id="referenceexpression" name="referenceexpression"></a> referenceExpression

• **referenceExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:251](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L251)

---

### <a id="simpleatomicexpression" name="simpleatomicexpression"></a> simpleAtomicExpression

• **simpleAtomicExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:194](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L194)

---

### <a id="startexpression" name="startexpression"></a> startExpression

• **startExpression**: `ParserMethod`<[], `CstNode`\>

#### Defined in

[packages/formula/src/grammar/parser.ts:80](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L80)

## Methods

### <a id="action" name="action"></a> ACTION

▸ `Protected` **ACTION**<`T`\>(`impl`): `T`

The Semantic Actions wrapper.
Should be used to wrap semantic actions that either:

- May fail when executing in "recording phase".
- Have global side effects that should be avoided during "recording phase".

For more information see:

- https://chevrotain.io/docs/guide/internals.html#grammar-recording

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `impl` | () => `T` |

#### Returns

`T`

#### Inherited from

CstParser.ACTION

---

### <a id="at_least_one" name="at_least_one"></a> AT_LEAST_ONE

▸ `Protected` **AT_LEAST_ONE**(`actionORMethodDef`): `void`

Convenience method, same as MANY but the repetition is of one or more.
failing to match at least one repetition will result in a parsing error and
cause a parsing error.

**`See`**

MANY

#### Parameters

| Name                | Type                                                      | Description                                                                                                                          |
| :------------------ | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `actionORMethodDef` | `GrammarAction`<`any`\> \| `DSLMethodOptsWithErr`<`any`\> | The grammar action to optionally invoke multiple times or an "OPTIONS" object describing the grammar action and optional properties. |

#### Returns

`void`

#### Inherited from

CstParser.AT_LEAST_ONE

---

### <a id="at_least_one_sep" name="at_least_one_sep"></a> AT_LEAST_ONE_SEP

▸ `Protected` **AT_LEAST_ONE_SEP**(`options`): `void`

Convenience method, same as MANY_SEP but the repetition is of one or more.
failing to match at least one repetition will result in a parsing error and
cause the parser to attempt error recovery.

Note that an additional optional property ERR_MSG can be used to provide custom error messages.

**`See`**

MANY_SEP

#### Parameters

| Name      | Type                              | Description                                                                           |
| :-------- | :-------------------------------- | :------------------------------------------------------------------------------------ |
| `options` | `AtLeastOneSepMethodOpts`<`any`\> | An object defining the grammar of each iteration and the separator between iterations |

#### Returns

`void`

#### Inherited from

CstParser.AT_LEAST_ONE_SEP

---

### <a id="backtrack" name="backtrack"></a> BACKTRACK

▸ `Protected` **BACKTRACK**<`T`\>(`grammarRule`, `args?`): () => `boolean`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                        | Description                                         |
| :------------ | :-------------------------- | :-------------------------------------------------- |
| `grammarRule` | (...`args`: `any`[]) => `T` | The rule to try and parse in backtracking mode.     |
| `args?`       | `any`[]                     | argument to be passed to the grammar rule execution |

#### Returns

`fn`

a lookahead function that will try to parse the given grammarRule and will return true if succeed.

▸ (): `boolean`

##### Returns

`boolean`

a lookahead function that will try to parse the given grammarRule and will return true if succeed.

#### Inherited from

CstParser.BACKTRACK

---

### <a id="consume" name="consume"></a> CONSUME

▸ `Protected` **CONSUME**(`tokType`, `options?`): `IToken`

A Parsing DSL method use to consume a single Token.
In EBNF terms this is equivalent to a Terminal.

A Token will be consumed, IFF the next token in the token vector matches `tokType`.
otherwise the parser may attempt to perform error recovery (if enabled).

The index in the method name indicates the unique occurrence of a terminal consumption
inside a the top level rule. What this means is that if a terminal appears
more than once in a single rule, each appearance must have a **different** index.

For example:

```
  this.RULE("qualifiedName", () => {
  this.CONSUME1(Identifier);
    this.MANY(() => {
      this.CONSUME1(Dot);
      // here we use CONSUME2 because the terminal
      // 'Identifier' has already appeared previously in the
      // the rule 'parseQualifiedName'
      this.CONSUME2(Identifier);
    });
  })
```

- See more details on the [unique suffixes requirement](http://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES).

#### Parameters

| Name       | Type                | Description                                            |
| :--------- | :------------------ | :----------------------------------------------------- |
| `tokType`  | `TokenType`         | The Type of the token to be consumed.                  |
| `options?` | `ConsumeMethodOpts` | optional properties to modify the behavior of CONSUME. |

#### Returns

`IToken`

#### Inherited from

CstParser.CONSUME

---

### <a id="la" name="la"></a> LA

▸ `Protected` **LA**(`howMuch`): `IToken`

Look-Ahead for the Token Vector
LA(1) is the next Token ahead.
LA(n) is the nth Token ahead.
LA(0) is the previously consumed Token.

Looking beyond the end of the Token Vector or before its begining
will return in an IToken of type EOF EOF.
This behavior can be used to avoid infinite loops.

This is often used to implement custom lookahead logic for GATES.
https://chevrotain.io/docs/features/gates.html

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `howMuch` | `number` |

#### Returns

`IToken`

#### Inherited from

CstParser.LA

---

### <a id="many" name="many"></a> MANY

▸ `Protected` **MANY**(`actionORMethodDef`): `void`

Parsing DSL method, that indicates a repetition of zero or more.
This is equivalent to EBNF repetition {...}.

Note that there are two syntax forms:

- Passing the grammar action directly:

  ```
    this.MANY(() => {
      this.CONSUME(Comma)
      this.CONSUME(Digit)
     })
  ```

- using an "options" object:
  ```
    this.MANY({
      GATE: predicateFunc,
      DEF: () => {
             this.CONSUME(Comma)
             this.CONSUME(Digit)
           }
    });
  ```

The optional 'GATE' property in "options" object form can be used to add constraints
to invoking the grammar action.

As in CONSUME the index in the method name indicates the occurrence
of the repetition production in it's top rule.

#### Parameters

| Name                | Type                                               | Description                                                                                                                          |
| :------------------ | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `actionORMethodDef` | `GrammarAction`<`any`\> \| `DSLMethodOpts`<`any`\> | The grammar action to optionally invoke multiple times or an "OPTIONS" object describing the grammar action and optional properties. |

#### Returns

`void`

#### Inherited from

CstParser.MANY

---

### <a id="many_sep" name="many_sep"></a> MANY_SEP

▸ `Protected` **MANY_SEP**(`options`): `void`

Parsing DSL method, that indicates a repetition of zero or more with a separator
Token between the repetitions.

Example:

```
    this.MANY_SEP({
        SEP:Comma,
        DEF: () => {
            this.CONSUME(Number};
            // ...
        })
```

Note that because this DSL method always requires more than one argument the options object is always required
and it is not possible to use a shorter form like in the MANY DSL method.

Note that for the purposes of deciding on whether or not another iteration exists
Only a single Token is examined (The separator). Therefore if the grammar being implemented is
so "crazy" to require multiple tokens to identify an item separator please use the more basic DSL methods
to implement it.

As in CONSUME the index in the method name indicates the occurrence
of the repetition production in it's top rule.

#### Parameters

| Name      | Type                        | Description                                                                           |
| :-------- | :-------------------------- | :------------------------------------------------------------------------------------ |
| `options` | `ManySepMethodOpts`<`any`\> | An object defining the grammar of each iteration and the separator between iterations |

#### Returns

`void`

#### Inherited from

CstParser.MANY_SEP

---

### <a id="option" name="option"></a> OPTION

▸ `Protected` **OPTION**<`OUT`\>(`actionORMethodDef`): `undefined` \| `OUT`

Parsing DSL Method that Indicates an Optional production.
in EBNF notation this is equivalent to: "[...]".

Note that there are two syntax forms:

- Passing the grammar action directly:

  ```
    this.OPTION(() => {
      this.CONSUME(Digit)}
    );
  ```

- using an "options" object:
  ```
    this.OPTION({
      GATE:predicateFunc,
      DEF: () => {
        this.CONSUME(Digit)
    }});
  ```

The optional 'GATE' property in "options" object form can be used to add constraints
to invoking the grammar action.

As in CONSUME the index in the method name indicates the occurrence
of the optional production in it's top rule.

#### Type parameters

| Name  |
| :---- |
| `OUT` |

#### Parameters

| Name                | Type                                               | Description                                                                                                                |
| :------------------ | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `actionORMethodDef` | `GrammarAction`<`OUT`\> \| `DSLMethodOpts`<`OUT`\> | The grammar action to optionally invoke once or an "OPTIONS" object describing the grammar action and optional properties. |

#### Returns

`undefined` \| `OUT`

The `GrammarAction` return value (OUT) if the optional syntax is encountered
or `undefined` if not.

#### Inherited from

CstParser.OPTION

---

### <a id="or" name="or"></a> OR

▸ `Protected` **OR**<`T`\>(`altsOrOpts`): `T`

Parsing DSL method that indicates a choice between a set of alternatives must be made.
This is equivalent to an EBNF alternation (A | B | C | D ...), except
that the alternatives are ordered like in a PEG grammar.
This means that the **first** matching alternative is always chosen.

There are several forms for the inner alternatives array:

- Passing alternatives array directly:

  ```
    this.OR([
      { ALT:() => { this.CONSUME(One) }},
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Passing alternative array directly with predicates (GATE):

  ```
    this.OR([
      { GATE: predicateFunc1, ALT:() => { this.CONSUME(One) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Two) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- These syntax forms can also be mixed:

  ```
    this.OR([
      {
        GATE: predicateFunc1,
        ALT:() => { this.CONSUME(One) }
      },
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Additionally an "options" object may be used:
  ```
    this.OR({
      DEF:[
        { ALT:() => { this.CONSUME(One) }},
        { ALT:() => { this.CONSUME(Two) }},
        { ALT:() => { this.CONSUME(Three) }}
      ],
      // OPTIONAL property
      ERR_MSG: "A Number"
    })
  ```

The 'predicateFuncX' in the long form can be used to add constraints to choosing the alternative.

As in CONSUME the index in the method name indicates the occurrence
of the alternation production in it's top rule.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                     | Description                                                                                       |
| :----------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `altsOrOpts` | `IOrAlt`<`T`\>[] \| `OrMethodOpts`<`T`\> | A set of alternatives or an "OPTIONS" object describing the alternatives and optional properties. |

#### Returns

`T`

The result of invoking the chosen alternative.

#### Inherited from

CstParser.OR

▸ `Protected` **OR**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR

---

### <a id="or1" name="or1"></a> OR1

▸ `Protected` **OR1**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR1

---

### <a id="or2" name="or2"></a> OR2

▸ `Protected` **OR2**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR2

---

### <a id="or3" name="or3"></a> OR3

▸ `Protected` **OR3**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR3

---

### <a id="or4" name="or4"></a> OR4

▸ `Protected` **OR4**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR4

---

### <a id="or5" name="or5"></a> OR5

▸ `Protected` **OR5**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR5

---

### <a id="or6" name="or6"></a> OR6

▸ `Protected` **OR6**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR6

---

### <a id="or7" name="or7"></a> OR7

▸ `Protected` **OR7**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR7

---

### <a id="or8" name="or8"></a> OR8

▸ `Protected` **OR8**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR8

---

### <a id="or9" name="or9"></a> OR9

▸ `Protected` **OR9**(`altsOrOpts`): `any`

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.OR9

---

### <a id="override_rule" name="override_rule"></a> OVERRIDE_RULE

▸ `Protected` **OVERRIDE_RULE**<`F`\>(`name`, `implementation`, `config?`): `ParserMethod`<`Parameters`<`F`\>, `CstNode`\>

Overrides a Grammar Rule
See usage example in: https://github.com/chevrotain/chevrotain/blob/master/examples/parser/versioning/versioning.js

#### Type parameters

| Name | Type                 |
| :--- | :------------------- |
| `F`  | extends () => `void` |

#### Parameters

| Name             | Type                      |
| :--------------- | :------------------------ |
| `name`           | `string`                  |
| `implementation` | `F`                       |
| `config?`        | `IRuleConfig`<`CstNode`\> |

#### Returns

`ParserMethod`<`Parameters`<`F`\>, `CstNode`\>

#### Inherited from

CstParser.OVERRIDE_RULE

---

### <a id="rule" name="rule"></a> RULE

▸ `Protected` **RULE**<`F`\>(`name`, `implementation`, `config?`): `ParserMethod`<`Parameters`<`F`\>, `CstNode`\>

Creates a Grammar Rule

Note that any parameters of your implementation must be optional as it will
be called without parameters during the grammar recording phase.

#### Type parameters

| Name | Type                 |
| :--- | :------------------- |
| `F`  | extends () => `void` |

#### Parameters

| Name             | Type                      |
| :--------------- | :------------------------ |
| `name`           | `string`                  |
| `implementation` | `F`                       |
| `config?`        | `IRuleConfig`<`CstNode`\> |

#### Returns

`ParserMethod`<`Parameters`<`F`\>, `CstNode`\>

#### Inherited from

CstParser.RULE

---

### <a id="skip_token" name="skip_token"></a> SKIP_TOKEN

▸ `Protected` **SKIP_TOKEN**(): `IToken`

#### Returns

`IToken`

#### Inherited from

CstParser.SKIP_TOKEN

---

### <a id="subrule" name="subrule"></a> SUBRULE

▸ `Protected` **SUBRULE**<`ARGS`\>(`ruleToCall`, `options?`): `CstNode`

The Parsing DSL Method is used by one rule to call another.
It is equivalent to a non-Terminal in EBNF notation.

This may seem redundant as it does not actually do much.
However using it is **mandatory** for all sub rule invocations.

Calling another rule without wrapping in SUBRULE(...)
will cause errors/mistakes in the Parser's self analysis phase,
which will lead to errors in error recovery/automatic lookahead calculation
and any other functionality relying on the Parser's self analysis
output.

As in CONSUME the index in the method name indicates the occurrence
of the sub rule invocation in its rule.

#### Type parameters

| Name   | Type                |
| :----- | :------------------ |
| `ARGS` | extends `unknown`[] |

#### Parameters

| Name         | Type                               |
| :----------- | :--------------------------------- |
| `ruleToCall` | `ParserMethod`<`ARGS`, `CstNode`\> |
| `options?`   | `SubruleMethodOpts`<`ARGS`\>       |

#### Returns

`CstNode`

#### Inherited from

CstParser.SUBRULE

---

### <a id="atleastone" name="atleastone"></a> atLeastOne

▸ `Protected` **atLeastOne**(`idx`, `actionORMethodDef`): `void`

Like `AT_LEAST_ONE` with the numerical suffix as a parameter, e.g:
atLeastOne(0, X) === AT_LEAST_ONE(X)
atLeastOne(1, X) === AT_LEAST_ONE1(X)
atLeastOne(2, X) === AT_LEAST_ONE2(X)
...

**`See`**

AT_LEAST_ONE

#### Parameters

| Name                | Type                                                      |
| :------------------ | :-------------------------------------------------------- |
| `idx`               | `number`                                                  |
| `actionORMethodDef` | `GrammarAction`<`any`\> \| `DSLMethodOptsWithErr`<`any`\> |

#### Returns

`void`

#### Inherited from

CstParser.atLeastOne

---

### <a id="cantokentypebedeletedinrecovery" name="cantokentypebedeletedinrecovery"></a> canTokenTypeBeDeletedInRecovery

▸ `Protected` **canTokenTypeBeDeletedInRecovery**(`tokType`): `boolean`

By default all token types may be deleted. This behavior may be overridden in inheriting parsers.
The method receives the expected token type. The token that would be deleted can be received with [LA(1)](FormulaParser.md#la).

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `tokType` | `TokenType` |

#### Returns

`boolean`

#### Inherited from

CstParser.canTokenTypeBeDeletedInRecovery

---

### <a id="cantokentypebeinsertedinrecovery" name="cantokentypebeinsertedinrecovery"></a> canTokenTypeBeInsertedInRecovery

▸ `Protected` **canTokenTypeBeInsertedInRecovery**(`tokType`): `boolean`

By default all tokens type may be inserted. This behavior may be overridden in inheriting Recognizers
for example: One may decide that only punctuation tokens may be inserted automatically as they have no additional
semantic value. (A mandatory semicolon has no additional semantic meaning, but an Integer may have additional meaning
depending on its int value and context (Inserting an integer 0 in cardinality: "[1..]" will cause semantic issues
as the max of the cardinality will be greater than the min value (and this is a false error!).

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `tokType` | `TokenType` |

#### Returns

`boolean`

#### Inherited from

CstParser.canTokenTypeBeInsertedInRecovery

---

### <a id="computecontentassist" name="computecontentassist"></a> computeContentAssist

▸ **computeContentAssist**(`startRuleName`, `precedingInput`): `ISyntacticContentAssistPath`[]

#### Parameters

| Name             | Type       | Description                                                     |
| :--------------- | :--------- | :-------------------------------------------------------------- |
| `startRuleName`  | `string`   |                                                                 |
| `precedingInput` | `IToken`[] | The token vector up to (not including) the content assist point |

#### Returns

`ISyntacticContentAssistPath`[]

#### Inherited from

CstParser.computeContentAssist

---

### <a id="consume-1" name="consume-1"></a> consume

▸ `Protected` **consume**(`idx`, `tokType`, `options?`): `IToken`

Like `CONSUME` with the numerical suffix as a parameter, e.g:
consume(0, X) === CONSUME(X)
consume(1, X) === CONSUME1(X)
consume(2, X) === CONSUME2(X)
...

**`See`**

CONSUME

#### Parameters

| Name       | Type                |
| :--------- | :------------------ |
| `idx`      | `number`            |
| `tokType`  | `TokenType`         |
| `options?` | `ConsumeMethodOpts` |

#### Returns

`IToken`

#### Inherited from

CstParser.consume

---

### <a id="getbasecstvisitorconstructor" name="getbasecstvisitorconstructor"></a> getBaseCstVisitorConstructor

▸ **getBaseCstVisitorConstructor**<`IN`, `OUT`\>(): (...`args`: `any`[]) => `ICstVisitor`<`IN`, `OUT`\>

#### Type parameters

| Name  | Type  |
| :---- | :---- |
| `IN`  | `any` |
| `OUT` | `any` |

#### Returns

`fn`

• **new getBaseCstVisitorConstructor**(...`args`)

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Inherited from

CstParser.getBaseCstVisitorConstructor

---

### <a id="getbasecstvisitorconstructorwithdefaults" name="getbasecstvisitorconstructorwithdefaults"></a> getBaseCstVisitorConstructorWithDefaults

▸ **getBaseCstVisitorConstructorWithDefaults**<`IN`, `OUT`\>(): (...`args`: `any`[]) => `ICstVisitor`<`IN`, `OUT`\>

#### Type parameters

| Name  | Type  |
| :---- | :---- |
| `IN`  | `any` |
| `OUT` | `any` |

#### Returns

`fn`

• **new getBaseCstVisitorConstructorWithDefaults**(...`args`)

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Inherited from

CstParser.getBaseCstVisitorConstructorWithDefaults

---

### <a id="getgastproductions" name="getgastproductions"></a> getGAstProductions

▸ **getGAstProductions**(): `Record`<`string`, `Rule`\>

#### Returns

`Record`<`string`, `Rule`\>

#### Inherited from

CstParser.getGAstProductions

---

### <a id="getnextpossibletokentypes" name="getnextpossibletokentypes"></a> getNextPossibleTokenTypes

▸ `Protected` **getNextPossibleTokenTypes**(`grammarPath`): `TokenType`[]

**`Deprecated`**

- will be removed in the future

#### Parameters

| Name          | Type                |
| :------------ | :------------------ |
| `grammarPath` | `ITokenGrammarPath` |

#### Returns

`TokenType`[]

#### Inherited from

CstParser.getNextPossibleTokenTypes

---

### <a id="getserializedgastproductions" name="getserializedgastproductions"></a> getSerializedGastProductions

▸ **getSerializedGastProductions**(): `ISerializedGast`[]

#### Returns

`ISerializedGast`[]

#### Inherited from

CstParser.getSerializedGastProductions

---

### <a id="gettokentoinsert" name="gettokentoinsert"></a> getTokenToInsert

▸ `Protected` **getTokenToInsert**(`tokType`): `IToken`

Returns an "imaginary" Token to insert when Single Token Insertion is done
Override this if you require special behavior in your grammar.
For example if an IntegerToken is required provide one with the image '0' so it would be valid syntactically.

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `tokType` | `TokenType` |

#### Returns

`IToken`

#### Inherited from

CstParser.getTokenToInsert

---

### <a id="many-1" name="many-1"></a> many

▸ `Protected` **many**(`idx`, `actionORMethodDef`): `void`

Like `MANY` with the numerical suffix as a parameter, e.g:
many(0, X) === MANY(X)
many(1, X) === MANY1(X)
many(2, X) === MANY2(X)
...

**`See`**

MANY

#### Parameters

| Name                | Type                                               |
| :------------------ | :------------------------------------------------- |
| `idx`               | `number`                                           |
| `actionORMethodDef` | `GrammarAction`<`any`\> \| `DSLMethodOpts`<`any`\> |

#### Returns

`void`

#### Inherited from

CstParser.many

---

### <a id="option-1" name="option-1"></a> option

▸ `Protected` **option**<`OUT`\>(`idx`, `actionORMethodDef`): `undefined` \| `OUT`

Like `OPTION` with the numerical suffix as a parameter, e.g:
option(0, X) === OPTION(X)
option(1, X) === OPTION1(X)
option(2, X) === OPTION2(X)
...

**`See`**

OPTION

#### Type parameters

| Name  |
| :---- |
| `OUT` |

#### Parameters

| Name                | Type                                               |
| :------------------ | :------------------------------------------------- |
| `idx`               | `number`                                           |
| `actionORMethodDef` | `GrammarAction`<`OUT`\> \| `DSLMethodOpts`<`OUT`\> |

#### Returns

`undefined` \| `OUT`

#### Inherited from

CstParser.option

---

### <a id="or-1" name="or-1"></a> or

▸ `Protected` **or**(`idx`, `altsOrOpts`): `any`

Like `OR` with the numerical suffix as a parameter, e.g:
or(0, X) === OR(X)
or(1, X) === OR1(X)
or(2, X) === OR2(X)
...

**`See`**

OR

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `idx`        | `number`                                     |
| `altsOrOpts` | `IOrAlt`<`any`\>[] \| `OrMethodOpts`<`any`\> |

#### Returns

`any`

#### Inherited from

CstParser.or

▸ `Protected` **or**<`T`\>(`idx`, `altsOrOpts`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                     |
| :----------- | :--------------------------------------- |
| `idx`        | `number`                                 |
| `altsOrOpts` | `IOrAlt`<`T`\>[] \| `OrMethodOpts`<`T`\> |

#### Returns

`T`

#### Inherited from

CstParser.or

---

### <a id="performselfanalysis" name="performselfanalysis"></a> performSelfAnalysis

▸ `Protected` **performSelfAnalysis**(): `void`

This must be called at the end of a Parser constructor.
See: http://chevrotain.io/docs/tutorial/step2_parsing.html#under-the-hood

#### Returns

`void`

#### Inherited from

CstParser.performSelfAnalysis

---

### <a id="reset" name="reset"></a> reset

▸ **reset**(): `void`

Resets the parser state, should be overridden for custom parsers which "carry" additional state.
When overriding, remember to also invoke the super implementation!

#### Returns

`void`

#### Inherited from

CstParser.reset

---

### <a id="subrule-1" name="subrule-1"></a> subrule

▸ `Protected` **subrule**<`ARGS`\>(`idx`, `ruleToCall`, `options?`): `CstNode`

Like `SUBRULE` with the numerical suffix as a parameter, e.g:
subrule(0, X) === SUBRULE(X)
subrule(1, X) === SUBRULE1(X)
subrule(2, X) === SUBRULE2(X)
...

**`See`**

SUBRULE

#### Type parameters

| Name   | Type                |
| :----- | :------------------ |
| `ARGS` | extends `unknown`[] |

#### Parameters

| Name         | Type                               |
| :----------- | :--------------------------------- |
| `idx`        | `number`                           |
| `ruleToCall` | `ParserMethod`<`ARGS`, `CstNode`\> |
| `options?`   | `SubruleMethodOpts`<`ARGS`\>       |

#### Returns

`CstNode`

#### Inherited from

CstParser.subrule
