import styled from 'styled-components'
import { Typography } from 'antd'

const Grid = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-row-gap: 50px;
  grid-template-columns: 1fr;

  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr;
  }
`

const TitleWithNoMargin = styled(Typography.Title)`
  margin-top: 0;
`

export const Styled = {
  Grid,
  TitleWithNoMargin,
}
