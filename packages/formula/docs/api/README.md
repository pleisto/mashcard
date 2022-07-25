# @mashcard/formula

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
- [AsyncVariableTask](interfaces/AsyncVariableTask.md)
- [BackendActions](interfaces/BackendActions.md)
- [BaseFormula](interfaces/BaseFormula.md)
- [BaseFunctionContext](interfaces/BaseFunctionContext.md)
- [BaseTestCase](interfaces/BaseTestCase.md)
- [BaseVariableTask](interfaces/BaseVariableTask.md)
- [BlockCompletion](interfaces/BlockCompletion.md)
- [BlockInitializer](interfaces/BlockInitializer.md)
- [BlockType](interfaces/BlockType.md)
- [ButtonInitializer](interfaces/ButtonInitializer.md)
- [ButtonType](interfaces/ButtonType.md)
- [Cell](interfaces/Cell.md)
- [CellInput](interfaces/CellInput.md)
- [CellType](interfaces/CellType.md)
- [CodeFragmentResult](interfaces/CodeFragmentResult.md)
- [CodeFragmentStepInput](interfaces/CodeFragmentStepInput.md)
- [Column](interfaces/Column.md)
- [ColumnCompletion](interfaces/ColumnCompletion.md)
- [ColumnInput](interfaces/ColumnInput.md)
- [ColumnType](interfaces/ColumnType.md)
- [ContextInterface](interfaces/ContextInterface.md)
- [ControlInitializer](interfaces/ControlInitializer.md)
- [ControlType](interfaces/ControlType.md)
- [CstVisitorArgument](interfaces/CstVisitorArgument.md)
- [DeleteFormula](interfaces/DeleteFormula.md)
- [DependencyTestCaseType](interfaces/DependencyTestCaseType.md)
- [DirtyFormulaInfo](interfaces/DirtyFormulaInfo.md)
- [ErrorMessage](interfaces/ErrorMessage.md)
- [EventDependency](interfaces/EventDependency.md)
- [EventScope](interfaces/EventScope.md)
- [FindKey](interfaces/FindKey.md)
- [FormulaContextArgs](interfaces/FormulaContextArgs.md)
- [FormulaDefinition](interfaces/FormulaDefinition.md)
- [FormulaEventPayload](interfaces/FormulaEventPayload.md)
- [FormulaNameToken](interfaces/FormulaNameToken.md)
- [FormulaTypeAttributes](interfaces/FormulaTypeAttributes.md)
- [FunctionClause](interfaces/FunctionClause.md)
- [FunctionCompletion](interfaces/FunctionCompletion.md)
- [FunctionContext](interfaces/FunctionContext.md)
- [InsertOptions](interfaces/InsertOptions.md)
- [InterpretArgument](interfaces/InterpretArgument.md)
- [InterpretContext](interfaces/InterpretContext.md)
- [MakeContextOptions](interfaces/MakeContextOptions.md)
- [MakeContextResult](interfaces/MakeContextResult.md)
- [NameDependency](interfaces/NameDependency.md)
- [NameDependencyWithKind](interfaces/NameDependencyWithKind.md)
- [OperatorType](interfaces/OperatorType.md)
- [PageInput](interfaces/PageInput.md)
- [RangeType](interfaces/RangeType.md)
- [Row](interfaces/Row.md)
- [RowInput](interfaces/RowInput.md)
- [RowType](interfaces/RowType.md)
- [SpreadsheetAllPersistence](interfaces/SpreadsheetAllPersistence.md)
- [SpreadsheetCompletion](interfaces/SpreadsheetCompletion.md)
- [SpreadsheetDynamicPersistence](interfaces/SpreadsheetDynamicPersistence.md)
- [SpreadsheetInitializer](interfaces/SpreadsheetInitializer.md)
- [SpreadsheetInput](interfaces/SpreadsheetInput.md)
- [SpreadsheetType](interfaces/SpreadsheetType.md)
- [SwitchInitializer](interfaces/SwitchInitializer.md)
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
- [handleCodeFragmentsResult](interfaces/handleCodeFragmentsResult.md)

### Type Aliases

