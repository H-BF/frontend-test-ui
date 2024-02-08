import React, { FC, Fragment, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Empty, Result, Spin, Card, Typography, Badge } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Spacer, UUID, Assertion, URIBlock, RequestResponseBlock } from 'components'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { getAssertionsData, getRequestData, getResponseData, getJsonSchemaData } from 'api/apiExecutionsRequest'
import { TAssertion, TExecution, TResponse, TRequest, TJSONSchema } from 'localTypes/APIExecutions'
import { findElementByStatusAndNameInAssertionsArray } from './utils'
import { Styled } from './styled'

type TExecutionInfoPairProps = {
  executionFirst: TExecution
  executionSecond: TExecution
  index: number
  isCollapsed: boolean
  onToggleCollapse: (index: number) => void
}

export const ExecutionInfoPair: FC<TExecutionInfoPairProps> = ({
  executionFirst,
  executionSecond,
  index,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assertionsFirst, setAssertionsFirst] = useState<TAssertion[]>()
  const [filteredAssertionsFirst, setFilteredAssertionsFirst] = useState<TAssertion[]>()
  const [requestFirst, setRequestFirst] = useState<TRequest>()
  const [responseFirst, setResponseFirst] = useState<TResponse>()
  const [jsonSchemaDataFirst, setJsonSchemaDataFirst] = useState<TJSONSchema>()
  const [assertionsSecond, setAssertionsSecond] = useState<TAssertion[]>()
  const [filteredAssertionsSecond, setFilteredAssertionsSecond] = useState<TAssertion[]>()
  const [requestSecond, setRequestSecond] = useState<TRequest>()
  const [responseSecond, setResponseSecond] = useState<TResponse>()
  const [jsonSchemaDataSecond, setJsonSchemaDataSecond] = useState<TJSONSchema>()

  useEffect(() => {
    setIsLoading(true)
    setAssertionsFirst(undefined)
    setRequestFirst(undefined)
    setResponseFirst(undefined)
    setJsonSchemaDataFirst(undefined)
    setAssertionsSecond(undefined)
    setRequestSecond(undefined)
    setResponseSecond(undefined)
    setJsonSchemaDataSecond(undefined)
    Promise.all([
      getAssertionsData(executionFirst.uuid).then(({ data }) => {
        setAssertionsFirst(data)
        data.forEach(assertion => {
          if (assertion.json_schema) {
            getJsonSchemaData(assertion.json_schema).then(({ data }) => {
              setJsonSchemaDataFirst(data)
            })
          }
        })
      }),
      getRequestData(executionFirst.request_uuid).then(({ data }) => {
        setRequestFirst(data)
      }),
      getResponseData(executionFirst.response_uuid).then(({ data }) => {
        setResponseFirst(data)
      }),
      getAssertionsData(executionSecond.uuid).then(({ data }) => {
        setAssertionsSecond(data)
        data.forEach(assertion => {
          if (assertion.json_schema) {
            getJsonSchemaData(assertion.json_schema).then(({ data }) => {
              setJsonSchemaDataSecond(data)
            })
          }
        })
      }),
      getRequestData(executionSecond.request_uuid).then(({ data }) => {
        setRequestSecond(data)
      }),
      getResponseData(executionSecond.response_uuid).then(({ data }) => {
        setResponseSecond(data)
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
  }, [executionFirst, executionSecond])

  useEffect(() => {
    if (assertionsFirst && assertionsSecond) {
      const newAssertionsFirst = [...assertionsFirst]
      const newAssertionsSecond = [...assertionsSecond]
      setFilteredAssertionsFirst(
        newAssertionsFirst.filter(el => !findElementByStatusAndNameInAssertionsArray(el, assertionsSecond)),
      )
      setFilteredAssertionsSecond(
        newAssertionsSecond.filter(el => !findElementByStatusAndNameInAssertionsArray(el, assertionsFirst)),
      )
    }
  }, [assertionsFirst, assertionsSecond])

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if (
    (!assertionsFirst || assertionsFirst?.length === 0 || !assertionsSecond || assertionsSecond?.length === 0) &&
    !error &&
    !isLoading
  ) {
    return <Empty />
  }

  if (assertionsFirst && assertionsSecond && requestFirst && requestSecond && responseFirst && responseSecond) {
    return (
      <>
        <Card>
          <Styled.Controls onClick={() => onToggleCollapse(index)}>
            <Styled.TitleWithNoMargin level={2}>{executionFirst.name}</Styled.TitleWithNoMargin>
            <Styled.Centered>
              <Badge
                count={filteredAssertionsFirst?.filter(({ status }) => status === 'pass').length}
                style={{ backgroundColor: '#52c41a' }}
              />
              <Badge count={filteredAssertionsFirst?.filter(({ status }) => status === 'fail').length} />
            </Styled.Centered>
            <Styled.Centered>
              {isCollapsed && <DownOutlined />}
              {!isCollapsed && <UpOutlined />}
            </Styled.Centered>
          </Styled.Controls>
          {!isCollapsed && (
            <>
              <UUID text={executionFirst.uuid} />
              <Typography.Title level={3}>Method</Typography.Title>
              <URIBlock
                method={requestFirst.method}
                url={requestFirst.url}
                status={responseFirst.status}
                code={responseFirst.code}
              />
              <Typography.Title level={3}>Assertions</Typography.Title>
              <Spacer $space={15} $samespace />
              <Styled.AssertionsBlock>
                {filteredAssertionsFirst?.map((assertion, index) => (
                  <Fragment key={assertion.uuid}>
                    <Assertion {...assertion} />
                    {index + 1 < assertionsFirst.length && <Spacer $space={15} $samespace />}
                  </Fragment>
                ))}
              </Styled.AssertionsBlock>
              <RequestResponseBlock
                request={requestFirst}
                response={responseFirst}
                jsonSchema={jsonSchemaDataFirst?.json_schema}
                isVertical
              />
            </>
          )}
        </Card>
        <Card>
          <Styled.Controls onClick={() => onToggleCollapse(index)}>
            <Styled.TitleWithNoMargin level={2}>{executionSecond.name}</Styled.TitleWithNoMargin>
            <Styled.Centered>
              <Badge
                count={filteredAssertionsSecond?.filter(({ status }) => status === 'pass').length}
                style={{ backgroundColor: '#52c41a' }}
              />
              <Badge count={filteredAssertionsSecond?.filter(({ status }) => status === 'fail').length} />
            </Styled.Centered>
            <Styled.Centered>
              {isCollapsed && <DownOutlined />}
              {!isCollapsed && <UpOutlined />}
            </Styled.Centered>
          </Styled.Controls>
          {!isCollapsed && (
            <>
              <UUID text={executionSecond.uuid} />
              <Typography.Title level={3}>Method</Typography.Title>
              <URIBlock
                method={requestSecond.method}
                url={requestSecond.url}
                status={responseSecond.status}
                code={responseSecond.code}
              />
              <Typography.Title level={3}>Assertions</Typography.Title>
              <Spacer $space={15} $samespace />
              <Styled.AssertionsBlock>
                {filteredAssertionsSecond?.map((assertion, index) => (
                  <Fragment key={assertion.uuid}>
                    <Assertion {...assertion} />
                    {index + 1 < assertionsSecond.length && <Spacer $space={15} $samespace />}
                  </Fragment>
                ))}
              </Styled.AssertionsBlock>
              <RequestResponseBlock
                request={requestSecond}
                response={responseSecond}
                jsonSchema={jsonSchemaDataSecond?.json_schema}
                isVertical
              />
            </>
          )}
        </Card>
      </>
    )
  }

  return null
}
