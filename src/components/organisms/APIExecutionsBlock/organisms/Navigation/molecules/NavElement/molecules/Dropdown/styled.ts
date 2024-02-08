import styled from 'styled-components'
import { Tag } from 'antd'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ButtonContainer = styled.div`
  max-width: 125px;
  overflow: hidden;

  @media (min-width: 375px) {
    max-width: 175px;
  }

  @media (min-width: 425px) {
    max-width: 225px;
  }

  @media (min-width: 768px) {
    max-width: 375px;
  }

  @media (min-width: 1024px) {
    max-width: 250px;
  }
`
const ValidationTag = styled(Tag)`
  min-width: 46px;
  height: 22px;
  text-align: center;
`

export const Styled = {
  Container,
  ButtonContainer,
  ValidationTag,
}
