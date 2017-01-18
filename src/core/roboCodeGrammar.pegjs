/* RoboCode PEG Grammar
 * ====================
 * Assumes preprocessed program with marked line numbers and indentation to
 * avoid context-sensitiveness. For example:
 * ```
 * 1| fly()
 * 2| while color() == 'b':
 * >
 * 3| left()
 * 4| right()
 * <
 * 5| fly()
 * ```
 */

Start
  = Sequence

Sequence
  = StatementLine+

StatementLine
  = lineNumber:SOL s:Statement EOL
    { return { statement: s, location: lineNumber } }

Statement
  = CompoundStatement
  / SimpleStatement

SimpleStatement
  = action:FunctionCall
    { return { type: action } }

CompoundStatement
  = IfStatement
  / WhileStatement
  / RepeatStatement

RepeatStatement
  = "repeat" __ n:Integer ":" s:Suite
    { return { type: "repeat", count: n, suite: s } }

WhileStatement
  = "while" __ t:Test ":" s:Suite
    { return { type: "while", test: t, suite: s } }

IfStatement
  = "if" __ t:Test ":" s1:Suite "else:" s2:Suite
    { return { type: "if", tests: [t], suites: [s1, s2] } }

Suite
  = EOL INDENT Sequence DEDENT

Test
  = CompoundTest
  / SimpleTest

CompoundTest
  = left:SimpleTest __ op:BinLogicOp __ right:SimpleTest
    { return { type: op, left: left, right: right } }

SimpleTest
  = sensor:FunctionCall _ op:RelOp _ value:Value
    { return { type: sensor, op: op, value: value } }

FunctionCall
  = functionName:Identifier "()"
    { return functionName; }

Identifier
  = $([a-zA-Z_][a-zA-Z0-9_]*)

BinLogicOp
  = "and" / "or"

RelOp
  = "==" / ">=" / "<=" / "!=" / ">" / "<"

Value
  = Integer / String

Integer
  = digits:[0-9]+
    { return parseInt(digits.join(""), 10); }

String
  = "'" value:$([^']*) "'"
    { return value; }

_ "optional spaces"
  = [ \t]*

__ "mandatory spaces"
  = [ \t]+


INDENT
  = ">" EOL

DEDENT
  = "<"

SOL "start of line"
  = lineNumber:Integer "| "
    { return lineNumber }

EOL "end of line or file"
  = "\r\n"
  / "\n"
  / "\r"
  / !.
