/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Card, Result, Spin, Empty, Typography } from 'antd'
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
    <>
      <TitleWithNoTopMargin level={2}>Barracuda Test Result: diff view</TitleWithNoTopMargin>
      <Card>
        {!testResult && !error && !isLoading && <Empty />}
        {testResult && (
          <>
            <Typography.Text type="secondary">IP: </Typography.Text>
            {testResult.ip}
            <Spacer $space={10} $samespace />
            <Typography.Text type="secondary">Status: </Typography.Text>
            {testResult.status}
          </>
        )}
      </Card>
      <Spacer $space={25} $samespace />
      {testResult && (
        <Card>
          <div>
            <EnhancedDiff
              reference={JSON.stringify(testResult.referense, null, 2)}
              reseached={JSON.stringify(testResult.reseached, null, 2) + 'test'}
            />
          </div>
        </Card>
      )}
    </>
  )
}
