import React, { FC, useState, useEffect, Fragment } from 'react'
import { Empty, Result, Spin, Card, Typography } from 'antd'
import { AxiosError } from 'axios'
import { TitleWithNoTopMargin, Spacer, UUID, Assertion } from 'components'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TExecution, TAssertion } from 'localTypes/APIExecutions'
import { getExecutionData, getAssertionsData } from 'api/apiExecutionsRequest'

type TExecutionInfoProps = {
  id: string
  statusFilter: string[]
}

export const ExecutionInfo: FC<TExecutionInfoProps> = ({ id, statusFilter }) => {
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [execution, setExecution] = useState<TExecution>()
  const [assertions, setAssertions] = useState<TAssertion[]>([])
  const [filteredAssertions, setFilteredAssertions] = useState<TAssertion[]>([])

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    setExecution(undefined)
    setAssertions([])

    getExecutionData(id)
      .then(({ data }) => {
        setExecution(data)
        getAssertionsData(data.uuid).then(({ data }) => {
          setAssertions(data)
          setFilteredAssertions(data)
        })
        setIsLoading(false)
      })
      .catch((error: AxiosError<TRequestErrorData>) => {
        setIsLoading(false)
        if (error.response) {
          setError({ status: error.response.status, data: error.response.data })
        } else if (error.status) {
          setError({ status: error.status })
        } else {
          setError({ status: 'Error while fetching' })
        }
      })
  }, [id])

  useEffect(() => {
    if (assertions) {
      if (statusFilter.length === 1) {
        setFilteredAssertions(assertions.filter(({ status }) => status === statusFilter[0]))
      } else {
        setFilteredAssertions(assertions)
      }
    }
  }, [id, assertions, statusFilter])

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if (!execution && !error && !isLoading) {
    return <Empty />
  }

  if (execution) {
    return (
      <Card>
        <TitleWithNoTopMargin level={2}>{execution.name}</TitleWithNoTopMargin> <UUID text={execution.uuid} />
        <Typography.Title level={3}>Assertions</Typography.Title>
        {filteredAssertions && (
          <>
            <Spacer $space={15} $samespace />
            {filteredAssertions.map((assertion, i) => (
              <Fragment key={assertion.uuid}>
                <Assertion {...assertion} isLink />
                {i + 1 < assertions.length && <Spacer $space={15} $samespace />}
              </Fragment>
            ))}
          </>
        )}
      </Card>
    )
  }

  return null
}
