/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { useHistory } from 'react-router-dom'
import { Card, Table, Result, Spin, Empty } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TitleWithNoTopMargin, Spacer } from 'components'
import { getTestResults } from 'api/barracudaRequest'
import { ITEMS_PER_PAGE } from 'constants/Barracuda'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TTestResult } from 'localTypes/Barracuda'
import { Status } from './atoms'
import { Styled } from './styled'

type TBarracudaTestResultListProps = {
  id: string
}

type TColumn = TTestResult & {
  key: string
}

export const BarracudaTestResultList: FC<TBarracudaTestResultListProps> = ({ id }) => {
  const [testResults, setTestResults] = useState<TTestResult[]>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    getTestResults(id)
      .then(({ data }) => {
        setIsLoading(false)
        setTestResults(data.testsResult)
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

  const columns: ColumnsType<TColumn> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (_, { status }) => <Status status={status} />,
    },
    {
      title: 'UUID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 150,
      render: (_, { uuid }) => <a onClick={() => history.push(`/barracuda/diff-result/${uuid}`)}>{uuid}</a>,
    },
    {
      title: 'Test Info UUID',
      dataIndex: 'tests_info_uuid',
      key: 'tests_info_uuid',
      width: 150,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
    },
  ]

  return (
    <Card>
      <TitleWithNoTopMargin level={2}>Barracuda Test Results</TitleWithNoTopMargin>
      <Spacer $space={15} $samespace />
      {!testResults.length && !error && !isLoading && <Empty />}
      {testResults.length > 0 && (
        <Table
          pagination={{
            position: ['bottomCenter'],
            showQuickJumper: {
              goButton: <Styled.ButtonWithMarginLeft size="small">Go</Styled.ButtonWithMarginLeft>,
            },
            showSizeChanger: false,
            defaultPageSize: ITEMS_PER_PAGE,
            hideOnSinglePage: true,
          }}
          dataSource={testResults.map(row => ({ ...row, key: row.uuid }))}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />
      )}
    </Card>
  )
}
