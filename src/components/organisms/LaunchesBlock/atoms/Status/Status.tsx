import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tag, Space, Tooltip } from 'antd'
import { getLaunchError } from 'api'
import { BASEPREFIX } from 'constants/basePrefix'
import { getStatusColor } from './utils'

type TStatusProps = {
  uuid: string
  status: string
  type?: string
}

export const Status: FC<TStatusProps> = ({ uuid, status, type = 'api' }) => {
  const { serviceId } = useParams<{ serviceId?: string }>()
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (status === 'error') {
      getLaunchError(uuid, type).then(data => {
        setErrorText(data)
      })
    }
  }, [uuid, status, type])

  return (
    <Space direction="vertical">
      <a
        href={
          type === 'api' ? `${BASEPREFIX}/${type}-launch/${serviceId}/${uuid}` : `${BASEPREFIX}/${type}-launch/${uuid}`
        }
      >
        <Tooltip title={errorText}>
          <Tag color={getStatusColor(status)} key={status}>
            {status.toUpperCase()}
          </Tag>
        </Tooltip>
      </a>
    </Space>
  )
}
