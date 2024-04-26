import React, { FC } from 'react'
import { Tag, Space } from 'antd'
import { getStatusColor } from './utils'

type TStatusProps = {
  status: string
}

export const Status: FC<TStatusProps> = ({ status }) => (
  <Space direction="vertical">
    <Tag color={getStatusColor(status)} key={status}>
      {status.toUpperCase()}
    </Tag>
  </Space>
)
