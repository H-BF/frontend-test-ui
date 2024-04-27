import React, { FC, useState, useEffect } from 'react'
import { Tag, Space, Tooltip } from 'antd'
import { getLaunchError } from 'api/barracudaRequest'
import { getStatusColor } from './utils'

type TStatusProps = {
  uuid: string
  status: string
}

export const Status: FC<TStatusProps> = ({ uuid, status }) => {
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (status === 'error') {
      getLaunchError(uuid).then(data => {
        setErrorText(data.data.launchError[0].error_msg)
      })
    }
  }, [uuid, status])

  return (
    <Space direction="vertical">
      <Tooltip title={errorText}>
        <Tag color={getStatusColor(status)} key={status}>
          {status.toUpperCase()}
        </Tag>
      </Tooltip>
    </Space>
  )
}
