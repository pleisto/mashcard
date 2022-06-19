# @brickdoc/formula

## Table of contents

### Classes

- [ButtonClass](classes/ButtonClass.md)
- [CellClass](classes/CellClass.md)
- [CodeFragmentVisitor](classes/CodeFragmentVisitor.md)
- [ColumnClass](classes/ColumnClass.md)
- [FormulaContext](classes/FormulaContext.md)
- [FormulaInterpreter](classes/FormulaInterpreter.md)
- [FormulaParser](classes/FormulaParser.md)
- [RowClass](classes/RowClass.md)
- [SpreadsheetClass](classes/SpreadsheetClass.md)
- [SwitchClass](classes/SwitchClass.md)
- [VariableClass](classes/VariableClass.md)

### Interfaces

- [AnyFunctionClause](interfaces/AnyFunctionClause.md)
- [Argument](interfaces/Argument.md)
- [ArrayResult](interfaces/ArrayResult.md)
- [AsyncVariableTask](interfaces/AsyncVariableTask.md)
- [BackendActions](interfaces/BackendActions.md)
- [BaseCodeFragment](interfaces/BaseCodeFragment.md)
- [BaseFormula](interfaces/BaseFormula.md)
- [BaseFunctionContext](interfaces/BaseFunctionContext.md)
- [BaseParseResult](interfaces/BaseParseResult.md)
- [BaseResult](interfaces/BaseResult.md)
- [BaseTestCase](interfaces/BaseTestCase.md)
- [BaseVariableTask](interfaces/BaseVariableTask.md)
- [BlankResult](interfaces/BlankResult.md)
- [BlockCompletion](interfaces/BlockCompletion.md)
- [BlockInitializer](interfaces/BlockInitializer.md)
- [BlockResult](interfaces/BlockResult.md)
- [BlockType](interfaces/BlockType.md)
- [BooleanResult](interfaces/BooleanResult.md)
- [ButtonInitializer](interfaces/ButtonInitializer.md)
- [ButtonResult](interfaces/ButtonResult.md)
- [ButtonType](interfaces/ButtonType.md)
- [Cell](interfaces/Cell.md)
- [CellInput](interfaces/CellInput.md)
- [CellResult](interfaces/CellResult.md)
- [CellType](interfaces/CellType.md)
- [CodeFragmentAttrs](interfaces/CodeFragmentAttrs.md)
- [CodeFragmentResult](interfaces/CodeFragmentResult.md)
- [CodeFragmentStepInput](interfaces/CodeFragmentStepInput.md)
- [Column](interfaces/Column.md)
- [ColumnCompletion](interfaces/ColumnCompletion.md)
- [ColumnInput](interfaces/ColumnInput.md)
- [ColumnResult](interfaces/ColumnResult.md)
- [ColumnType](interfaces/ColumnType.md)
- [CompleteInput](interfaces/CompleteInput.md)
- [ContextInterface](interfaces/ContextInterface.md)
- [ControlInitializer](interfaces/ControlInitializer.md)
- [ControlType](interfaces/ControlType.md)
- [CstResult](interfaces/CstResult.md)
- [CstVisitorArgument](interfaces/CstVisitorArgument.md)
- [DateResult](interfaces/DateResult.md)
- [DeleteFormula](interfaces/DeleteFormula.md)
- [DependencyTestCaseType](interfaces/DependencyTestCaseType.md)
- [DirtyFormulaInfo](interfaces/DirtyFormulaInfo.md)
- [ErrorMessage](interfaces/ErrorMessage.md)
- [ErrorParseResult](interfaces/ErrorParseResult.md)
- [ErrorResult](interfaces/ErrorResult.md)
- [EventDependency](interfaces/EventDependency.md)
- [EventScope](interfaces/EventScope.md)
- [FindKey](interfaces/FindKey.md)
- [FormulaContextArgs](interfaces/FormulaContextArgs.md)
- [FormulaDefinition](interfaces/FormulaDefinition.md)
- [FormulaEventPayload](interfaces/FormulaEventPayload.md)
- [FormulaNameToken](interfaces/FormulaNameToken.md)
- [FunctionClause](interfaces/FunctionClause.md)
- [FunctionCompletion](interfaces/FunctionCompletion.md)
- [FunctionContext](interfaces/FunctionContext.md)
- [FunctionResult](interfaces/FunctionResult.md)
- [InsertOptions](interfaces/InsertOptions.md)
- [InterpretArgument](interfaces/InterpretArgument.md)
- [InterpretContext](interfaces/InterpretContext.md)
- [LiteralParseResult](interfaces/LiteralParseResult.md)
- [LiteralResult](interfaces/LiteralResult.md)
- [MakeContextOptions](interfaces/MakeContextOptions.md)
- [MakeContextResult](interfaces/MakeContextResult.md)
- [NameDependency](interfaces/NameDependency.md)
- [NameDependencyWithKind](interfaces/NameDependencyWithKind.md)
- [NoPersistResult](interfaces/NoPersistResult.md)
- [NullResult](interfaces/NullResult.md)
- [NumberResult](interfaces/NumberResult.md)
- [OperatorType](interfaces/OperatorType.md)
- [OtherCodeFragment](interfaces/OtherCodeFragment.md)
- [PageInput](interfaces/PageInput.md)
- [PendingResult](interfaces/PendingResult.md)
- [PredicateResult](interfaces/PredicateResult.md)
- [RangeResult](interfaces/RangeResult.md)
- [RangeType](interfaces/RangeType.md)
- [RecordResult](interfaces/RecordResult.md)
- [RecordType](interfaces/RecordType.md)
- [ReferenceResult](interfaces/ReferenceResult.md)
- [Row](interfaces/Row.md)
- [RowInput](interfaces/RowInput.md)
- [RowResult](interfaces/RowResult.md)
- [RowType](interfaces/RowType.md)
- [SpecialCodeFragment](interfaces/SpecialCodeFragment.md)
- [SpreadsheetAllPersistence](interfaces/SpreadsheetAllPersistence.md)
- [SpreadsheetCompletion](interfaces/SpreadsheetCompletion.md)
- [SpreadsheetDynamicPersistence](interfaces/SpreadsheetDynamicPersistence.md)
- [SpreadsheetInitializer](interfaces/SpreadsheetInitializer.md)
- [SpreadsheetInput](interfaces/SpreadsheetInput.md)
- [SpreadsheetResult](interfaces/SpreadsheetResult.md)
- [SpreadsheetType](interfaces/SpreadsheetType.md)
- [StringResult](interfaces/StringResult.md)
- [SuccessParseResult](interfaces/SuccessParseResult.md)
- [SwitchInitializer](interfaces/SwitchInitializer.md)
- [SwitchResult](interfaces/SwitchResult.md)
- [SwitchType](interfaces/SwitchType.md)
- [SyncVariableTask](interfaces/SyncVariableTask.md)
- [TestCaseInput](interfaces/TestCaseInput.md)
- [TestCaseInterface](interfaces/TestCaseInterface.md)
- [TestCaseType](interfaces/TestCaseType.md)
- [UUIDState](interfaces/UUIDState.md)
- [VariableCompletion](interfaces/VariableCompletion.md)
- [VariableData](interfaces/VariableData.md)
- [VariableDependency](interfaces/VariableDependency.md)
- [VariableDisplayData](interfaces/VariableDisplayData.md)
- [VariableInterface](interfaces/VariableInterface.md)
- [VariableMetadata](interfaces/VariableMetadata.md)
- [VariableParseResult](interfaces/VariableParseResult.md)
- [View](interfaces/View.md)
- [ViewData](interfaces/ViewData.md)
- [WaitingResult](interfaces/WaitingResult.md)
- [handleCodeFragmentsResult](interfaces/handleCodeFragmentsResult.md)

### Type Aliases

