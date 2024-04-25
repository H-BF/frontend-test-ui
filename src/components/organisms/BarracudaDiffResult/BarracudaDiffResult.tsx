/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Card, Result, Spin, Empty } from 'antd'
import { TitleWithNoTopMargin, Spacer } from 'components'
import { getTestResultByUuid } from 'api/barracudaRequest'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TTestResult } from 'localTypes/Barracuda'
import { EnhancedDiff } from './molecules'

type TBarracudaDiffResultProps = {
  id: string
}

export const BarracudaDiffResult: FC<TBarracudaDiffResultProps> = ({ id }) => {
  const [testResult, setTestResult] = useState<TTestResult>()
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    getTestResultByUuid(id)
      .then(({ data }) => {
        setIsLoading(false)
        setTestResult(data.testsResult[0])
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

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <Card>
      <TitleWithNoTopMargin level={2}>Test Results</TitleWithNoTopMargin>
      <Spacer $space={15} $samespace />
      {!testResult && !error && !isLoading && <Empty />}
      {testResult && (
        <div>
          {testResult.uuid}
          <br />
          <EnhancedDiff
            reference={JSON.stringify(testResult.referense, null, 2)}
            reseached={JSON.stringify(testResult.reseached, null, 2) + 'test'}
          />
        </div>
      )}
    </Card>
  )
}
