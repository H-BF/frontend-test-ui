import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Card, Table, Result, Spin, Empty } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TitleWithNoTopMargin, Spacer } from 'components'
import { getTestInfos } from 'api/barracudaRequest'
import { ITEMS_PER_PAGE } from 'constants/Barracuda'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TTestInfo } from 'localTypes/Barracuda'
import { Styled } from './styled'

type TBarracudaTestInfoListProps = {
  id: string
}

type TColumn = TTestInfo & {
  key: string
}

export const BarracudaTestInfoList: FC<TBarracudaTestInfoListProps> = ({ id }) => {
  const [testInfos, setTestInfos] = useState<TTestInfo[]>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    getTestInfos(id)
      .then(({ data }) => {
        setIsLoading(false)
        setTestInfos(data.testsInfo)
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
      title: 'UUID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 150,
      render: (_, { uuid }) => <a onClick={() => history.push(`/barracuda/test-result/${uuid}`)}>{uuid}</a>,
    },
    {
      title: 'Launch UUID',
      dataIndex: 'launch_uuid',
      key: 'launch_uuid',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
  ]

  return (
    <Card>
      <TitleWithNoTopMargin level={2}>Test Infos</TitleWithNoTopMargin>
      <Spacer $space={15} $samespace />
      {!testInfos.length && !error && !isLoading && <Empty />}
      {testInfos.length > 0 && (
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
          dataSource={testInfos.map(row => ({ ...row, key: row.uuid }))}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />
      )}
    </Card>
  )
}
