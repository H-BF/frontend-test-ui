/* eslint-disable camelcase */
import React, { FC, useState, MouseEvent } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Card, Typography, Divider } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { TAssertion } from 'localTypes/APIExecutions'
import { Spacer, UUID } from 'components'
import { getStatusColor } from './utils'
import { Styled } from './styled'
import { JSCONSchema } from '../JSONSchema'

type TAssertionProps = {
  isLink?: boolean
} & TAssertion

export const Assertion: FC<TAssertionProps> = ({ uuid, name, error_message, status, json_schema, isLink }) => {
  const location = useLocation()
  const history = useHistory()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(status === 'pass')

  const toggleCollapse = (event: MouseEvent) => {
    setIsCollapsed(!isCollapsed)
    event.stopPropagation()
  }

  return (
    <Card>
      <Styled.Header
        onClick={() => (isLink ? history.push(location.pathname + '/' + uuid) : setIsCollapsed(!isCollapsed))}
      >
        <Styled.ValidationTag color={getStatusColor(status)} key={status}>
          {status.toUpperCase()}
        </Styled.ValidationTag>
        <Styled.TitleWithNoMargin level={4}>{name}</Styled.TitleWithNoMargin>
        {!isCollapsed && <UpOutlined onClick={e => toggleCollapse(e)} />}
        {isCollapsed && <DownOutlined onClick={e => toggleCollapse(e)} />}
      </Styled.Header>
      {!isCollapsed && (
        <>
          <Divider />
          <UUID text={uuid} />
          {error_message && (
            <>
              <Spacer $space={15} $samespace />
              <Styled.Message>
                <Typography.Text type="secondary">Message: </Typography.Text>
                {error_message}
              </Styled.Message>
            </>
          )}
          {json_schema && (
            <>
              <Spacer $space={15} $samespace />
              <JSCONSchema id={json_schema} />
            </>
          )}
        </>
      )}
    </Card>
  )
}