- [AnyFunctionClauseWithKeyAndExample](README.md#anyfunctionclausewithkeyandexample)
- [AnyFunctionResult](README.md#anyfunctionresult)
- [AnyResult](README.md#anyresult)
- [AnyTypeResult](README.md#anytyperesult)
- [BlockKey](README.md#blockkey)
- [BlockName](README.md#blockname)
- [CodeFragment](README.md#codefragment)
- [CodeFragmentCodes](README.md#codefragmentcodes)
- [CodeFragmentStep](README.md#codefragmentstep)
- [ColumnId](README.md#columnid)
- [ColumnKey](README.md#columnkey)
- [ColumnName](README.md#columnname)
- [Completion](README.md#completion)
- [CompletionFlag](README.md#completionflag)
- [CompletionKind](README.md#completionkind)
- [ComplexCodeFragmentType](README.md#complexcodefragmenttype)
- [ContextState](README.md#contextstate)
- [CoreFunctionGroup](README.md#corefunctiongroup)
- [DefaultVariableName](README.md#defaultvariablename)
- [Definition](README.md#definition)
- [ErrorType](README.md#errortype)
- [ExpressionType](README.md#expressiontype)
- [Feature](README.md#feature)
- [Features](README.md#features)
- [Formula](README.md#formula)
- [FormulaCheckType](README.md#formulachecktype)
- [FormulaColorType](README.md#formulacolortype)
- [FormulaControlType](README.md#formulacontroltype)
- [FormulaFunctionKind](README.md#formulafunctionkind)
- [FormulaResult](README.md#formularesult)
- [FormulaSourceType](README.md#formulasourcetype)
- [FormulaType](README.md#formulatype)
- [FunctionGroup](README.md#functiongroup)
- [FunctionKey](README.md#functionkey)
- [FunctionNameType](README.md#functionnametype)
- [Lambda](README.md#lambda)
- [MockedUUIDV4](README.md#mockeduuidv4)
- [NamespaceId](README.md#namespaceid)
- [OperatorName](README.md#operatorname)
- [ParseErrorType](README.md#parseerrortype)
- [ParseResult](README.md#parseresult)
- [PersistFormulaType](README.md#persistformulatype)
- [PredicateFunction](README.md#predicatefunction)
- [PredicateOperator](README.md#predicateoperator)
- [Reference](README.md#reference)
- [RowId](README.md#rowid)
- [SimpleCodeFragmentType](README.md#simplecodefragmenttype)
- [SpecialCodeFragmentType](README.md#specialcodefragmenttype)
- [SpecialDefaultVariableName](README.md#specialdefaultvariablename)
- [SpreadsheetId](README.md#spreadsheetid)
- [SpreadsheetKey](README.md#spreadsheetkey)
- [SpreadsheetName](README.md#spreadsheetname)
- [SpreadsheetUpdateNameViaIdPayload](README.md#spreadsheetupdatenameviaidpayload)
- [TestCaseName](README.md#testcasename)
- [TypedResult](README.md#typedresult)
- [VariableId](README.md#variableid)
- [VariableKey](README.md#variablekey)
- [VariableKind](README.md#variablekind)
- [VariableName](README.md#variablename)
- [VariableRichType](README.md#variablerichtype)
- [VariableTask](README.md#variabletask)
- [VariableValue](README.md#variablevalue)
- [ViewAttrs](README.md#viewattrs)
- [ViewRender](README.md#viewrender)
- [ViewType](README.md#viewtype)
- [getEventDependencyInput](README.md#geteventdependencyinput)
- [uuid](README.md#uuid)

### Variables

- [AdditionOperator](README.md#additionoperator)
- [Ampersand](README.md#ampersand)
- [And](README.md#and)
- [AnyName](README.md#anyname)
- [At](README.md#at)
- [BUILTIN\_CLAUSES](README.md#builtin_clauses)
- [BUILTIN\_STRINGS](README.md#builtin_strings)
- [BooleanLiteral](README.md#booleanliteral)
- [CORE\_FUNCTION\_GROUPS](README.md#core_function_groups)
- [Caret](README.md#caret)
- [Colon](README.md#colon)
- [CombineOperator](README.md#combineoperator)
- [Comma](README.md#comma)
- [CompareOperator](README.md#compareoperator)
- [CurrentBlock](README.md#currentblock)
- [DEFAULT\_FIRST\_NAMESPACEID](README.md#default_first_namespaceid)
- [DEFAULT\_VIEWS](README.md#default_views)
- [DecimalLiteral](README.md#decimalliteral)
- [Div](README.md#div)
- [Dollar](README.md#dollar)
- [Dot](README.md#dot)
- [DoubleColon](README.md#doublecolon)
- [Equal](README.md#equal)
- [Equal2](README.md#equal2)
- [EqualCompareOperator](README.md#equalcompareoperator)
- [ExactIn](README.md#exactin)
- [FORMULA\_FEATURE\_CONTROL](README.md#formula_feature_control)
- [FORMULA\_PARSER\_VERSION](README.md#formula_parser_version)
- [FORMULA\_USED\_TYPES](README.md#formula_used_types)
- [FUNCTION\_NAME\_REGEX](README.md#function_name_regex)
- [FormulaBlockNameChangedTrigger](README.md#formulablocknamechangedtrigger)
- [FormulaBlockNameDeletedTrigger](README.md#formulablocknamedeletedtrigger)
- [FormulaBlockNameModifiedWithUsername](README.md#formulablocknamemodifiedwithusername)
- [FormulaContextNameChanged](README.md#formulacontextnamechanged)
- [FormulaContextNameRemove](README.md#formulacontextnameremove)
- [FormulaContextTickTrigger](README.md#formulacontextticktrigger)
- [FormulaDocSoftDeleted](README.md#formuladocsoftdeleted)
- [FormulaLexer](README.md#formulalexer)
- [FormulaTaskCompleted](README.md#formulataskcompleted)
- [FormulaTaskStarted](README.md#formulataskstarted)
- [FormulaTickViaId](README.md#formulatickviaid)
- [FormulaTypeCastName](README.md#formulatypecastname)
- [FormulaUpdatedViaId](README.md#formulaupdatedviaid)
- [FunctionName](README.md#functionname)
- [GreaterThan](README.md#greaterthan)
- [GreaterThanEqual](README.md#greaterthanequal)
- [In](README.md#in)
- [InOperator](README.md#inoperator)
- [Input](README.md#input)
- [LBrace](README.md#lbrace)
- [LBracket](README.md#lbracket)
- [LParen](README.md#lparen)
- [LambdaArgumentNumber](README.md#lambdaargumentnumber)
- [LessThan](README.md#lessthan)
- [LessThanEqual](README.md#lessthanequal)
- [Minus](README.md#minus)
- [Multi](README.md#multi)
- [MultiplicationOperator](README.md#multiplicationoperator)
- [NAME\_SPECIAL\_INVALID\_CHARS](README.md#name_special_invalid_chars)
- [NAME\_VALID\_PREFIX](README.md#name_valid_prefix)
- [NAME\_VALID\_SUFFIX\_ONLY](README.md#name_valid_suffix_only)
- [Not](README.md#not)
- [NotEqual](README.md#notequal)
- [NotEqual2](README.md#notequal2)
- [NullLiteral](README.md#nullliteral)
- [NumberLiteral](README.md#numberliteral)
- [OPERATORS](README.md#operators)
- [Or](README.md#or)
- [ParserInstance](README.md#parserinstance)
- [Plus](README.md#plus)
- [RBrace](README.md#rbrace)
- [RBracket](README.md#rbracket)
- [RParen](README.md#rparen)
- [Self](README.md#self)
- [Semicolon](README.md#semicolon)
- [Sharp](README.md#sharp)
- [Sign](README.md#sign)
- [SpreadsheetReloadViaId](README.md#spreadsheetreloadviaid)
- [SpreadsheetUpdateColumnsViaId](README.md#spreadsheetupdatecolumnsviaid)
- [SpreadsheetUpdateNameViaId](README.md#spreadsheetupdatenameviaid)
- [SpreadsheetUpdateRowsViaId](README.md#spreadsheetupdaterowsviaid)
- [StringLiteral](README.md#stringliteral)
- [TOKEN\_SUFFIX\_PATTERN](README.md#token_suffix_pattern)
- [ThisRecord](README.md#thisrecord)
- [ThisRow](README.md#thisrow)
- [UUID](README.md#uuid-1)
- [WhiteSpace](README.md#whitespace)
- [accessOperator](README.md#accessoperator)
- [additionOperator](README.md#additionoperator-1)
- [allTokens](README.md#alltokens)
- [apiCurrentPosition](README.md#apicurrentposition)
- [apiExchange](README.md#apiexchange)
- [argumentsOperator](README.md#argumentsoperator)
- [arrayAverage](README.md#arrayaverage)
- [arrayJoin](README.md#arrayjoin)
- [arrayOperator](README.md#arrayoperator)
- [arraySum](README.md#arraysum)
- [blockOperator](README.md#blockoperator)
- [booleanOperator](README.md#booleanoperator)
- [chainOperator](README.md#chainoperator)
- [combineOperator](README.md#combineoperator-1)
- [compareOperator](README.md#compareoperator-1)
- [concatOperator](README.md#concatoperator)
- [controlButton](README.md#controlbutton)
- [controlSwitch](README.md#controlswitch)
- [convertToArray](README.md#converttoarray)
- [convertToBoolean](README.md#converttoboolean)
- [convertToNumber](README.md#converttonumber)
- [convertToRecord](README.md#converttorecord)
- [convertToString](README.md#converttostring)
- [coreSet](README.md#coreset)
- [dateDate](README.md#datedate)
- [dateNow](README.md#datenow)
- [equalCompareOperator](README.md#equalcompareoperator-1)
- [errorError](README.md#errorerror)
- [expressionOperator](README.md#expressionoperator)
- [inOperator](README.md#inoperator-1)
- [logicIf](README.md#logicif)
- [logicIfError](README.md#logiciferror)
- [mathAbs](README.md#mathabs)
- [mathFloor](README.md#mathfloor)
- [mathInt](README.md#mathint)
- [mathLn](README.md#mathln)
- [mathLog10](README.md#mathlog10)
- [mathPi](README.md#mathpi)
- [mathPower](README.md#mathpower)
- [mathRand](README.md#mathrand)
- [mathRound](README.md#mathround)
- [mathTrunc](README.md#mathtrunc)
- [multiplicationOperator](README.md#multiplicationoperator-1)
- [nameOperator](README.md#nameoperator)
- [notOperator](README.md#notoperator)
- [nullOperator](README.md#nulloperator)
- [numberOperator](README.md#numberoperator)
- [objectT](README.md#objectt)
- [objectType](README.md#objecttype)
- [parenthesisOperator](README.md#parenthesisoperator)
- [powerfxCountIf](README.md#powerfxcountif)
- [predicateOperator](README.md#predicateoperator-1)
- [processSleep](README.md#processsleep)
- [rangeOperator](README.md#rangeoperator)
- [recordFieldOperator](README.md#recordfieldoperator)
- [recordOperator](README.md#recordoperator)
- [requestGet](README.md#requestget)
- [spreadsheetAverageIfs](README.md#spreadsheetaverageifs)
- [spreadsheetColumnCount](README.md#spreadsheetcolumncount)
- [spreadsheetCountA](README.md#spreadsheetcounta)
- [spreadsheetCountIfs](README.md#spreadsheetcountifs)
- [spreadsheetMax](README.md#spreadsheetmax)
- [spreadsheetRow](README.md#spreadsheetrow)
- [spreadsheetRowCount](README.md#spreadsheetrowcount)
- [spreadsheetSpreadsheet](README.md#spreadsheetspreadsheet)
- [spreadsheetSum](README.md#spreadsheetsum)
- [spreadsheetSumIfs](README.md#spreadsheetsumifs)
- [spreadsheetSumProduct](README.md#spreadsheetsumproduct)
- [spreadsheetToRecordArray](README.md#spreadsheettorecordarray)
- [spreadsheetVlookup](README.md#spreadsheetvlookup)
- [spreadsheetXlookup](README.md#spreadsheetxlookup)
- [stringLen](README.md#stringlen)
- [stringOperator](README.md#stringoperator)
- [stringSplit](README.md#stringsplit)
- [stringStartWith](README.md#stringstartwith)
- [stringToBar](README.md#stringtobar)
- [stringToQrcode](README.md#stringtoqrcode)
- [stringTrim](README.md#stringtrim)
- [thisRecordOperator](README.md#thisrecordoperator)
- [thisRowOperator](README.md#thisrowoperator)
- [tokenVocabulary](README.md#tokenvocabulary)

### Functions

- [DEFAULT\_UUID\_FUNCTION](README.md#default_uuid_function)
- [accessAttribute](README.md#accessattribute)
- [appendFormulas](README.md#appendformulas)
- [applyCompletion](README.md#applycompletion)
- [attrs2completion](README.md#attrs2completion)
- [attrsToColorType](README.md#attrstocolortype)
- [block2codeFragment](README.md#block2codefragment)
- [block2completion](README.md#block2completion)
- [blockKey](README.md#blockkey-1)
- [buildFunctionKey](README.md#buildfunctionkey)
- [buildPredicate](README.md#buildpredicate)
- [buildTestCases](README.md#buildtestcases)
- [castData](README.md#castdata)
- [castNumber](README.md#castnumber)
- [castVariable](README.md#castvariable)
- [checkValidName](README.md#checkvalidname)
- [cleanupEventDependency](README.md#cleanupeventdependency)
- [codeFragment2string](README.md#codefragment2string)
- [codeFragment2value](README.md#codefragment2value)
- [codeFragments2definition](README.md#codefragments2definition)
- [column2attrs](README.md#column2attrs)
- [column2codeFragment](README.md#column2codefragment)
- [columnDisplayIndex](README.md#columndisplayindex)
- [createFunctionClause](README.md#createfunctionclause)
- [createVariableTask](README.md#createvariabletask)
- [currentBlockKey](README.md#currentblockkey)
- [dispatchFormulaBlockNameChange](README.md#dispatchformulablocknamechange)
- [dispatchFormulaBlockSoftDelete](README.md#dispatchformulablocksoftdelete)
- [displayValue](README.md#displayvalue)
- [dumpDisplayResultForDisplay](README.md#dumpdisplayresultfordisplay)
- [dumpValue](README.md#dumpvalue)
- [encodeString](README.md#encodestring)
- [errorIsFatal](README.md#errorisfatal)
- [extractSubType](README.md#extractsubtype)
- [fetchResult](README.md#fetchresult)
- [function2completion](README.md#function2completion)
- [functionResult2lambda](README.md#functionresult2lambda)
- [generateVariable](README.md#generatevariable)
- [getCompletion](README.md#getcompletion)
- [getLastCodeFragment](README.md#getlastcodefragment)
- [innerInterpret](README.md#innerinterpret)
- [interpret](README.md#interpret)
- [interpretByOperator](README.md#interpretbyoperator)
- [intersectType](README.md#intersecttype)
- [isKey](README.md#iskey)
- [loadDisplayResult](README.md#loaddisplayresult)
- [loadValue](README.md#loadvalue)
- [makeContext](README.md#makecontext)
- [matchObject](README.md#matchobject)
- [maybeEncodeString](README.md#maybeencodestring)
- [mockBlock](README.md#mockblock)
- [mockCell](README.md#mockcell)
- [mockColumn](README.md#mockcolumn)
- [mockRow](README.md#mockrow)
- [mockSpreadsheet](README.md#mockspreadsheet)
- [objectDiff](README.md#objectdiff)
- [parse](README.md#parse)
- [parseByOperator](README.md#parsebyoperator)
- [parseString](README.md#parsestring)
- [resultToColorType](README.md#resulttocolortype)
- [reverseTraversalString](README.md#reversetraversalstring)
- [row2attrs](README.md#row2attrs)
- [row2codeFragment](README.md#row2codefragment)
- [runtimeCheckType](README.md#runtimechecktype)
- [shouldReceiveEvent](README.md#shouldreceiveevent)
- [shouldReturnEarly](README.md#shouldreturnearly)
- [spreadsheet2attrs](README.md#spreadsheet2attrs)
- [spreadsheet2codeFragment](README.md#spreadsheet2codefragment)
- [spreadsheet2completion](README.md#spreadsheet2completion)
- [token2fragment](README.md#token2fragment)
- [trackTodo](README.md#tracktodo)
- [truncateArray](README.md#truncatearray)
- [truncateString](README.md#truncatestring)
- [variable2attrs](README.md#variable2attrs)
- [variable2codeFragment](README.md#variable2codefragment)
- [variable2completion](README.md#variable2completion)
- [variableKey](README.md#variablekey-1)

## Type Aliases

### <a id="anyfunctionclausewithkeyandexample" name="anyfunctionclausewithkeyandexample"></a> AnyFunctionClauseWithKeyAndExample

Ƭ **AnyFunctionClauseWithKeyAndExample**: `RequireField`<[`AnyFunctionClause`](interfaces/AnyFunctionClause.md), ``"key"``\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:677](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L677)

___

### <a id="anyfunctionresult" name="anyfunctionresult"></a> AnyFunctionResult

Ƭ **AnyFunctionResult**<`T`\>: [`TypedResult`](README.md#typedresult)<`T`\> \| [`ErrorResult`](interfaces/ErrorResult.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormulaType`](README.md#formulatype) |

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:348](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L348)

___

### <a id="anyresult" name="anyresult"></a> AnyResult

Ƭ **AnyResult**: [`NumberResult`](interfaces/NumberResult.md) \| [`BooleanResult`](interfaces/BooleanResult.md) \| [`StringResult`](interfaces/StringResult.md) \| [`LiteralResult`](interfaces/LiteralResult.md) \| [`NullResult`](interfaces/NullResult.md) \| [`RecordResult`](interfaces/RecordResult.md) \| [`BlankResult`](interfaces/BlankResult.md) \| [`ArrayResult`](interfaces/ArrayResult.md) \| [`DateResult`](interfaces/DateResult.md) \| [`ColumnResult`](interfaces/ColumnResult.md) \| [`RowResult`](interfaces/RowResult.md) \| [`RangeResult`](interfaces/RangeResult.md) \| [`CellResult`](interfaces/CellResult.md) \| [`SpreadsheetResult`](interfaces/SpreadsheetResult.md) \| [`BlockResult`](interfaces/BlockResult.md) \| [`PredicateResult`](interfaces/PredicateResult.md) \| [`ButtonResult`](interfaces/ButtonResult.md) \| [`SwitchResult`](interfaces/SwitchResult.md) \| [`ErrorResult`](interfaces/ErrorResult.md) \| [`FunctionResult`](interfaces/FunctionResult.md) \| [`CstResult`](interfaces/CstResult.md) \| [`ReferenceResult`](interfaces/ReferenceResult.md) \| [`PendingResult`](interfaces/PendingResult.md) \| [`WaitingResult`](interfaces/WaitingResult.md) \| [`NoPersistResult`](interfaces/NoPersistResult.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:317](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L317)

___

### <a id="anytyperesult" name="anytyperesult"></a> AnyTypeResult

Ƭ **AnyTypeResult**: `UsedFormulaType` extends [`AnyResult`](README.md#anyresult)[``"type"``] ? [`AnyResult`](README.md#anyresult) : `never`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:344](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L344)

___

### <a id="blockkey" name="blockkey"></a> BlockKey

Ƭ **BlockKey**: ``"#CurrentBlock"`` \| \`#${NamespaceId}\`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:114](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L114)

___

### <a id="blockname" name="blockname"></a> BlockName

Ƭ **BlockName**: [`NamespaceId`](README.md#namespaceid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:119](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L119)

___

### <a id="codefragment" name="codefragment"></a> CodeFragment

Ƭ **CodeFragment**: [`SpecialCodeFragment`](interfaces/SpecialCodeFragment.md) \| [`OtherCodeFragment`](interfaces/OtherCodeFragment.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:704](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L704)

___

### <a id="codefragmentcodes" name="codefragmentcodes"></a> CodeFragmentCodes

Ƭ **CodeFragmentCodes**: [`ComplexCodeFragmentType`](README.md#complexcodefragmenttype) \| [`SimpleCodeFragmentType`](README.md#simplecodefragmenttype) \| [`SpecialCodeFragmentType`](README.md#specialcodefragmenttype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:414](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L414)

___

### <a id="codefragmentstep" name="codefragmentstep"></a> CodeFragmentStep

Ƭ **CodeFragmentStep**: (`{
  input,
  meta
}`: { `input`: [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md) ; `meta`: [`VariableMetadata`](interfaces/VariableMetadata.md)  }) => [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

#### Type declaration

▸ (`{
  input,
  meta
}`): [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `{
  input,
  meta
}` | `Object` |
| `{
  input,
  meta
}.input` | [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md) |
| `{
  input,
  meta
}.meta` | [`VariableMetadata`](interfaces/VariableMetadata.md) |

##### Returns

[`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:710](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L710)

___

### <a id="columnid" name="columnid"></a> ColumnId

Ƭ **ColumnId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:131](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L131)

___

### <a id="columnkey" name="columnkey"></a> ColumnKey

Ƭ **ColumnKey**: \`#${NamespaceId}.${ColumnId}\`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:115](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L115)

___

### <a id="columnname" name="columnname"></a> ColumnName

Ƭ **ColumnName**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:90](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L90)

___

### <a id="completion" name="completion"></a> Completion

Ƭ **Completion**: [`FunctionCompletion`](interfaces/FunctionCompletion.md) \| [`VariableCompletion`](interfaces/VariableCompletion.md) \| [`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md) \| [`ColumnCompletion`](interfaces/ColumnCompletion.md) \| [`BlockCompletion`](interfaces/BlockCompletion.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:480](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L480)

___

### <a id="completionflag" name="completionflag"></a> CompletionFlag

Ƭ **CompletionFlag**: ``"exact"`` \| ``"dynamicColumn"`` \| ``"compareTypeMatched"`` \| ``"compareTypeNotMatched"`` \| ``"chainTypeMatched"`` \| ``"chainTypeNotMatched"`` \| ``"contextNamespace"`` \| ``"defaultNamespace"`` \| ``"blockNamespace"`` \| ``"chainNamespace"`` \| ``"block"`` \| ``"variable"`` \| ``"spreadsheet"`` \| ``"column"`` \| ``"function"`` \| ``"variable"`` \| ``"nameEqual"`` \| ``"nameIncludes"`` \| ``"nameStartsWith"`` \| ``"functionNameEqual"`` \| ``"functionNameIncludes"`` \| ``"functionNameStartsWith"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:422](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L422)

___

### <a id="completionkind" name="completionkind"></a> CompletionKind

Ƭ **CompletionKind**: ``"function"`` \| ``"variable"`` \| ``"spreadsheet"`` \| ``"column"`` \| ``"block"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:388](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L388)

___

### <a id="complexcodefragmenttype" name="complexcodefragmenttype"></a> ComplexCodeFragmentType

Ƭ **ComplexCodeFragmentType**: ``"Spreadsheet"`` \| ``"Column"`` \| ``"Variable"`` \| ``"Block"`` \| ``"UUID"`` \| ``"LogicColumn"`` \| ``"Row"`` \| ``"LogicRow"`` \| ``"ThisRow"`` \| ``"ThisRecord"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:389](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L389)

___

### <a id="contextstate" name="contextstate"></a> ContextState

Ƭ **ContextState**: `any`

#### Defined in

[packages/brickdoc-formula/src/context/context.ts:69](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/context.ts#L69)

___

### <a id="corefunctiongroup" name="corefunctiongroup"></a> CoreFunctionGroup

Ƭ **CoreFunctionGroup**: typeof [`CORE_FUNCTION_GROUPS`](README.md#core_function_groups)[`number`]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:33](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L33)

___

### <a id="defaultvariablename" name="defaultvariablename"></a> DefaultVariableName

Ƭ **DefaultVariableName**: \`${SpecialDefaultVariableName}${number}\`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:121](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L121)

___

### <a id="definition" name="definition"></a> Definition

Ƭ **Definition**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:93](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L93)

___

### <a id="errortype" name="errortype"></a> ErrorType

Ƭ **ErrorType**: ``"type"`` \| ``"parse"`` \| ``"syntax"`` \| ``"runtime"`` \| ``"fatal"`` \| ``"deps"`` \| ``"circular_dependency"`` \| ``"name_unique"`` \| ``"name_check"`` \| ``"name_invalid"`` \| ``"custom"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:97](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L97)

___

### <a id="expressiontype" name="expressiontype"></a> ExpressionType

Ƭ **ExpressionType**: [`FormulaCheckType`](README.md#formulachecktype) \| `undefined`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:51](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L51)

___

### <a id="feature" name="feature"></a> Feature

Ƭ **Feature**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:135](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L135)

___

### <a id="features" name="features"></a> Features

Ƭ **Features**: [`Feature`](README.md#feature)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:136](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L136)

___

### <a id="formula" name="formula"></a> Formula

Ƭ **Formula**: [`BaseFormula`](interfaces/BaseFormula.md) & { `definition`: [`Definition`](README.md#definition)  }

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:372](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L372)

___

### <a id="formulachecktype" name="formulachecktype"></a> FormulaCheckType

Ƭ **FormulaCheckType**: [`FormulaType`](README.md#formulatype) \| readonly [[`FormulaType`](README.md#formulatype), ...FormulaType[]]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:45](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L45)

___

### <a id="formulacolortype" name="formulacolortype"></a> FormulaColorType

Ƭ **FormulaColorType**: `Exclude`<[`FormulaType`](README.md#formulatype), ``"boolean"``\> \| `FormulaCodeFragmentType`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:49](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L49)

___

### <a id="formulacontroltype" name="formulacontroltype"></a> FormulaControlType

Ƭ **FormulaControlType**: typeof `FORMULA_CONTROL_TYPES`[`number`]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:36](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L36)

___

### <a id="formulafunctionkind" name="formulafunctionkind"></a> FormulaFunctionKind

Ƭ **FormulaFunctionKind**: ``"Set"`` \| ``"Lambda"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:140](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L140)

___

### <a id="formularesult" name="formularesult"></a> FormulaResult

Ƭ **FormulaResult**<`T`\>: [`TypedResult`](README.md#typedresult)<`T`\>[``"result"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormulaType`](README.md#formulatype) |

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:350](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L350)

___

### <a id="formulasourcetype" name="formulasourcetype"></a> FormulaSourceType

Ƭ **FormulaSourceType**: ``"normal"`` \| ``"spreadsheet"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:352](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L352)

___

### <a id="formulatype" name="formulatype"></a> FormulaType

Ƭ **FormulaType**: typeof `FORMULA_TYPES`[`number`]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:37](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L37)

___

### <a id="functiongroup" name="functiongroup"></a> FunctionGroup

Ƭ **FunctionGroup**: [`CoreFunctionGroup`](README.md#corefunctiongroup) \| `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:86](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L86)

___

### <a id="functionkey" name="functionkey"></a> FunctionKey

Ƭ **FunctionKey**: \`${FunctionGroup}::${FunctionNameType}\` \| [`FunctionNameType`](README.md#functionnametype)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:112](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L112)

___

### <a id="functionnametype" name="functionnametype"></a> FunctionNameType

Ƭ **FunctionNameType**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:88](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L88)

___

### <a id="lambda" name="lambda"></a> Lambda

Ƭ **Lambda**: `VoidFunction`

#### Defined in

[packages/brickdoc-formula/src/grammar/lambda.ts:4](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lambda.ts#L4)

___

### <a id="mockeduuidv4" name="mockeduuidv4"></a> MockedUUIDV4

Ƭ **MockedUUIDV4**: `symbol` \| `string`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:45](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L45)

___

### <a id="namespaceid" name="namespaceid"></a> NamespaceId

Ƭ **NamespaceId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:129](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L129)

___

### <a id="operatorname" name="operatorname"></a> OperatorName

Ƭ **OperatorName**: ``"name"`` \| ``"string"`` \| ``"null"`` \| ``"boolean"`` \| ``"number"`` \| ``"access"`` \| ``"addition"`` \| ``"arguments"`` \| ``"array"`` \| ``"block"`` \| ``"chain"`` \| ``"combine"`` \| ``"compare"`` \| ``"concat"`` \| ``"equalCompare"`` \| ``"expression"`` \| ``"in"`` \| ``"multiplication"`` \| ``"not"`` \| ``"parenthesis"`` \| ``"predicate"`` \| ``"range"`` \| ``"record"`` \| ``"recordField"`` \| ``"thisRecord"`` \| ``"thisRow"``

#### Defined in

[packages/brickdoc-formula/src/grammar/operator.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operator.ts#L8)

___

### <a id="parseerrortype" name="parseerrortype"></a> ParseErrorType

Ƭ **ParseErrorType**: ``"parse"`` \| ``"syntax"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:110](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L110)

___

### <a id="parseresult" name="parseresult"></a> ParseResult

Ƭ **ParseResult**: [`SuccessParseResult`](interfaces/SuccessParseResult.md) \| [`ErrorParseResult`](interfaces/ErrorParseResult.md) \| [`LiteralParseResult`](interfaces/LiteralParseResult.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:72](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L72)

___

### <a id="persistformulatype" name="persistformulatype"></a> PersistFormulaType

Ƭ **PersistFormulaType**: `Exclude`<[`FormulaType`](README.md#formulatype), ``"any"`` \| ``"void"`` \| ``"Blank"`` \| ``"Range"`` \| [`FormulaControlType`](README.md#formulacontroltype) \| `FormulaComplexType`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:40](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L40)

___

### <a id="predicatefunction" name="predicatefunction"></a> PredicateFunction

Ƭ **PredicateFunction**: (`input`: `any`) => `boolean`

#### Type declaration

▸ (`input`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

##### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:123](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L123)

___

### <a id="predicateoperator" name="predicateoperator"></a> PredicateOperator

Ƭ **PredicateOperator**: ``"equal"`` \| ``"notEqual"`` \| ``"greaterThan"`` \| ``"greaterThanEqual"`` \| ``"lessThan"`` \| ``"lessThanEqual"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:138](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L138)

___

### <a id="reference" name="reference"></a> Reference

Ƭ **Reference**: `VariableReference` \| `SelfReference`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:300](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L300)

___

### <a id="rowid" name="rowid"></a> RowId

Ƭ **RowId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:133](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L133)

___

### <a id="simplecodefragmenttype" name="simplecodefragmenttype"></a> SimpleCodeFragmentType

Ƭ **SimpleCodeFragmentType**: ``"FunctionName"`` \| ``"Function"`` \| ``"FunctionGroup"`` \| ``"DoubleColon"`` \| ``"StringLiteral"`` \| ``"NumberLiteral"`` \| ``"BooleanLiteral"`` \| ``"NullLiteral"`` \| ``"Dot"`` \| ``"Equal2"`` \| ``"Equal"`` \| ``"GreaterThan"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:400](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L400)

___

### <a id="specialcodefragmenttype" name="specialcodefragmenttype"></a> SpecialCodeFragmentType

Ƭ **SpecialCodeFragmentType**: ``"unknown"`` \| ``"parseErrorOther"`` \| ``"Space"`` \| ``"literal"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:413](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L413)

___

### <a id="specialdefaultvariablename" name="specialdefaultvariablename"></a> SpecialDefaultVariableName

Ƭ **SpecialDefaultVariableName**: ``"str"`` \| ``"num"`` \| ``"bool"`` \| ``"cst"`` \| ``"record"`` \| ``"array"`` \| ``"date"`` \| ``"blank"`` \| ``"column"`` \| ``"row"`` \| ``"cell"`` \| ``"range"`` \| ``"block"`` \| ``"var"`` \| ``"null"`` \| ``"error"`` \| ``"void"`` \| ``"predicate"`` \| ``"spreadsheet"`` \| ``"reference"`` \| ``"function"`` \| ``"button"`` \| ``"switch"`` \| ``"select"`` \| ``"input"`` \| ``"radio"`` \| ``"rate"`` \| ``"slider"`` \| ``"pending"`` \| ``"waiting"`` \| ``"noPersist"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:53](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L53)

___

### <a id="spreadsheetid" name="spreadsheetid"></a> SpreadsheetId

Ƭ **SpreadsheetId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:132](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L132)

___

### <a id="spreadsheetkey" name="spreadsheetkey"></a> SpreadsheetKey

Ƭ **SpreadsheetKey**: \`#${NamespaceId}.${SpreadsheetId}\`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:116](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L116)

___

### <a id="spreadsheetname" name="spreadsheetname"></a> SpreadsheetName

Ƭ **SpreadsheetName**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:91](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L91)

___

### <a id="spreadsheetupdatenameviaidpayload" name="spreadsheetupdatenameviaidpayload"></a> SpreadsheetUpdateNameViaIdPayload

Ƭ **SpreadsheetUpdateNameViaIdPayload**: [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<``null``\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:103](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L103)

___

### <a id="testcasename" name="testcasename"></a> TestCaseName

Ƭ **TestCaseName**: [`OperatorName`](README.md#operatorname) \| `FeatureName` \| `FeatureTestName`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:94](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L94)

___

### <a id="typedresult" name="typedresult"></a> TypedResult

Ƭ **TypedResult**<`T`\>: `Extract`<[`AnyTypeResult`](README.md#anytyperesult), { `type`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormulaType`](README.md#formulatype) |

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:346](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L346)

___

### <a id="variableid" name="variableid"></a> VariableId

Ƭ **VariableId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:130](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L130)

___

### <a id="variablekey" name="variablekey"></a> VariableKey

Ƭ **VariableKey**: \`#${NamespaceId}.${VariableId}\`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:113](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L113)

___

### <a id="variablekind" name="variablekind"></a> VariableKind

Ƭ **VariableKind**: ``"literal"`` \| ``"constant"`` \| ``"expression"`` \| ``"unknown"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:95](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L95)

___

### <a id="variablename" name="variablename"></a> VariableName

Ƭ **VariableName**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:89](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L89)

___

### <a id="variablerichtype" name="variablerichtype"></a> VariableRichType

Ƭ **VariableRichType**: { `type`: [`FormulaSourceType`](README.md#formulasourcetype)  } & { `meta?`: `undefined` ; `type`: ``"normal"``  } \| { `meta`: { `columnId`: [`ColumnId`](README.md#columnid) ; `rowId`: [`uuid`](README.md#uuid) ; `spreadsheetId`: [`SpreadsheetId`](README.md#spreadsheetid)  } ; `type`: ``"spreadsheet"``  }

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:848](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L848)

___

### <a id="variabletask" name="variabletask"></a> VariableTask

Ƭ **VariableTask**: [`AsyncVariableTask`](interfaces/AsyncVariableTask.md) \| [`SyncVariableTask`](interfaces/SyncVariableTask.md)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:822](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L822)

___

### <a id="variablevalue" name="variablevalue"></a> VariableValue

Ƭ **VariableValue**: `SuccessVariableValue` \| `ErrorVariableValue`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:757](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L757)

___

### <a id="viewattrs" name="viewattrs"></a> ViewAttrs

Ƭ **ViewAttrs**: `Record`<`string`, `any`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:143](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L143)

___

### <a id="viewrender" name="viewrender"></a> ViewRender

Ƭ **ViewRender**: (`attrs`: [`ViewAttrs`](README.md#viewattrs), `data`: [`VariableDisplayData`](interfaces/VariableDisplayData.md)) => `React.ReactElement`

#### Type declaration

▸ (`attrs`, `data`): `React.ReactElement`

##### Parameters

| Name | Type |
| :------ | :------ |
| `attrs` | [`ViewAttrs`](README.md#viewattrs) |
| `data` | [`VariableDisplayData`](interfaces/VariableDisplayData.md) |

##### Returns

`React.ReactElement`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:145](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L145)

___

### <a id="viewtype" name="viewtype"></a> ViewType

Ƭ **ViewType**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:142](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L142)

___

### <a id="geteventdependencyinput" name="geteventdependencyinput"></a> getEventDependencyInput

Ƭ **getEventDependencyInput**: { `columnKey?`: `string` ; `rowKey?`: `string`  } & { `rowKey`: `string`  } \| { `columnKey`: `string`  } \| {}

#### Defined in

[packages/brickdoc-formula/src/controls/types.ts:48](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/controls/types.ts#L48)

___

### <a id="uuid" name="uuid"></a> uuid

Ƭ **uuid**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:127](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L127)

## Variables

### <a id="additionoperator" name="additionoperator"></a> AdditionOperator

• `Const` **AdditionOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L5)

___

### <a id="ampersand" name="ampersand"></a> Ampersand

• `Const` **Ampersand**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:113](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L113)

___

### <a id="and" name="and"></a> And

• `Const` **And**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:42](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L42)

___

### <a id="anyname" name="anyname"></a> AnyName

• `Const` **AnyName**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:219](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L219)

___

### <a id="at" name="at"></a> At

• `Const` **At**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:134](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L134)

___

### <a id="builtin_clauses" name="builtin_clauses"></a> BUILTIN\_CLAUSES

• `Const` **BUILTIN\_CLAUSES**: [`AnyFunctionClause`](interfaces/AnyFunctionClause.md)[]

#### Defined in

[packages/brickdoc-formula/src/functions/index.ts:46](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/index.ts#L46)

___

### <a id="builtin_strings" name="builtin_strings"></a> BUILTIN\_STRINGS

• `Const` **BUILTIN\_STRINGS**: `string`[]

#### Defined in

[packages/brickdoc-formula/src/tests/testCases.ts:7](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testCases.ts#L7)

___

### <a id="booleanliteral" name="booleanliteral"></a> BooleanLiteral

• `Const` **BooleanLiteral**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:194](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L194)

___

### <a id="core_function_groups" name="core_function_groups"></a> CORE\_FUNCTION\_GROUPS

• `Const` **CORE\_FUNCTION\_GROUPS**: readonly [``"core"``]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:32](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L32)

___

### <a id="caret" name="caret"></a> Caret

• `Const` **Caret**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:118](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L118)

___

### <a id="colon" name="colon"></a> Colon

• `Const` **Colon**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:215](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L215)

___

### <a id="combineoperator" name="combineoperator"></a> CombineOperator

• `Const` **CombineOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:7](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L7)

___

### <a id="comma" name="comma"></a> Comma

• `Const` **Comma**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:209](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L209)

___

### <a id="compareoperator" name="compareoperator"></a> CompareOperator

• `Const` **CompareOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:4](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L4)

___

### <a id="currentblock" name="currentblock"></a> CurrentBlock

• `Const` **CurrentBlock**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:28](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L28)

___

### <a id="default_first_namespaceid" name="default_first_namespaceid"></a> DEFAULT\_FIRST\_NAMESPACEID

• `Const` **DEFAULT\_FIRST\_NAMESPACEID**: ``"00000000-0000-0000-0000-000000000000"``

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:16](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L16)

___

### <a id="default_views" name="default_views"></a> DEFAULT\_VIEWS

• `Const` **DEFAULT\_VIEWS**: [`View`](interfaces/View.md)[]

#### Defined in

[packages/brickdoc-formula/src/render/index.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/render/index.ts#L5)

___

### <a id="decimalliteral" name="decimalliteral"></a> DecimalLiteral

• `Const` **DecimalLiteral**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:189](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L189)

___

### <a id="div" name="div"></a> Div

• `Const` **Div**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:166](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L166)

___

### <a id="dollar" name="dollar"></a> Dollar

• `Const` **Dollar**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:129](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L129)

___

### <a id="dot" name="dot"></a> Dot

• `Const` **Dot**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:144](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L144)

___

### <a id="doublecolon" name="doublecolon"></a> DoubleColon

• `Const` **DoubleColon**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:213](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L213)

___

### <a id="equal" name="equal"></a> Equal

• `Const` **Equal**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:65](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L65)

___

### <a id="equal2" name="equal2"></a> Equal2

• `Const` **Equal2**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:71](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L71)

___

### <a id="equalcompareoperator" name="equalcompareoperator"></a> EqualCompareOperator

• `Const` **EqualCompareOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L3)

___

### <a id="exactin" name="exactin"></a> ExactIn

• `Const` **ExactIn**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:21](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L21)

___

### <a id="formula_feature_control" name="formula_feature_control"></a> FORMULA\_FEATURE\_CONTROL

• `Const` **FORMULA\_FEATURE\_CONTROL**: ``"formula-controls"``

#### Defined in

[packages/brickdoc-formula/src/context/features.ts:1](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/features.ts#L1)

___

### <a id="formula_parser_version" name="formula_parser_version"></a> FORMULA\_PARSER\_VERSION

• `Const` **FORMULA\_PARSER\_VERSION**: ``0``

#### Defined in

[packages/brickdoc-formula/src/version.ts:1](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/version.ts#L1)

___

### <a id="formula_used_types" name="formula_used_types"></a> FORMULA\_USED\_TYPES

• `Const` **FORMULA\_USED\_TYPES**: readonly [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``, ``"Button"``, ``"Switch"``, ``"literal"``, ``"Pending"``, ``"Waiting"``, ``"NoPersist"``]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:22](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L22)

___

### <a id="function_name_regex" name="function_name_regex"></a> FUNCTION\_NAME\_REGEX

• `Const` **FUNCTION\_NAME\_REGEX**: `RegExp`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:12](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L12)

___

### <a id="formulablocknamechangedtrigger" name="formulablocknamechangedtrigger"></a> FormulaBlockNameChangedTrigger

• `Const` **FormulaBlockNameChangedTrigger**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `name`: `string` ; `username`: `string`  }\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:59](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L59)

___

### <a id="formulablocknamedeletedtrigger" name="formulablocknamedeletedtrigger"></a> FormulaBlockNameDeletedTrigger

• `Const` **FormulaBlockNameDeletedTrigger**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `name`: `string` ; `username`: `string`  }\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:66](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L66)

___

### <a id="formulablocknamemodifiedwithusername" name="formulablocknamemodifiedwithusername"></a> FormulaBlockNameModifiedWithUsername

• `Const` **FormulaBlockNameModifiedWithUsername**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `name`: `string` ; `username`: `string`  }\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:73](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L73)

___

### <a id="formulacontextnamechanged" name="formulacontextnamechanged"></a> FormulaContextNameChanged

• `Const` **FormulaContextNameChanged**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string`  }\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:119](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L119)

___

### <a id="formulacontextnameremove" name="formulacontextnameremove"></a> FormulaContextNameRemove

• `Const` **FormulaContextNameRemove**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string`  }\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:126](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L126)

___

### <a id="formulacontextticktrigger" name="formulacontextticktrigger"></a> FormulaContextTickTrigger

• `Const` **FormulaContextTickTrigger**: `EventType`<{ `domain`: `string` ; `state`: `any`  }, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:151](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L151)

___

### <a id="formuladocsoftdeleted" name="formuladocsoftdeleted"></a> FormulaDocSoftDeleted

• `Const` **FormulaDocSoftDeleted**: `EventType`<{ `id`: `string` ; `username`: `string`  }, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:52](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L52)

___

### <a id="formulalexer" name="formulalexer"></a> FormulaLexer

• `Const` **FormulaLexer**: `Lexer`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:322](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L322)

___

### <a id="formulataskcompleted" name="formulataskcompleted"></a> FormulaTaskCompleted

• `Const` **FormulaTaskCompleted**: `EventType`<{ `namespaceId`: `string` ; `task`: [`VariableTask`](README.md#variabletask) ; `variableId`: `string`  }, `void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:31](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L31)

___

### <a id="formulataskstarted" name="formulataskstarted"></a> FormulaTaskStarted

• `Const` **FormulaTaskStarted**: `EventType`<{ `namespaceId`: `string` ; `task`: [`VariableTask`](README.md#variabletask) ; `variableId`: `string`  }, `void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:24](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L24)

___

### <a id="formulatickviaid" name="formulatickviaid"></a> FormulaTickViaId

• `Const` **FormulaTickViaId**: `EventType`<{ `namespaceId`: `string` ; `uuid`: `string` ; `variableId`: `string`  }, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L6)

___

### <a id="formulatypecastname" name="formulatypecastname"></a> FormulaTypeCastName

• `Const` **FormulaTypeCastName**: `Record`<[`FormulaType`](README.md#formulatype), [`SpecialDefaultVariableName`](README.md#specialdefaultvariablename)\>

#### Defined in

[packages/brickdoc-formula/src/context/context.ts:74](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/context.ts#L74)

___

### <a id="formulaupdatedviaid" name="formulaupdatedviaid"></a> FormulaUpdatedViaId

• `Const` **FormulaUpdatedViaId**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableInterface`](interfaces/VariableInterface.md)\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:17](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L17)

___

### <a id="functionname" name="functionname"></a> FunctionName

• `Const` **FunctionName**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:217](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L217)

___

### <a id="greaterthan" name="greaterthan"></a> GreaterThan

• `Const` **GreaterThan**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:59](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L59)

___

### <a id="greaterthanequal" name="greaterthanequal"></a> GreaterThanEqual

• `Const` **GreaterThanEqual**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:95](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L95)

___

### <a id="in" name="in"></a> In

• `Const` **In**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:16](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L16)

___

### <a id="inoperator" name="inoperator"></a> InOperator

• `Const` **InOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L8)

___

### <a id="input" name="input"></a> Input

• `Const` **Input**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:32](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L32)

___

### <a id="lbrace" name="lbrace"></a> LBrace

• `Const` **LBrace**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:178](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L178)

___

### <a id="lbracket" name="lbracket"></a> LBracket

• `Const` **LBracket**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:175](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L175)

___

### <a id="lparen" name="lparen"></a> LParen

• `Const` **LParen**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:172](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L172)

___

### <a id="lambdaargumentnumber" name="lambdaargumentnumber"></a> LambdaArgumentNumber

• `Const` **LambdaArgumentNumber**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:181](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L181)

___

### <a id="lessthan" name="lessthan"></a> LessThan

• `Const` **LessThan**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:77](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L77)

___

### <a id="lessthanequal" name="lessthanequal"></a> LessThanEqual

• `Const` **LessThanEqual**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:101](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L101)

___

### <a id="minus" name="minus"></a> Minus

• `Const` **Minus**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:154](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L154)

___

### <a id="multi" name="multi"></a> Multi

• `Const` **Multi**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:160](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L160)

___

### <a id="multiplicationoperator" name="multiplicationoperator"></a> MultiplicationOperator

• `Const` **MultiplicationOperator**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L6)

___

### <a id="name_special_invalid_chars" name="name_special_invalid_chars"></a> NAME\_SPECIAL\_INVALID\_CHARS

• `Const` **NAME\_SPECIAL\_INVALID\_CHARS**: `string`[]

#### Defined in

[packages/brickdoc-formula/src/tests/testCases.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testCases.ts#L5)

___

### <a id="name_valid_prefix" name="name_valid_prefix"></a> NAME\_VALID\_PREFIX

• `Const` **NAME\_VALID\_PREFIX**: `string`[]

#### Defined in

[packages/brickdoc-formula/src/tests/testCases.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testCases.ts#L8)

___

### <a id="name_valid_suffix_only" name="name_valid_suffix_only"></a> NAME\_VALID\_SUFFIX\_ONLY

• `Const` **NAME\_VALID\_SUFFIX\_ONLY**: `string`[]

#### Defined in

[packages/brickdoc-formula/src/tests/testCases.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testCases.ts#L6)

___

### <a id="not" name="not"></a> Not

• `Const` **Not**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:54](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L54)

___

### <a id="notequal" name="notequal"></a> NotEqual

• `Const` **NotEqual**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:83](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L83)

___

### <a id="notequal2" name="notequal2"></a> NotEqual2

• `Const` **NotEqual2**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:89](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L89)

___

### <a id="nullliteral" name="nullliteral"></a> NullLiteral

• `Const` **NullLiteral**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:204](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L204)

___

### <a id="numberliteral" name="numberliteral"></a> NumberLiteral

• `Const` **NumberLiteral**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:183](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L183)

___

### <a id="operators" name="operators"></a> OPERATORS

• `Const` **OPERATORS**: [`OperatorType`](interfaces/OperatorType.md)[]

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/index.ts:56](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/index.ts#L56)

___

### <a id="or" name="or"></a> Or

• `Const` **Or**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:48](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L48)

___

### <a id="parserinstance" name="parserinstance"></a> ParserInstance

• `Const` **ParserInstance**: [`FormulaParser`](classes/FormulaParser.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/parser.ts:327](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/parser.ts#L327)

___

### <a id="plus" name="plus"></a> Plus

• `Const` **Plus**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:107](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L107)

___

### <a id="rbrace" name="rbrace"></a> RBrace

• `Const` **RBrace**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:179](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L179)

___

### <a id="rbracket" name="rbracket"></a> RBracket

• `Const` **RBracket**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:176](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L176)

___

### <a id="rparen" name="rparen"></a> RParen

• `Const` **RParen**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:173](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L173)

___

### <a id="self" name="self"></a> Self

• `Const` **Self**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:27](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L27)

___

### <a id="semicolon" name="semicolon"></a> Semicolon

• `Const` **Semicolon**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:211](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L211)

___

### <a id="sharp" name="sharp"></a> Sharp

• `Const` **Sharp**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:139](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L139)

___

### <a id="sign" name="sign"></a> Sign

• `Const` **Sign**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:124](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L124)

___

### <a id="spreadsheetreloadviaid" name="spreadsheetreloadviaid"></a> SpreadsheetReloadViaId

• `Const` **SpreadsheetReloadViaId**: `EventType`<[`SpreadsheetUpdateNameViaIdPayload`](README.md#spreadsheetupdatenameviaidpayload), `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:105](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L105)

___

### <a id="spreadsheetupdatecolumnsviaid" name="spreadsheetupdatecolumnsviaid"></a> SpreadsheetUpdateColumnsViaId

• `Const` **SpreadsheetUpdateColumnsViaId**: `EventType`<{ `columns`: [`Column`](interfaces/Column.md)[] ; `key`: `string` ; `namespaceId`: `string` ; `spreadsheetId`: `string`  }, `void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:142](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L142)

___

### <a id="spreadsheetupdatenameviaid" name="spreadsheetupdatenameviaid"></a> SpreadsheetUpdateNameViaId

• `Const` **SpreadsheetUpdateNameViaId**: `EventType`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:112](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L112)

___

### <a id="spreadsheetupdaterowsviaid" name="spreadsheetupdaterowsviaid"></a> SpreadsheetUpdateRowsViaId

• `Const` **SpreadsheetUpdateRowsViaId**: `EventType`<{ `key`: `string` ; `namespaceId`: `string` ; `rows`: [`Row`](interfaces/Row.md)[] ; `spreadsheetId`: `string`  }, `void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:133](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L133)

___

### <a id="stringliteral" name="stringliteral"></a> StringLiteral

• `Const` **StringLiteral**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:199](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L199)

___

### <a id="token_suffix_pattern" name="token_suffix_pattern"></a> TOKEN\_SUFFIX\_PATTERN

• `Const` **TOKEN\_SUFFIX\_PATTERN**: `string`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:14](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L14)

___

### <a id="thisrecord" name="thisrecord"></a> ThisRecord

• `Const` **ThisRecord**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:37](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L37)

___

### <a id="thisrow" name="thisrow"></a> ThisRow

• `Const` **ThisRow**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:33](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L33)

___

### <a id="uuid-1" name="uuid-1"></a> UUID

• `Const` **UUID**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:149](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L149)

___

### <a id="whitespace" name="whitespace"></a> WhiteSpace

• `Const` **WhiteSpace**: `TokenType`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:222](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L222)

___

### <a id="accessoperator" name="accessoperator"></a> accessOperator

• `Const` **accessOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/access.ts:56](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/access.ts#L56)

___

### <a id="additionoperator-1" name="additionoperator-1"></a> additionOperator

• `Const` **additionOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/addition.ts:7](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/addition.ts#L7)

___

### <a id="alltokens" name="alltokens"></a> allTokens

• `Const` **allTokens**: `TokenType`[]

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:228](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L228)

___

### <a id="apicurrentposition" name="apicurrentposition"></a> apiCurrentPosition

• `Const` **apiCurrentPosition**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Record"``, ``true``, ``false``, ``false``, []\>

**`source`**

```typescript
const apiCurrentPosition = createFunctionClause({
    name: 'CURRENT_POSITION',
    async: true,
    persist: false,
    pure: false,
    effect: false,
    lazy: false,
    acceptError: false,
    testCases: [],
    description: 'Returns current position',
    group: 'core',
    args: [],
    returns: 'Record',
    examples: [
        {
            input: '=CURRENT_POSITION()',
            output: {
                type: 'Record',
                subType: 'number',
                result: {
                    long: { result: 0, type: 'number' },
                    lat: { result: 0, type: 'number' }
                }
            }
        }
    ],
    chain: false,
    reference: CURRENT_POSITION
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/api/currentPosition.ts:42](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/api/currentPosition.ts#L42)

___

### <a id="apiexchange" name="apiexchange"></a> apiExchange

• `Const` **apiExchange**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Record"`` \| ``"Error"``, ``true``, ``false``, ``false``, [{ `name`: `string` = 'url'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const apiExchange = createFunctionClause({
    name: 'EXCHANGE',
    async: true,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: true,
    examples: [{ input: '=EXCHANGE(10)', output: { type: 'Record', result: {}, subType: 'void' } }],
    description: 'Get exchange data',
    group: 'core',
    args: [{ type: 'string', name: 'url' }],
    testCases: [],
    returns: 'Record',
    chain: false,
    reference: async (ctx, { result: code }) => {
        if (!code)
            return { type: 'Error', result: 'CODE is blank', errorKind: 'runtime' };
        // TODO config secret
        const { data } = await axios.get(`https://v6.exchangerate-api.com/v6/3648761394fd50008e3c3e31/latest/${code}`);
        return castData(data.conversion_rates) as RecordResult;
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/api/exchange.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/api/exchange.ts#L8)

___

### <a id="argumentsoperator" name="argumentsoperator"></a> argumentsOperator

• `Const` **argumentsOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/arguments.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/arguments.ts#L5)

___

### <a id="arrayaverage" name="arrayaverage"></a> arrayAverage

• `Const` **arrayAverage**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`source`**

```typescript
const arrayAverage = createFunctionClause({
    name: 'Average',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Returns the average of the array.',
    group: 'core',
    args: [{ name: 'array', type: 'Array' }],
    examples: [{ input: '=Average([1,2,3])', output: { type: 'number', result: 2 } }],
    returns: 'number',
    testCases: [
        { input: [[]], output: { type: 'number', result: NaN } },
        { input: [[{ type: 'number', result: 1 }]], output: { type: 'number', result: 1 } }
    ],
    chain: true,
    reference: (ctx, { result }) => {
        return { result: result.map(a => Number(a.result)).reduce((a, b) => a + b, 0) / result.length, type: 'number' };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/array/average.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/array/average.ts#L6)

___

### <a id="arrayjoin" name="arrayjoin"></a> arrayJoin

• `Const` **arrayJoin**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"Error"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }, { `default`: { `result`: `string` = ','; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'separator'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const arrayJoin = createFunctionClause({
    name: 'Join',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Joins an array of strings',
    group: 'core',
    args: [
        { name: 'array', type: 'Array' },
        { name: 'separator', type: 'string', default: { type: 'string', result: ',' } }
    ],
    examples: [{ input: '=Join([1,2,3])', output: { type: 'string', result: '1,2,3' } }],
    returns: 'string',
    testCases: [
        { input: [[], ';;'], output: { type: 'string', result: '' } },
        {
            input: [
                [
                    { type: 'string', result: 'a' },
                    { type: 'string', result: 'b' }
                ],
                ';;'
            ],
            output: { type: 'string', result: 'a;;b' }
        },
        {
            input: [
                [
                    { type: 'string', result: 'a' },
                    { type: 'number', result: 1 }
                ],
                ';;'
            ],
            output: { type: 'Error', result: 'Join expects an array of strings', errorKind: 'runtime' }
        }
    ],
    chain: true,
    reference: (ctx, { subType, result }, { result: separator }) => {
        if (!['string', 'number', 'void'].includes(subType)) {
            return { type: 'Error', result: 'Join expects an array of strings', errorKind: 'runtime' };
        }
        return { result: result.map(a => a.result).join(separator), type: 'string' };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/array/join.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/array/join.ts#L6)

___

### <a id="arrayoperator" name="arrayoperator"></a> arrayOperator

• `Const` **arrayOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/array.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/array.ts#L5)

___

### <a id="arraysum" name="arraysum"></a> arraySum

• `Const` **arraySum**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`source`**

```typescript
const arraySum = createFunctionClause({
    name: 'Sum',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Returns the sum of the array.',
    group: 'core',
    args: [{ name: 'array', type: 'Array' }],
    examples: [{ input: '=SUM([1,2,3])', output: { type: 'number', result: 6 } }],
    returns: 'number',
    testCases: [
        { input: [[]], output: { type: 'number', result: 0 } },
        {
            input: [
                [
                    { type: 'number', result: 1 },
                    { type: 'number', result: 2 }
                ]
            ],
            output: { type: 'number', result: 3 }
        }
    ],
    chain: true,
    reference: (ctx, { result }) => {
        return { result: result.map(a => Number(a.result)).reduce((a, b) => a + b, 0), type: 'number' };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/array/sum.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/array/sum.ts#L6)

___

### <a id="blockoperator" name="blockoperator"></a> blockOperator

• `Const` **blockOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/block.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/block.ts#L8)

___

### <a id="booleanoperator" name="booleanoperator"></a> booleanOperator

• `Const` **booleanOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/boolean.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/boolean.ts#L3)

___

### <a id="chainoperator" name="chainoperator"></a> chainOperator

• `Const` **chainOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/chain.ts:4](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/chain.ts#L4)

___

### <a id="combineoperator-1" name="combineoperator-1"></a> combineOperator

• `Const` **combineOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/combine.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/combine.ts#L5)

___

### <a id="compareoperator-1" name="compareoperator-1"></a> compareOperator

• `Const` **compareOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/compare.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/compare.ts#L5)

___

### <a id="concatoperator" name="concatoperator"></a> concatOperator

• `Const` **concatOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/concat.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/concat.ts#L3)

___

### <a id="controlbutton" name="controlbutton"></a> controlButton

• `Const` **controlButton**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Button"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'name'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'onClick'; `type`: ``"Function"`` = 'Function' }]\>

**`source`**

```typescript
const controlButton = createFunctionClause({
    name: 'Button',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    feature: FORMULA_FEATURE_CONTROL,
    examples: [{ input: '=Button("name")', output: null }],
    description: 'Build button',
    group: 'core',
    args: [
        { name: 'name', type: 'string' },
        { name: 'onClick', type: 'Function' }
    ],
    testCases: [],
    returns: 'Button',
    chain: false,
    reference: (ctx, { result: name }, fn) => {
        const buttonResult = new ButtonClass(ctx, { name, fn });
        return { result: buttonResult, type: 'Button' };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/control/button.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/control/button.ts#L8)

___

### <a id="controlswitch" name="controlswitch"></a> controlSwitch

• `Const` **controlSwitch**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Switch"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'name'; `type`: ``"boolean"`` = 'boolean' }, { `name`: `string` = 'onChange'; `type`: ``"Function"`` = 'Function' }]\>

**`source`**

```typescript
const controlSwitch = createFunctionClause({
    name: 'Switch',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    feature: FORMULA_FEATURE_CONTROL,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Switch("name")', output: null }],
    description: 'Build switch',
    group: 'core',
    args: [
        { name: 'name', type: 'boolean' },
        { name: 'onChange', type: 'Function' }
    ],
    testCases: [],
    returns: 'Switch',
    chain: false,
    reference: (ctx, { result: checked }, fn) => {
        const switchResult = new SwitchClass(ctx, { checked, fn });
        return { result: switchResult, type: 'Switch' };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/control/switch.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/control/switch.ts#L8)

___

### <a id="converttoarray" name="converttoarray"></a> convertToArray

• `Const` **convertToArray**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Array"`` \| ``"Error"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'input'; `type`: [``"number"``, ``"Spreadsheet"``]  }]\>

**`source`**

```typescript
const convertToArray = createFunctionClause({
    name: 'toArray',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'Array', subType: 'void', result: [] } }],
    description: 'Converts the value to an array.',
    group: 'core',
    args: [{ name: 'input', type: ['number', 'Spreadsheet'] }],
    returns: 'Array',
    testCases: [
        {
            input: [3],
            output: {
                type: 'Array',
                subType: 'number',
                result: [
                    { type: 'number', result: 0 },
                    { type: 'number', result: 1 },
                    { type: 'number', result: 2 }
                ]
            }
        }
    ],
    chain: true,
    reference: (ctx, { result, type }) => {
        if (type === 'Spreadsheet')
            return {
                type: 'Array',
                subType: 'Array',
                result: result.toArray().map((row: string[]) => ({
                    type: 'Array',
                    subType: 'string',
                    result: row.map<StringResult>(r => ({ type: 'string', result: r }))
                }))
            };
        if (result < 0) {
            return { type: 'Error', result: 'Number should be positive', errorKind: 'runtime' };
        }
        return {
            type: 'Array',
            subType: 'number',
            result: Array.from(Array(result).keys()).map<NumberResult>(n => ({ type: 'number', result: n }))
        };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/convert/toArray.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/convert/toArray.ts#L6)

___

### <a id="converttoboolean" name="converttoboolean"></a> convertToBoolean

• `Const` **convertToBoolean**: [`FunctionClause`](interfaces/FunctionClause.md)<``"boolean"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const convertToBoolean = createFunctionClause({
    name: 'toBoolean',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts a string to a boolean',
    group: 'core',
    args: [{ name: 'string', type: 'string' }],
    examples: [
        { input: '=toBoolean("true")', output: { type: 'boolean', result: true } },
        { input: '=toBoolean("False")', output: { type: 'boolean', result: false } }
    ],
    returns: 'boolean',
    testCases: [
        { input: ['true'], output: { type: 'boolean', result: true } },
        { input: ['True'], output: { type: 'boolean', result: true } },
        { input: ['false'], output: { type: 'boolean', result: false } },
        { input: ['False'], output: { type: 'boolean', result: false } },
        { input: ['other'], output: { type: 'boolean', result: false } }
    ],
    chain: true,
    reference: (ctx, string) => {
        const result = string.result.toUpperCase() === 'TRUE';
        return { type: 'boolean', result };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/convert/toBoolean.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/convert/toBoolean.ts#L6)

___

### <a id="converttonumber" name="converttonumber"></a> convertToNumber

• `Const` **convertToNumber**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"`` \| ``"Error"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'string'; `type`: [``"string"``, ``"Cell"``]  }]\>

**`source`**

```typescript
const convertToNumber = createFunctionClause({
    name: 'toNumber',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Convert to a number',
    group: 'core',
    returns: 'number',
    chain: true,
    args: [{ name: 'string', type: ['string', 'Cell'] }],
    examples: [
        { input: '=toNumber("123")', output: { type: 'number', result: 123 } },
        { input: '=toNumber("foo")', output: { type: 'Error', result: 'Not a number', errorKind: 'runtime' } }
    ],
    testCases: [
        { input: ['123'], output: { type: 'number', result: 123 } },
        { input: ['foo'], output: { type: 'Error', result: 'Not a number', errorKind: 'runtime' } }
    ],
    reference: (ctx, { result, type }) => {
        const number = Number(type === 'Cell' ? result.value : result);
        if (isNaN(number)) {
            return { type: 'Error', result: 'Not a number', errorKind: 'runtime' };
        }
        return { type: 'number', result: number };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/convert/toNumber.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/convert/toNumber.ts#L6)

___

### <a id="converttorecord" name="converttorecord"></a> convertToRecord

• `Const` **convertToRecord**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Record"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'input'; `type`: ``"Date"`` = 'Date' }]\>

**`source`**

```typescript
const convertToRecord = createFunctionClause({
    name: 'toRecord',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts the Date to a record.',
    group: 'core',
    args: [{ name: 'input', type: 'Date' }],
    examples: [
        {
            input: '=toRecord(new Date())',
            output: {
                type: 'Record',
                subType: 'number',
                result: {
                    month: { type: 'number', result: 0 },
                    hour: { type: 'number', result: 0 },
                    minutes: { type: 'number', result: 0 },
                    seconds: { type: 'number', result: 0 },
                    day: { type: 'number', result: 1 },
                    year: { type: 'number', result: 1970 }
                }
            }
        }
    ],
    returns: 'Record',
    testCases: [],
    chain: true,
    reference: (ctx, { result: date }) => {
        return {
            type: 'Record',
            subType: 'number',
            result: {
                month: { type: 'number', result: date.getMonth() },
                hour: { type: 'number', result: date.getHours() },
                minutes: { type: 'number', result: date.getMinutes() },
                seconds: { type: 'number', result: date.getSeconds() },
                day: { type: 'number', result: date.getDate() },
                year: { type: 'number', result: date.getFullYear() }
            }
        };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/convert/toRecord.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/convert/toRecord.ts#L6)

___

### <a id="converttostring" name="converttostring"></a> convertToString

• `Const` **convertToString**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'input'; `type`: [``"number"``, ``"Array"``, ``"Cell"``, ``"boolean"``, ``"null"``]  }]\>

**`source`**

```typescript
const convertToString = createFunctionClause({
    name: 'toString',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts to a string',
    group: 'core',
    chain: true,
    returns: 'string',
    args: [{ name: 'input', type: ['number', 'Array', 'Cell', 'boolean', 'null'] }],
    examples: [{ input: '=toString([])', output: { type: 'string', result: '[]' } }],
    testCases: [
        { input: [[]], output: { type: 'string', result: '[]' } },
        {
            input: [
                [
                    { type: 'number', result: 1 },
                    { type: 'string', result: 'foo' }
                ]
            ],
            output: { type: 'string', result: '[1, "foo"]' }
        },
        { input: [true], output: { type: 'string', result: 'true' } },
        { input: [null], output: { type: 'string', result: 'null' } },
        { input: [123], output: { type: 'string', result: '123' } }
    ],
    reference: globalToString
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/convert/toString.ts:24](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/convert/toString.ts#L24)

___

### <a id="coreset" name="coreset"></a> coreSet

• `Const` **coreSet**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Error"`` \| ``"Function"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'name'; `type`: ``"Reference"`` = 'Reference' }, { `name`: `string` = 'body'; `type`: ``"Cst"`` = 'Cst' }]\>

**`source`**

```typescript
const coreSet = createFunctionClause({
    name: 'Set',
    async: false,
    pure: false,
    lazy: true,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Set(A, A+1)', output: null }],
    description: 'Set variable',
    group: 'core',
    args: [
        { name: 'name', type: 'Reference' },
        { name: 'body', type: 'Cst' }
    ],
    testCases: [],
    returns: 'Function',
    chain: false,
    reference: (ctx, ref, cst) => {
        const reference = ref.result;
        if (reference.kind === 'variable') {
            const variable = ctx.formulaContext.findVariableById(reference.namespaceId, reference.variableId);
            if (!variable) {
                return { type: 'Error', errorKind: 'runtime', result: 'Variable not found' };
            }
        }
        return { type: 'Function', result: [{ name: 'Set', args: [ref, cst] }] };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/core/set.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/core/set.ts#L6)

___

### <a id="datedate" name="datedate"></a> dateDate

• `Const` **dateDate**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Date"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'input'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const dateDate = createFunctionClause({
    name: 'DATE',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=DATE("1926-08-17")', output: { type: 'Date', result: new Date('1926-08-17') } }],
    description: 'Returns the date specified by the input',
    group: 'core',
    args: [{ name: 'input', type: 'string' }],
    testCases: [{ input: ['1926-08-17'], output: { type: 'Date', result: new Date('1926-08-17') } }],
    returns: 'Date',
    chain: false,
    reference: (ctx, string) => ({ result: new Date(string.result), type: 'Date' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/date/date.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/date/date.ts#L6)

___

### <a id="datenow" name="datenow"></a> dateNow

• `Const` **dateNow**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Date"``, ``false``, ``false``, ``false``, []\>

**`source`**

```typescript
const dateNow = createFunctionClause({
    name: 'NOW',
    async: false,
    pure: false,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=NOW()', output: { type: 'Date', result: new Date('1926-08-17T00:00:00.000Z') } }],
    description: 'Returns the current date',
    group: 'core',
    args: [],
    testCases: [],
    returns: 'Date',
    chain: false,
    reference: ctx => ({ result: new Date(), type: 'Date' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/date/now.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/date/now.ts#L6)

___

### <a id="equalcompareoperator-1" name="equalcompareoperator-1"></a> equalCompareOperator

• `Const` **equalCompareOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/equalCompare.ts:5](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/equalCompare.ts#L5)

___

### <a id="errorerror" name="errorerror"></a> errorError

• `Const` **errorError**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"Error"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'reason'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const errorError = createFunctionClause({
    name: 'ERROR',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=ERROR("foo bar")', output: { type: 'string', result: 'foo bar' } }],
    description: 'Returns an error with the given message.',
    group: 'core',
    args: [{ name: 'reason', type: 'string' }],
    testCases: [{ input: ['foo bar'], output: { type: 'Error', result: 'foo bar', errorKind: 'custom' } }],
    returns: 'Error',
    chain: true,
    reference: (ctx, reason) => ({
        result: reason.result,
        type: 'Error',
        errorKind: 'custom'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/error/error.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/error/error.ts#L6)

___

### <a id="expressionoperator" name="expressionoperator"></a> expressionOperator

• `Const` **expressionOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/expression.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/expression.ts#L3)

___

### <a id="inoperator-1" name="inoperator-1"></a> inOperator

• `Const` **inOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/in.ts:7](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/in.ts#L7)

___

### <a id="logicif" name="logicif"></a> logicIf

• `Const` **logicIf**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'condition'; `type`: ``"boolean"`` = 'boolean' }, { `name`: `string` = 'ifTrue'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }, { `name`: `string` = 'ifFalse'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }]\>

**`source`**

```typescript
const logicIf = createFunctionClause({
    name: 'IF',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the first argument if the condition is true, otherwise the second argument.',
    group: 'core',
    chain: false,
    args: [
        { name: 'condition', type: 'boolean' },
        { name: 'ifTrue', type: [...FORMULA_USED_TYPES] },
        { name: 'ifFalse', type: [...FORMULA_USED_TYPES] }
    ],
    examples: [{ input: '=IF(true, "123", "456")', output: { type: 'string', result: '123' } }],
    returns: FORMULA_USED_TYPES,
    testCases: [
        { input: [true, 1, 2], output: { type: 'number', result: 1 } },
        { input: [true, '2', 2], output: { type: 'string', result: '2' } },
        { input: [false, '1', false], output: { type: 'boolean', result: false } }
    ],
    reference: (ctx, condition, ifTrue, ifFalse) => (condition.result ? ifTrue : ifFalse)
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/logic/if.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/logic/if.ts#L6)

___

### <a id="logiciferror" name="logiciferror"></a> logicIfError

• `Const` **logicIfError**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``false``, ``true``, ``true``, [{ `name`: `string` = 'expr1'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }, { `name`: `string` = 'expr2'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }]\>

**`source`**

```typescript
const logicIfError = createFunctionClause({
    name: 'IFERROR',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: true,
    effect: false,
    description: 'Returns the first argument if it is not an error, otherwise returns the second argument.',
    group: 'core',
    chain: true,
    examples: [
        { input: '=IFERROR(1, 2)', output: { type: 'number', result: 2 } },
        { input: '=IFERROR(ERROR("foo bar"), "123")', output: { type: 'Error', result: 'foo bar', errorKind: 'runtime' } }
    ],
    args: [
        { name: 'expr1', type: [...FORMULA_USED_TYPES] },
        { name: 'expr2', type: [...FORMULA_USED_TYPES] }
    ],
    testCases: [{ input: [1, 2], output: { type: 'number', result: 1 } }],
    returns: FORMULA_USED_TYPES,
    reference: (ctx, expr1, expr2) => (expr1.type === 'Error' ? expr2 : expr1)
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/logic/ifError.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/logic/ifError.ts#L6)

___

### <a id="mathabs" name="mathabs"></a> mathAbs

• `Const` **mathAbs**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathAbs = createFunctionClause({
    name: 'ABS',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the absolute value of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
        { input: [-1], output: { type: 'number', result: 1 } },
        { input: [NaN], output: { type: 'number', result: NaN } }
    ],
    examples: [{ input: '=ABS(-1)', output: { type: 'number', result: 1 } }],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.abs(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/abs.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/abs.ts#L6)

___

### <a id="mathfloor" name="mathfloor"></a> mathFloor

• `Const` **mathFloor**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathFloor = createFunctionClause({
    name: 'FLOOR',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the number rounded down to the nearest integer.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=FLOOR(1.5)', output: { type: 'number', result: 2 } }],
    testCases: [
        { input: [NaN], output: { type: 'number', result: NaN } },
        { input: [1.5], output: { type: 'number', result: 1 } },
        { input: [-1.5], output: { type: 'number', result: -2 } }
    ],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.floor(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/floor.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/floor.ts#L6)

___

### <a id="mathint" name="mathint"></a> mathInt

• `Const` **mathInt**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathInt = createFunctionClause({
    name: 'INT',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
        { input: [NaN], output: { type: 'number', result: NaN } },
        { input: [1.5], output: { type: 'number', result: 1 } }
    ],
    examples: [{ input: '=INT(-1.5)', output: { type: 'number', result: -1 } }],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.floor(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/int.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/int.ts#L6)

___

### <a id="mathln" name="mathln"></a> mathLn

• `Const` **mathLn**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathLn = createFunctionClause({
    name: 'LN',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the natural logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=LN(100)', output: { type: 'number', result: 4.605170185988092 } }],
    testCases: [{ input: [NaN], output: { type: 'number', result: NaN } }],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.log(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/ln.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/ln.ts#L6)

___

### <a id="mathlog10" name="mathlog10"></a> mathLog10

• `Const` **mathLog10**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathLog10 = createFunctionClause({
    name: 'LOG10',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the base-10 logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
        { input: [NaN], output: { type: 'number', result: NaN } },
        { input: [100], output: { type: 'number', result: 2 } }
    ],
    examples: [{ input: '=LOG10(100)', output: { type: 'number', result: 2 } }],
    chain: false,
    reference: (ctx, number) => ({ result: Math.log10(number.result), type: 'number' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/log10.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/log10.ts#L6)

___

### <a id="mathpi" name="mathpi"></a> mathPi

• `Const` **mathPi**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, []\>

**`source`**

```typescript
const mathPi = createFunctionClause({
    name: 'PI',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the value of pi.',
    group: 'core',
    args: [],
    returns: 'number',
    testCases: [{ input: [], output: { type: 'number', result: Math.PI } }],
    examples: [{ input: '=PI()', output: { type: 'number', result: Math.PI } }],
    chain: false,
    reference: ctx => ({ result: Math.PI, type: 'number' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/pi.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/pi.ts#L6)

___

### <a id="mathpower" name="mathpower"></a> mathPower

• `Const` **mathPower**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }, { `name`: `string` = 'power'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathPower = createFunctionClause({
    name: 'POWER',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the value of a number raised to a power.',
    group: 'core',
    args: [
        { name: 'number', type: 'number' },
        { name: 'power', type: 'number' }
    ],
    returns: 'number',
    testCases: [
        { input: [1, NaN], output: { type: 'number', result: NaN } },
        { input: [NaN, 1], output: { type: 'number', result: NaN } },
        { input: [2, 3], output: { type: 'number', result: 8 } }
    ],
    examples: [{ input: '=POWER(2,3)', output: { type: 'number', result: 8 } }],
    chain: false,
    reference: (ctx, number, power) => ({
        result: Math.pow(number.result, power.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/power.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/power.ts#L6)

___

### <a id="mathrand" name="mathrand"></a> mathRand

• `Const` **mathRand**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, []\>

**`source`**

```typescript
const mathRand = createFunctionClause({
    name: 'RAND',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns a random number between 0 and 1.',
    group: 'core',
    args: [],
    examples: [{ input: '=RAND()', output: { type: 'number', result: 0.513 } }],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: ctx => ({ result: Math.random(), type: 'number' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/rand.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/rand.ts#L6)

___

### <a id="mathround" name="mathround"></a> mathRound

• `Const` **mathRound**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathRound = createFunctionClause({
    name: 'ROUND',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the number rounded to the specified number of decimal places.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=ROUND(1.5)', output: { type: 'number', result: 2 } }],
    testCases: [{ input: [NaN], output: { type: 'number', result: NaN } }],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.round(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/round.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/round.ts#L6)

___

### <a id="mathtrunc" name="mathtrunc"></a> mathTrunc

• `Const` **mathTrunc**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const mathTrunc = createFunctionClause({
    name: 'TRUNC',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=TRUNC(1.5)', output: { type: 'number', result: 1 } }],
    testCases: [{ input: [NaN], output: { type: 'number', result: NaN } }],
    chain: false,
    reference: (ctx, number) => ({
        result: Math.trunc(number.result),
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/math/trunc.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/math/trunc.ts#L6)

___

### <a id="multiplicationoperator-1" name="multiplicationoperator-1"></a> multiplicationOperator

• `Const` **multiplicationOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/multiplication.ts:7](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/multiplication.ts#L7)

___

### <a id="nameoperator" name="nameoperator"></a> nameOperator

• `Const` **nameOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/name.ts:73](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/name.ts#L73)

___

### <a id="notoperator" name="notoperator"></a> notOperator

• `Const` **notOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/not.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/not.ts#L3)

___

### <a id="nulloperator" name="nulloperator"></a> nullOperator

• `Const` **nullOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/null.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/null.ts#L3)

___

### <a id="numberoperator" name="numberoperator"></a> numberOperator

• `Const` **numberOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/number.ts:4](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/number.ts#L4)

___

### <a id="objectt" name="objectt"></a> objectT

• `Const` **objectT**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``false``, ``true``, ``true``, [{ `name`: `string` = 'obj'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }]\>

**`source`**

```typescript
const objectT = createFunctionClause({
    name: 'T',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    persist: false,
    description: 'Returns current object',
    group: 'core',
    chain: true,
    args: [{ name: 'obj', type: [...FORMULA_USED_TYPES] }],
    returns: FORMULA_USED_TYPES,
    testCases: [
        { input: ['abc'], output: { type: 'string', result: 'abc' } },
        { input: [false], output: { type: 'boolean', result: false } },
        { input: [123], output: { type: 'number', result: 123 } }
    ],
    examples: [{ input: '=T(123)', output: { type: 'number', result: 123 } }],
    reference: (ctx, obj) => obj
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/object/t.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/object/t.ts#L6)

___

### <a id="objecttype" name="objecttype"></a> objectType

• `Const` **objectType**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``true``, [{ `name`: `string` = 'obj'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``]  }]\>

**`source`**

```typescript
const objectType = createFunctionClause({
    name: 'TYPE',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: true,
    effect: false,
    description: 'Returns type of current object',
    group: 'core',
    args: [{ name: 'obj', type: [...FORMULA_USED_TYPES] }],
    returns: 'string',
    testCases: [],
    examples: [
        { input: '=TYPE(100)', output: { type: 'string', result: 'number' } },
        { input: '=TYPE("foo")', output: { type: 'string', result: 'string' } }
    ],
    chain: true,
    reference: (ctx, obj) => ({ result: obj.type, type: 'string' })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/object/type.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/object/type.ts#L6)

___

### <a id="parenthesisoperator" name="parenthesisoperator"></a> parenthesisOperator

• `Const` **parenthesisOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/parenthesis.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/parenthesis.ts#L3)

___

### <a id="powerfxcountif" name="powerfxcountif"></a> powerfxCountIf

• `Const` **powerfxCountIf**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }, { `name`: `string` = 'predicate'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`source`**

```typescript
const powerfxCountIf = createFunctionClause({
    name: 'CountIf',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=CountIf()', output: { type: 'number', result: 123 } }],
    description: 'Counts the number of rows that match the predicate',
    group: 'core',
    args: [
        { name: 'spreadsheet', type: 'Spreadsheet' },
        { name: 'predicate', type: 'Predicate' }
    ],
    testCases: [],
    returns: 'number',
    chain: false,
    reference: CountIf
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/powerfx/countIf.ts:47](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/powerfx/countIf.ts#L47)

___

### <a id="predicateoperator-1" name="predicateoperator-1"></a> predicateOperator

• `Const` **predicateOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/predicate.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/predicate.ts#L6)

___

### <a id="processsleep" name="processsleep"></a> processSleep

• `Const` **processSleep**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``true``, ``false``, ``false``, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const processSleep = createFunctionClause({
    name: 'SLEEP',
    async: true,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=SLEEP(10)', output: { type: 'number', result: 10 } }],
    description: 'Sleep for a given number of milliseconds',
    group: 'core',
    args: [
        {
            type: 'number',
            name: 'number'
        }
    ],
    testCases: [],
    returns: 'number',
    chain: false,
    reference: async (ctx, number) => {
        await new Promise(resolve => setTimeout(resolve, number.result));
        return number;
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/process/sleep.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/process/sleep.ts#L6)

___

### <a id="rangeoperator" name="rangeoperator"></a> rangeOperator

• `Const` **rangeOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/range.ts:4](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/range.ts#L4)

___

### <a id="recordfieldoperator" name="recordfieldoperator"></a> recordFieldOperator

• `Const` **recordFieldOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/recordField.ts:3](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/recordField.ts#L3)

___

### <a id="recordoperator" name="recordoperator"></a> recordOperator

• `Const` **recordOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/record.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/record.ts#L6)

___

### <a id="requestget" name="requestget"></a> requestGet

• `Const` **requestGet**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``true``, ``false``, ``false``, [{ `name`: `string` = 'url'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const requestGet = createFunctionClause({
    name: 'GET',
    async: true,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: true,
    examples: [{ input: '=REQUEST_GET(10)', output: { type: 'Record', result: {}, subType: 'void' } }],
    description: 'request get',
    group: 'request',
    args: [{ type: 'string', name: 'url' }],
    testCases: [],
    returns: 'Record',
    chain: false,
    reference: async (ctx, { result: url }) => {
        if (!url)
            return { type: 'Error', result: 'URL is blank', errorKind: 'runtime' };
        const response = await axios.get(url);
        return castData(response);
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/request/get.ts:8](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/request/get.ts#L8)

___

### <a id="spreadsheetaverageifs" name="spreadsheetaverageifs"></a> spreadsheetAverageIfs

• `Const` **spreadsheetAverageIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`source`**

```typescript
const spreadsheetAverageIfs = createFunctionClause({
    name: 'AVERAGEIFS',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the average of the values of the two columns that match the predicate',
    group: 'core',
    args: [
        { name: 'column1', type: 'Column' },
        { name: 'column2', type: 'Column' },
        { name: 'condition', type: 'Predicate' }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: AVERAGEIFS
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/averageIfs.ts:45](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/averageIfs.ts#L45)

___

### <a id="spreadsheetcolumncount" name="spreadsheetcolumncount"></a> spreadsheetColumnCount

• `Const` **spreadsheetColumnCount**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`source`**

```typescript
const spreadsheetColumnCount = createFunctionClause({
    name: 'COLUMN_COUNT',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the column size of the spreadsheet.',
    group: 'core',
    args: [{ name: 'spreadsheet', type: 'Spreadsheet' }],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: (ctx, spreadsheet) => {
        return { type: 'number', result: spreadsheet.result.columnCount() };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/columnCount.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/columnCount.ts#L6)

___

### <a id="spreadsheetcounta" name="spreadsheetcounta"></a> spreadsheetCountA

• `Const` **spreadsheetCountA**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`source`**

```typescript
const spreadsheetCountA = createFunctionClause({
    name: 'COUNTA',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Counts the number of rows that exists in the spreadsheet',
    group: 'core',
    args: [
        {
            name: 'column',
            type: 'Column'
        }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: (ctx, { result: column }) => {
        const counta = column.spreadsheet
            .listRows()
            .filter(row => !!column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId })).length;
        return { type: 'number', result: counta };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/countA.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/countA.ts#L6)

___

### <a id="spreadsheetcountifs" name="spreadsheetcountifs"></a> spreadsheetCountIfs

• `Const` **spreadsheetCountIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`source`**

```typescript
const spreadsheetCountIfs = createFunctionClause({
    name: 'COUNTIFS',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Counts the number of rows that match the predicate',
    group: 'core',
    args: [
        { name: 'column', type: 'Column' },
        { name: 'condition', type: 'Predicate' }
    ],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: COUNTIFS
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/countIfs.ts:33](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/countIfs.ts#L33)

___

### <a id="spreadsheetmax" name="spreadsheetmax"></a> spreadsheetMax

• `Const` **spreadsheetMax**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`source`**

```typescript
const spreadsheetMax = createFunctionClause({
    name: 'MAX',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the max of the column in the spreadsheet.',
    group: 'core',
    args: [{ name: 'column', type: 'Column' }],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: (ctx, { result: column }) => {
        const rows: number[] = column.spreadsheet
            .listRows()
            .map(row => Number(column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0));
        return { type: 'number', result: Math.max(...rows) };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/max.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/max.ts#L6)

___

### <a id="spreadsheetrow" name="spreadsheetrow"></a> spreadsheetRow

• `Const` **spreadsheetRow**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'input'; `type`: [``"Cell"``, ``"Row"``]  }]\>

**`source`**

```typescript
const spreadsheetRow = createFunctionClause({
    name: 'Row',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns line number.',
    group: 'core',
    returns: 'number',
    chain: true,
    examples: [{ input: '=123', output: null }],
    args: [{ name: 'input', type: ['Cell', 'Row'] }],
    testCases: [],
    reference: (ctx, { result }) => {
        return { type: 'number', result: result.rowIndex + 1 };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/row.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/row.ts#L6)

___

### <a id="spreadsheetrowcount" name="spreadsheetrowcount"></a> spreadsheetRowCount

• `Const` **spreadsheetRowCount**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`source`**

```typescript
const spreadsheetRowCount = createFunctionClause({
    name: 'ROW_COUNT',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the row size of the spreadsheet.',
    group: 'core',
    args: [{ name: 'spreadsheet', type: 'Spreadsheet' }],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: (ctx, spreadsheet) => {
        return { type: 'number', result: spreadsheet.result.rowCount() };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/rowCount.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/rowCount.ts#L6)

___

### <a id="spreadsheetspreadsheet" name="spreadsheetspreadsheet"></a> spreadsheetSpreadsheet

• `Const` **spreadsheetSpreadsheet**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Spreadsheet"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`source`**

```typescript
const spreadsheetSpreadsheet = createFunctionClause({
    name: 'Spreadsheet',
    async: false,
    pure: true,
    persist: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: null }],
    description: 'Creates a spreadsheet',
    group: 'core',
    args: [{ name: 'array', type: 'Array' }],
    returns: 'Spreadsheet',
    testCases: [],
    chain: true,
    reference: Spreadsheet
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/spreadsheet.ts:101](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/spreadsheet.ts#L101)

___

### <a id="spreadsheetsum" name="spreadsheetsum"></a> spreadsheetSum

• `Const` **spreadsheetSum**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`source`**

```typescript
const spreadsheetSum = createFunctionClause({
    name: 'SUM',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the column in the spreadsheet.',
    group: 'core',
    args: [{ name: 'column', type: 'Column' }],
    returns: 'number',
    testCases: [],
    chain: true,
    reference: (ctx, { result: column }) => {
        const rows: number[] = column.spreadsheet
            .listRows()
            .map(row => Number(column.spreadsheet.findCellValue({ rowId: row.rowId, columnId: column.columnId }) ?? 0));
        return { type: 'number', result: rows.reduce((a, b) => a + b, 0) };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/sum.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/sum.ts#L6)

___

### <a id="spreadsheetsumifs" name="spreadsheetsumifs"></a> spreadsheetSumIfs

• `Const` **spreadsheetSumIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`source`**

```typescript
const spreadsheetSumIfs = createFunctionClause({
    name: 'SUMIFS',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the sum of the values of the two columns that match the predicate',
    group: 'core',
    args: [
        { name: 'column1', type: 'Column' },
        { name: 'column2', type: 'Column' },
        { name: 'condition', type: 'Predicate' }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: SUMIFS
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/sumIfs.ts:39](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/sumIfs.ts#L39)

___

### <a id="spreadsheetsumproduct" name="spreadsheetsumproduct"></a> spreadsheetSumProduct

• `Const` **spreadsheetSumProduct**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }]\>

**`source`**

```typescript
const spreadsheetSumProduct = createFunctionClause({
    name: 'SUMPRODUCT',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'number', result: 123 } }],
    description: 'Returns the product sum of the values of the two columns',
    group: 'core',
    args: [
        { name: 'column1', type: 'Column' },
        { name: 'column2', type: 'Column' }
    ],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: SUMPRODUCT
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/sumProduct.ts:26](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/sumProduct.ts#L26)

___

### <a id="spreadsheettorecordarray" name="spreadsheettorecordarray"></a> spreadsheetToRecordArray

• `Const` **spreadsheetToRecordArray**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Array"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`source`**

```typescript
const spreadsheetToRecordArray = createFunctionClause({
    name: 'toRecordArray',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'Array', result: [], subType: 'void' } }],
    description: 'Converts the spreadsheet to a record.',
    group: 'core',
    args: [{ name: 'spreadsheet', type: 'Spreadsheet' }],
    returns: 'Array',
    testCases: [],
    chain: true,
    reference: (ctx, { result: spreadsheet }) => {
        return {
            type: 'Array',
            subType: 'Record',
            result: spreadsheet.toRecord().map<RecordResult>(row => ({ type: 'Record', subType: 'string', result: row }))
        };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/toRecordArray.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/toRecordArray.ts#L6)

___

### <a id="spreadsheetvlookup" name="spreadsheetvlookup"></a> spreadsheetVlookup

• `Const` **spreadsheetVlookup**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'match'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }, { `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }, { `default`: { `result`: ``true`` = true; `type`: ``"boolean"`` = 'boolean' } ; `name`: `string` = 'range'; `type`: ``"boolean"`` = 'boolean' }]\>

**`source`**

```typescript
const spreadsheetVlookup = createFunctionClause({
    name: 'VLOOKUP',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
    description: 'Finds the value of the first row that matches the match value',
    group: 'core',
    args: [
        { name: 'match', type: 'string' },
        { name: 'spreadsheet', type: 'Spreadsheet' },
        { name: 'column', type: 'Column' },
        { name: 'range', type: 'boolean', default: { type: 'boolean', result: true } }
    ],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: VLOOKUP
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/vlookup.ts:63](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/vlookup.ts#L63)

___

### <a id="spreadsheetxlookup" name="spreadsheetxlookup"></a> spreadsheetXlookup

• `Const` **spreadsheetXlookup**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'lookupValue'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'lookupColumn'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'returnColumn'; `type`: ``"Column"`` = 'Column' }, { `default`: { `result`: `string` = ''; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'notFoundValue'; `type`: ``"string"`` = 'string' }, { `default`: { `result`: `number` = 0; `type`: ``"number"`` = 'number' } ; `name`: `string` = 'matchMode'; `type`: ``"number"`` = 'number' }]\>

**`source`**

```typescript
const spreadsheetXlookup = createFunctionClause({
    name: 'XLOOKUP',
    async: false,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=123', output: { type: 'string', result: 'foo' } }],
    description: 'returns the value of the cell in the return column that matches the lookup value in the lookup column',
    group: 'core',
    args: [
        { name: 'lookupValue', type: 'string' },
        { name: 'lookupColumn', type: 'Column' },
        { name: 'returnColumn', type: 'Column' },
        { name: 'notFoundValue', type: 'string', default: { type: 'string', result: '' } },
        { name: 'matchMode', type: 'number', default: { type: 'number', result: 0 } }
    ],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: XLOOKUP
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/spreadsheet/xlookup.ts:58](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/spreadsheet/xlookup.ts#L58)

___

### <a id="stringlen" name="stringlen"></a> stringLen

• `Const` **stringLen**: [`FunctionClause`](interfaces/FunctionClause.md)<``"number"``, ``false``, ``false``, ``false``, [{ `name`: `string` = 'str'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const stringLen = createFunctionClause({
    name: 'LEN',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the length of the string.',
    group: 'core',
    args: [{ name: 'str', type: 'string' }],
    returns: 'number',
    testCases: [
        { input: [''], output: { type: 'number', result: 0 } },
        { input: ['abc'], output: { type: 'number', result: 3 } }
    ],
    examples: [{ input: '=LEN("foo")', output: { type: 'number', result: 3 } }],
    chain: false,
    reference: (ctx, str) => ({
        result: str.result.length,
        type: 'number'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/len.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/len.ts#L6)

___

### <a id="stringoperator" name="stringoperator"></a> stringOperator

• `Const` **stringOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/string.ts:17](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/string.ts#L17)

___

### <a id="stringsplit" name="stringsplit"></a> stringSplit

• `Const` **stringSplit**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Array"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }, { `default`: { `result`: `string` = ''; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'separator'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const stringSplit = createFunctionClause({
    name: 'Split',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    persist: false,
    effect: false,
    description: 'Returns an array of strings that result from splitting the string at the given separator.',
    group: 'core',
    args: [
        { name: 'string', type: 'string' },
        { name: 'separator', type: 'string', default: { type: 'string', result: '' } }
    ],
    examples: [
        {
            input: '=Split("foo", ",")',
            output: { type: 'Array', subType: 'string', result: [{ type: 'string', result: 'foo' }] }
        }
    ],
    returns: 'Array',
    testCases: [
        { input: ['', ';;'], output: { type: 'Array', subType: 'string', result: [{ type: 'string', result: '' }] } },
        { input: ['a;b', ';;'], output: { type: 'Array', subType: 'string', result: [{ type: 'string', result: 'a;b' }] } },
        {
            input: ['a;;b', ';;'],
            output: {
                type: 'Array',
                subType: 'string',
                result: [
                    { type: 'string', result: 'a' },
                    { type: 'string', result: 'b' }
                ]
            }
        }
    ],
    chain: true,
    reference: (ctx, string, separator) => ({
        result: string.result.split(separator.result).map<StringResult>(s => ({ result: s, type: 'string' })),
        subType: 'string',
        type: 'Array'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/split.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/split.ts#L6)

___

### <a id="stringstartwith" name="stringstartwith"></a> stringStartWith

• `Const` **stringStartWith**: [`FunctionClause`](interfaces/FunctionClause.md)<``"boolean"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'prefix'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const stringStartWith = createFunctionClause({
    name: 'START_WITH',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Returns true if the sequence of elements of searchString converted to a String',
    group: 'core',
    args: [
        { name: 'string', type: 'string' },
        { name: 'prefix', type: 'string' }
    ],
    examples: [
        { input: '=START_WITH("foo", "bar")', output: { type: 'boolean', result: false } },
        { input: '=START_WITH("foobar", "foo")', output: { type: 'boolean', result: true } }
    ],
    returns: 'boolean',
    testCases: [
        { input: ['foobar', 'foo'], output: { type: 'boolean', result: true } },
        { input: ['', ''], output: { type: 'boolean', result: true } }
    ],
    chain: true,
    reference: (ctx, string, prefix) => ({
        result: string.result.startsWith(prefix.result),
        type: 'boolean'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/startWith.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/startWith.ts#L6)

___

### <a id="stringtobar" name="stringtobar"></a> stringToBar

• `Const` **stringToBar**: [`FunctionClause`](interfaces/FunctionClause.md)<``"Record"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'record'; `type`: ``"Record"`` = 'Record' }]\>

**`source`**

```typescript
const stringToBar = createFunctionClause({
    name: 'toBar',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts a record to a bar',
    group: 'core',
    args: [{ name: 'record', type: 'Record' }],
    examples: [{ input: '=toBar({})', output: { type: 'Record', subType: 'void', result: {} } }],
    returns: 'Record',
    testCases: [],
    chain: true,
    reference: (ctx, record) => {
        return { ...record, view: { type: 'bar', attrs: {} } };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/toBar.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/toBar.ts#L6)

___

### <a id="stringtoqrcode" name="stringtoqrcode"></a> stringToQrcode

• `Const` **stringToQrcode**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const stringToQrcode = createFunctionClause({
    name: 'toQrcode',
    async: false,
    lazy: false,
    persist: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Converts a string to a qrcode',
    group: 'core',
    args: [{ name: 'string', type: 'string' }],
    examples: [{ input: '=toQrcode("123")', output: { type: 'string', result: '123' } }],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: (ctx, { result }) => {
        return { type: 'string', result, view: { type: 'qrcode', attrs: {} } };
    }
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/toQrcode.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/toQrcode.ts#L6)

___

### <a id="stringtrim" name="stringtrim"></a> stringTrim

• `Const` **stringTrim**: [`FunctionClause`](interfaces/FunctionClause.md)<``"string"``, ``false``, ``true``, ``false``, [{ `name`: `string` = 'str'; `type`: ``"string"`` = 'string' }]\>

**`source`**

```typescript
const stringTrim = createFunctionClause({
    name: 'TRIM',
    async: false,
    pure: true,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: false,
    description: 'Returns the string with leading and trailing whitespace removed.',
    group: 'core',
    examples: [{ input: '=TRIM("  foo  ")', output: { type: 'string', result: 'foo' } }],
    args: [{ name: 'str', type: 'string' }],
    returns: 'string',
    testCases: [
        { input: [''], output: { type: 'string', result: '' } },
        { input: [' \n '], output: { type: 'string', result: '' } },
        { input: [' abc\n '], output: { type: 'string', result: 'abc' } }
    ],
    chain: true,
    reference: (ctx, str) => ({
        result: str.result.trim(),
        type: 'string'
    })
})
```

#### Defined in

[packages/brickdoc-formula/src/functions/string/trim.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/string/trim.ts#L6)

___

### <a id="thisrecordoperator" name="thisrecordoperator"></a> thisRecordOperator

• `Const` **thisRecordOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/thisRecord.ts:22](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/thisRecord.ts#L22)

___

### <a id="thisrowoperator" name="thisrowoperator"></a> thisRowOperator

• `Const` **thisRowOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/thisRow.ts:22](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/thisRow.ts#L22)

___

### <a id="tokenvocabulary" name="tokenvocabulary"></a> tokenVocabulary

• `Const` **tokenVocabulary**: `Record`<`string`, `TokenType`\>

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:327](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L327)

## Functions

### <a id="default_uuid_function" name="default_uuid_function"></a> DEFAULT\_UUID\_FUNCTION

▸ **DEFAULT_UUID_FUNCTION**(`number`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:18](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L18)

___

### <a id="accessattribute" name="accessattribute"></a> accessAttribute

▸ **accessAttribute**(`interpreter`, `result`, `key`): `Promise`<[`AnyResult`](README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `interpreter` | [`FormulaInterpreter`](classes/FormulaInterpreter.md) |
| `result` | [`AnyResult`](README.md#anyresult) |
| `key` | `string` |

#### Returns

`Promise`<[`AnyResult`](README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/operations/access.ts:14](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operations/access.ts#L14)

___

### <a id="appendformulas" name="appendformulas"></a> appendFormulas

▸ **appendFormulas**(`formulaContext`, `formulas`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `formulas` | [`BaseFormula`](interfaces/BaseFormula.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:514](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L514)

___

### <a id="applycompletion" name="applycompletion"></a> applyCompletion

▸ **applyCompletion**(`ctx`, `completion`): `CompleteResult`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `completion` | [`Completion`](README.md#completion) |

#### Returns

`CompleteResult`

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:87](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L87)

___

### <a id="attrs2completion" name="attrs2completion"></a> attrs2completion

▸ **attrs2completion**(`formulaContext`, `__namedParameters`, `pageId`): `undefined` \| [`Completion`](README.md#completion)

#### Parameters

| Name | Type |
| :------ | :------ |
| `formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `__namedParameters` | [`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md) |
| `pageId` | `string` |

#### Returns

`undefined` \| [`Completion`](README.md#completion)

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:545](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L545)

___

### <a id="attrstocolortype" name="attrstocolortype"></a> attrsToColorType

▸ **attrsToColorType**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:282](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L282)

___

### <a id="block2codefragment" name="block2codefragment"></a> block2codeFragment

▸ **block2codeFragment**(`block`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | [`BlockType`](interfaces/BlockType.md) |
| `pageId` | `string` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:87](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L87)

___

### <a id="block2completion" name="block2completion"></a> block2completion

▸ **block2completion**(`ctx`, `block`, `pageId`): [`BlockCompletion`](interfaces/BlockCompletion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `block` | [`BlockType`](interfaces/BlockType.md) |
| `pageId` | `string` |

#### Returns

[`BlockCompletion`](interfaces/BlockCompletion.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:461](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L461)

___

### <a id="blockkey-1" name="blockkey-1"></a> blockKey

▸ **blockKey**(`namespaceId`): \`#${string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |

#### Returns

\`#${string}\`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:17](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L17)

___

### <a id="buildfunctionkey" name="buildfunctionkey"></a> buildFunctionKey

▸ **buildFunctionKey**(`group`, `name`, `disableUpcase?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | `string` |
| `name` | `string` |
| `disableUpcase?` | `boolean` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/functions/index.ts:34](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/functions/index.ts#L34)

___

### <a id="buildpredicate" name="buildpredicate"></a> buildPredicate

▸ **buildPredicate**(`__namedParameters`): [`PredicateFunction`](README.md#predicatefunction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PredicateResult`](interfaces/PredicateResult.md) |

#### Returns

[`PredicateFunction`](README.md#predicatefunction)

#### Defined in

[packages/brickdoc-formula/src/grammar/lambda.ts:51](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lambda.ts#L51)

___

### <a id="buildtestcases" name="buildtestcases"></a> buildTestCases

▸ **buildTestCases**(`name?`): [[`TestCaseInput`](interfaces/TestCaseInput.md)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | [[`TestCaseName`](README.md#testcasename), ...TestCaseName[]] |

#### Returns

[[`TestCaseInput`](interfaces/TestCaseInput.md)]

#### Defined in

[packages/brickdoc-formula/src/tests/testCases.ts:131](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testCases.ts#L131)

___

### <a id="castdata" name="castdata"></a> castData

▸ **castData**(`data`): [`AnyResult`](README.md#anyresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

[`AnyResult`](README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:310](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L310)

___

### <a id="castnumber" name="castnumber"></a> castNumber

▸ **castNumber**(`data`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `undefined` \| [`AnyResult`](README.md#anyresult) |

#### Returns

`number`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:300](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L300)

___

### <a id="castvariable" name="castvariable"></a> castVariable

▸ **castVariable**(`oldVariable`, `formulaContext`, `__namedParameters`): `Promise`<[`VariableInterface`](interfaces/VariableInterface.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldVariable` | `undefined` \| [`VariableInterface`](interfaces/VariableInterface.md) |
| `formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `__namedParameters` | [`BaseFormula`](interfaces/BaseFormula.md) |

#### Returns

`Promise`<[`VariableInterface`](interfaces/VariableInterface.md)\>

#### Defined in

[packages/brickdoc-formula/src/context/variable.ts:65](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/variable.ts#L65)

___

### <a id="checkvalidname" name="checkvalidname"></a> checkValidName

▸ **checkValidName**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/grammar/lexer.ts:332](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lexer.ts#L332)

___

### <a id="cleanupeventdependency" name="cleanupeventdependency"></a> cleanupEventDependency

▸ **cleanupEventDependency**(`label`, `dependencies`): [`EventDependency`](interfaces/EventDependency.md)<`any`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `dependencies` | [`EventDependency`](interfaces/EventDependency.md)<`any`\>[] |

#### Returns

[`EventDependency`](interfaces/EventDependency.md)<`any`\>[]

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:66](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L66)

___

### <a id="codefragment2string" name="codefragment2string"></a> codeFragment2string

▸ **codeFragment2string**(`codeFragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `codeFragment` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:62](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L62)

___

### <a id="codefragment2value" name="codefragment2value"></a> codeFragment2value

▸ **codeFragment2value**(`__namedParameters`, `pageId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |
| `pageId` | `undefined` \| `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:75](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L75)

___

### <a id="codefragments2definition" name="codefragments2definition"></a> codeFragments2definition

▸ **codeFragments2definition**(`codeFragments`, `pageId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `codeFragments` | [`CodeFragment`](README.md#codefragment)[] |
| `pageId` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:71](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L71)

___

### <a id="column2attrs" name="column2attrs"></a> column2attrs

▸ **column2attrs**(`column`): [`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`ColumnType`](interfaces/ColumnType.md) |

#### Returns

[`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:46](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L46)

___

### <a id="column2codefragment" name="column2codefragment"></a> column2codeFragment

▸ **column2codeFragment**(`column`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`ColumnType`](interfaces/ColumnType.md) |
| `pageId` | `string` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:99](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L99)

___

### <a id="columndisplayindex" name="columndisplayindex"></a> columnDisplayIndex

▸ **columnDisplayIndex**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:265](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L265)

___

### <a id="createfunctionclause" name="createfunctionclause"></a> createFunctionClause

▸ **createFunctionClause**<`Return`, `Async`, `Chain`, `AcceptError`, `Arguments`, `RealReturn`\>(`t`): [`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Return` | extends ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| readonly [``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``] |
| `Async` | extends `boolean` |
| `Chain` | extends `boolean` |
| `AcceptError` | extends `boolean` |
| `Arguments` | extends [...args: (Chain extends true ? [firstArgs: Argument<"string" \| "number" \| "boolean" \| "null" \| "Date" \| "Block" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "Button" \| "Switch" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>, ...args: Argument<"string" \| "number" \| "boolean" \| "null" \| "Date" \| "Block" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "Button" \| "Switch" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>[]] : Argument<"string" \| "number" \| "boolean" \| "null" \| "Date" \| "Block" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "Button" \| "Switch" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>[])[]] |
| `RealReturn` | extends ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` = `FlattenType`<`Return`, `never`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | [`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\> |

#### Returns

[`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\>

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:666](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L666)

___

### <a id="createvariabletask" name="createvariabletask"></a> createVariableTask

▸ **createVariableTask**(`__namedParameters`): [`VariableTask`](README.md#variabletask)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `TaskInput` |

#### Returns

[`VariableTask`](README.md#variabletask)

#### Defined in

[packages/brickdoc-formula/src/context/task.ts:21](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/task.ts#L21)

___

### <a id="currentblockkey" name="currentblockkey"></a> currentBlockKey

▸ **currentBlockKey**(`namespaceId`, `pageId`): \`#${string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `pageId` | `undefined` \| `string` |

#### Returns

\`#${string}\`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:19](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L19)

___

### <a id="dispatchformulablocknamechange" name="dispatchformulablocknamechange"></a> dispatchFormulaBlockNameChange

▸ **dispatchFormulaBlockNameChange**(`__namedParameters`): `Promise`<`void`\>

Dispatch Block Rename Event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.name` | `string` |
| `__namedParameters.username` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:83](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L83)

___

### <a id="dispatchformulablocksoftdelete" name="dispatchformulablocksoftdelete"></a> dispatchFormulaBlockSoftDelete

▸ **dispatchFormulaBlockSoftDelete**(`__namedParameters`): `Promise`<`void`\>

Dispatch Block Delete Event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.username` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/brickdoc-formula/src/events.ts:41](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/events.ts#L41)

___

### <a id="displayvalue" name="displayvalue"></a> displayValue

▸ **displayValue**(`v`, `pageId`, `disableTruncate?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `v` | [`AnyResult`](README.md#anyresult) | `undefined` |
| `pageId` | `string` | `undefined` |
| `disableTruncate` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/context/persist.ts:27](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/persist.ts#L27)

___

### <a id="dumpdisplayresultfordisplay" name="dumpdisplayresultfordisplay"></a> dumpDisplayResultForDisplay

▸ **dumpDisplayResultForDisplay**(`t`): [`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

[`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Defined in

[packages/brickdoc-formula/src/context/persist.ts:10](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/persist.ts#L10)

___

### <a id="dumpvalue" name="dumpvalue"></a> dumpValue

▸ **dumpValue**(`result`, `t?`): [`BaseResult`](interfaces/BaseResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`BaseResult`](interfaces/BaseResult.md) |
| `t?` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

[`BaseResult`](interfaces/BaseResult.md)

#### Defined in

[packages/brickdoc-formula/src/context/persist.ts:100](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/persist.ts#L100)

___

### <a id="encodestring" name="encodestring"></a> encodeString

▸ **encodeString**(`str`): `string`

Encode string.

**`example`**
```typescript
encodeString("foo") // => "\"foo\""
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:135](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L135)

___

### <a id="errorisfatal" name="errorisfatal"></a> errorIsFatal

▸ **errorIsFatal**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/context/variable.ts:36](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/variable.ts#L36)

___

### <a id="extractsubtype" name="extractsubtype"></a> extractSubType

▸ **extractSubType**(`array`): ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | [`AnyResult`](README.md#anyresult)[] |

#### Returns

``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:173](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L173)

___

### <a id="fetchresult" name="fetchresult"></a> fetchResult

▸ **fetchResult**(`__namedParameters`): [`AnyResult`](README.md#anyresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

[`AnyResult`](README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/context/variable.ts:53](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/variable.ts#L53)

___

### <a id="function2completion" name="function2completion"></a> function2completion

▸ **function2completion**(`functionClause`, `weight`): [`FunctionCompletion`](interfaces/FunctionCompletion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionClause` | [`AnyFunctionClause`](interfaces/AnyFunctionClause.md)<`any`\> |
| `weight` | `number` |

#### Returns

[`FunctionCompletion`](interfaces/FunctionCompletion.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:514](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L514)

___

### <a id="functionresult2lambda" name="functionresult2lambda"></a> functionResult2lambda

▸ **functionResult2lambda**<`T`\>(`ctx`, `__namedParameters`, `ctrl`): `VoidFunction`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ControlType`](interfaces/ControlType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `__namedParameters` | [`FunctionResult`](interfaces/FunctionResult.md) |
| `ctrl` | `T` |

#### Returns

`VoidFunction`

#### Defined in

[packages/brickdoc-formula/src/grammar/lambda.ts:6](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/lambda.ts#L6)

___

### <a id="generatevariable" name="generatevariable"></a> generateVariable

▸ **generateVariable**(`__namedParameters`): [`VariableInterface`](interfaces/VariableInterface.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `__namedParameters.isLoad?` | `boolean` |
| `__namedParameters.skipExecute?` | `boolean` |
| `__namedParameters.t` | [`VariableData`](interfaces/VariableData.md) |
| `__namedParameters.variable?` | [`VariableInterface`](interfaces/VariableInterface.md) |

#### Returns

[`VariableInterface`](interfaces/VariableInterface.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:486](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L486)

___

### <a id="getcompletion" name="getcompletion"></a> getCompletion

▸ **getCompletion**(`__namedParameters`): [`Completion`](README.md#completion)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `GetCompletionInput` |

#### Returns

[`Completion`](README.md#completion)[]

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:366](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L366)

___

### <a id="getlastcodefragment" name="getlastcodefragment"></a> getLastCodeFragment

▸ **getLastCodeFragment**(`codeFragments`, `position`): [`undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `codeFragments` | [`CodeFragment`](README.md#codefragment)[] |
| `position` | `number` |

#### Returns

[`undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment)]

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:166](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L166)

___

### <a id="innerinterpret" name="innerinterpret"></a> innerInterpret

▸ **innerInterpret**(`__namedParameters`): `Promise`<[`VariableValue`](README.md#variablevalue)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `__namedParameters.parseResult` | `Object` |
| `__namedParameters.parseResult.errorMessages` | [`ErrorMessage`](interfaces/ErrorMessage.md)[] |
| `__namedParameters.parseResult.variableParseResult` | `Pick`<[`VariableParseResult`](interfaces/VariableParseResult.md), ``"cst"`` \| ``"kind"`` \| ``"async"``\> |

#### Returns

`Promise`<[`VariableValue`](README.md#variablevalue)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:385](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L385)

___

### <a id="interpret" name="interpret"></a> interpret

▸ **interpret**(`__namedParameters`): `Promise`<[`VariableData`](interfaces/VariableData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `__namedParameters.parseResult` | [`ParseResult`](README.md#parseresult) |
| `__namedParameters.skipExecute?` | `boolean` |
| `__namedParameters.variable?` | [`VariableInterface`](interfaces/VariableInterface.md) |

#### Returns

`Promise`<[`VariableData`](interfaces/VariableData.md)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:463](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L463)

___

### <a id="interpretbyoperator" name="interpretbyoperator"></a> interpretByOperator

▸ **interpretByOperator**(`__namedParameters`): `Promise`<[`AnyResult`](README.md#anyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.args` | [`InterpretArgument`](interfaces/InterpretArgument.md) |
| `__namedParameters.interpreter` | [`FormulaInterpreter`](classes/FormulaInterpreter.md) |
| `__namedParameters.lhs` | `undefined` \| `CstNode`[] |
| `__namedParameters.operator` | [`OperatorType`](interfaces/OperatorType.md) |
| `__namedParameters.operators` | (`undefined` \| `IToken`)[] |
| `__namedParameters.rhs` | `undefined` \| `CstNode`[] |

#### Returns

`Promise`<[`AnyResult`](README.md#anyresult)\>

#### Defined in

[packages/brickdoc-formula/src/grammar/operator.ts:102](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operator.ts#L102)

___

### <a id="intersecttype" name="intersecttype"></a> intersectType

▸ **intersectType**(`expectedArgumentType`, `contextResultType`, `label`, `ctx`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedArgumentType` | [`ExpressionType`](README.md#expressiontype) |
| `contextResultType` | [`FormulaCheckType`](README.md#formulachecktype) |
| `label` | `string` |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `errorMessages` | [`ErrorMessage`](interfaces/ErrorMessage.md)[] |
| `newType` | [`FormulaCheckType`](README.md#formulachecktype) |

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:188](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L188)

___

### <a id="iskey" name="iskey"></a> isKey

▸ **isKey**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/grammar/codeFragment.ts:1011](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/codeFragment.ts#L1011)

___

### <a id="loaddisplayresult" name="loaddisplayresult"></a> loadDisplayResult

▸ **loadDisplayResult**(`ctx`, `displayResult`): [`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `displayResult` | [`VariableDisplayData`](interfaces/VariableDisplayData.md) |

#### Returns

[`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Defined in

[packages/brickdoc-formula/src/context/persist.ts:96](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/persist.ts#L96)

___

### <a id="loadvalue" name="loadvalue"></a> loadValue

▸ **loadValue**(`ctx`, `result`): [`AnyResult`](README.md#anyresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |
| `result` | [`BaseResult`](interfaces/BaseResult.md) |

#### Returns

[`AnyResult`](README.md#anyresult)

#### Defined in

[packages/brickdoc-formula/src/context/persist.ts:126](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/context/persist.ts#L126)

___

### <a id="makecontext" name="makecontext"></a> makeContext

▸ **makeContext**(`options`): `Promise`<[`MakeContextResult`](interfaces/MakeContextResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MakeContextOptions`](interfaces/MakeContextOptions.md) |

#### Returns

`Promise`<[`MakeContextResult`](interfaces/MakeContextResult.md)\>

#### Defined in

[packages/brickdoc-formula/src/tests/testHelper.ts:169](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testHelper.ts#L169)

___

### <a id="matchobject" name="matchobject"></a> matchObject

▸ **matchObject**(`__namedParameters`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AnyResult`](README.md#anyresult) |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:25](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L25)

___

### <a id="maybeencodestring" name="maybeencodestring"></a> maybeEncodeString

▸ **maybeEncodeString**(`str`): [`boolean`, `string`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`boolean`, `string`]

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:139](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L139)

___

### <a id="mockblock" name="mockblock"></a> mockBlock

▸ **mockBlock**(`name`, `namespaceId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `namespaceId` | `string` |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:9](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L9)

___

### <a id="mockcell" name="mockcell"></a> mockCell

▸ **mockCell**(`value`, `cellId`, `columnKey`, `rowKey`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `cellId` | `string` |
| `columnKey` | `string` |
| `rowKey` | `string` |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:17](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L17)

___

### <a id="mockcolumn" name="mockcolumn"></a> mockColumn

▸ **mockColumn**(`display`, `columnId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `display` | `string` |
| `columnId` | `string` |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:15](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L15)

___

### <a id="mockrow" name="mockrow"></a> mockRow

▸ **mockRow**(`display`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `display` | `string` |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:16](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L16)

___

### <a id="mockspreadsheet" name="mockspreadsheet"></a> mockSpreadsheet

▸ **mockSpreadsheet**(`name`, `namespaceId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `namespaceId` | `string` |

#### Returns

`any`

#### Defined in

[packages/brickdoc-formula/src/tests/testMock.ts:10](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testMock.ts#L10)

___

### <a id="objectdiff" name="objectdiff"></a> objectDiff

▸ **objectDiff**<`T`\>(`a`, `b`): `Record`<`number`, `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T`[] |
| `b` | `T`[] |

#### Returns

`Record`<`number`, `T`\>

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:157](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L157)

___

### <a id="parse" name="parse"></a> parse

▸ **parse**(`ctx`): [`ParseResult`](README.md#parseresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

[`ParseResult`](README.md#parseresult)

#### Defined in

[packages/brickdoc-formula/src/grammar/core.ts:74](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/core.ts#L74)

___

### <a id="parsebyoperator" name="parsebyoperator"></a> parseByOperator

▸ **parseByOperator**(`input`): [`CodeFragmentResult`](interfaces/CodeFragmentResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `ParseInput` |

#### Returns

[`CodeFragmentResult`](interfaces/CodeFragmentResult.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/operator.ts:195](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/operator.ts#L195)

___

### <a id="parsestring" name="parsestring"></a> parseString

▸ **parseString**(`str`): `string`

Parse string.

**`todo:`** dirty hack to get the string literal value

**`example`**
```typescript
parseString("\"foo\"") // => "foo"
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:120](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L120)

___

### <a id="resulttocolortype" name="resulttocolortype"></a> resultToColorType

▸ **resultToColorType**(`__namedParameters`): [`FormulaColorType`](README.md#formulacolortype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AnyResult`](README.md#anyresult) |

#### Returns

[`FormulaColorType`](README.md#formulacolortype)

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:271](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L271)

___

### <a id="reversetraversalstring" name="reversetraversalstring"></a> reverseTraversalString

▸ **reverseTraversalString**(`str`, `min?`): `string`[]

Traversal and collect string from end to start.

**`example`**
```typescript
reverseTraversal("bar")     // => ["bar", "ba", "b"]
reverseTraversal("bar", 2)  // => ["bar", "ba"]
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `min` | `number` | `1` |

#### Returns

`string`[]

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:100](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L100)

___

### <a id="row2attrs" name="row2attrs"></a> row2attrs

▸ **row2attrs**(`row`): [`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | [`RowType`](interfaces/RowType.md) |

#### Returns

[`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:54](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L54)

___

### <a id="row2codefragment" name="row2codefragment"></a> row2codeFragment

▸ **row2codeFragment**(`row`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | [`RowType`](interfaces/RowType.md) |
| `pageId` | `string` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:112](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L112)

___

### <a id="runtimechecktype" name="runtimechecktype"></a> runtimeCheckType

▸ **runtimeCheckType**(`__namedParameters`, `contextResultType`, `label`, `ctx`): `undefined` \| [`ErrorResult`](interfaces/ErrorResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`InterpretArgument`](interfaces/InterpretArgument.md) |
| `contextResultType` | [`FormulaCheckType`](README.md#formulachecktype) |
| `label` | `string` |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

`undefined` \| [`ErrorResult`](interfaces/ErrorResult.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:244](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L244)

___

### <a id="shouldreceiveevent" name="shouldreceiveevent"></a> shouldReceiveEvent

▸ **shouldReceiveEvent**(`listenedScope`, `eventScope`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listenedScope` | [`EventScope`](interfaces/EventScope.md) |
| `eventScope` | ``null`` \| [`EventScope`](interfaces/EventScope.md) |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:19](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L19)

___

### <a id="shouldreturnearly" name="shouldreturnearly"></a> shouldReturnEarly

▸ **shouldReturnEarly**(`result`, `skipReturnEarlyCheck?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `undefined` \| [`AnyResult`](README.md#anyresult) |
| `skipReturnEarlyCheck?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:147](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L147)

___

### <a id="spreadsheet2attrs" name="spreadsheet2attrs"></a> spreadsheet2attrs

▸ **spreadsheet2attrs**(`spreadsheet`): [`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |

#### Returns

[`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:38](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L38)

___

### <a id="spreadsheet2codefragment" name="spreadsheet2codefragment"></a> spreadsheet2codeFragment

▸ **spreadsheet2codeFragment**(`spreadsheet`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |
| `pageId` | `string` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:134](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L134)

___

### <a id="spreadsheet2completion" name="spreadsheet2completion"></a> spreadsheet2completion

▸ **spreadsheet2completion**(`spreadsheet`, `pageId`): [`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |
| `pageId` | `string` |

#### Returns

[`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:422](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L422)

___

### <a id="token2fragment" name="token2fragment"></a> token2fragment

▸ **token2fragment**(`token`, `type`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `IToken` |
| `type` | ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"`` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/codeFragment.ts:45](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/codeFragment.ts#L45)

___

### <a id="tracktodo" name="tracktodo"></a> trackTodo

▸ **trackTodo**(`it`, `testCases`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `it` | `It` |
| `testCases` | [`BaseTestCase`](interfaces/BaseTestCase.md)<{}\>[] |

#### Returns

`void`

#### Defined in

[packages/brickdoc-formula/src/tests/testHelper.ts:243](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testHelper.ts#L243)

___

### <a id="truncatearray" name="truncatearray"></a> truncateArray

▸ **truncateArray**(`array`, `length?`): `any`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `any`[] | `undefined` |
| `length` | `number` | `8` |

#### Returns

`any`[]

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:167](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L167)

___

### <a id="truncatestring" name="truncatestring"></a> truncateString

▸ **truncateString**(`str`, `length?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `length` | `number` | `20` |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/grammar/util.ts:160](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/util.ts#L160)

___

### <a id="variable2attrs" name="variable2attrs"></a> variable2attrs

▸ **variable2attrs**(`variable`): [`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |

#### Returns

[`CodeFragmentAttrs`](interfaces/CodeFragmentAttrs.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:30](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L30)

___

### <a id="variable2codefragment" name="variable2codefragment"></a> variable2codeFragment

▸ **variable2codeFragment**(`variable`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |
| `pageId` | `string` |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:123](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L123)

___

### <a id="variable2completion" name="variable2completion"></a> variable2completion

▸ **variable2completion**(`variable`, `pageId`): [`VariableCompletion`](interfaces/VariableCompletion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |
| `pageId` | `string` |

#### Returns

[`VariableCompletion`](interfaces/VariableCompletion.md)

#### Defined in

[packages/brickdoc-formula/src/grammar/completer.ts:481](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/completer.ts#L481)

___

### <a id="variablekey-1" name="variablekey-1"></a> variableKey

▸ **variableKey**(`namespaceId`, `variableId`): \`#${string}.${string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceId` | `string` |
| `variableId` | `string` |

#### Returns

\`#${string}.${string}\`

#### Defined in

[packages/brickdoc-formula/src/grammar/convert.ts:14](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/grammar/convert.ts#L14)
