/* eslint-disable camelcase */
import React, { FC } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import { TLaunch } from 'localTypes/LaunchesBlock'
import { Status } from '../../atoms'
import { Styled } from './styled'

type TLaunchesTableProps = {
  data: TLaunch[]
  onRowSelect: (rows: React.Key, selected: boolean) => void
  selectedRows: React.Key[]
  type?: string
}

type TColumn = TLaunch & {
  key: string
}

export const LaunchesTable: FC<TLaunchesTableProps> = ({ data, onRowSelect, selectedRows, type = 'api' }) => {
  const dataSource = data.map(row => ({ ...row, key: row.uuid }))
  const columns: ColumnsType<TColumn> = [
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 70,
      render: (_, { status, uuid }) => <Status uuid={uuid} status={status} type={type} />,
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
    },
    {
      title: 'job',
      dataIndex: 'job',
      key: 'job',
      width: 70,
    },
    {
      title: 'src branch',
      dataIndex: 'src_branch',
      key: 'src_branch',
      width: 150,
    },
    {
      title: 'commit',
      dataIndex: 'commit',
      key: 'commit',
      width: 150,
    },
    {
      title: 'fail count',
      dataIndex: 'fail_count',
      key: 'fail_count',
      width: 150,
      render: (_, { fail_count }) => <Styled.FailCount $quantity={fail_count}>{fail_count}</Styled.FailCount>,
    },
    {
      title: 'pass count',
      dataIndex: 'pass_count',
      key: 'pass_count',
      width: 150,
    },
    {
      title: 'duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 150,
    },
    {
      title: 'tag',
      dataIndex: 'tag',
      key: 'tag',
      width: 150,
    },
  ]

  const rowSelection: TableRowSelection<TColumn> | undefined =
    type === 'api'
      ? {
          type: 'checkbox',
          onSelect: (record: TColumn, selected: boolean) => {
            onRowSelect(record.key, selected)
          },
          getCheckboxProps: (record: TColumn) => ({
            disabled: selectedRows.length > 1 && !selectedRows.includes(record.uuid),
          }),
          selectedRowKeys: selectedRows,
          hideSelectAll: true,
        }
      : undefined

  return (
    <Table
      rowSelection={rowSelection}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: 'max-content' }}
    />
  )
}
