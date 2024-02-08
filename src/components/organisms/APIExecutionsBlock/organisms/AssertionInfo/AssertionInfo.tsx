import React, { FC, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Empty, Result, Spin, Card, Typography } from 'antd'
import { Spacer, TitleWithNoTopMargin, UUID, Assertion, URIBlock, RequestResponseBlock } from 'components'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import {
  getAssertionData,
  getExecutionData,
  getRequestData,
  getResponseData,
  getJsonSchemaData,
} from 'api/apiExecutionsRequest'
import { TAssertion, TExecution, TResponse, TRequest, TJSONSchema } from 'localTypes/APIExecutions'

type TAssertionInfoProps = {
  id: string
}

export const AssertionInfo: FC<TAssertionInfoProps> = ({ id }) => {
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assertion, setAssertion] = useState<TAssertion>()
  const [execution, setExecution] = useState<TExecution>()
  const [request, setRequest] = useState<TRequest>()
  const [response, setResponse] = useState<TResponse>()
  const [jsonSchemaData, setJsonSchemaData] = useState<TJSONSchema>()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    setAssertion(undefined)
    setExecution(undefined)
    setRequest(undefined)
    setResponse(undefined)
    setJsonSchemaData(undefined)
    getAssertionData(id)
      .then(({ data }) => {
        setAssertion(data)
        getExecutionData(data.execution_uuid).then(({ data }) => {
          setExecution(data)
          getRequestData(data.request_uuid).then(({ data }) => {
            setRequest(data)
          })
          getResponseData(data.response_uuid).then(({ data }) => {
            setResponse(data)
          })
        })
        if (data.json_schema) {
          getJsonSchemaData(data.json_schema).then(({ data }) => {
            setJsonSchemaData(data)
          })
        } else {
          setJsonSchemaData(undefined)
        }
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

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if (!assertion && !error && !isLoading) {
    return <Empty />
  }

  if (assertion && execution && request && response) {
    return (
      <Card>
        <TitleWithNoTopMargin level={2}>{execution.name}</TitleWithNoTopMargin> <UUID text={execution.uuid} />
        <Typography.Title level={3}>Method</Typography.Title>
        <URIBlock method={request.method} url={request.url} status={response.status} code={response.code} />
        <Typography.Title level={3}>Assertions</Typography.Title>
        <Spacer $space={15} $samespace />
        <Assertion {...assertion} />
        <RequestResponseBlock request={request} response={response} jsonSchema={jsonSchemaData?.json_schema} />
      </Card>
    )
  }

  return null
}
