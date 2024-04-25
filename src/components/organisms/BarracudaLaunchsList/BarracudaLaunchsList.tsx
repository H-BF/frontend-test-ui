import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Card, Table, TableProps, Result, Spin, Empty, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons'
import { TitleWithNoTopMargin, Spacer } from 'components'
import { getLaunchs } from 'api/barracudaRequest'
import { ITEMS_PER_PAGE } from 'constants/Barracuda'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TLaunch } from 'localTypes/Barracuda'
import { Styled } from './styled'

type TBarracudaLaunchsListProps = {
  id?: string
}

type TColumn = TLaunch & {
  key: string
}

type OnChange = NonNullable<TableProps<TColumn>['onChange']>

type Filters = Parameters<OnChange>[1]

export const BarracudaLaunchsList: FC<TBarracudaLaunchsListProps> = ({ id }) => {
  const [launchs, setLaunchs] = useState<TLaunch[]>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchText, setSearchText] = useState('')
  const [filteredInfo, setFilteredInfo] = useState<Filters>({})
  const history = useHistory()

  useEffect(() => {
    setFilteredInfo({ uuid: id ? [id] : null })
    setSearchText(id || '')
  }, [id])

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    getLaunchs()
      .then(({ data }) => {
        setIsLoading(false)
        setLaunchs(data.launchs)
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
  }, [])

  const handleSearch = (searchText: string) => {
    setFilteredInfo({ uuid: searchText ? [searchText] : null })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: OnChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters)
  }

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
      filteredValue: filteredInfo.uuid || null,
      onFilter: (value, { uuid }) => uuid.toLowerCase().includes((value as string).toLowerCase()),
      render: (_, { uuid }) => <a onClick={() => history.push(`/barracuda/test-info/${uuid}`)}>{uuid}</a>,
    },
    {
      title: 'Test Suite',
      dataIndex: 'test_suite',
      key: 'test_suite',
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
    },
    {
      title: 'Pipeline',
      dataIndex: 'pipeline',
      key: 'pipeline',
      width: 150,
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      width: 150,
    },
    {
      title: 'Src',
      dataIndex: 'src_branch',
      key: 'src_branch',
      width: 150,
    },
    {
      title: 'Commit',
      dataIndex: 'commit',
      key: 'commit',
      width: 150,
    },
    {
      title: 'Fail',
      dataIndex: 'fail_count',
      key: 'fail_count',
      width: 150,
    },
    {
      title: 'Pass',
      dataIndex: 'pass_count',
      key: 'pass_count',
      width: 150,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 150,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
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
      <TitleWithNoTopMargin level={2}>Launchs</TitleWithNoTopMargin>
      <Spacer $space={15} $samespace />
      <Styled.FiltersContainer>
        <div>
          <Input
            allowClear
            placeholder="Filter by uuid"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onPressEnter={() => handleSearch(searchText)}
          />
        </div>
        <div>
          <Styled.ButtonWithMarginLeft
            onClick={() => handleSearch(searchText)}
            icon={<SearchOutlined />}
            type="primary"
          />
        </div>
      </Styled.FiltersContainer>
      <Spacer $space={15} $samespace />
      {!launchs.length && !error && !isLoading && <Empty />}
      {launchs.length > 0 && (
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
          dataSource={launchs.map(row => ({ ...row, key: row.uuid }))}
          columns={columns}
          scroll={{ x: 'max-content' }}
          onChange={handleChange}
        />
      )}
    </Card>
  )
}
