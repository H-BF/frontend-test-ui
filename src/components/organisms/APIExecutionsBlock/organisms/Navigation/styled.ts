import styled from 'styled-components'
import { Divider } from 'antd'

const Container = styled.div`
  @media (min-width: 1024px) {
    max-width: 90%;
  }
`

const CustomSpacingDivider = styled(Divider)`
  margin: 10px 0;
`

export const Styled = {
  Container,
  CustomSpacingDivider,
}
