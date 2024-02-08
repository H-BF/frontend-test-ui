import React, { FC, useState, useEffect, ReactElement } from 'react'
import { Typography, Card } from 'antd'
import { TExecution } from 'localTypes/APIExecutions'
import { ExecutionInfoPair, ExecutionInfo } from '../../molecules'
import { TExecutionComparisonResult } from './types'
import { prepareData } from './utils'
import { Styled } from './styled'

type TExecutionComparisonProps = {
  executionsFirst: TExecution[]
  executionsSecond: TExecution[]
}

export const ExecutionComparison: FC<TExecutionComparisonProps> = ({ executionsFirst, executionsSecond }) => {
  const [data, setData] = useState<TExecutionComparisonResult>()
  const [collapsed, setCollapsed] = useState<{ common: boolean[]; uncommon: boolean[] }>({ common: [], uncommon: [] })

  useEffect(() => {
    const result = prepareData(executionsFirst, executionsSecond)
    setData(result)
    setCollapsed({
      common: Array(result.common.length).fill(true),
      uncommon: Array(result.uncommon.length).fill(true),
    })
  }, [executionsFirst, executionsSecond])

  const toggleCollapse = (index: number, type: keyof typeof collapsed): void => {
    const result = { ...collapsed }
    result[type][index] = !result[type][index]
    const pairIndex = index % 2 === 0 ? index + 1 : index - 1
    result[type][pairIndex] = !result[type][pairIndex]
    setCollapsed(result)
  }

  if (data) {
    return (
      <div>
        {data.common.length > 0 && (
          <>
            <Typography.Title level={2}>Common executions difference</Typography.Title>
            <Styled.Grid>
              {data.common.reduce<ReactElement[]>((accumulator, _, currentIndex, array) => {
                if (currentIndex % 2 === 0) {
                  accumulator.push(
                    <ExecutionInfoPair
                      key={array[currentIndex].uuid}
                      index={currentIndex}
                      isCollapsed={collapsed.common[currentIndex]}
                      onToggleCollapse={index => toggleCollapse(index, 'common')}
                      executionFirst={array[currentIndex]}
                      executionSecond={array[currentIndex + 1]}
                    />,
                  )
                }
                return accumulator
              }, [])}
            </Styled.Grid>
          </>
        )}
        {data.uncommon.length > 0 && (
          <>
            <Typography.Title level={2}>Uncommon executions</Typography.Title>
            <Styled.Grid>
              {data.uncommon.map((execution, index) => {
                if (execution) {
                  return (
                    <ExecutionInfo
                      key={execution.uuid}
                      index={index}
                      isCollapsed={collapsed.uncommon[index]}
                      onToggleCollapse={index => toggleCollapse(index, 'uncommon')}
                      execution={execution}
                    />
                  )
                }
                return (
                  <Card key="unknown">
                    <Styled.TitleWithNoMargin level={2}>No such assertion</Styled.TitleWithNoMargin>
                  </Card>
                )
              })}
            </Styled.Grid>
          </>
        )}
      </div>
    )
  }

  return null
}
