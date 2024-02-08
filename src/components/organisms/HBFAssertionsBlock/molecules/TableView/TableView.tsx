/* eslint-disable camelcase */
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Tooltip, message, Card, Typography, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Spacer } from 'components'
import { TAssertion } from 'localTypes/HBFAssertions'
import { ITEMS_PER_PAGE } from 'constants/HBFAssertions'
import { TColumns } from './types'
import { getStatusColor, filterColumns } from './utils'
import { ColumnFilter } from './molecules'
import { Styled } from './styled'

type TTableViewProps = {
  data: TAssertion[]
  isExtended: boolean
  setIsExtended: Dispatch<SetStateAction<boolean>>
}

export const TableView: FC<TTableViewProps> = ({ data, isExtended, setIsExtended }) => {
  const [hiddenCols, setHiddenCols] = useState<string[]>()
  const [messageApi, contextHolder] = message.useMessage()

  const dataSource = data.map(row => ({ ...row, key: row.uuid }))
  const columns: ColumnsType<TColumns> = [
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      render: (_, { status, uuid }) => (
        <Tooltip title={uuid}>
          <Styled.TagWithCursor
            color={getStatusColor(status)}
            key={status}
            onClick={() => {
              navigator.clipboard.writeText(uuid)
              messageApi.info('UUID Copied')
            }}
          >
            {status.toUpperCase()}
          </Styled.TagWithCursor>
        </Tooltip>
      ),
    },
    {
      title: 'src ip',
      dataIndex: 'src_ip',
      key: 'src_ip',
      width: 100,
    },
    {
      title: 'src port',
      dataIndex: 'src_port',
      key: 'src_port',
      width: 50,
    },
    {
      title: 'dst ip',
      dataIndex: 'dst_ip',
      key: 'dst_ip',
      width: 100,
    },
    {
      title: 'dst port',
      dataIndex: 'dst_port',
      key: 'dst_port',
      width: 50,
    },
    {
      title: 'protocol',
      dataIndex: 'protocol',
      key: 'protocol',
      width: 150,
    },
    {
      title: 'from',
      dataIndex: 'from',
      key: 'from',
      width: 150,
    },
    {
      title: 'to',
      dataIndex: 'to',
      key: 'to',
      width: 150,
    },
    {
      title: 'msg_err',
      dataIndex: 'msg_err',
      key: 'msg_err',
      width: 150,
      render: (_, { msg_err }) => <Styled.BigMessageContainer>{msg_err}</Styled.BigMessageContainer>,
    },
  ]

  return (
    <Styled.Container>
      <Card>
        <Styled.TitleContainer onClick={() => setIsExtended(!isExtended)}>
          <Typography.Title level={3}>Data Table</Typography.Title>
          <Styled.TitleIconsContainer>
            {isExtended && <UpOutlined />}
            {!isExtended && <DownOutlined />}
          </Styled.TitleIconsContainer>
        </Styled.TitleContainer>
        {isExtended && (
          <>
            <ColumnFilter onHiddenColsChange={setHiddenCols} />
            <Spacer $space={15} $samespace />
            {contextHolder}
            <Table
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                showSizeChanger: false,
                defaultPageSize: ITEMS_PER_PAGE,
              }}
              size="small"
              dataSource={dataSource}
              columns={filterColumns(columns, hiddenCols)}
              scroll={{ x: 'max-content' }}
            />
          </>
        )}
      </Card>
    </Styled.Container>
  )
}
