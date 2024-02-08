import { FloatButton } from 'antd'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`

const FloatClearButton = styled(FloatButton)`
  left: 24px;
`

const FloatCompareButton = styled(FloatButton)`
  left: 94px;
`

export const Styled = {
  FloatClearButton,
  FloatCompareButton,
  PaginationContainer,
}
