import React, { FC } from 'react'
import { Typography, message } from 'antd'
import { Styled } from './styled'

type TUUIDProps = {
  text: string
}

export const UUID: FC<TUUIDProps> = ({ text }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const openNotificationWithIcon = () => {
    messageApi.info('UUID Copied')
  }

  return (
    <>
      {contextHolder}
      <Styled.ResetedButton
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(text)
          openNotificationWithIcon()
        }}
      >
        <Typography.Text type="secondary">uuid: </Typography.Text>
        {text}
      </Styled.ResetedButton>
    </>
  )
}
