import { mathAbs } from './abs'
import { mathInt } from './int'
import { mathLn } from './ln'
import { mathLog10 } from './log10'
import { mathPi } from './pi'
import { mathPower } from './power'
import { mathRand } from './rand'
import { mathRound } from './round'
import { mathTrunc } from './trunc'

export const CORE_MATH_FUNCTION_CLAUSES = [
  mathAbs,
  mathInt,
  mathLog10,
  mathPi,
  mathLn,
  mathPower,
  mathRand,
  mathRound,
  mathTrunc
]
