import { TExecution } from 'localTypes/APIExecutions'
import { TExecutionComparisonResult, TResult } from './types'

const findIndexesByNameInExecutionArray = (str: string, arr: TExecution[]): number[] => {
  const indexes: number[] = []
  arr.forEach(({ name }, index) => {
    if (name === str) {
      indexes.push(index)
    }
  })
  return indexes
}

const isExecutionValuesEqual = (executionOne: TExecution, executionTwo: TExecution): boolean => {
  return executionOne.pass_count === executionTwo.pass_count && executionOne.fail_count === executionTwo.fail_count
}

const getCommonAndUncommonExecutions = (
  executions: TExecution[],
  executionComparedWith: TExecution[],
): TExecutionComparisonResult => {
  const result: TExecutionComparisonResult = {
    common: [],
    uncommon: [],
  }

  executions.forEach(execution => {
    const elIndexesInAnotherArr = findIndexesByNameInExecutionArray(execution.name, executionComparedWith)
    if (elIndexesInAnotherArr.length === 0) {
      result.uncommon.push(execution)
    } else {
      const isDifferent = !elIndexesInAnotherArr
        .map(index => isExecutionValuesEqual(execution, executionComparedWith[index]))
        .includes(true)
      result.common.push({ ...execution, isDifferent })
    }
  })

  return result
}

const compareExecutions = (executionsFirst: TExecution[], executionsSecond: TExecution[]): TResult => {
  const sortedExecutionsFirst = executionsFirst.sort((a, b) => a.name.localeCompare(b.name))
  const sortedExecutionsSecond = executionsSecond.sort((a, b) => a.name.localeCompare(b.name))
  return {
    first: getCommonAndUncommonExecutions(sortedExecutionsFirst, sortedExecutionsSecond),
    second: getCommonAndUncommonExecutions(sortedExecutionsSecond, sortedExecutionsFirst),
  }
}

const hideEqual = (data: TResult): TResult => {
  return {
    first: { ...data.first, common: data.first.common.filter(({ isDifferent }) => isDifferent) },
    second: { ...data.second, common: data.second.common.filter(({ isDifferent }) => isDifferent) },
  }
}

const mergeResultsStriped = (data: TResult): TExecutionComparisonResult => {
  const result: TExecutionComparisonResult = {
    common: [],
    uncommon: [],
  }
  data.first.common.forEach((firstEl, index) => {
    result.common.push(firstEl, data.second.common[index])
  })
  data.first.uncommon.forEach(el => result.uncommon.push(el, undefined))
  data.second.uncommon.forEach(el => result.uncommon.push(undefined, el))

  return result
}

export const prepareData = (
  executionsFirst: TExecution[],
  executionsSecond: TExecution[],
): TExecutionComparisonResult => mergeResultsStriped(hideEqual(compareExecutions(executionsFirst, executionsSecond)))
