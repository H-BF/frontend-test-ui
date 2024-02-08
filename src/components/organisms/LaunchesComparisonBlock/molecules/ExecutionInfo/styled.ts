import styled from 'styled-components'
import { Typography } from 'antd'

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 20px;
  cursor: pointer;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 25px 25px;
  }
`

const TitleWithNoMargin = styled(Typography.Title)`
  margin-top: 0;
`

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AssertionsBlock = styled.div`
  height: 500px;
  overflow-y: auto;
`

export const Styled = {
  Controls,
  TitleWithNoMargin,
  Centered,
  AssertionsBlock,
}
