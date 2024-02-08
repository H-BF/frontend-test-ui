import { TExecution } from 'localTypes/APIExecutions'

export type TExecutionComparisonResult = {
  common: (TExecution & {
    isDifferent?: boolean
  })[]
  uncommon: (TExecution | undefined)[]
}

export type TResult = {
  first: TExecutionComparisonResult
  second: TExecutionComparisonResult
}
