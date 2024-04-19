import React, { FC } from 'react'
import { Spin } from 'antd'
import { Styled } from './styled'

export const CenteredLoader: FC = () => (
  <Styled.Container>
    <Spin />
  </Styled.Container>
)
