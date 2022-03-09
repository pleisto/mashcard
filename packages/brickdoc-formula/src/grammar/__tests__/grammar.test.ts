/* eslint-disable jest/no-conditional-expect */
import { parse, innerInterpret } from '../core'
import { FunctionContext, ParseErrorType, VariableMetadata } from '../../types'
import { FormulaContext } from '../../context/context'
import { quickInsert } from '../testHelper'

interface TestCase {
  input: string
  value?: any
  label?: string
  parseErrorType?: ParseErrorType
  errorMessage?: string
  debug?: true
}

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const barVariableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const testCases: TestCase[] = [
  {
    input: '=1+1',
    value: 2
  },
  {
    input: '=null',
    value: null
  },
  {
    input: '= -0.123%',
    label: 'caret and sign',
    value: -0.00123
  },
  {
    input: '= ( 3 + 4 ) * 5 - 2',
    value: 33
  },
  {
    input: '=123123123123123123123',
    label: 'js precision',
    value: 123123123123123130000
  },
  {
    input: '= 1 + 1 - 1',
    value: 1
  },
  {
    input: '= 1 + 6 / 2 - 3',
    value: 1
  },
  {
    input: '= 1 + 5 / 2',
    value: 3.5
  },
  {
    input: '= 1 + 2 * 3',
    label: 'mul > add',
    value: 7
  },
  // Compare
  {
    input: '= 4 > 3',
    value: true
  },
  {
    input: '= 4 < 3',
    value: false
  },
  {
    input: '= 2 = 2',
    value: true
  },
  {
    input: '= 1 == 1',
    value: true
  },
  {
    input: '= 1 != 1',
    value: false
  },
  {
    input: '= 1 <> 2',
    value: true
  },
  {
    input: '= 1 <> "a"',
    value: true
  },
  {
    input: '= 1 > 1 = 3',
    label: 'compare chain',
    value: false
  },
  {
    input: '= 1 = 1 > 3',
    label: 'compare chain',
    value: false
  },
  {
    input: '= (1 = 1) > 3',
    label: 'compare chain',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 1 * 3 > 1 + 1',
    value: true
  },
  {
    input: '= 2 * 2 = 4',
    value: true
  },
  {
    input: '= 4 = 2 + 2',
    value: true
  },
  // Concat
  {
    input: '= "foo" & "bar"',
    value: 'foobar'
  },
  {
    input: '= "" & ""',
    value: ''
  },
  {
    input: '= 1 & "foo"',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number'
  },
  {
    input: '= "foo" & 1',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number'
  },
  // In
  {
    input: '= "foo" in "barfoobaz"',
    value: true
  },
  {
    input: '= "foo" in "barFoobaz"',
    value: true
  },
  {
    input: '= "foo" exactin "barFoobaz"',
    value: false
  },
  {
    input: '= "foo" exactin "barfoobaz"',
    value: true
  },
  {
    input: '= "foo" in 123',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string,Array,Spreadsheet,Column but got number'
  },
  {
    input: '= "foo" in',
    parseErrorType: 'syntax',
    errorMessage: 'Missing right expression'
  },
  {
    input: '= 1 in []',
    value: false
  },
  {
    input: '= false exactin "foo"',
    parseErrorType: 'syntax',
    errorMessage: 'Expected Array but got string'
  },
  {
    input: '= 1 in [1, "foo", true]',
    value: true
  },
  {
    input: '= "Foo" in [1, "foo", true, null]',
    value: true
  },
  {
    input: '= "Foo" exactin [1, "foo", true, null]',
    value: false
  },
  {
    input: '= true in [1, "foo", true, null]',
    value: true
  },
  {
    input: '= true exactin [1, "foo", true, null]',
    value: true
  },
  {
    input: '= null exactin [1, "foo", true, null]',
    value: true
  },
  {
    input: '= false exactin [1, "foo", true, null]',
    value: false
  },
  // Array
  {
    input: '=[]',
    value: []
  },
  {
    input: '=[[]]',
    value: [{ type: 'Array', subType: 'void', result: [] }]
  },
  {
    input: '=[',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[1,]',
    label: 'array edit',
    parseErrorType: 'syntax',
    errorMessage: 'Expression count mismatch'
  },
  {
    input: '=[1,2',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=[2, "foo", true]',
    label: 'Array ok',
    value: [
      { type: 'number', result: 2 },
      { type: 'string', result: 'foo' },
      { type: 'boolean', result: true }
    ]
  },
  // {
  //   input: '=[2, "foo", true, null].Map(1)',
  //   label: 'Array Map',
  //   value: [
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 },
  //     { type: 'number', result: 1 }
  //   ]
  // },
  // {
  //   input: '=[2, "foo", true, null].Map($1)',
  //   label: 'Array Map $1',
  //   value: [
  //     { type: 'number', result: 2 },
  //     { type: 'string', result: 'foo' },
  //     { type: 'boolean', result: true },
  //     { type: 'null', result: null }
  //   ]
  // },
  // Reference
  {
    input: `=Self`,
    value: { kind: 'self' }
  },
  {
    input: `=#${barNamespaceId}.bar`,
    value: 24
  },
  {
    input: `=#`,
    parseErrorType: 'syntax',
    errorMessage: 'Miss expression'
  },
  {
    input: `=#CurrentBlock`,
    parseErrorType: 'syntax',
    errorMessage: `Block not found: ${namespaceId}`
  },
  {
    input: `=#${barNamespaceId}.Bar`,
    label: 'variable name is case sensitive',
    parseErrorType: 'syntax',
    errorMessage: 'Variable "Bar" not found'
  },
  {
    input: `=bar`,
    parseErrorType: 'syntax',
    errorMessage: 'Unknown function bar'
  },
  {
    input: `=Untitled.bar`,
    value: 24
  },
  {
    input: `=&#${barNamespaceId}.bar`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId }
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "#"'
  },
  {
    input: `=&#${barNamespaceId}.bar.foo`,
    // value: { kind: 'variable', namespaceId: barNamespaceId, variableId: barVariableId, attribute: 'foo' }
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "#"'
  },
  {
    input: '=&Self',
    value: { kind: 'self' }
  },
  {
    input: '=&Self."foo bar"',
    value: { kind: 'self', attribute: 'foo bar' }
  },
  // Record
  {
    input: '={}',
    value: {}
  },
  {
    input: '={"foo": 1, bar: "baz", obj: {}, array: [1]}',
    value: {
      foo: { type: 'number', result: 1 },
      bar: { type: 'string', result: 'baz' },
      obj: { type: 'Record', subType: 'void', result: {} },
      array: { type: 'Array', subType: 'number', result: [{ type: 'number', result: 1 }] }
    }
  },
  {
    input: '={',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={a: }',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '={a: 1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={1: "a"}',
    parseErrorType: 'syntax',
    label: 'TODO record number as key',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '={"foo":}',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '={"fo o": 123}',
    value: { 'fo o': { type: 'number', result: 123 } }
  },
  {
    input: '={a: 1, a: []}',
    parseErrorType: 'syntax',
    errorMessage: 'Record key duplicated'
  },
  {
    input: '={a: 1, "a": 2}',
    parseErrorType: 'syntax',
    errorMessage: 'Record key duplicated'
  },
  // Number Literal
  {
    input: '=123123',
    value: 123123
  },
  {
    input: '=0',
    value: 0
  },
  {
    input: '=0.01',
    value: 0.01
  },
  {
    input: '=12.0',
    value: 12
  },
  {
    input: '=-0',
    value: -0
  },
  {
    input: '=-101',
    value: -101
  },
  // Boolean Literal
  {
    input: '=true',
    value: true
  },
  {
    input: '=false',
    value: false
  },
  {
    input: '= 4 > 3 == true',
    value: true
  },
  {
    input: '= 2 * 2 > 3 != false',
    value: true
  },
  {
    input: '= 3 = "foo"',
    value: false
  },
  // String Literal
  {
    input: '= "hello"',
    value: 'hello'
  },
  {
    input: '= "hel\'lo"',
    value: "hel'lo"
  },
  {
    input: '= "hel"lo"',
    label: 'lex error when parse "hel"lo" => parseError',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: lo'
  },
  {
    input: "= 'hello'",
    label: 'Single quote => parseError',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '= "Hello',
    label: 'ParseError without closing quote',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error: "\\"Hello"'
  },
  // **
  {
    input: '= 2 ^ 4',
    value: 16
  },
  {
    input: '= 2 ^ true',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 2^0',
    value: 1
  },
  // %
  {
    input: '= 2%',
    value: 0.02
  },
  {
    input: '=1 - (  -40%)',
    value: 1.4
  },
  {
    input: '=5100%',
    value: 51
  },
  // Combine
  {
    input: '= !true',
    value: false
  },
  {
    input: '=!not 1',
    value: true
  },
  {
    input: '= ! not ! false',
    value: true
  },
  {
    input: '= !false',
    value: true
  },
  {
    input: '=true and true',
    value: true
  },
  {
    input: '=false || true',
    value: true
  },
  {
    input: '=1 and 2',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=1 and false or 3',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=true and !2 && true',
    value: false
  },
  {
    input: '=Input.foo',
    value: 'Key foo not found'
  },
  {
    input: '=Input.bar',
    value: 'bar123'
  },
  {
    input: '=$1',
    value: 'Foo1234123'
  },
  {
    input: '=$2',
    value: 'Argument 2 not found'
  },
  // Error
  {
    input: '= 1/0',
    value: 'Division by zero'
  },
  {
    input: '= ABS(1/0)',
    value: 'Division by zero'
  },
  {
    input: '= 1/0 + 1',
    value: 'Division by zero'
  },
  {
    input: '= 3 = 1/0',
    value: 'Division by zero'
  },
  {
    input: '= IFERROR(1/0, "Foo")',
    value: 'Foo'
  },
  {
    input: '= -',
    label: 'Without number',
    parseErrorType: 'syntax',
    errorMessage: 'Missing number'
  },
  {
    input: '1+1',
    label: 'literal1',
    value: '1+1'
  },
  {
    input: '1+1 asd n,san 中文测试 asdasd',
    label: 'literal2',
    value: '1+1 asd n,san 中文测试 asdasd'
  },
  {
    input: '=1+',
    parseErrorType: 'syntax',
    label: 'TODO missing suffix expression',
    errorMessage: 'Missing right expression'
  },
  {
    input: '=(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis1',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=ABS(',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis2',
    errorMessage: 'Miss argument'
  },
  {
    input: '=ABS(1',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis3',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis4',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '=POWER(1,2',
    parseErrorType: 'syntax',
    label: 'Missing closing parenthesis5',
    errorMessage: 'Missing closing parenthesis'
  },
  {
    input: '= 1+$',
    parseErrorType: 'syntax',
    errorMessage: 'Missing right expression'
  },
  {
    input: '= 1;',
    label: 'Semicolon 1',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '= 1; 2',
    label: 'Semicolon 2',
    value: 2
  },
  {
    input: '= (1; 2+1)',
    value: 3
  },
  {
    input: '="foo" &&& 123',
    parseErrorType: 'syntax',
    label: 'TODO &&&',
    errorMessage: 'Expected boolean but got string'
  },
  {
    input: '=1**2',
    parseErrorType: 'syntax',
    errorMessage: 'Missing right expression'
  },
  // Function Call
  {
    input: '=ABS ( -1  )',
    value: 1
  },
  {
    input: '=core::ABS ( -1  )',
    value: 1
  },
  {
    input: '=ABS ()',
    parseErrorType: 'syntax',
    errorMessage: 'Miss argument'
  },
  {
    input: '=ABS(1,2)',
    parseErrorType: 'syntax',
    errorMessage: 'Argument count mismatch'
  },
  {
    input: '=AVERAGE()',
    parseErrorType: 'syntax',
    errorMessage: 'Miss argument',
    label: 'Spread operator with no argument'
  },
  {
    input: '=AVERAGE(1)',
    value: 1,
    label: 'spread operator'
  },
  {
    input: '=AVERAGE(1, 2, 3)',
    value: 2,
    label: 'spread operator'
  },
  {
    input: '=IF(true, 1+2, "2")',
    value: 3
  },
  {
    input: '=AND(true, false, false)',
    value: false
  },
  {
    input: '=OR(true)',
    value: true
  },
  {
    input: '=ABS(IF(false, -3, -4))',
    value: 4
  },
  {
    input: '=toString(1)',
    value: '1'
  },
  {
    input: '=toString("Foo")',
    value: '"Foo"'
  },
  {
    input: '=UNKNOWN ()',
    parseErrorType: 'syntax',
    errorMessage: 'Function UNKNOWN not found'
  },
  // Case insensitive
  {
    input: '=if(true, 1+2, "2")',
    label: 'Case insensitive',
    value: 3
  },
  {
    input: '=Abs(-1) + abs(1) + ABS(1)',
    value: 3
  },
  // Access
  {
    input: '=1.a',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: a'
  },
  {
    input: '=1."a"',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: "a"'
  },
  {
    input: '=true.a',
    parseErrorType: 'syntax',
    errorMessage: 'Access error'
  },
  {
    input: '={a:1}.a',
    value: 1
  },
  {
    input: '={a:1}.b',
    value: 'Key b not found'
  },
  {
    input: '=[123].b',
    value: 'Access not supported for Array'
  },
  {
    input: '={a:1}."a"',
    value: 1
  },
  {
    input: '=ERROR("Foo").result',
    value: 'Foo'
  },
  // Chain
  {
    input: '="FOO".',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '="FOO".T',
    parseErrorType: 'syntax',
    errorMessage: 'Access error'
  },
  {
    input: '="FOO".T().T()',
    value: 'FOO'
  },
  {
    input: '=(1+1).TYPE()',
    value: 'number'
  },
  {
    input: '=[1,false,"foo"].toString()',
    value: '[1, false, "foo"]'
  },
  {
    input: '="foobar".START_WITH("foo")',
    value: true
  },
  {
    input: '="foobar".START_WITH("bar")',
    value: false
  },
  {
    input: '="foo".START_WITH(123)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected string but got number',
    label: 'chain type 1'
  },
  {
    input: '=true.START_WITH("123")',
    parseErrorType: 'syntax',
    label: 'TODO chain type 2',
    errorMessage: 'Expected string but got boolean'
  },
  {
    input: '="123".LEN()',
    parseErrorType: 'syntax',
    errorMessage: 'LEN is not chainable'
  },
  // Predicate
  {
    input: '==1',
    label: 'TODO predicate ==1',
    parseErrorType: 'syntax',
    errorMessage: 'TODO mismatch token startExpression'
  },
  {
    input: '= =1',
    value: { type: 'number', result: 1 }
  },
  {
    input: '=>=3',
    value: { type: 'number', result: 3 }
  },
  {
    input: '=!="foo"',
    value: { type: 'string', result: 'foo' }
  },
  {
    input: '=>=true',
    debug: true,
    label: 'Predicate check type',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '=<>"123"',
    value: { type: 'string', result: '123' }
  },
  {
    input: '= <= (1+1)',
    value: { type: 'number', result: 2 }
  },
  // Type
  {
    input: '=null + 1',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got null'
  },
  {
    input: '=ABS ( "a" )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got string'
  },
  {
    input: '=IF(1, -3, -4)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=ABS( NOW() )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got Date'
  },
  {
    input: '=AND(1, 2)',
    parseErrorType: 'syntax',
    errorMessage: 'Expected boolean but got number'
  },
  {
    input: '=ABS ( true )',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '= 2 * (2 = 4)',
    label: 'type check',
    parseErrorType: 'syntax',
    errorMessage: 'Expected number but got boolean'
  },
  {
    input: '=1; 2; (1+3)',
    label: 'multiline ok',
    value: 4
  },
  {
    input: '=ABS(1; 2; (1+3))',
    label: 'multiline function call ok',
    value: 4
  },
  {
    input: '=1; 2; 1/0; (1+3)',
    value: 4
  },
  {
    input: '=1; 2;',
    label: 'multiline error',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;',
    label: 'multiline error 2',
    parseErrorType: 'syntax',
    errorMessage: 'Missing expression'
  },
  {
    input: '=;123',
    label: 'multiline error 3',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  // TODO List
  {
    input: '= 中文',
    label: 'TODO chinese',
    parseErrorType: 'syntax',
    errorMessage: 'Parse error:'
  },
  {
    input: '= 1a1',
    label: 'TODO 1a1',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: a1'
  },
  {
    input: '=varvarabc中文var',
    label: 'TODO chinese2',
    parseErrorType: 'syntax',
    errorMessage: 'Unknown function varvarabc'
  },
  {
    input: '= nottrue',
    label: 'TODO not is a operator',
    value: false
  },
  {
    input: '=1.',
    label: 'should error',
    value: 1
  },
  {
    input: '=1.T()',
    label: 'should success',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: T'
  },
  {
    input: '=1.START_WITH("123")',
    parseErrorType: 'syntax',
    label: 'TODO chain type 3',
    errorMessage: 'Not all input parsed: START_WITH'
  },
  {
    input: '=123.ABS()',
    parseErrorType: 'syntax',
    errorMessage: 'Not all input parsed: ABS'
  },
  // Space https://emptycharacter.com/
  {
    input: '=1 +　2　 　- 　 3',
    label: 'WhiteSpace /\\s+/',
    value: 0
  },
  {
    input: '=\u0020"space U+0020"\u0020',
    value: 'space U+0020'
  },
  {
    input: '=\u00A0"No-Break Space U+00A0"\u00A0',
    value: 'No-Break Space U+00A0'
  },
  {
    input: '=\u2000"En Quad U+2000"\u2000',
    value: 'En Quad U+2000'
  },
  {
    input: '=\u2001"Em Quad U+2001"\u2001',
    value: 'Em Quad U+2001'
  },
  {
    input: '=\u2002"En Space U+2002"\u2002',
    value: 'En Space U+2002'
  },
  {
    input: '=\u2003"Em Space U+2003"\u2003',
    value: 'Em Space U+2003'
  },
  {
    input: '=\u2004"Three-Per-Em Space U+2004"\u2004',
    value: 'Three-Per-Em Space U+2004'
  },
  {
    input: '=\u2005"Four-Per-Em Space U+2005"\u2005',
    value: 'Four-Per-Em Space U+2005'
  },
  {
    input: '=\u2006"Six-Per-Em Space U+2006"\u2006',
    value: 'Six-Per-Em Space U+2006'
  },
  {
    input: '=\u2007"Figure Space U+2007"\u2007',
    value: 'Figure Space U+2007'
  },
  {
    input: '=\u2008"Punctuation Space U+2008"\u2008',
    value: 'Punctuation Space U+2008'
  },
  {
    input: '=\u2009"Thin Space U+2009"\u2009',
    value: 'Thin Space U+2009'
  },
  {
    input: '=\u200A"Hair Space U+200A"\u200A',
    value: 'Hair Space U+200A'
  },
  {
    input: '=\u2028"Line Separator U+2028"\u2028',
    value: 'Line Separator U+2028'
  },
  {
    input: '=\u205F"Medium Mathematical Space U+205F"\u205F',
    value: 'Medium Mathematical Space U+205F'
  },
  {
    input: '=\u3000"Ideographic Space U+3000"\u3000',
    value: 'Ideographic Space U+3000'
  }
]

const formulaContext = new FormulaContext({})

const name = 'foo'
const meta: VariableMetadata = { variableId, namespaceId, name, input: '!!!', position: 0, type: 'normal' }

const ctx: FunctionContext = {
  formulaContext,
  meta,
  interpretContext: {
    ctx: { bar: { type: 'string', result: 'bar123' } },
    arguments: [{ type: 'string', result: 'Foo1234123' }]
  }
}

describe('Simple test case', () => {
  beforeAll(async () => {
    await quickInsert({
      ctx: {
        ...ctx,
        meta: {
          namespaceId: barNamespaceId,
          name: 'bar',
          variableId: barVariableId,
          input: '=24',
          position: 0,
          type: 'normal'
        }
      }
    })
  })

  testCases.forEach(({ input, label, parseErrorType, errorMessage, value, debug }) => {
    const prefix = label ? `[${label}] ` : ''
    const suffix = value !== undefined ? ` // => ${value}` : ' // => ✗'
    it(`${prefix}${input}${suffix}`, async () => {
      const newMeta = { ...meta, input }
      const parseResult = parse({ ctx: { ...ctx, meta: newMeta } })
      const {
        success,
        cst,
        kind,
        errorType,
        errorMessages,
        codeFragments,
        completions,
        input: newInput,
        inputImage,
        parseImage
      } = parseResult

      if (kind === 'literal') {
        expect(completions.length).toEqual(0)
      } else {
        expect(completions.length).not.toEqual(0)
      }

      if (label) {
        expect(codeFragments).toMatchSnapshot()
      }

      if (debug) {
        expect(cst).toMatchSnapshot()
        expect({ newInput, input, inputImage, parseImage }).toMatchSnapshot()
      }

      if (value !== undefined) {
        const variableValue = await innerInterpret({ parseResult, ctx: { ...ctx, meta: newMeta } })

        expect(errorMessages).toEqual([])

        expect(errorType).toEqual(undefined)
        expect(success).toEqual(true)

        expect(variableValue.result.result).toEqual(value)
        expect(variableValue.success).toEqual(true)
      } else if (parseErrorType) {
        expect(errorMessages[0]!.message).toContain(errorMessage)
        expect(errorType).toEqual(parseErrorType)
      } else {
        throw new Error('Unexpected error')
      }
    })
  })
})
