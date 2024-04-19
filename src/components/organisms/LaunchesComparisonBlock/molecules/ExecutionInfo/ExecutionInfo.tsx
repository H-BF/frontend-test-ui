import React, { FC, Fragment, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Empty, Result, Card, Typography, Badge } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Spacer, UUID, Assertion, URIBlock, RequestResponseBlock, CenteredLoader } from 'components'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { getAssertionsData, getRequestData, getResponseData, getJsonSchemaData } from 'api/apiExecutionsRequest'
import { TAssertion, TExecution, TResponse, TRequest, TJSONSchema } from 'localTypes/APIExecutions'
import { Styled } from './styled'

type TExecutionInfoProps = {
  execution: TExecution
  index: number
  isCollapsed: boolean
  onToggleCollapse: (index: number) => void
}

export const ExecutionInfo: FC<TExecutionInfoProps> = ({ execution, index, isCollapsed, onToggleCollapse }) => {
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assertions, setAssertions] = useState<TAssertion[]>()
  const [request, setRequest] = useState<TRequest>()
  const [response, setResponse] = useState<TResponse>()
  const [jsonSchemaData, setJsonSchemaData] = useState<TJSONSchema>()

  useEffect(() => {
    setIsLoading(true)
    setAssertions(undefined)
    setRequest(undefined)
    setResponse(undefined)
    setJsonSchemaData(undefined)
    Promise.all([
      getAssertionsData(execution.uuid).then(({ data }) => {
        setAssertions(data)
        data.forEach(assertion => {
          if (assertion.json_schema) {
            getJsonSchemaData(assertion.json_schema).then(({ data }) => {
              setJsonSchemaData(data)
            })
          }
        })
      }),
      getRequestData(execution.request_uuid).then(({ data }) => {
        setRequest(data)
      }),
      getResponseData(execution.response_uuid).then(({ data }) => {
        setResponse(data)
      }),
    ])
      .then(() => setIsLoading(false))
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
  }, [execution])

  if (isLoading) {
    return <CenteredLoader />
  }

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if ((!assertions || assertions?.length === 0) && !error && !isLoading) {
    return <Empty />
  }

  if (assertions && request && response) {
    return (
      <Card>
        <Styled.Controls onClick={() => onToggleCollapse(index)}>
          <Styled.TitleWithNoMargin level={2}>{execution.name}</Styled.TitleWithNoMargin>
          <Styled.Centered>
            <Badge count={execution.pass_count} style={{ backgroundColor: '#52c41a' }} />
            <Badge count={execution.fail_count} />
          </Styled.Centered>
          <Styled.Centered>
            {isCollapsed && <DownOutlined />}
            {!isCollapsed && <UpOutlined />}
          </Styled.Centered>
        </Styled.Controls>
        {!isCollapsed && (
          <>
            <UUID text={execution.uuid} />
            <Typography.Title level={3}>Method</Typography.Title>
            <URIBlock method={request.method} url={request.url} status={response.status} code={response.code} />
            <Typography.Title level={3}>Assertions</Typography.Title>
            <Spacer $space={15} $samespace />
            <Styled.AssertionsBlock>
              {assertions.map((assertion, index) => (
                <Fragment key={assertion.uuid}>
                  <Assertion {...assertion} />
                  {index + 1 < assertions.length && <Spacer $space={15} $samespace />}
                </Fragment>
              ))}
            </Styled.AssertionsBlock>
            <RequestResponseBlock
              request={request}
              response={response}
              jsonSchema={jsonSchemaData?.json_schema}
              isVertical
            />
          </>
        )}
      </Card>
    )
  }

  return null
}