- [AnyDisplayResult](README.md#anydisplayresult)
- [AnyDumpResult](README.md#anydumpresult)
- [AnyFunctionClauseWithKeyAndExample](README.md#anyfunctionclausewithkeyandexample)
- [AnyTypeResult](README.md#anytyperesult)
- [BaseResult](README.md#baseresult)
- [BlockKey](README.md#blockkey)
- [BlockName](README.md#blockname)
- [CellVia](README.md#cellvia)
- [CodeFragment](README.md#codefragment)
- [CodeFragmentAttrs](README.md#codefragmentattrs)
- [CodeFragmentCodes](README.md#codefragmentcodes)
- [CodeFragmentStep](README.md#codefragmentstep)
- [CodeFragmentWithIndex](README.md#codefragmentwithindex)
- [ColumnId](README.md#columnid)
- [ColumnKey](README.md#columnkey)
- [ColumnName](README.md#columnname)
- [Completion](README.md#completion)
- [CompletionFlag](README.md#completionflag)
- [CompletionKind](README.md#completionkind)
- [ComplexCodeFragmentType](README.md#complexcodefragmenttype)
- [ContextState](README.md#contextstate)
- [CoreFunctionGroup](README.md#corefunctiongroup)
- [Definition](README.md#definition)
- [DistributeEvents](README.md#distributeevents)
- [ErrorMessageType](README.md#errormessagetype)
- [ExpressionType](README.md#expressiontype)
- [ExtendedCtx](README.md#extendedctx)
- [ExtractedType](README.md#extractedtype)
- [Feature](README.md#feature)
- [Features](README.md#features)
- [Formula](README.md#formula)
- [FormulaCheckType](README.md#formulachecktype)
- [FormulaColorType](README.md#formulacolortype)
- [FormulaControlType](README.md#formulacontroltype)
- [FormulaSourceType](README.md#formulasourcetype)
- [FormulaType](README.md#formulatype)
- [FunctionCodeFragmentType](README.md#functioncodefragmenttype)
- [FunctionGroup](README.md#functiongroup)
- [FunctionKey](README.md#functionkey)
- [FunctionNameType](README.md#functionnametype)
- [I18N](README.md#i18n)
- [Lambda](README.md#lambda)
- [MockedUUIDV4](README.md#mockeduuidv4)
- [NamespaceId](README.md#namespaceid)
- [OperatorName](README.md#operatorname)
- [ParseErrorType](README.md#parseerrortype)
- [ParseResult](README.md#parseresult)
- [PredicateFunction](README.md#predicatefunction)
- [RowId](README.md#rowid)
- [SimpleCodeFragmentType](README.md#simplecodefragmenttype)
- [SpecialCodeFragmentType](README.md#specialcodefragmenttype)
- [SpreadsheetId](README.md#spreadsheetid)
- [SpreadsheetKey](README.md#spreadsheetkey)
- [SpreadsheetName](README.md#spreadsheetname)
- [SpreadsheetUpdateNamePayload](README.md#spreadsheetupdatenamepayload)
- [TestCaseName](README.md#testcasename)
- [UsedFormulaType](README.md#usedformulatype)
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

- [ALL_TEST_CASE](README.md#all_test_case)
- [AdditionOperator](README.md#additionoperator)
- [Ampersand](README.md#ampersand)
- [And](README.md#and)
- [AnyName](README.md#anyname)
- [At](README.md#at)
- [BUILTIN_CLAUSES](README.md#builtin_clauses)
- [BUILTIN_STRINGS](README.md#builtin_strings)
- [BasicNames](README.md#basicnames)
- [BooleanLiteral](README.md#booleanliteral)
- [CORE_FUNCTION_GROUPS](README.md#core_function_groups)
- [Caret](README.md#caret)
- [Colon](README.md#colon)
- [CombineOperator](README.md#combineoperator)
- [Comma](README.md#comma)
- [CompareOperator](README.md#compareoperator)
- [CompleteNames](README.md#completenames)
- [CurrentBlock](README.md#currentblock)
- [DEFAULT_FIRST_NAMESPACEID](README.md#default_first_namespaceid)
- [DEFAULT_VIEWS](README.md#default_views)
- [DecimalLiteral](README.md#decimalliteral)
- [DependencyNames](README.md#dependencynames)
- [Div](README.md#div)
- [Dollar](README.md#dollar)
- [Dot](README.md#dot)
- [DoubleColon](README.md#doublecolon)
- [Equal](README.md#equal)
- [Equal2](README.md#equal2)
- [EqualCompareOperator](README.md#equalcompareoperator)
- [EventNames](README.md#eventnames)
- [ExactIn](README.md#exactin)
- [FORMULA_FEATURE_CONTROL](README.md#formula_feature_control)
- [FORMULA_PARSER_VERSION](README.md#formula_parser_version)
- [FORMULA_SHORT_NAMES](README.md#formula_short_names)
- [FORMULA_USED_TYPES](README.md#formula_used_types)
- [FUNCTION_NAME_REGEX](README.md#function_name_regex)
- [FeatureTestCases](README.md#featuretestcases)
- [FormulaLexer](README.md#formulalexer)
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
- [NAME_SPECIAL_INVALID_CHARS](README.md#name_special_invalid_chars)
- [NAME_VALID_PREFIX](README.md#name_valid_prefix)
- [NAME_VALID_SUFFIX_ONLY](README.md#name_valid_suffix_only)
- [Not](README.md#not)
- [NotEqual](README.md#notequal)
- [NotEqual2](README.md#notequal2)
- [NullLiteral](README.md#nullliteral)
- [NumberLiteral](README.md#numberliteral)
- [OPERATORS](README.md#operators)
- [OPERATOR_TYPES](README.md#operator_types)
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
- [StringLiteral](README.md#stringliteral)
- [TOKEN_SUFFIX_PATTERN](README.md#token_suffix_pattern)
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
- [predicateOperator](README.md#predicateoperator)
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

- [DEFAULT_UUID_FUNCTION](README.md#default_uuid_function)
- [FormulaBlockNameChangedTrigger](README.md#formulablocknamechangedtrigger)
- [FormulaBlockNameDeletedTrigger](README.md#formulablocknamedeletedtrigger)
- [FormulaBlockNameModifiedWithUsername](README.md#formulablocknamemodifiedwithusername)
- [FormulaContextNameChanged](README.md#formulacontextnamechanged)
- [FormulaContextNameRemove](README.md#formulacontextnameremove)
- [FormulaContextTickTrigger](README.md#formulacontextticktrigger)
- [FormulaDocSoftDeleted](README.md#formuladocsoftdeleted)
- [FormulaSpreadsheetDeleted](README.md#formulaspreadsheetdeleted)
- [FormulaTaskCompleted](README.md#formulataskcompleted)
- [FormulaTickViaId](README.md#formulatickviaid)
- [FormulaUpdatedViaId](README.md#formulaupdatedviaid)
- [FormulaVariableDependencyUpdated](README.md#formulavariabledependencyupdated)
- [SpreadsheetReloadViaId](README.md#spreadsheetreloadviaid)
- [SpreadsheetUpdateColumnsViaId](README.md#spreadsheetupdatecolumnsviaid)
- [SpreadsheetUpdateNameViaId](README.md#spreadsheetupdatenameviaid)
- [SpreadsheetUpdateRowsViaId](README.md#spreadsheetupdaterowsviaid)
- [accessAttribute](README.md#accessattribute)
- [appendFormulas](README.md#appendformulas)
- [applyCompletion](README.md#applycompletion)
- [applyFormat](README.md#applyformat)
- [attrs2completion](README.md#attrs2completion)
- [attrsToColorType](README.md#attrstocolortype)
- [block2codeFragment](README.md#block2codefragment)
- [block2completion](README.md#block2completion)
- [blockKey](README.md#blockkey-1)
- [buildErrorMessage](README.md#builderrormessage)
- [buildEvent](README.md#buildevent)
- [buildFunctionKey](README.md#buildfunctionkey)
- [buildPredicate](README.md#buildpredicate)
- [buildTestCases](README.md#buildtestcases)
- [cast](README.md#cast)
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
- [defaultI18n](README.md#defaulti18n)
- [dispatchFormulaBlockNameChange](README.md#dispatchformulablocknamechange)
- [dispatchFormulaBlockSoftDelete](README.md#dispatchformulablocksoftdelete)
- [dispatchFormulaSpreadsheetColumnChange](README.md#dispatchformulaspreadsheetcolumnchange)
- [dispatchFormulaSpreadsheetNameChange](README.md#dispatchformulaspreadsheetnamechange)
- [dispatchFormulaSpreadsheetRemove](README.md#dispatchformulaspreadsheetremove)
- [dispatchFormulaSpreadsheetRowChange](README.md#dispatchformulaspreadsheetrowchange)
- [display](README.md#display)
- [dump](README.md#dump)
- [dumpDisplayResultForDisplay](README.md#dumpdisplayresultfordisplay)
- [dumpValue](README.md#dumpvalue)
- [encodeString](README.md#encodestring)
- [errorIsFatal](README.md#errorisfatal)
- [errorMessageToString](README.md#errormessagetostring)
- [extractSubType](README.md#extractsubtype)
- [fetchResult](README.md#fetchresult)
- [fetchVariableTError](README.md#fetchvariableterror)
- [function2attrs](README.md#function2attrs)
- [function2completion](README.md#function2completion)
- [functionResult2lambda](README.md#functionresult2lambda)
- [generateUUIDs](README.md#generateuuids)
- [generateVariable](README.md#generatevariable)
- [getCompletion](README.md#getcompletion)
- [getLastCodeFragment](README.md#getlastcodefragment)
- [innerInterpret](README.md#innerinterpret)
- [interpret](README.md#interpret)
- [interpretByOperator](README.md#interpretbyoperator)
- [intersectType](README.md#intersecttype)
- [isKey](README.md#iskey)
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
- [parseErrorMessage](README.md#parseerrormessage)
- [parseString](README.md#parsestring)
- [resultToColorType](README.md#resulttocolortype)
- [reverseTraversalString](README.md#reversetraversalstring)
- [row2attrs](README.md#row2attrs)
- [row2codeFragment](README.md#row2codefragment)
- [runtimeCheckType](README.md#runtimechecktype)
- [shouldReceiveEvent](README.md#shouldreceiveevent)
- [shouldReturnEarly](README.md#shouldreturnearly)
- [splitDefinition$](README.md#splitdefinition$)
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

### <a id="anydisplayresult" name="anydisplayresult"></a> AnyDisplayResult

Ƭ **AnyDisplayResult**<`T`\>: `T` extends [`UsedFormulaType`](README.md#usedformulatype) ? `Omit`<[`ExtractedType`](README.md#extractedtype)<`T`\>, `"dump"` \| `"meta"` \| `"result"`\> & { `result`: `string` } : `never`

#### Type parameters

| Name | Type                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------- |
| `T`  | extends [`FormulaType`](README.md#formulatype) = [`UsedFormulaType`](README.md#usedformulatype) |

#### Defined in

[packages/formula/src/type/index.ts:177](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L177)

---

### <a id="anydumpresult" name="anydumpresult"></a> AnyDumpResult

Ƭ **AnyDumpResult**<`T`\>: `T` extends [`UsedFormulaType`](README.md#usedformulatype) ? `Omit`<[`ExtractedType`](README.md#extractedtype)<`T`\>, `"dump"` \| `"meta"` \| `"result"`\> & { `result`: [`ExtractedType`](README.md#extractedtype)<`T`\>[``"dump"``] } : `never`

#### Type parameters

| Name | Type                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------- |
| `T`  | extends [`FormulaType`](README.md#formulatype) = [`UsedFormulaType`](README.md#usedformulatype) |

#### Defined in

[packages/formula/src/type/index.ts:173](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L173)

---

### <a id="anyfunctionclausewithkeyandexample" name="anyfunctionclausewithkeyandexample"></a> AnyFunctionClauseWithKeyAndExample

Ƭ **AnyFunctionClauseWithKeyAndExample**: `RequireField`<[`AnyFunctionClause`](interfaces/AnyFunctionClause.md), `"key"`\>

#### Defined in

[packages/formula/src/type/index.ts:551](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L551)

---

### <a id="anytyperesult" name="anytyperesult"></a> AnyTypeResult

Ƭ **AnyTypeResult**<`T`\>: `T` extends [`UsedFormulaType`](README.md#usedformulatype) ? `Omit`<[`ExtractedType`](README.md#extractedtype)<`T`\>, `"dump"`\> : `never`

#### Type parameters

| Name | Type                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------- |
| `T`  | extends [`FormulaType`](README.md#formulatype) = [`UsedFormulaType`](README.md#usedformulatype) |

#### Defined in

[packages/formula/src/type/index.ts:169](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L169)

---

### <a id="baseresult" name="baseresult"></a> BaseResult

Ƭ **BaseResult**<`Type`, `Result`, `Dump`, `Meta`\>: { `dump`: `Dump` ; `result`: `Result` ; `type`: `Type` ; `view?`: [`ViewData`](interfaces/ViewData.md)<[`ViewType`](README.md#viewtype)\> } & [`Meta`] extends [`never`] ? {} : { `meta`: `Meta` }

#### Type parameters

| Name     | Type                                                   |
| :------- | :----------------------------------------------------- |
| `Type`   | extends [`UsedFormulaType`](README.md#usedformulatype) |
| `Result` | extends `any`                                          |
| `Dump`   | extends `any` = `string`                               |
| `Meta`   | extends `any` = `never`                                |

#### Defined in

[packages/formula/src/type/index.ts:122](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L122)

---

### <a id="blockkey" name="blockkey"></a> BlockKey

Ƭ **BlockKey**: `"#CurrentBlock"` \| \`#${NamespaceId}\`

#### Defined in

[packages/formula/src/type/index.ts:86](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L86)

---

### <a id="blockname" name="blockname"></a> BlockName

Ƭ **BlockName**: [`NamespaceId`](README.md#namespaceid)

#### Defined in

[packages/formula/src/type/index.ts:91](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L91)

---

### <a id="cellvia" name="cellvia"></a> CellVia

Ƭ **CellVia**: [`"column"` \| `"row"`, [`FindKey`](interfaces/FindKey.md), `string`]

#### Defined in

[packages/formula/src/controls/types.ts:142](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L142)

---

### <a id="codefragment" name="codefragment"></a> CodeFragment

Ƭ **CodeFragment**: `SpecialCodeFragment` \| `FunctionCodeFragment` \| `OtherCodeFragment`

#### Defined in

[packages/formula/src/type/index.ts:592](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L592)

---

### <a id="codefragmentattrs" name="codefragmentattrs"></a> CodeFragmentAttrs

Ƭ **CodeFragmentAttrs**: `ComplexCodeFragmentAttrs` \| `FunctionCodeFragmentAttrs`

#### Defined in

[packages/formula/src/type/index.ts:590](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L590)

---

### <a id="codefragmentcodes" name="codefragmentcodes"></a> CodeFragmentCodes

Ƭ **CodeFragmentCodes**: [`ComplexCodeFragmentType`](README.md#complexcodefragmenttype) \| [`SimpleCodeFragmentType`](README.md#simplecodefragmenttype) \| [`FunctionCodeFragmentType`](README.md#functioncodefragmenttype) \| [`SpecialCodeFragmentType`](README.md#specialcodefragmenttype)

#### Defined in

[packages/formula/src/type/index.ts:278](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L278)

---

### <a id="codefragmentstep" name="codefragmentstep"></a> CodeFragmentStep

Ƭ **CodeFragmentStep**: (`{ input, meta }`: { `input`: [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md) ; `meta`: [`VariableMetadata`](interfaces/VariableMetadata.md) }) => [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

#### Type declaration

▸ (`{ input, meta }`): [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

##### Parameters

| Name | Type |
| :--- | :--- |

| `{ input, meta }` | `Object` |
| `{ input, meta }.input` | [`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md) |
| `{ input, meta }.meta` | [`VariableMetadata`](interfaces/VariableMetadata.md) |

##### Returns

[`CodeFragmentStepInput`](interfaces/CodeFragmentStepInput.md)

#### Defined in

[packages/formula/src/type/index.ts:600](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L600)

---

### <a id="codefragmentwithindex" name="codefragmentwithindex"></a> CodeFragmentWithIndex

Ƭ **CodeFragmentWithIndex**: [`CodeFragment`](README.md#codefragment) & { `index`: `number` }

#### Defined in

[packages/formula/src/type/index.ts:594](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L594)

---

### <a id="columnid" name="columnid"></a> ColumnId

Ƭ **ColumnId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/formula/src/type/index.ts:101](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L101)

---

### <a id="columnkey" name="columnkey"></a> ColumnKey

Ƭ **ColumnKey**: \`#${NamespaceId}.${ColumnId}\`

#### Defined in

[packages/formula/src/type/index.ts:87](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L87)

---

### <a id="columnname" name="columnname"></a> ColumnName

Ƭ **ColumnName**: `string`

#### Defined in

[packages/formula/src/type/index.ts:75](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L75)

---

### <a id="completion" name="completion"></a> Completion

Ƭ **Completion**: [`FunctionCompletion`](interfaces/FunctionCompletion.md) \| [`VariableCompletion`](interfaces/VariableCompletion.md) \| [`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md) \| [`ColumnCompletion`](interfaces/ColumnCompletion.md) \| [`BlockCompletion`](interfaces/BlockCompletion.md)

#### Defined in

[packages/formula/src/type/index.ts:348](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L348)

---

### <a id="completionflag" name="completionflag"></a> CompletionFlag

Ƭ **CompletionFlag**: `"exact"` \| `"dynamicColumn"` \| `"compareTypeMatched"` \| `"compareTypeNotMatched"` \| `"chainTypeMatched"` \| `"chainTypeNotMatched"` \| `"contextNamespace"` \| `"defaultNamespace"` \| `"blockNamespace"` \| `"chainNamespace"` \| `"block"` \| `"variable"` \| `"spreadsheet"` \| `"column"` \| `"function"` \| `"variable"` \| `"nameEqual"` \| `"nameIncludes"` \| `"nameStartsWith"` \| `"functionNameEqual"` \| `"functionNameIncludes"` \| `"functionNameStartsWith"`

#### Defined in

[packages/formula/src/type/index.ts:290](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L290)

---

### <a id="completionkind" name="completionkind"></a> CompletionKind

Ƭ **CompletionKind**: `"function"` \| `"variable"` \| `"spreadsheet"` \| `"column"` \| `"block"`

#### Defined in

[packages/formula/src/type/index.ts:216](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L216)

---

### <a id="complexcodefragmenttype" name="complexcodefragmenttype"></a> ComplexCodeFragmentType

Ƭ **ComplexCodeFragmentType**: `"Spreadsheet"` \| `"Column"` \| `"Variable"` \| `"Block"` \| `"UUID"` \| `"LogicColumn"` \| `"Row"` \| `"LogicRow"` \| `"ThisRow"` \| `"ThisRecord"`

#### Defined in

[packages/formula/src/type/index.ts:217](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L217)

---

### <a id="contextstate" name="contextstate"></a> ContextState

Ƭ **ContextState**: `any`

#### Defined in

[packages/formula/src/context/context.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/context.ts#L77)

---

### <a id="corefunctiongroup" name="corefunctiongroup"></a> CoreFunctionGroup

Ƭ **CoreFunctionGroup**: typeof [`CORE_FUNCTION_GROUPS`](README.md#core_function_groups)[`number`]

#### Defined in

[packages/formula/src/type/index.ts:54](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L54)

---

### <a id="definition" name="definition"></a> Definition

Ƭ **Definition**: `string`

#### Defined in

[packages/formula/src/type/index.ts:78](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L78)

---

### <a id="distributeevents" name="distributeevents"></a> DistributeEvents

Ƭ **DistributeEvents**<`Event`\>: `Event` extends keyof `AllowEventsType` ? readonly [`Event`, `AllowEventsType`[`Event`]] : `never`

#### Type parameters

| Name    | Type                                                      |
| :------ | :-------------------------------------------------------- |
| `Event` | extends keyof `AllowEventsType` = keyof `AllowEventsType` |

#### Defined in

[packages/formula/src/tests/testType.ts:274](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L274)

---

### <a id="errormessagetype" name="errormessagetype"></a> ErrorMessageType

Ƭ **ErrorMessageType**: `string` \| [\`errors.${string}\`, `Record`<`string`, `string`\>]

#### Defined in

[packages/formula/src/type/index.ts:805](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L805)

---

### <a id="expressiontype" name="expressiontype"></a> ExpressionType

Ƭ **ExpressionType**: [`FormulaCheckType`](README.md#formulachecktype) \| `undefined`

#### Defined in

[packages/formula/src/type/index.ts:69](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L69)

---

### <a id="extendedctx" name="extendedctx"></a> ExtendedCtx

Ƭ **ExtendedCtx**: [`MakeContextResult`](interfaces/MakeContextResult.md) & { `meta`: [`VariableMetadata`](interfaces/VariableMetadata.md) }

#### Defined in

[packages/formula/src/tests/testType.ts:178](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L178)

---

### <a id="extractedtype" name="extractedtype"></a> ExtractedType

Ƭ **ExtractedType**<`T`\>: `Extract`<`EnsureTypeIsOk`, { `type`: `T` }\>

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `T`  | extends [`FormulaType`](README.md#formulatype) |

#### Defined in

[packages/formula/src/type/index.ts:167](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L167)

---

### <a id="feature" name="feature"></a> Feature

Ƭ **Feature**: `string`

#### Defined in

[packages/formula/src/type/index.ts:105](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L105)

---

### <a id="features" name="features"></a> Features

Ƭ **Features**: [`Feature`](README.md#feature)[]

#### Defined in

[packages/formula/src/type/index.ts:106](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L106)

---

### <a id="formula" name="formula"></a> Formula

Ƭ **Formula**: [`BaseFormula`](interfaces/BaseFormula.md) & { `definition`: [`Definition`](README.md#definition) }

#### Defined in

[packages/formula/src/type/index.ts:205](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L205)

---

### <a id="formulachecktype" name="formulachecktype"></a> FormulaCheckType

Ƭ **FormulaCheckType**: [`FormulaType`](README.md#formulatype) \| readonly [[`FormulaType`](README.md#formulatype), ...FormulaType[]]

#### Defined in

[packages/formula/src/type/index.ts:63](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L63)

---

### <a id="formulacolortype" name="formulacolortype"></a> FormulaColorType

Ƭ **FormulaColorType**: `Exclude`<[`FormulaType`](README.md#formulatype), `"boolean"`\> \| `FormulaCodeFragmentType`

#### Defined in

[packages/formula/src/type/index.ts:67](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L67)

---

### <a id="formulacontroltype" name="formulacontroltype"></a> FormulaControlType

Ƭ **FormulaControlType**: typeof `FORMULA_CONTROL_TYPES`[`number`]

#### Defined in

[packages/formula/src/type/index.ts:57](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L57)

---

### <a id="formulasourcetype" name="formulasourcetype"></a> FormulaSourceType

Ƭ **FormulaSourceType**: `"normal"` \| `"spreadsheet"`

#### Defined in

[packages/formula/src/type/index.ts:185](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L185)

---

### <a id="formulatype" name="formulatype"></a> FormulaType

Ƭ **FormulaType**: typeof `FORMULA_TYPES`[`number`]

#### Defined in

[packages/formula/src/type/index.ts:58](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L58)

---

### <a id="functioncodefragmenttype" name="functioncodefragmenttype"></a> FunctionCodeFragmentType

Ƭ **FunctionCodeFragmentType**: `"Function"` \| `"FunctionGroup"`

#### Defined in

[packages/formula/src/type/index.ts:229](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L229)

---

### <a id="functiongroup" name="functiongroup"></a> FunctionGroup

Ƭ **FunctionGroup**: [`CoreFunctionGroup`](README.md#corefunctiongroup) \| `string`

#### Defined in

[packages/formula/src/type/index.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L71)

---

### <a id="functionkey" name="functionkey"></a> FunctionKey

Ƭ **FunctionKey**: \`${FunctionGroup}::${FunctionNameType}\` \| [`FunctionNameType`](README.md#functionnametype)

#### Defined in

[packages/formula/src/type/index.ts:84](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L84)

---

### <a id="functionnametype" name="functionnametype"></a> FunctionNameType

Ƭ **FunctionNameType**: `string`

#### Defined in

[packages/formula/src/type/index.ts:73](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L73)

---

### <a id="i18n" name="i18n"></a> I18N

Ƭ **I18N**: (`input`: [`ErrorMessageType`](README.md#errormessagetype)) => `string`

#### Type declaration

▸ (`input`): `string`

##### Parameters

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `input` | [`ErrorMessageType`](README.md#errormessagetype) |

##### Returns

`string`

#### Defined in

[packages/formula/src/type/index.ts:812](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L812)

---

### <a id="lambda" name="lambda"></a> Lambda

Ƭ **Lambda**: `VoidFunction`

#### Defined in

[packages/formula/src/grammar/lambda.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lambda.ts#L4)

---

### <a id="mockeduuidv4" name="mockeduuidv4"></a> MockedUUIDV4

Ƭ **MockedUUIDV4**: `symbol` \| `string`

#### Defined in

[packages/formula/src/tests/testType.ts:50](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L50)

---

### <a id="namespaceid" name="namespaceid"></a> NamespaceId

Ƭ **NamespaceId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/formula/src/type/index.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L99)

---

### <a id="operatorname" name="operatorname"></a> OperatorName

Ƭ **OperatorName**: `"name"` \| `"string"` \| `"null"` \| `"boolean"` \| `"number"` \| `"access"` \| `"addition"` \| `"arguments"` \| `"array"` \| `"block"` \| `"chain"` \| `"combine"` \| `"compare"` \| `"concat"` \| `"equalCompare"` \| `"expression"` \| `"in"` \| `"multiplication"` \| `"not"` \| `"parenthesis"` \| `"predicate"` \| `"range"` \| `"record"` \| `"recordField"` \| `"thisRecord"` \| `"thisRow"`

#### Defined in

[packages/formula/src/grammar/operator.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L8)

---

### <a id="parseerrortype" name="parseerrortype"></a> ParseErrorType

Ƭ **ParseErrorType**: `"parse"` \| `"syntax"`

#### Defined in

[packages/formula/src/type/index.ts:82](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L82)

---

### <a id="parseresult" name="parseresult"></a> ParseResult

Ƭ **ParseResult**: `SuccessParseResult` \| `ErrorParseResult` \| `LiteralParseResult` \| `BlankParseResult`

#### Defined in

[packages/formula/src/grammar/core.ts:84](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L84)

---

### <a id="predicatefunction" name="predicatefunction"></a> PredicateFunction

Ƭ **PredicateFunction**: (`input`: `any`) => `boolean`

#### Type declaration

▸ (`input`): `boolean`

##### Parameters

| Name    | Type  |
| :------ | :---- |
| `input` | `any` |

##### Returns

`boolean`

#### Defined in

[packages/formula/src/type/index.ts:93](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L93)

---

### <a id="rowid" name="rowid"></a> RowId

Ƭ **RowId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/formula/src/type/index.ts:103](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L103)

---

### <a id="simplecodefragmenttype" name="simplecodefragmenttype"></a> SimpleCodeFragmentType

Ƭ **SimpleCodeFragmentType**: typeof [`OPERATOR_TYPES`](README.md#operator_types)[`number`] \| `"FunctionName"` \| `"DoubleColon"` \| `"StringLiteral"` \| `"NumberLiteral"` \| `"BooleanLiteral"` \| `"NullLiteral"` \| `"Dot"` \| `"LParen"` \| `"RParen"` \| `"LBracket"` \| `"RBracket"` \| `"LBrace"` \| `"RBrace"` \| `"Not"` \| `"Comma"` \| `"Semicolon"`

#### Defined in

[packages/formula/src/type/index.ts:252](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L252)

---

### <a id="specialcodefragmenttype" name="specialcodefragmenttype"></a> SpecialCodeFragmentType

Ƭ **SpecialCodeFragmentType**: `"unknown"` \| `"parseErrorOther1"` \| `"parseErrorOther2"` \| `"parseErrorOther3"` \| `"Space"` \| `"literal"` \| `"blank"`

#### Defined in

[packages/formula/src/type/index.ts:270](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L270)

---

### <a id="spreadsheetid" name="spreadsheetid"></a> SpreadsheetId

Ƭ **SpreadsheetId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/formula/src/type/index.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L102)

---

### <a id="spreadsheetkey" name="spreadsheetkey"></a> SpreadsheetKey

Ƭ **SpreadsheetKey**: \`#${NamespaceId}.${SpreadsheetId}\`

#### Defined in

[packages/formula/src/type/index.ts:88](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L88)

---

### <a id="spreadsheetname" name="spreadsheetname"></a> SpreadsheetName

Ƭ **SpreadsheetName**: `string`

#### Defined in

[packages/formula/src/type/index.ts:76](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L76)

---

### <a id="spreadsheetupdatenamepayload" name="spreadsheetupdatenamepayload"></a> SpreadsheetUpdateNamePayload

Ƭ **SpreadsheetUpdateNamePayload**: [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`null`\>

#### Defined in

[packages/formula/src/events/spreadsheet.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/spreadsheet.ts#L4)

---

### <a id="testcasename" name="testcasename"></a> TestCaseName

Ƭ **TestCaseName**: [`OperatorName`](README.md#operatorname) \| `FeatureName` \| `FeatureTestName`

#### Defined in

[packages/formula/src/tests/testType.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L111)

---

### <a id="usedformulatype" name="usedformulatype"></a> UsedFormulaType

Ƭ **UsedFormulaType**: typeof [`FORMULA_USED_TYPES`](README.md#formula_used_types)[`number`]

#### Defined in

[packages/formula/src/type/index.ts:59](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L59)

---

### <a id="variableid" name="variableid"></a> VariableId

Ƭ **VariableId**: [`uuid`](README.md#uuid)

#### Defined in

[packages/formula/src/type/index.ts:100](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L100)

---

### <a id="variablekey" name="variablekey"></a> VariableKey

Ƭ **VariableKey**: \`#${NamespaceId}.${VariableId}\`

#### Defined in

[packages/formula/src/type/index.ts:85](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L85)

---

### <a id="variablekind" name="variablekind"></a> VariableKind

Ƭ **VariableKind**: `"literal"` \| `"blank"` \| `"constant"` \| `"expression"` \| `"unknown"`

#### Defined in

[packages/formula/src/type/index.ts:80](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L80)

---

### <a id="variablename" name="variablename"></a> VariableName

Ƭ **VariableName**: `string`

#### Defined in

[packages/formula/src/type/index.ts:74](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L74)

---

### <a id="variablerichtype" name="variablerichtype"></a> VariableRichType

Ƭ **VariableRichType**: { `type`: [`FormulaSourceType`](README.md#formulasourcetype) } & { `meta?`: `undefined` ; `type`: `"normal"` } \| { `meta`: { `columnId`: [`ColumnId`](README.md#columnid) ; `rowId`: [`uuid`](README.md#uuid) ; `spreadsheetId`: [`SpreadsheetId`](README.md#spreadsheetid) } ; `type`: `"spreadsheet"` }

#### Defined in

[packages/formula/src/type/index.ts:754](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L754)

---

### <a id="variabletask" name="variabletask"></a> VariableTask

Ƭ **VariableTask**: [`AsyncVariableTask`](interfaces/AsyncVariableTask.md) \| [`SyncVariableTask`](interfaces/SyncVariableTask.md)

#### Defined in

[packages/formula/src/type/index.ts:728](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L728)

---

### <a id="variablevalue" name="variablevalue"></a> VariableValue

Ƭ **VariableValue**: `SuccessVariableValue` \| `ErrorVariableValue`

#### Defined in

[packages/formula/src/type/index.ts:651](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L651)

---

### <a id="viewattrs" name="viewattrs"></a> ViewAttrs

Ƭ **ViewAttrs**: `Record`<`string`, `any`\>

#### Defined in

[packages/formula/src/type/index.ts:109](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L109)

---

### <a id="viewrender" name="viewrender"></a> ViewRender

Ƭ **ViewRender**: (`attrs`: [`ViewAttrs`](README.md#viewattrs), `data`: [`VariableDisplayData`](interfaces/VariableDisplayData.md)) => `React.ReactElement`

#### Type declaration

▸ (`attrs`, `data`): `React.ReactElement`

##### Parameters

| Name    | Type                                                       |
| :------ | :--------------------------------------------------------- |
| `attrs` | [`ViewAttrs`](README.md#viewattrs)                         |
| `data`  | [`VariableDisplayData`](interfaces/VariableDisplayData.md) |

##### Returns

`React.ReactElement`

#### Defined in

[packages/formula/src/type/index.ts:111](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L111)

---

### <a id="viewtype" name="viewtype"></a> ViewType

Ƭ **ViewType**: `string`

#### Defined in

[packages/formula/src/type/index.ts:108](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L108)

---

### <a id="geteventdependencyinput" name="geteventdependencyinput"></a> getEventDependencyInput

Ƭ **getEventDependencyInput**: { `columnKey?`: `string` ; `rowKey?`: `string` } & { `rowKey`: `string` } \| { `columnKey`: `string` } \| {}

#### Defined in

[packages/formula/src/controls/types.ts:46](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/controls/types.ts#L46)

---

### <a id="uuid" name="uuid"></a> uuid

Ƭ **uuid**: `string`

#### Defined in

[packages/formula/src/type/index.ts:97](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L97)

## Variables

### <a id="all_test_case" name="all_test_case"></a> ALL_TEST_CASE

• `Const` **ALL_TEST_CASE**: [`TestCaseInput`](interfaces/TestCaseInput.md)

#### Defined in

[packages/formula/src/tests/testCases.ts:141](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L141)

---

### <a id="additionoperator" name="additionoperator"></a> AdditionOperator

• `Const` **AdditionOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L5)

---

### <a id="ampersand" name="ampersand"></a> Ampersand

• `Const` **Ampersand**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:113](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L113)

---

### <a id="and" name="and"></a> And

• `Const` **And**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L42)

---

### <a id="anyname" name="anyname"></a> AnyName

• `Const` **AnyName**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:219](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L219)

---

### <a id="at" name="at"></a> At

• `Const` **At**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:134](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L134)

---

### <a id="builtin_clauses" name="builtin_clauses"></a> BUILTIN_CLAUSES

• `Const` **BUILTIN_CLAUSES**: [`AnyFunctionClause`](interfaces/AnyFunctionClause.md)[]

#### Defined in

[packages/formula/src/functions/index.ts:46](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/index.ts#L46)

---

### <a id="builtin_strings" name="builtin_strings"></a> BUILTIN_STRINGS

• `Const` **BUILTIN_STRINGS**: `string`[]

#### Defined in

[packages/formula/src/tests/testCases.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L7)

---

### <a id="basicnames" name="basicnames"></a> BasicNames

• `Const` **BasicNames**: [`TestCaseName`](README.md#testcasename)[]

#### Defined in

[packages/formula/src/tests/feature/basic/index.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/feature/basic/index.ts#L7)

---

### <a id="booleanliteral" name="booleanliteral"></a> BooleanLiteral

• `Const` **BooleanLiteral**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:194](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L194)

---

### <a id="core_function_groups" name="core_function_groups"></a> CORE_FUNCTION_GROUPS

• `Const` **CORE_FUNCTION_GROUPS**: readonly [``"core"``]

#### Defined in

[packages/formula/src/type/index.ts:53](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L53)

---

### <a id="caret" name="caret"></a> Caret

• `Const` **Caret**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:118](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L118)

---

### <a id="colon" name="colon"></a> Colon

• `Const` **Colon**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:215](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L215)

---

### <a id="combineoperator" name="combineoperator"></a> CombineOperator

• `Const` **CombineOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L7)

---

### <a id="comma" name="comma"></a> Comma

• `Const` **Comma**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:209](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L209)

---

### <a id="compareoperator" name="compareoperator"></a> CompareOperator

• `Const` **CompareOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L4)

---

### <a id="completenames" name="completenames"></a> CompleteNames

• `Const` **CompleteNames**: [`TestCaseName`](README.md#testcasename)[]

#### Defined in

[packages/formula/src/tests/feature/complete/index.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/feature/complete/index.ts#L16)

---

### <a id="currentblock" name="currentblock"></a> CurrentBlock

• `Const` **CurrentBlock**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:28](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L28)

---

### <a id="default_first_namespaceid" name="default_first_namespaceid"></a> DEFAULT_FIRST_NAMESPACEID

• `Const` **DEFAULT_FIRST_NAMESPACEID**: `"00000000-0000-0000-0000-000000000000"`

#### Defined in

[packages/formula/src/tests/testType.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L21)

---

### <a id="default_views" name="default_views"></a> DEFAULT_VIEWS

• `Const` **DEFAULT_VIEWS**: [`View`](interfaces/View.md)[]

#### Defined in

[packages/formula/src/render/index.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/render/index.ts#L5)

---

### <a id="decimalliteral" name="decimalliteral"></a> DecimalLiteral

• `Const` **DecimalLiteral**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:189](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L189)

---

### <a id="dependencynames" name="dependencynames"></a> DependencyNames

• `Const` **DependencyNames**: [`TestCaseName`](README.md#testcasename)[]

#### Defined in

[packages/formula/src/tests/feature/dependency/index.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/feature/dependency/index.ts#L7)

---

### <a id="div" name="div"></a> Div

• `Const` **Div**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:166](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L166)

---

### <a id="dollar" name="dollar"></a> Dollar

• `Const` **Dollar**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:129](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L129)

---

### <a id="dot" name="dot"></a> Dot

• `Const` **Dot**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:144](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L144)

---

### <a id="doublecolon" name="doublecolon"></a> DoubleColon

• `Const` **DoubleColon**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:213](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L213)

---

### <a id="equal" name="equal"></a> Equal

• `Const` **Equal**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:65](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L65)

---

### <a id="equal2" name="equal2"></a> Equal2

• `Const` **Equal2**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L71)

---

### <a id="equalcompareoperator" name="equalcompareoperator"></a> EqualCompareOperator

• `Const` **EqualCompareOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L3)

---

### <a id="eventnames" name="eventnames"></a> EventNames

• `Const` **EventNames**: [`TestCaseName`](README.md#testcasename)[]

#### Defined in

[packages/formula/src/tests/feature/event/index.ts:18](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/feature/event/index.ts#L18)

---

### <a id="exactin" name="exactin"></a> ExactIn

• `Const` **ExactIn**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L21)

---

### <a id="formula_feature_control" name="formula_feature_control"></a> FORMULA_FEATURE_CONTROL

• `Const` **FORMULA_FEATURE_CONTROL**: `"formula-controls"`

#### Defined in

[packages/formula/src/context/features.ts:1](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/features.ts#L1)

---

### <a id="formula_parser_version" name="formula_parser_version"></a> FORMULA_PARSER_VERSION

• `Const` **FORMULA_PARSER_VERSION**: `0`

#### Defined in

[packages/formula/src/version.ts:1](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/version.ts#L1)

---

### <a id="formula_short_names" name="formula_short_names"></a> FORMULA_SHORT_NAMES

• `Const` **FORMULA_SHORT_NAMES**: readonly [``"str"``, ``"literal"``, ``"num"``, ``"bool"``, ``"blank"``, ``"cst"``, ``"switch"``, ``"button"``, ``"predicate"``, ``"pending"``, ``"waiting"``, ``"noPersist"``, ``"function"``, ``"ref"``, ``"null"``, ``"record"``, ``"array"``, ``"date"``, ``"error"``, ``"spreadsheet"``, ``"column"``, ``"range"``, ``"row"``, ``"cell"``, ``"block"``]

#### Defined in

[packages/formula/src/type/index.ts:15](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L15)

---

### <a id="formula_used_types" name="formula_used_types"></a> FORMULA_USED_TYPES

• `Const` **FORMULA_USED_TYPES**: readonly [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``, ``"Button"``, ``"Switch"``, ``"literal"``, ``"Pending"``, ``"Waiting"``, ``"NoPersist"``]

#### Defined in

[packages/formula/src/type/index.ts:43](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L43)

---

### <a id="function_name_regex" name="function_name_regex"></a> FUNCTION_NAME_REGEX

• `Const` **FUNCTION_NAME_REGEX**: `RegExp`

#### Defined in

[packages/formula/src/grammar/lexer.ts:12](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L12)

---

### <a id="featuretestcases" name="featuretestcases"></a> FeatureTestCases

• `Const` **FeatureTestCases**: [`TestCaseInterface`](interfaces/TestCaseInterface.md)[]

#### Defined in

[packages/formula/src/tests/feature/index.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/feature/index.ts#L16)

---

### <a id="formulalexer" name="formulalexer"></a> FormulaLexer

• `Const` **FormulaLexer**: `Lexer`

#### Defined in

[packages/formula/src/grammar/lexer.ts:322](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L322)

---

### <a id="functionname" name="functionname"></a> FunctionName

• `Const` **FunctionName**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:217](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L217)

---

### <a id="greaterthan" name="greaterthan"></a> GreaterThan

• `Const` **GreaterThan**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:59](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L59)

---

### <a id="greaterthanequal" name="greaterthanequal"></a> GreaterThanEqual

• `Const` **GreaterThanEqual**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:95](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L95)

---

### <a id="in" name="in"></a> In

• `Const` **In**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L16)

---

### <a id="inoperator" name="inoperator"></a> InOperator

• `Const` **InOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L8)

---

### <a id="input" name="input"></a> Input

• `Const` **Input**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:32](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L32)

---

### <a id="lbrace" name="lbrace"></a> LBrace

• `Const` **LBrace**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:178](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L178)

---

### <a id="lbracket" name="lbracket"></a> LBracket

• `Const` **LBracket**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:175](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L175)

---

### <a id="lparen" name="lparen"></a> LParen

• `Const` **LParen**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:172](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L172)

---

### <a id="lambdaargumentnumber" name="lambdaargumentnumber"></a> LambdaArgumentNumber

• `Const` **LambdaArgumentNumber**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:181](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L181)

---

### <a id="lessthan" name="lessthan"></a> LessThan

• `Const` **LessThan**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:77](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L77)

---

### <a id="lessthanequal" name="lessthanequal"></a> LessThanEqual

• `Const` **LessThanEqual**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:101](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L101)

---

### <a id="minus" name="minus"></a> Minus

• `Const` **Minus**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:154](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L154)

---

### <a id="multi" name="multi"></a> Multi

• `Const` **Multi**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L160)

---

### <a id="multiplicationoperator" name="multiplicationoperator"></a> MultiplicationOperator

• `Const` **MultiplicationOperator**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L6)

---

### <a id="name_special_invalid_chars" name="name_special_invalid_chars"></a> NAME_SPECIAL_INVALID_CHARS

• `Const` **NAME_SPECIAL_INVALID_CHARS**: `string`[]

#### Defined in

[packages/formula/src/tests/testCases.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L5)

---

### <a id="name_valid_prefix" name="name_valid_prefix"></a> NAME_VALID_PREFIX

• `Const` **NAME_VALID_PREFIX**: `string`[]

#### Defined in

[packages/formula/src/tests/testCases.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L8)

---

### <a id="name_valid_suffix_only" name="name_valid_suffix_only"></a> NAME_VALID_SUFFIX_ONLY

• `Const` **NAME_VALID_SUFFIX_ONLY**: `string`[]

#### Defined in

[packages/formula/src/tests/testCases.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L6)

---

### <a id="not" name="not"></a> Not

• `Const` **Not**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:54](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L54)

---

### <a id="notequal" name="notequal"></a> NotEqual

• `Const` **NotEqual**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L83)

---

### <a id="notequal2" name="notequal2"></a> NotEqual2

• `Const` **NotEqual2**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:89](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L89)

---

### <a id="nullliteral" name="nullliteral"></a> NullLiteral

• `Const` **NullLiteral**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:204](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L204)

---

### <a id="numberliteral" name="numberliteral"></a> NumberLiteral

• `Const` **NumberLiteral**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:183](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L183)

---

### <a id="operators" name="operators"></a> OPERATORS

• `Const` **OPERATORS**: [`OperatorType`](interfaces/OperatorType.md)[]

#### Defined in

[packages/formula/src/grammar/operations/index.ts:56](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/index.ts#L56)

---

### <a id="operator_types" name="operator_types"></a> OPERATOR_TYPES

• `Const` **OPERATOR_TYPES**: readonly [``"Plus"``, ``"Minus"``, ``"Multi"``, ``"Div"``, ``"Ampersand"``, ``"Caret"``, ``"Equal2"``, ``"Equal"``, ``"NotEqual2"``, ``"NotEqual"``, ``"And"``, ``"Or"``, ``"GreaterThan"``, ``"LessThanEqual"``, ``"GreaterThanEqual"``, ``"LessThan"``, ``"ExactIn"``, ``"In"``]

#### Defined in

[packages/formula/src/type/index.ts:231](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L231)

---

### <a id="or" name="or"></a> Or

• `Const` **Or**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:48](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L48)

---

### <a id="parserinstance" name="parserinstance"></a> ParserInstance

• `Const` **ParserInstance**: [`FormulaParser`](classes/FormulaParser.md)

#### Defined in

[packages/formula/src/grammar/parser.ts:325](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/parser.ts#L325)

---

### <a id="plus" name="plus"></a> Plus

• `Const` **Plus**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L107)

---

### <a id="rbrace" name="rbrace"></a> RBrace

• `Const` **RBrace**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:179](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L179)

---

### <a id="rbracket" name="rbracket"></a> RBracket

• `Const` **RBracket**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:176](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L176)

---

### <a id="rparen" name="rparen"></a> RParen

• `Const` **RParen**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:173](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L173)

---

### <a id="self" name="self"></a> Self

• `Const` **Self**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:27](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L27)

---

### <a id="semicolon" name="semicolon"></a> Semicolon

• `Const` **Semicolon**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:211](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L211)

---

### <a id="sharp" name="sharp"></a> Sharp

• `Const` **Sharp**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:139](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L139)

---

### <a id="sign" name="sign"></a> Sign

• `Const` **Sign**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:124](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L124)

---

### <a id="stringliteral" name="stringliteral"></a> StringLiteral

• `Const` **StringLiteral**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:199](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L199)

---

### <a id="token_suffix_pattern" name="token_suffix_pattern"></a> TOKEN_SUFFIX_PATTERN

• `Const` **TOKEN_SUFFIX_PATTERN**: `string`

#### Defined in

[packages/formula/src/grammar/lexer.ts:14](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L14)

---

### <a id="thisrecord" name="thisrecord"></a> ThisRecord

• `Const` **ThisRecord**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:37](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L37)

---

### <a id="thisrow" name="thisrow"></a> ThisRow

• `Const` **ThisRow**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:33](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L33)

---

### <a id="uuid-1" name="uuid-1"></a> UUID

• `Const` **UUID**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:149](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L149)

---

### <a id="whitespace" name="whitespace"></a> WhiteSpace

• `Const` **WhiteSpace**: `TokenType`

#### Defined in

[packages/formula/src/grammar/lexer.ts:222](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L222)

---

### <a id="accessoperator" name="accessoperator"></a> accessOperator

• `Const` **accessOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/access.ts:58](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/access.ts#L58)

---

### <a id="additionoperator-1" name="additionoperator-1"></a> additionOperator

• `Const` **additionOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/addition.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/addition.ts#L7)

---

### <a id="alltokens" name="alltokens"></a> allTokens

• `Const` **allTokens**: `TokenType`[]

#### Defined in

[packages/formula/src/grammar/lexer.ts:228](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L228)

---

### <a id="apicurrentposition" name="apicurrentposition"></a> apiCurrentPosition

• `Const` **apiCurrentPosition**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Record"`, `true`, `false`, `false`, []\>

**`Source`**

#### Defined in

[packages/formula/src/functions/api/currentPosition.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/api/currentPosition.ts#L42)

---

### <a id="apiexchange" name="apiexchange"></a> apiExchange

• `Const` **apiExchange**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Record"`, `true`, `false`, `false`, [{ `name`: `string` = 'url'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/api/exchange.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/api/exchange.ts#L8)

---

### <a id="argumentsoperator" name="argumentsoperator"></a> argumentsOperator

• `Const` **argumentsOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/arguments.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/arguments.ts#L5)

---

### <a id="arrayaverage" name="arrayaverage"></a> arrayAverage

• `Const` **arrayAverage**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/array/average.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/array/average.ts#L6)

---

### <a id="arrayjoin" name="arrayjoin"></a> arrayJoin

• `Const` **arrayJoin**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }, { `default`: { `result`: `string` = ','; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'separator'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/array/join.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/array/join.ts#L6)

---

### <a id="arrayoperator" name="arrayoperator"></a> arrayOperator

• `Const` **arrayOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/array.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/array.ts#L5)

---

### <a id="arraysum" name="arraysum"></a> arraySum

• `Const` **arraySum**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/array/sum.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/array/sum.ts#L6)

---

### <a id="blockoperator" name="blockoperator"></a> blockOperator

• `Const` **blockOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/block.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/block.ts#L8)

---

### <a id="booleanoperator" name="booleanoperator"></a> booleanOperator

• `Const` **booleanOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/boolean.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/boolean.ts#L3)

---

### <a id="chainoperator" name="chainoperator"></a> chainOperator

• `Const` **chainOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/chain.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/chain.ts#L4)

---

### <a id="combineoperator-1" name="combineoperator-1"></a> combineOperator

• `Const` **combineOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/combine.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/combine.ts#L5)

---

### <a id="compareoperator-1" name="compareoperator-1"></a> compareOperator

• `Const` **compareOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/compare.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/compare.ts#L5)

---

### <a id="concatoperator" name="concatoperator"></a> concatOperator

• `Const` **concatOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/concat.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/concat.ts#L3)

---

### <a id="controlbutton" name="controlbutton"></a> controlButton

• `Const` **controlButton**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Button"`, `false`, `false`, `false`, [{ `name`: `string` = 'name'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'onClick'; `type`: ``"Function"`` = 'Function' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/control/button.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/control/button.ts#L8)

---

### <a id="controlswitch" name="controlswitch"></a> controlSwitch

• `Const` **controlSwitch**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Switch"`, `false`, `false`, `false`, [{ `name`: `string` = 'name'; `type`: ``"boolean"`` = 'boolean' }, { `name`: `string` = 'onChange'; `type`: ``"Function"`` = 'Function' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/control/switch.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/control/switch.ts#L8)

---

### <a id="converttoarray" name="converttoarray"></a> convertToArray

• `Const` **convertToArray**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Array"`, `false`, `true`, `false`, [{ `name`: `string` = 'input'; `type`: [``"number"``, ``"Spreadsheet"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/convert/toArray.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/convert/toArray.ts#L6)

---

### <a id="converttoboolean" name="converttoboolean"></a> convertToBoolean

• `Const` **convertToBoolean**: [`FunctionClause`](interfaces/FunctionClause.md)<`"boolean"`, `false`, `true`, `false`, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/convert/toBoolean.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/convert/toBoolean.ts#L6)

---

### <a id="converttonumber" name="converttonumber"></a> convertToNumber

• `Const` **convertToNumber**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'string'; `type`: [``"string"``, ``"Cell"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/convert/toNumber.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/convert/toNumber.ts#L6)

---

### <a id="converttorecord" name="converttorecord"></a> convertToRecord

• `Const` **convertToRecord**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Record"`, `false`, `true`, `false`, [{ `name`: `string` = 'input'; `type`: ``"Date"`` = 'Date' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/convert/toRecord.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/convert/toRecord.ts#L6)

---

### <a id="converttostring" name="converttostring"></a> convertToString

• `Const` **convertToString**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'input'; `type`: [``"number"``, ``"Array"``, ``"Cell"``, ``"boolean"``, ``"null"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/convert/toString.ts:24](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/convert/toString.ts#L24)

---

### <a id="coreset" name="coreset"></a> coreSet

• `Const` **coreSet**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Function"`, `false`, `false`, `false`, [{ `name`: `string` = 'name'; `type`: ``"Reference"`` = 'Reference' }, { `name`: `string` = 'body'; `type`: ``"Cst"`` = 'Cst' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/core/set.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/core/set.ts#L6)

---

### <a id="datedate" name="datedate"></a> dateDate

• `Const` **dateDate**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Date"`, `false`, `false`, `false`, [{ `name`: `string` = 'input'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/date/date.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/date/date.ts#L6)

---

### <a id="datenow" name="datenow"></a> dateNow

• `Const` **dateNow**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Date"`, `false`, `false`, `false`, []\>

**`Source`**

#### Defined in

[packages/formula/src/functions/date/now.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/date/now.ts#L6)

---

### <a id="equalcompareoperator-1" name="equalcompareoperator-1"></a> equalCompareOperator

• `Const` **equalCompareOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/equalCompare.ts:5](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/equalCompare.ts#L5)

---

### <a id="errorerror" name="errorerror"></a> errorError

• `Const` **errorError**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Error"`, `false`, `true`, `false`, [{ `name`: `string` = 'reason'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/error/error.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/error/error.ts#L6)

---

### <a id="expressionoperator" name="expressionoperator"></a> expressionOperator

• `Const` **expressionOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/expression.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/expression.ts#L3)

---

### <a id="inoperator-1" name="inoperator-1"></a> inOperator

• `Const` **inOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/in.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/in.ts#L7)

---

### <a id="logicif" name="logicif"></a> logicIf

• `Const` **logicIf**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`, `false`, `false`, `false`, [{ `name`: `string` = 'condition'; `type`: `"boolean"` = 'boolean' }, { `name`: `string` = 'ifTrue'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }, { `name`: `string` = 'ifFalse'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/logic/if.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/logic/if.ts#L6)

---

### <a id="logiciferror" name="logiciferror"></a> logicIfError

• `Const` **logicIfError**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`, `false`, `true`, `true`, [{ `name`: `string` = 'expr1'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }, { `name`: `string` = 'expr2'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/logic/ifError.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/logic/ifError.ts#L6)

---

### <a id="mathabs" name="mathabs"></a> mathAbs

• `Const` **mathAbs**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/abs.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/abs.ts#L6)

---

### <a id="mathfloor" name="mathfloor"></a> mathFloor

• `Const` **mathFloor**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/floor.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/floor.ts#L6)

---

### <a id="mathint" name="mathint"></a> mathInt

• `Const` **mathInt**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/int.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/int.ts#L6)

---

### <a id="mathln" name="mathln"></a> mathLn

• `Const` **mathLn**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/ln.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/ln.ts#L6)

---

### <a id="mathlog10" name="mathlog10"></a> mathLog10

• `Const` **mathLog10**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/log10.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/log10.ts#L6)

---

### <a id="mathpi" name="mathpi"></a> mathPi

• `Const` **mathPi**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, []\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/pi.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/pi.ts#L6)

---

### <a id="mathpower" name="mathpower"></a> mathPower

• `Const` **mathPower**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }, { `name`: `string` = 'power'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/power.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/power.ts#L6)

---

### <a id="mathrand" name="mathrand"></a> mathRand

• `Const` **mathRand**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, []\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/rand.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/rand.ts#L6)

---

### <a id="mathround" name="mathround"></a> mathRound

• `Const` **mathRound**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/round.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/round.ts#L6)

---

### <a id="mathtrunc" name="mathtrunc"></a> mathTrunc

• `Const` **mathTrunc**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/math/trunc.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/math/trunc.ts#L6)

---

### <a id="multiplicationoperator-1" name="multiplicationoperator-1"></a> multiplicationOperator

• `Const` **multiplicationOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/multiplication.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/multiplication.ts#L7)

---

### <a id="nameoperator" name="nameoperator"></a> nameOperator

• `Const` **nameOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/name.ts:73](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/name.ts#L73)

---

### <a id="notoperator" name="notoperator"></a> notOperator

• `Const` **notOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/not.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/not.ts#L3)

---

### <a id="nulloperator" name="nulloperator"></a> nullOperator

• `Const` **nullOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/null.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/null.ts#L3)

---

### <a id="numberoperator" name="numberoperator"></a> numberOperator

• `Const` **numberOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/number.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/number.ts#L4)

---

### <a id="objectt" name="objectt"></a> objectT

• `Const` **objectT**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`, `false`, `true`, `true`, [{ `name`: `string` = 'obj'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/object/t.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/object/t.ts#L6)

---

### <a id="objecttype" name="objecttype"></a> objectType

• `Const` **objectType**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `true`, [{ `name`: `string` = 'obj'; `type`: [``"number"``, ``"string"``, ``"boolean"``, ``"null"``, ``"Date"``, ``"Block"``, ``"Blank"``, ``"Record"``, ``"Array"``, ``"Error"``, ``"Spreadsheet"``, ``"Row"``, ``"Cell"``, ``"Column"``, ``"Range"``, ``"Cst"``, ``"Reference"``, ``"Function"``, ``"Predicate"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/object/type.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/object/type.ts#L6)

---

### <a id="parenthesisoperator" name="parenthesisoperator"></a> parenthesisOperator

• `Const` **parenthesisOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/parenthesis.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/parenthesis.ts#L3)

---

### <a id="powerfxcountif" name="powerfxcountif"></a> powerfxCountIf

• `Const` **powerfxCountIf**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }, { `name`: `string` = 'predicate'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/powerfx/countIf.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/powerfx/countIf.ts#L42)

---

### <a id="predicateoperator" name="predicateoperator"></a> predicateOperator

• `Const` **predicateOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/predicate.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/predicate.ts#L7)

---

### <a id="processsleep" name="processsleep"></a> processSleep

• `Const` **processSleep**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `true`, `false`, `false`, [{ `name`: `string` = 'number'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/process/sleep.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/process/sleep.ts#L6)

---

### <a id="rangeoperator" name="rangeoperator"></a> rangeOperator

• `Const` **rangeOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/range.ts:4](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/range.ts#L4)

---

### <a id="recordfieldoperator" name="recordfieldoperator"></a> recordFieldOperator

• `Const` **recordFieldOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/recordField.ts:3](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/recordField.ts#L3)

---

### <a id="recordoperator" name="recordoperator"></a> recordOperator

• `Const` **recordOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/record.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/record.ts#L6)

---

### <a id="requestget" name="requestget"></a> requestGet

• `Const` **requestGet**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`, `true`, `false`, `false`, [{ `name`: `string` = 'url'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/request/get.ts:8](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/request/get.ts#L8)

---

### <a id="spreadsheetaverageifs" name="spreadsheetaverageifs"></a> spreadsheetAverageIfs

• `Const` **spreadsheetAverageIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/averageIfs.ts:40](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/averageIfs.ts#L40)

---

### <a id="spreadsheetcolumncount" name="spreadsheetcolumncount"></a> spreadsheetColumnCount

• `Const` **spreadsheetColumnCount**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/columnCount.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/columnCount.ts#L6)

---

### <a id="spreadsheetcounta" name="spreadsheetcounta"></a> spreadsheetCountA

• `Const` **spreadsheetCountA**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/countA.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/countA.ts#L6)

---

### <a id="spreadsheetcountifs" name="spreadsheetcountifs"></a> spreadsheetCountIfs

• `Const` **spreadsheetCountIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/countIfs.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/countIfs.ts#L25)

---

### <a id="spreadsheetmax" name="spreadsheetmax"></a> spreadsheetMax

• `Const` **spreadsheetMax**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/max.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/max.ts#L6)

---

### <a id="spreadsheetrow" name="spreadsheetrow"></a> spreadsheetRow

• `Const` **spreadsheetRow**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'input'; `type`: [``"Cell"``, ``"Row"``] }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/row.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/row.ts#L6)

---

### <a id="spreadsheetrowcount" name="spreadsheetrowcount"></a> spreadsheetRowCount

• `Const` **spreadsheetRowCount**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/rowCount.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/rowCount.ts#L6)

---

### <a id="spreadsheetspreadsheet" name="spreadsheetspreadsheet"></a> spreadsheetSpreadsheet

• `Const` **spreadsheetSpreadsheet**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Spreadsheet"`, `false`, `true`, `false`, [{ `name`: `string` = 'array'; `type`: ``"Array"`` = 'Array' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/spreadsheet.ts:99](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/spreadsheet.ts#L99)

---

### <a id="spreadsheetsum" name="spreadsheetsum"></a> spreadsheetSum

• `Const` **spreadsheetSum**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `true`, `false`, [{ `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/sum.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/sum.ts#L6)

---

### <a id="spreadsheetsumifs" name="spreadsheetsumifs"></a> spreadsheetSumIfs

• `Const` **spreadsheetSumIfs**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'condition'; `type`: ``"Predicate"`` = 'Predicate' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/sumIfs.ts:34](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/sumIfs.ts#L34)

---

### <a id="spreadsheetsumproduct" name="spreadsheetsumproduct"></a> spreadsheetSumProduct

• `Const` **spreadsheetSumProduct**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'column1'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'column2'; `type`: ``"Column"`` = 'Column' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/sumProduct.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/sumProduct.ts#L29)

---

### <a id="spreadsheettorecordarray" name="spreadsheettorecordarray"></a> spreadsheetToRecordArray

• `Const` **spreadsheetToRecordArray**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Array"`, `false`, `true`, `false`, [{ `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/toRecordArray.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/toRecordArray.ts#L6)

---

### <a id="spreadsheetvlookup" name="spreadsheetvlookup"></a> spreadsheetVlookup

• `Const` **spreadsheetVlookup**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'match'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'spreadsheet'; `type`: ``"Spreadsheet"`` = 'Spreadsheet' }, { `name`: `string` = 'column'; `type`: ``"Column"`` = 'Column' }, { `default`: { `result`: ``true`` = true; `type`: ``"boolean"`` = 'boolean' } ; `name`: `string` = 'range'; `type`: ``"boolean"`` = 'boolean' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/vlookup.ts:58](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/vlookup.ts#L58)

---

### <a id="spreadsheetxlookup" name="spreadsheetxlookup"></a> spreadsheetXlookup

• `Const` **spreadsheetXlookup**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'lookupValue'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'lookupColumn'; `type`: ``"Column"`` = 'Column' }, { `name`: `string` = 'returnColumn'; `type`: ``"Column"`` = 'Column' }, { `default`: { `result`: `string` = ''; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'notFoundValue'; `type`: ``"string"`` = 'string' }, { `default`: { `result`: `number` = 0; `type`: ``"number"`` = 'number' } ; `name`: `string` = 'matchMode'; `type`: ``"number"`` = 'number' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/spreadsheet/xlookup.ts:54](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/spreadsheet/xlookup.ts#L54)

---

### <a id="stringlen" name="stringlen"></a> stringLen

• `Const` **stringLen**: [`FunctionClause`](interfaces/FunctionClause.md)<`"number"`, `false`, `false`, `false`, [{ `name`: `string` = 'str'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/len.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/len.ts#L6)

---

### <a id="stringoperator" name="stringoperator"></a> stringOperator

• `Const` **stringOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/string.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/string.ts#L17)

---

### <a id="stringsplit" name="stringsplit"></a> stringSplit

• `Const` **stringSplit**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Array"`, `false`, `true`, `false`, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }, { `default`: { `result`: `string` = ''; `type`: ``"string"`` = 'string' } ; `name`: `string` = 'separator'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/split.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/split.ts#L6)

---

### <a id="stringstartwith" name="stringstartwith"></a> stringStartWith

• `Const` **stringStartWith**: [`FunctionClause`](interfaces/FunctionClause.md)<`"boolean"`, `false`, `true`, `false`, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }, { `name`: `string` = 'prefix'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/startWith.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/startWith.ts#L6)

---

### <a id="stringtobar" name="stringtobar"></a> stringToBar

• `Const` **stringToBar**: [`FunctionClause`](interfaces/FunctionClause.md)<`"Record"`, `false`, `true`, `false`, [{ `name`: `string` = 'record'; `type`: ``"Record"`` = 'Record' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/toBar.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/toBar.ts#L6)

---

### <a id="stringtoqrcode" name="stringtoqrcode"></a> stringToQrcode

• `Const` **stringToQrcode**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'string'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/toQrcode.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/toQrcode.ts#L6)

---

### <a id="stringtrim" name="stringtrim"></a> stringTrim

• `Const` **stringTrim**: [`FunctionClause`](interfaces/FunctionClause.md)<`"string"`, `false`, `true`, `false`, [{ `name`: `string` = 'str'; `type`: ``"string"`` = 'string' }]\>

**`Source`**

#### Defined in

[packages/formula/src/functions/string/trim.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/string/trim.ts#L6)

---

### <a id="thisrecordoperator" name="thisrecordoperator"></a> thisRecordOperator

• `Const` **thisRecordOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/thisRecord.ts:22](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/thisRecord.ts#L22)

---

### <a id="thisrowoperator" name="thisrowoperator"></a> thisRowOperator

• `Const` **thisRowOperator**: [`OperatorType`](interfaces/OperatorType.md)

#### Defined in

[packages/formula/src/grammar/operations/thisRow.ts:22](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/thisRow.ts#L22)

---

### <a id="tokenvocabulary" name="tokenvocabulary"></a> tokenVocabulary

• `Const` **tokenVocabulary**: `Record`<`string`, `TokenType`\>

#### Defined in

[packages/formula/src/grammar/lexer.ts:327](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L327)

## Functions

### <a id="default_uuid_function" name="default_uuid_function"></a> DEFAULT_UUID_FUNCTION

▸ **DEFAULT_UUID_FUNCTION**(`number`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `number` | `number` |

#### Returns

`string`

#### Defined in

[packages/formula/src/tests/testType.ts:53](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L53)

---

### <a id="formulablocknamechangedtrigger" name="formulablocknamechangedtrigger"></a> FormulaBlockNameChangedTrigger

▸ **FormulaBlockNameChangedTrigger**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                  |
| :----- | :-------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulablocknamedeletedtrigger" name="formulablocknamedeletedtrigger"></a> FormulaBlockNameDeletedTrigger

▸ **FormulaBlockNameDeletedTrigger**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                  |
| :----- | :-------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulablocknamemodifiedwithusername" name="formulablocknamemodifiedwithusername"></a> FormulaBlockNameModifiedWithUsername

▸ **FormulaBlockNameModifiedWithUsername**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                  |
| :----- | :-------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulacontextnamechanged" name="formulacontextnamechanged"></a> FormulaContextNameChanged

▸ **FormulaContextNameChanged**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                                                 |
| :----- | :--------------------------------------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulacontextnameremove" name="formulacontextnameremove"></a> FormulaContextNameRemove

▸ **FormulaContextNameRemove**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                                                 |
| :----- | :--------------------------------------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<{ `kind`: `string` ; `name`: `string` }\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulacontextticktrigger" name="formulacontextticktrigger"></a> FormulaContextTickTrigger

▸ **FormulaContextTickTrigger**(`args`): `Event`<{ `state`: `any` ; `username`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `args`          | `Object` |
| `args.state`    | `any`    |
| `args.username` | `string` |

#### Returns

`Event`<{ `state`: `any` ; `username`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formuladocsoftdeleted" name="formuladocsoftdeleted"></a> FormulaDocSoftDeleted

▸ **FormulaDocSoftDeleted**(`args`): `Event`<{ `id`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `args`          | `Object` |
| `args.id`       | `string` |
| `args.username` | `string` |

#### Returns

`Event`<{ `id`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulaspreadsheetdeleted" name="formulaspreadsheetdeleted"></a> FormulaSpreadsheetDeleted

▸ **FormulaSpreadsheetDeleted**(`args`): `Event`<{ `id`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `args`          | `Object` |
| `args.id`       | `string` |
| `args.username` | `string` |

#### Returns

`Event`<{ `id`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulataskcompleted" name="formulataskcompleted"></a> FormulaTaskCompleted

▸ **FormulaTaskCompleted**(`args`): `Event`<{ `namespaceId`: `string` ; `task`: [`VariableTask`](README.md#variabletask) ; `username`: `string` ; `variableId`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name               | Type                                     |
| :----------------- | :--------------------------------------- |
| `args`             | `Object`                                 |
| `args.namespaceId` | `string`                                 |
| `args.task`        | [`VariableTask`](README.md#variabletask) |
| `args.username`    | `string`                                 |
| `args.variableId`  | `string`                                 |

#### Returns

`Event`<{ `namespaceId`: `string` ; `task`: [`VariableTask`](README.md#variabletask) ; `username`: `string` ; `variableId`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulatickviaid" name="formulatickviaid"></a> FormulaTickViaId

▸ **FormulaTickViaId**(`args`): `Event`<{ `namespaceId`: `string` ; `uuid`: `string` ; `variableId`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `args`             | `Object` |
| `args.namespaceId` | `string` |
| `args.uuid`        | `string` |
| `args.variableId`  | `string` |

#### Returns

`Event`<{ `namespaceId`: `string` ; `uuid`: `string` ; `variableId`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulaupdatedviaid" name="formulaupdatedviaid"></a> FormulaUpdatedViaId

▸ **FormulaUpdatedViaId**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableInterface`](interfaces/VariableInterface.md)\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                                                                |
| :----- | :------------------------------------------------------------------------------------------------------------------ |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableInterface`](interfaces/VariableInterface.md)\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableInterface`](interfaces/VariableInterface.md)\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="formulavariabledependencyupdated" name="formulavariabledependencyupdated"></a> FormulaVariableDependencyUpdated

▸ **FormulaVariableDependencyUpdated**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableDependency`](interfaces/VariableDependency.md)[]\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                                                                    |
| :----- | :---------------------------------------------------------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableDependency`](interfaces/VariableDependency.md)[]\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<[`VariableDependency`](interfaces/VariableDependency.md)[]\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="spreadsheetreloadviaid" name="spreadsheetreloadviaid"></a> SpreadsheetReloadViaId

▸ **SpreadsheetReloadViaId**(`args`): `Event`<[`SpreadsheetUpdateNamePayload`](README.md#spreadsheetupdatenamepayload), `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                     |
| :----- | :----------------------------------------------------------------------- |
| `args` | [`SpreadsheetUpdateNamePayload`](README.md#spreadsheetupdatenamepayload) |

#### Returns

`Event`<[`SpreadsheetUpdateNamePayload`](README.md#spreadsheetupdatenamepayload), `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="spreadsheetupdatecolumnsviaid" name="spreadsheetupdatecolumnsviaid"></a> SpreadsheetUpdateColumnsViaId

▸ **SpreadsheetUpdateColumnsViaId**(`args`): `Event`<{ `columns`: [`Column`](interfaces/Column.md)[] ; `key`: `string` ; `namespaceId`: `string` ; `spreadsheetId`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name                 | Type                               |
| :------------------- | :--------------------------------- |
| `args`               | `Object`                           |
| `args.columns`       | [`Column`](interfaces/Column.md)[] |
| `args.key`           | `string`                           |
| `args.namespaceId`   | `string`                           |
| `args.spreadsheetId` | `string`                           |
| `args.username`      | `string`                           |

#### Returns

`Event`<{ `columns`: [`Column`](interfaces/Column.md)[] ; `key`: `string` ; `namespaceId`: `string` ; `spreadsheetId`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="spreadsheetupdatenameviaid" name="spreadsheetupdatenameviaid"></a> SpreadsheetUpdateNameViaId

▸ **SpreadsheetUpdateNameViaId**(`args`): `Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Parameters

| Name   | Type                                                                  |
| :----- | :-------------------------------------------------------------------- |
| `args` | [`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\> |

#### Returns

`Event`<[`FormulaEventPayload`](interfaces/FormulaEventPayload.md)<`string`\>, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="spreadsheetupdaterowsviaid" name="spreadsheetupdaterowsviaid"></a> SpreadsheetUpdateRowsViaId

▸ **SpreadsheetUpdateRowsViaId**(`args`): `Event`<{ `key`: `string` ; `namespaceId`: `string` ; `rows`: [`Row`](interfaces/Row.md)[] ; `spreadsheetId`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Parameters

| Name                 | Type                         |
| :------------------- | :--------------------------- |
| `args`               | `Object`                     |
| `args.key`           | `string`                     |
| `args.namespaceId`   | `string`                     |
| `args.rows`          | [`Row`](interfaces/Row.md)[] |
| `args.spreadsheetId` | `string`                     |
| `args.username`      | `string`                     |

#### Returns

`Event`<{ `key`: `string` ; `namespaceId`: `string` ; `rows`: [`Row`](interfaces/Row.md)[] ; `spreadsheetId`: `string` ; `username`: `string` }, `Promise`<`void`\>\>

#### Defined in

[packages/schema/src/events/types.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/schema/src/events/types.ts#L17)

---

### <a id="accessattribute" name="accessattribute"></a> accessAttribute

▸ **accessAttribute**(`interpreter`, `result`, `key`): `Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interpreter` | [`FormulaInterpreter`](classes/FormulaInterpreter.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `result`      | `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |
| `key`         | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Defined in

[packages/formula/src/grammar/operations/access.ts:14](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operations/access.ts#L14)

---

### <a id="appendformulas" name="appendformulas"></a> appendFormulas

▸ **appendFormulas**(`formulaContext`, `formulas`): `Promise`<`void`\>

#### Parameters

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `formulas`       | [`BaseFormula`](interfaces/BaseFormula.md)[]         |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/grammar/core.ts:606](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L606)

---

### <a id="applycompletion" name="applycompletion"></a> applyCompletion

▸ **applyCompletion**(`ctx`, `completion`): `CompleteResult`

#### Parameters

| Name         | Type                                               |
| :----------- | :------------------------------------------------- |
| `ctx`        | [`FunctionContext`](interfaces/FunctionContext.md) |
| `completion` | [`Completion`](README.md#completion)               |

#### Returns

`CompleteResult`

#### Defined in

[packages/formula/src/grammar/completer.ts:90](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L90)

---

### <a id="applyformat" name="applyformat"></a> applyFormat

▸ **applyFormat**(`ctx`): `Object`

Apply format to the formula.

#### Parameters

| Name  | Type                                               |
| :---- | :------------------------------------------------- |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

`Object`

| Name     | Type           |
| :------- | :------------- |
| `format` | `FormatResult` |
| `minify` | `FormatResult` |
| `valid`  | `boolean`      |

#### Defined in

[packages/formula/src/grammar/format.ts:114](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/format.ts#L114)

---

### <a id="attrs2completion" name="attrs2completion"></a> attrs2completion

▸ **attrs2completion**(`formulaContext`, `attrs`, `pageId`): `undefined` \| [`Completion`](README.md#completion)

#### Parameters

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `attrs`          | [`CodeFragmentAttrs`](README.md#codefragmentattrs)   |
| `pageId`         | `string`                                             |

#### Returns

`undefined` \| [`Completion`](README.md#completion)

#### Defined in

[packages/formula/src/grammar/completer.ts:558](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L558)

---

### <a id="attrstocolortype" name="attrstocolortype"></a> attrsToColorType

▸ **attrsToColorType**(`__namedParameters`): `string`

#### Parameters

| Name                | Type                                     |
| :------------------ | :--------------------------------------- |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:292](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L292)

---

### <a id="block2codefragment" name="block2codefragment"></a> block2codeFragment

▸ **block2codeFragment**(`block`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `block`  | [`BlockType`](interfaces/BlockType.md) |
| `pageId` | `string`                               |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/convert.ts:95](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L95)

---

### <a id="block2completion" name="block2completion"></a> block2completion

▸ **block2completion**(`ctx`, `block`, `pageId`): [`BlockCompletion`](interfaces/BlockCompletion.md)

#### Parameters

| Name     | Type                                                 |
| :------- | :--------------------------------------------------- |
| `ctx`    | [`ContextInterface`](interfaces/ContextInterface.md) |
| `block`  | [`BlockType`](interfaces/BlockType.md)               |
| `pageId` | `string`                                             |

#### Returns

[`BlockCompletion`](interfaces/BlockCompletion.md)

#### Defined in

[packages/formula/src/grammar/completer.ts:474](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L474)

---

### <a id="blockkey-1" name="blockkey-1"></a> blockKey

▸ **blockKey**(`namespaceId`): \`#${string}\`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |

#### Returns

\`#${string}\`

#### Defined in

[packages/formula/src/grammar/convert.ts:18](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L18)

---

### <a id="builderrormessage" name="builderrormessage"></a> buildErrorMessage

▸ **buildErrorMessage**(`msg`): `string`

#### Parameters

| Name  | Type                                             |
| :---- | :----------------------------------------------- |
| `msg` | [`ErrorMessageType`](README.md#errormessagetype) |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:362](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L362)

---

### <a id="buildevent" name="buildevent"></a> buildEvent

▸ **buildEvent**<`Args`\>(`input`): (`ctx`: [`ExtendedCtx`](README.md#extendedctx)) => `Promise`<`void`\>

#### Type parameters

| Name   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Args` | extends (readonly [`"columnChange"`, `OmitUsername`<(`__namedParameters`: { `columns`: [`Column`](interfaces/Column.md)[] ; `namespaceId`: `string` ; `spreadsheetId`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| readonly [`"rowChange"`, `OmitUsername`<(`__namedParameters`: { `namespaceId`: `string` ; `rows`: [`Row`](interfaces/Row.md)[] ; `spreadsheetId`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| readonly [``"blockDelete"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `username`: `string` }) => `Promise`<`void`\>\>] \| readonly [``"empty_sync"``, `any`] \| readonly [``"empty_async"``, `any`] \| readonly [``"blockChangeName"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `name`: `string` ; `username`: `string` }) => `Promise`<`void`\>\>] \| readonly [``"spreadsheetChangeName"``, `OmitUsername`<(`__namedParameters`: { `namespaceId`: `string` ; `spreadsheetId`: `string` ; `title`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| readonly [``"spreadsheetDelete"``, `OmitUsername`<(`__namedParameters`: { `id`: `string` ; `username`: `undefined` \| `string` }) => `Promise`<`void`\>\>] \| readonly [`"variableInsertOnly"`, [`BaseTestCase`](interfaces/BaseTestCase.md)<{}\>] \| readonly [`"variableInsertAndAwait"`, [`BaseTestCase`](interfaces/BaseTestCase.md)<{}\>] \| readonly [``"variableDelete"``, {}] \| readonly [`"variableUpdateDefinition"`, [`FormulaDefinition`](interfaces/FormulaDefinition.md)])[] |

#### Parameters

| Name    | Type   |
| :------ | :----- |
| `input` | `Args` |

#### Returns

`fn`

▸ (`ctx`): `Promise`<`void`\>

##### Parameters

| Name  | Type                                   |
| :---- | :------------------------------------- |
| `ctx` | [`ExtendedCtx`](README.md#extendedctx) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/tests/testHelper.ts:298](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testHelper.ts#L298)

---

### <a id="buildfunctionkey" name="buildfunctionkey"></a> buildFunctionKey

▸ **buildFunctionKey**(`group`, `name`, `disableUpcase?`): `string`

#### Parameters

| Name             | Type      |
| :--------------- | :-------- |
| `group`          | `string`  |
| `name`           | `string`  |
| `disableUpcase?` | `boolean` |

#### Returns

`string`

#### Defined in

[packages/formula/src/functions/index.ts:34](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/functions/index.ts#L34)

---

### <a id="buildpredicate" name="buildpredicate"></a> buildPredicate

▸ **buildPredicate**(`__namedParameters`): [`PredicateFunction`](README.md#predicatefunction)

#### Parameters

| Name                | Type                                      |
| :------------------ | :---------------------------------------- |
| `__namedParameters` | `Omit`<`FormulaPredicateType`, `"dump"`\> |

#### Returns

[`PredicateFunction`](README.md#predicatefunction)

#### Defined in

[packages/formula/src/grammar/lambda.ts:51](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lambda.ts#L51)

---

### <a id="buildtestcases" name="buildtestcases"></a> buildTestCases

▸ **buildTestCases**<`TestCase`\>(`name`): [[`TestCaseInput`](interfaces/TestCaseInput.md), `TestCase`[]]

#### Type parameters

| Name       |
| :--------- |
| `TestCase` |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `name` | [`TestCaseName`](README.md#testcasename)[] |

#### Returns

[[`TestCaseInput`](interfaces/TestCaseInput.md), `TestCase`[]]

#### Defined in

[packages/formula/src/tests/testCases.ts:160](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testCases.ts#L160)

---

### <a id="cast" name="cast"></a> cast

▸ **cast**<`T`, `Value`, `Dump`\>(`dump`, `ctx`): `Value`

#### Type parameters

| Name    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`     | extends `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Value` | extends `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Dump`  | extends `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `number` } \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `boolean` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `null` } \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `"Blank"` } \| `Omit`<`FormulaRecordType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `Record`<`string`, `any`\> } \| `Omit`<`FormulaArrayType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `any`[] } \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, `string`] } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`FindKey`](interfaces/FindKey.md)] } \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`FindKey`](interfaces/FindKey.md)] } \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<`FormulaPredicateType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `null` } |

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `dump` | `Dump`                                               |
| `ctx`  | [`ContextInterface`](interfaces/ContextInterface.md) |

#### Returns

`Value`

#### Defined in

[packages/formula/src/context/persist.ts:36](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/persist.ts#L36)

---

### <a id="castdata" name="castdata"></a> castData

▸ **castData**(`data`): `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `data` | `any` |

#### Returns

`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/grammar/util.ts:320](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L320)

---

### <a id="castnumber" name="castnumber"></a> castNumber

▸ **castNumber**(`data`): `number`

#### Parameters

| Name   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | `undefined` \| `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |

#### Returns

`number`

#### Defined in

[packages/formula/src/grammar/util.ts:310](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L310)

---

### <a id="castvariable" name="castvariable"></a> castVariable

▸ **castVariable**(`oldVariable`, `formulaContext`, `__namedParameters`): `Promise`<[`VariableInterface`](interfaces/VariableInterface.md)\>

#### Parameters

| Name                | Type                                                                  |
| :------------------ | :-------------------------------------------------------------------- |
| `oldVariable`       | `undefined` \| [`VariableInterface`](interfaces/VariableInterface.md) |
| `formulaContext`    | [`ContextInterface`](interfaces/ContextInterface.md)                  |
| `__namedParameters` | [`BaseFormula`](interfaces/BaseFormula.md)                            |

#### Returns

`Promise`<[`VariableInterface`](interfaces/VariableInterface.md)\>

#### Defined in

[packages/formula/src/context/variable.ts:76](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L76)

---

### <a id="checkvalidname" name="checkvalidname"></a> checkValidName

▸ **checkValidName**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/formula/src/grammar/lexer.ts:332](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lexer.ts#L332)

---

### <a id="cleanupeventdependency" name="cleanupeventdependency"></a> cleanupEventDependency

▸ **cleanupEventDependency**(`label`, `dependencies`): [`EventDependency`](interfaces/EventDependency.md)<`any`\>[]

#### Parameters

| Name           | Type                                                         |
| :------------- | :----------------------------------------------------------- |
| `label`        | `string`                                                     |
| `dependencies` | [`EventDependency`](interfaces/EventDependency.md)<`any`\>[] |

#### Returns

[`EventDependency`](interfaces/EventDependency.md)<`any`\>[]

#### Defined in

[packages/formula/src/grammar/util.ts:68](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L68)

---

### <a id="codefragment2string" name="codefragment2string"></a> codeFragment2string

▸ **codeFragment2string**(`codeFragment`): `string`

#### Parameters

| Name           | Type                                     |
| :------------- | :--------------------------------------- |
| `codeFragment` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/convert.ts:70](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L70)

---

### <a id="codefragment2value" name="codefragment2value"></a> codeFragment2value

▸ **codeFragment2value**(`__namedParameters`, `pageId`): `string`

#### Parameters

| Name                | Type                                     |
| :------------------ | :--------------------------------------- |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |
| `pageId`            | `undefined` \| `string`                  |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/convert.ts:83](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L83)

---

### <a id="codefragments2definition" name="codefragments2definition"></a> codeFragments2definition

▸ **codeFragments2definition**(`codeFragments`, `pageId`): `string`

#### Parameters

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `codeFragments` | [`CodeFragment`](README.md#codefragment)[] |
| `pageId`        | `string`                                   |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/convert.ts:79](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L79)

---

### <a id="column2attrs" name="column2attrs"></a> column2attrs

▸ **column2attrs**(`column`): [`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `column` | [`ColumnType`](interfaces/ColumnType.md) |

#### Returns

[`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Defined in

[packages/formula/src/grammar/convert.ts:47](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L47)

---

### <a id="column2codefragment" name="column2codefragment"></a> column2codeFragment

▸ **column2codeFragment**(`column`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `column` | [`ColumnType`](interfaces/ColumnType.md) |
| `pageId` | `string`                                 |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/convert.ts:107](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L107)

---

### <a id="columndisplayindex" name="columndisplayindex"></a> columnDisplayIndex

▸ **columnDisplayIndex**(`index`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:275](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L275)

---

### <a id="createfunctionclause" name="createfunctionclause"></a> createFunctionClause

▸ **createFunctionClause**<`Return`, `Async`, `Chain`, `AcceptError`, `Arguments`, `RealReturn`\>(`t`): [`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\>

#### Type parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Return`      | extends `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| readonly [``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Button"`` \| ``"Switch"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``, ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Block"`` \| ``"Button"`` \| ``"Switch"`` \| ``"Date"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"``] |
| `Async`       | extends `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Chain`       | extends `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `AcceptError` | extends `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Arguments`   | extends [...args: (Chain extends true ? [firstArgs: Argument<"string" \| "number" \| "boolean" \| "null" \| "Block" \| "Button" \| "Switch" \| "Date" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>, ...args: Argument<"string" \| "number" \| "boolean" \| "null" \| "Block" \| "Button" \| "Switch" \| "Date" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>[]] : Argument<"string" \| "number" \| "boolean" \| "null" \| "Block" \| "Button" \| "Switch" \| "Date" \| "Blank" \| "Record" \| "Array" \| "Error" \| "Spreadsheet" \| "Row" \| "Cell" \| "Column" \| "Range" \| "Cst" \| "Reference" \| "Function" \| "Predicate" \| "literal" \| "Pending" \| "Waiting" \| "NoPersist"\>[])[]]                                                                                                                                                                        |
| `RealReturn`  | extends `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` = `FlattenType`<`Return`, `never`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

#### Parameters

| Name | Type                                                                                                          |
| :--- | :------------------------------------------------------------------------------------------------------------ |
| `t`  | [`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\> |

#### Returns

[`FunctionClause`](interfaces/FunctionClause.md)<`RealReturn`, `Async`, `Chain`, `AcceptError`, `Arguments`\>

#### Defined in

[packages/formula/src/type/index.ts:540](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L540)

---

### <a id="createvariabletask" name="createvariabletask"></a> createVariableTask

▸ **createVariableTask**(`__namedParameters`): [`VariableTask`](README.md#variabletask)

#### Parameters

| Name                | Type        |
| :------------------ | :---------- |
| `__namedParameters` | `TaskInput` |

#### Returns

[`VariableTask`](README.md#variabletask)

#### Defined in

[packages/formula/src/context/task.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/task.ts#L21)

---

### <a id="currentblockkey" name="currentblockkey"></a> currentBlockKey

▸ **currentBlockKey**(`namespaceId`, `pageId`): \`#${string}\`

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `namespaceId` | `string`                |
| `pageId`      | `undefined` \| `string` |

#### Returns

\`#${string}\`

#### Defined in

[packages/formula/src/grammar/convert.ts:20](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L20)

---

### <a id="defaulti18n" name="defaulti18n"></a> defaultI18n

▸ **defaultI18n**(`input`): `string`

#### Parameters

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `input` | [`ErrorMessageType`](README.md#errormessagetype) |

#### Returns

`string`

#### Defined in

[packages/formula/src/type/index.ts:812](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L812)

---

### <a id="dispatchformulablocknamechange" name="dispatchformulablocknamechange"></a> dispatchFormulaBlockNameChange

▸ **dispatchFormulaBlockNameChange**(`__namedParameters`): `Promise`<`void`\>

Dispatch Block Rename Event.

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.id`       | `string` |
| `__namedParameters.name`     | `string` |
| `__namedParameters.username` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/block.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/block.ts#L42)

---

### <a id="dispatchformulablocksoftdelete" name="dispatchformulablocksoftdelete"></a> dispatchFormulaBlockSoftDelete

▸ **dispatchFormulaBlockSoftDelete**(`__namedParameters`): `Promise`<`void`\>

Dispatch Block Delete Event.

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | `Object` |
| `__namedParameters.id`       | `string` |
| `__namedParameters.username` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/block.ts:7](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/block.ts#L7)

---

### <a id="dispatchformulaspreadsheetcolumnchange" name="dispatchformulaspreadsheetcolumnchange"></a> dispatchFormulaSpreadsheetColumnChange

▸ **dispatchFormulaSpreadsheetColumnChange**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                              | Type                               |
| :-------------------------------- | :--------------------------------- |
| `__namedParameters`               | `Object`                           |
| `__namedParameters.columns`       | [`Column`](interfaces/Column.md)[] |
| `__namedParameters.namespaceId`   | `string`                           |
| `__namedParameters.spreadsheetId` | `string`                           |
| `__namedParameters.username`      | `undefined` \| `string`            |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/column.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/column.ts#L17)

---

### <a id="dispatchformulaspreadsheetnamechange" name="dispatchformulaspreadsheetnamechange"></a> dispatchFormulaSpreadsheetNameChange

▸ **dispatchFormulaSpreadsheetNameChange**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                              | Type                    |
| :-------------------------------- | :---------------------- |
| `__namedParameters`               | `Object`                |
| `__namedParameters.namespaceId`   | `string`                |
| `__namedParameters.spreadsheetId` | `string`                |
| `__namedParameters.title`         | `string`                |
| `__namedParameters.username`      | `undefined` \| `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/spreadsheet.ts:27](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/spreadsheet.ts#L27)

---

### <a id="dispatchformulaspreadsheetremove" name="dispatchformulaspreadsheetremove"></a> dispatchFormulaSpreadsheetRemove

▸ **dispatchFormulaSpreadsheetRemove**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                         | Type                    |
| :--------------------------- | :---------------------- |
| `__namedParameters`          | `Object`                |
| `__namedParameters.id`       | `string`                |
| `__namedParameters.username` | `undefined` \| `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/spreadsheet.ts:52](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/spreadsheet.ts#L52)

---

### <a id="dispatchformulaspreadsheetrowchange" name="dispatchformulaspreadsheetrowchange"></a> dispatchFormulaSpreadsheetRowChange

▸ **dispatchFormulaSpreadsheetRowChange**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name                              | Type                         |
| :-------------------------------- | :--------------------------- |
| `__namedParameters`               | `Object`                     |
| `__namedParameters.namespaceId`   | `string`                     |
| `__namedParameters.rows`          | [`Row`](interfaces/Row.md)[] |
| `__namedParameters.spreadsheetId` | `string`                     |
| `__namedParameters.username`      | `undefined` \| `string`      |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/formula/src/events/row.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/events/row.ts#L17)

---

### <a id="display" name="display"></a> display

▸ **display**<`T`, `Value`, `Display`\>(`v`, `ctx`): `Display`

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `T`       | extends `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Value`   | extends `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Display` | extends `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<`FormulaRecordType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<`FormulaArrayType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<`FormulaPredicateType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } |

#### Parameters

| Name  | Type                                                 |
| :---- | :--------------------------------------------------- |
| `v`   | `Value`                                              |
| `ctx` | [`ContextInterface`](interfaces/ContextInterface.md) |

#### Returns

`Display`

#### Defined in

[packages/formula/src/context/persist.ts:44](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/persist.ts#L44)

---

### <a id="dump" name="dump"></a> dump

▸ **dump**<`T`, `Value`, `Dump`\>(`v`): `Dump`

#### Type parameters

| Name    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`     | extends `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Value` | extends `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Dump`  | extends `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `number` } \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `boolean` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `null` } \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `"Blank"` } \| `Omit`<`FormulaRecordType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `Record`<`string`, `any`\> } \| `Omit`<`FormulaArrayType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `any`[] } \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, `string`] } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`FindKey`](interfaces/FindKey.md)] } \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] } \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: [`string`, [`FindKey`](interfaces/FindKey.md)] } \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<`FormulaPredicateType`, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `string` } \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"meta"` \| `"result"` \| `"dump"`\> & { `result`: `null` } |

#### Parameters

| Name | Type    |
| :--- | :------ |
| `v`  | `Value` |

#### Returns

`Dump`

#### Defined in

[packages/formula/src/context/persist.ts:29](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/persist.ts#L29)

---

### <a id="dumpdisplayresultfordisplay" name="dumpdisplayresultfordisplay"></a> dumpDisplayResultForDisplay

▸ **dumpDisplayResultForDisplay**(`t`): [`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `t`  | [`VariableData`](interfaces/VariableData.md) |

#### Returns

[`VariableDisplayData`](interfaces/VariableDisplayData.md)

#### Defined in

[packages/formula/src/context/persist.ts:13](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/persist.ts#L13)

---

### <a id="dumpvalue" name="dumpvalue"></a> dumpValue

▸ **dumpValue**(`result`, `t?`): `any`

#### Parameters

| Name     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |
| `t?`     | [`VariableData`](interfaces/VariableData.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### Returns

`any`

#### Defined in

[packages/formula/src/context/persist.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/persist.ts#L21)

---

### <a id="encodestring" name="encodestring"></a> encodeString

▸ **encodeString**(`str`): `string`

Encode string.

**`Example`**

```typescript
encodeString('foo') // => "\"foo\""
```

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:137](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L137)

---

### <a id="errorisfatal" name="errorisfatal"></a> errorIsFatal

▸ **errorIsFatal**(`__namedParameters`): `boolean`

#### Parameters

| Name                | Type                                         |
| :------------------ | :------------------------------------------- |
| `__namedParameters` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

`boolean`

#### Defined in

[packages/formula/src/context/variable.ts:47](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L47)

---

### <a id="errormessagetostring" name="errormessagetostring"></a> errorMessageToString

▸ **errorMessageToString**(`__namedParameters`): `string`

#### Parameters

| Name                | Type                                         |
| :------------------ | :------------------------------------------- |
| `__namedParameters` | [`ErrorMessage`](interfaces/ErrorMessage.md) |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:355](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L355)

---

### <a id="extractsubtype" name="extractsubtype"></a> extractSubType

▸ **extractSubType**(`array`): `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Parameters

| Name    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `array` | (`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>)[] |

#### Returns

`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Defined in

[packages/formula/src/grammar/util.ts:175](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L175)

---

### <a id="fetchresult" name="fetchresult"></a> fetchResult

▸ **fetchResult**(`__namedParameters`): `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Parameters

| Name                | Type                                         |
| :------------------ | :------------------------------------------- |
| `__namedParameters` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/context/variable.ts:64](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L64)

---

### <a id="fetchvariableterror" name="fetchvariableterror"></a> fetchVariableTError

▸ **fetchVariableTError**(`__namedParameters`): `undefined` \| [`ErrorMessage`](interfaces/ErrorMessage.md)

#### Parameters

| Name                | Type                                         |
| :------------------ | :------------------------------------------- |
| `__namedParameters` | [`VariableData`](interfaces/VariableData.md) |

#### Returns

`undefined` \| [`ErrorMessage`](interfaces/ErrorMessage.md)

#### Defined in

[packages/formula/src/context/variable.ts:41](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/context/variable.ts#L41)

---

### <a id="function2attrs" name="function2attrs"></a> function2attrs

▸ **function2attrs**(`clause`): [`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Parameters

| Name     | Type                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| `clause` | [`AnyFunctionClauseWithKeyAndExample`](README.md#anyfunctionclausewithkeyandexample) |

#### Returns

[`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Defined in

[packages/formula/src/grammar/convert.ts:63](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L63)

---

### <a id="function2completion" name="function2completion"></a> function2completion

▸ **function2completion**(`functionClause`, `weight`): [`FunctionCompletion`](interfaces/FunctionCompletion.md)

#### Parameters

| Name             | Type                                                           |
| :--------------- | :------------------------------------------------------------- |
| `functionClause` | [`AnyFunctionClause`](interfaces/AnyFunctionClause.md)<`any`\> |
| `weight`         | `number`                                                       |

#### Returns

[`FunctionCompletion`](interfaces/FunctionCompletion.md)

#### Defined in

[packages/formula/src/grammar/completer.ts:527](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L527)

---

### <a id="functionresult2lambda" name="functionresult2lambda"></a> functionResult2lambda

▸ **functionResult2lambda**<`T`\>(`ctx`, `__namedParameters`, `ctrl`): `VoidFunction`

#### Type parameters

| Name | Type                                               |
| :--- | :------------------------------------------------- |
| `T`  | extends [`ControlType`](interfaces/ControlType.md) |

#### Parameters

| Name                | Type                                                                                                                                                                            |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ctx`               | [`FunctionContext`](interfaces/FunctionContext.md)                                                                                                                              |
| `__namedParameters` | `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |
| `ctrl`              | `T`                                                                                                                                                                             |

#### Returns

`VoidFunction`

#### Defined in

[packages/formula/src/grammar/lambda.ts:6](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/lambda.ts#L6)

---

### <a id="generateuuids" name="generateuuids"></a> generateUUIDs

▸ **generateUUIDs**(): `string`[]

#### Returns

`string`[]

#### Defined in

[packages/formula/src/tests/testHelper.ts:296](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testHelper.ts#L296)

---

### <a id="generatevariable" name="generatevariable"></a> generateVariable

▸ **generateVariable**(`__namedParameters`): [`VariableInterface`](interfaces/VariableInterface.md)

#### Parameters

| Name                               | Type                                                 |
| :--------------------------------- | :--------------------------------------------------- |
| `__namedParameters`                | `Object`                                             |
| `__namedParameters.formulaContext` | [`ContextInterface`](interfaces/ContextInterface.md) |
| `__namedParameters.isLoad?`        | `boolean`                                            |
| `__namedParameters.skipExecute?`   | `boolean`                                            |
| `__namedParameters.t`              | [`VariableData`](interfaces/VariableData.md)         |

#### Returns

[`VariableInterface`](interfaces/VariableInterface.md)

#### Defined in

[packages/formula/src/grammar/core.ts:586](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L586)

---

### <a id="getcompletion" name="getcompletion"></a> getCompletion

▸ **getCompletion**(`__namedParameters`): [`Completion`](README.md#completion)[]

#### Parameters

| Name                | Type                 |
| :------------------ | :------------------- |
| `__namedParameters` | `GetCompletionInput` |

#### Returns

[`Completion`](README.md#completion)[]

#### Defined in

[packages/formula/src/grammar/completer.ts:371](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L371)

---

### <a id="getlastcodefragment" name="getlastcodefragment"></a> getLastCodeFragment

▸ **getLastCodeFragment**(`codeFragments`, `position`): [`undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment)]

#### Parameters

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `codeFragments` | [`CodeFragment`](README.md#codefragment)[] |
| `position`      | `number`                                   |

#### Returns

[`undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment), `undefined` \| [`CodeFragment`](README.md#codefragment)]

#### Defined in

[packages/formula/src/grammar/completer.ts:169](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L169)

---

### <a id="innerinterpret" name="innerinterpret"></a> innerInterpret

▸ **innerInterpret**(`__namedParameters`): `Promise`<[`VariableValue`](README.md#variablevalue)\>

#### Parameters

| Name                                                | Type                                                                                                  |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `__namedParameters`                                 | `Object`                                                                                              |
| `__namedParameters.ctx`                             | [`FunctionContext`](interfaces/FunctionContext.md)                                                    |
| `__namedParameters.parseResult`                     | `Object`                                                                                              |
| `__namedParameters.parseResult.errorMessages`       | [`ErrorMessage`](interfaces/ErrorMessage.md)[]                                                        |
| `__namedParameters.parseResult.variableParseResult` | `Pick`<[`VariableParseResult`](interfaces/VariableParseResult.md), `"async"` \| `"kind"` \| `"cst"`\> |

#### Returns

`Promise`<[`VariableValue`](README.md#variablevalue)\>

#### Defined in

[packages/formula/src/grammar/core.ts:465](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L465)

---

### <a id="interpret" name="interpret"></a> interpret

▸ **interpret**(`__namedParameters`): `Promise`<[`VariableData`](interfaces/VariableData.md)\>

#### Parameters

| Name                             | Type                                                   |
| :------------------------------- | :----------------------------------------------------- |
| `__namedParameters`              | `Object`                                               |
| `__namedParameters.ctx`          | [`FunctionContext`](interfaces/FunctionContext.md)     |
| `__namedParameters.parseResult`  | [`ParseResult`](README.md#parseresult)                 |
| `__namedParameters.skipExecute?` | `boolean`                                              |
| `__namedParameters.variable?`    | [`VariableInterface`](interfaces/VariableInterface.md) |

#### Returns

`Promise`<[`VariableData`](interfaces/VariableData.md)\>

#### Defined in

[packages/formula/src/grammar/core.ts:563](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L563)

---

### <a id="interpretbyoperator" name="interpretbyoperator"></a> interpretByOperator

▸ **interpretByOperator**(`__namedParameters`): `Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Parameters

| Name                            | Type                                                   |
| :------------------------------ | :----------------------------------------------------- |
| `__namedParameters`             | `Object`                                               |
| `__namedParameters.args`        | [`InterpretArgument`](interfaces/InterpretArgument.md) |
| `__namedParameters.interpreter` | [`FormulaInterpreter`](classes/FormulaInterpreter.md)  |
| `__namedParameters.lhs`         | `undefined` \| `CstNode`[]                             |
| `__namedParameters.operator`    | [`OperatorType`](interfaces/OperatorType.md)           |
| `__namedParameters.operators`   | (`undefined` \| `IToken`)[]                            |
| `__namedParameters.rhs`         | `undefined` \| `CstNode`[]                             |

#### Returns

`Promise`<`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>\>

#### Defined in

[packages/formula/src/grammar/operator.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L102)

---

### <a id="intersecttype" name="intersecttype"></a> intersectType

▸ **intersectType**(`expectedArgumentType`, `contextResultType`, `label`, `ctx`): `Object`

#### Parameters

| Name                   | Type                                               |
| :--------------------- | :------------------------------------------------- |
| `expectedArgumentType` | [`ExpressionType`](README.md#expressiontype)       |
| `contextResultType`    | [`FormulaCheckType`](README.md#formulachecktype)   |
| `label`                | `string`                                           |
| `ctx`                  | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

`Object`

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `errorMessages` | [`ErrorMessage`](interfaces/ErrorMessage.md)[]   |
| `newType`       | [`FormulaCheckType`](README.md#formulachecktype) |

#### Defined in

[packages/formula/src/grammar/util.ts:190](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L190)

---

### <a id="iskey" name="iskey"></a> isKey

▸ **isKey**(`__namedParameters`): `boolean`

#### Parameters

| Name                | Type                                     |
| :------------------ | :--------------------------------------- |
| `__namedParameters` | [`CodeFragment`](README.md#codefragment) |

#### Returns

`boolean`

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:1026](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L1026)

---

### <a id="makecontext" name="makecontext"></a> makeContext

▸ **makeContext**(`options`): `Promise`<[`MakeContextResult`](interfaces/MakeContextResult.md)\>

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `options` | [`MakeContextOptions`](interfaces/MakeContextOptions.md) |

#### Returns

`Promise`<[`MakeContextResult`](interfaces/MakeContextResult.md)\>

#### Defined in

[packages/formula/src/tests/testHelper.ts:193](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testHelper.ts#L193)

---

### <a id="matchobject" name="matchobject"></a> matchObject

▸ **matchObject**(`__namedParameters`): `any`

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:25](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L25)

---

### <a id="maybeencodestring" name="maybeencodestring"></a> maybeEncodeString

▸ **maybeEncodeString**(`str`): [`boolean`, `string`]

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

[`boolean`, `string`]

#### Defined in

[packages/formula/src/grammar/util.ts:141](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L141)

---

### <a id="mockblock" name="mockblock"></a> mockBlock

▸ **mockBlock**(`name`, `namespaceId`): `any`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `name`        | `string` |
| `namespaceId` | `string` |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:9](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L9)

---

### <a id="mockcell" name="mockcell"></a> mockCell

▸ **mockCell**(`value`, `cellId`, `columnKey`, `rowKey`): `any`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `value`     | `string` |
| `cellId`    | `string` |
| `columnKey` | `string` |
| `rowKey`    | `string` |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:17](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L17)

---

### <a id="mockcolumn" name="mockcolumn"></a> mockColumn

▸ **mockColumn**(`display`, `columnId`): `any`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `display`  | `string` |
| `columnId` | `string` |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:15](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L15)

---

### <a id="mockrow" name="mockrow"></a> mockRow

▸ **mockRow**(`display`): `any`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `display` | `string` |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:16](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L16)

---

### <a id="mockspreadsheet" name="mockspreadsheet"></a> mockSpreadsheet

▸ **mockSpreadsheet**(`name`, `namespaceId`): `any`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `name`        | `string` |
| `namespaceId` | `string` |

#### Returns

`any`

#### Defined in

[packages/formula/src/tests/testMock.ts:10](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testMock.ts#L10)

---

### <a id="objectdiff" name="objectdiff"></a> objectDiff

▸ **objectDiff**<`T`\>(`a`, `b`): `Record`<`number`, `T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `T`[] |
| `b`  | `T`[] |

#### Returns

`Record`<`number`, `T`\>

#### Defined in

[packages/formula/src/grammar/util.ts:159](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L159)

---

### <a id="parse" name="parse"></a> parse

▸ **parse**(`ctx`): [`ParseResult`](README.md#parseresult)

#### Parameters

| Name  | Type                                               |
| :---- | :------------------------------------------------- |
| `ctx` | [`FunctionContext`](interfaces/FunctionContext.md) |

#### Returns

[`ParseResult`](README.md#parseresult)

#### Defined in

[packages/formula/src/grammar/core.ts:86](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/core.ts#L86)

---

### <a id="parsebyoperator" name="parsebyoperator"></a> parseByOperator

▸ **parseByOperator**(`input`): [`CodeFragmentResult`](interfaces/CodeFragmentResult.md)

#### Parameters

| Name    | Type         |
| :------ | :----------- |
| `input` | `ParseInput` |

#### Returns

[`CodeFragmentResult`](interfaces/CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:195](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L195)

---

### <a id="parseerrormessage" name="parseerrormessage"></a> parseErrorMessage

▸ **parseErrorMessage**(`message`): [`ErrorMessageType`](README.md#errormessagetype)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`ErrorMessageType`](README.md#errormessagetype)

#### Defined in

[packages/formula/src/grammar/util.ts:367](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L367)

---

### <a id="parsestring" name="parsestring"></a> parseString

▸ **parseString**(`str`): `string`

Parse string.

@todo: dirty hack to get the string literal value

**`Example`**

```typescript
parseString('"foo"') // => "foo"
```

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:122](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L122)

---

### <a id="resulttocolortype" name="resulttocolortype"></a> resultToColorType

▸ **resultToColorType**(`__namedParameters`): [`FormulaColorType`](README.md#formulacolortype)

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |

#### Returns

[`FormulaColorType`](README.md#formulacolortype)

#### Defined in

[packages/formula/src/grammar/util.ts:281](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L281)

---

### <a id="reversetraversalstring" name="reversetraversalstring"></a> reverseTraversalString

▸ **reverseTraversalString**(`str`, `min?`): `string`[]

Traversal and collect string from end to start.

**`Example`**

```typescript
reverseTraversal('bar') // => ["bar", "ba", "b"]
reverseTraversal('bar', 2) // => ["bar", "ba"]
```

#### Parameters

| Name  | Type     | Default value |
| :---- | :------- | :------------ |
| `str` | `string` | `undefined`   |
| `min` | `number` | `1`           |

#### Returns

`string`[]

#### Defined in

[packages/formula/src/grammar/util.ts:102](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L102)

---

### <a id="row2attrs" name="row2attrs"></a> row2attrs

▸ **row2attrs**(`row`): [`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Parameters

| Name  | Type                               |
| :---- | :--------------------------------- |
| `row` | [`RowType`](interfaces/RowType.md) |

#### Returns

[`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Defined in

[packages/formula/src/grammar/convert.ts:55](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L55)

---

### <a id="row2codefragment" name="row2codefragment"></a> row2codeFragment

▸ **row2codeFragment**(`row`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name     | Type                               |
| :------- | :--------------------------------- |
| `row`    | [`RowType`](interfaces/RowType.md) |
| `pageId` | `string`                           |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/convert.ts:120](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L120)

---

### <a id="runtimechecktype" name="runtimechecktype"></a> runtimeCheckType

▸ **runtimeCheckType**(`__namedParameters`, `contextResultType`, `label`, `ctx`): `undefined` \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Parameters

| Name                | Type                                                   |
| :------------------ | :----------------------------------------------------- |
| `__namedParameters` | [`InterpretArgument`](interfaces/InterpretArgument.md) |
| `contextResultType` | [`FormulaCheckType`](README.md#formulachecktype)       |
| `label`             | `string`                                               |
| `ctx`               | [`FunctionContext`](interfaces/FunctionContext.md)     |

#### Returns

`undefined` \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\>

#### Defined in

[packages/formula/src/grammar/util.ts:254](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L254)

---

### <a id="shouldreceiveevent" name="shouldreceiveevent"></a> shouldReceiveEvent

▸ **shouldReceiveEvent**(`listenedScope`, `eventScope`): `boolean`

#### Parameters

| Name            | Type                                               |
| :-------------- | :------------------------------------------------- |
| `listenedScope` | [`EventScope`](interfaces/EventScope.md)           |
| `eventScope`    | `null` \| [`EventScope`](interfaces/EventScope.md) |

#### Returns

`boolean`

#### Defined in

[packages/formula/src/grammar/util.ts:21](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L21)

---

### <a id="shouldreturnearly" name="shouldreturnearly"></a> shouldReturnEarly

▸ **shouldReturnEarly**(`result`, `skipReturnEarlyCheck?`): `boolean`

#### Parameters

| Name                    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result`                | `undefined` \| `Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `result`: [`ErrorMessage`](interfaces/ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](interfaces/BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](interfaces/ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](interfaces/SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](interfaces/SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`RowType`](interfaces/RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](README.md#cellvia), [`Cell`](interfaces/Cell.md)] ; `result`: [`CellType`](interfaces/CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](interfaces/FindKey.md)] ; `result`: [`ColumnType`](interfaces/ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](interfaces/RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](interfaces/ViewData.md)<`string`\> }, `"dump"`\> |
| `skipReturnEarlyCheck?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

#### Returns

`boolean`

#### Defined in

[packages/formula/src/grammar/util.ts:149](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L149)

---

### <a id="splitdefinition$" name="splitdefinition$"></a> splitDefinition$

▸ **splitDefinition$**(`definition$`): [definition: string, position: number]

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `definition$` | `string` |

#### Returns

[definition: string, position: number]

#### Defined in

[packages/formula/src/tests/testHelper.ts:306](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testHelper.ts#L306)

---

### <a id="spreadsheet2attrs" name="spreadsheet2attrs"></a> spreadsheet2attrs

▸ **spreadsheet2attrs**(`spreadsheet`): [`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Parameters

| Name          | Type                                               |
| :------------ | :------------------------------------------------- |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |

#### Returns

[`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Defined in

[packages/formula/src/grammar/convert.ts:39](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L39)

---

### <a id="spreadsheet2codefragment" name="spreadsheet2codefragment"></a> spreadsheet2codeFragment

▸ **spreadsheet2codeFragment**(`spreadsheet`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name          | Type                                               |
| :------------ | :------------------------------------------------- |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |
| `pageId`      | `string`                                           |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/convert.ts:142](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L142)

---

### <a id="spreadsheet2completion" name="spreadsheet2completion"></a> spreadsheet2completion

▸ **spreadsheet2completion**(`spreadsheet`, `pageId`): [`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md)

#### Parameters

| Name          | Type                                               |
| :------------ | :------------------------------------------------- |
| `spreadsheet` | [`SpreadsheetType`](interfaces/SpreadsheetType.md) |
| `pageId`      | `string`                                           |

#### Returns

[`SpreadsheetCompletion`](interfaces/SpreadsheetCompletion.md)

#### Defined in

[packages/formula/src/grammar/completer.ts:435](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L435)

---

### <a id="token2fragment" name="token2fragment"></a> token2fragment

▸ **token2fragment**(`token`, `type`, `meta?`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name    | Type                                                                                                                                                                                                                                                                                                                                                                                 |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token` | `IToken`                                                                                                                                                                                                                                                                                                                                                                             |
| `type`  | `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"` |
| `meta?` | `any`                                                                                                                                                                                                                                                                                                                                                                                |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/codeFragment.ts:45](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/codeFragment.ts#L45)

---

### <a id="tracktodo" name="tracktodo"></a> trackTodo

▸ **trackTodo**(`it`, `testCases`): `void`

#### Parameters

| Name        | Type                                                   |
| :---------- | :----------------------------------------------------- |
| `it`        | `It`                                                   |
| `testCases` | { `jestTitle`: `string` ; `todoMessage?`: `string` }[] |

#### Returns

`void`

#### Defined in

[packages/formula/src/tests/testHelper.ts:288](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testHelper.ts#L288)

---

### <a id="truncatearray" name="truncatearray"></a> truncateArray

▸ **truncateArray**(`array`, `length?`): `any`[]

#### Parameters

| Name     | Type     | Default value |
| :------- | :------- | :------------ |
| `array`  | `any`[]  | `undefined`   |
| `length` | `number` | `8`           |

#### Returns

`any`[]

#### Defined in

[packages/formula/src/grammar/util.ts:169](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L169)

---

### <a id="truncatestring" name="truncatestring"></a> truncateString

▸ **truncateString**(`str`, `length?`): `string`

#### Parameters

| Name     | Type     | Default value |
| :------- | :------- | :------------ |
| `str`    | `string` | `undefined`   |
| `length` | `number` | `20`          |

#### Returns

`string`

#### Defined in

[packages/formula/src/grammar/util.ts:162](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/util.ts#L162)

---

### <a id="variable2attrs" name="variable2attrs"></a> variable2attrs

▸ **variable2attrs**(`variable`): [`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Parameters

| Name       | Type                                                   |
| :--------- | :----------------------------------------------------- |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |

#### Returns

[`CodeFragmentAttrs`](README.md#codefragmentattrs)

#### Defined in

[packages/formula/src/grammar/convert.ts:31](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L31)

---

### <a id="variable2codefragment" name="variable2codefragment"></a> variable2codeFragment

▸ **variable2codeFragment**(`variable`, `pageId`): [`CodeFragment`](README.md#codefragment)

#### Parameters

| Name       | Type                                                   |
| :--------- | :----------------------------------------------------- |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |
| `pageId`   | `string`                                               |

#### Returns

[`CodeFragment`](README.md#codefragment)

#### Defined in

[packages/formula/src/grammar/convert.ts:131](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L131)

---

### <a id="variable2completion" name="variable2completion"></a> variable2completion

▸ **variable2completion**(`variable`, `pageId`): [`VariableCompletion`](interfaces/VariableCompletion.md)

#### Parameters

| Name       | Type                                                   |
| :--------- | :----------------------------------------------------- |
| `variable` | [`VariableInterface`](interfaces/VariableInterface.md) |
| `pageId`   | `string`                                               |

#### Returns

[`VariableCompletion`](interfaces/VariableCompletion.md)

#### Defined in

[packages/formula/src/grammar/completer.ts:494](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/completer.ts#L494)

---

### <a id="variablekey-1" name="variablekey-1"></a> variableKey

▸ **variableKey**(`namespaceId`, `variableId`): \`#${string}.${string}\`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `namespaceId` | `string` |
| `variableId`  | `string` |

#### Returns

\`#${string}.${string}\`

#### Defined in

[packages/formula/src/grammar/convert.ts:15](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/convert.ts#L15)
