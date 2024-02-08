import styled from 'styled-components'

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 20px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 25px 25px;
  }
`

const ButtonContainer = styled.div`
  max-width: 125px;
  overflow: hidden;

  @media (min-width: 375px) {
    max-width: 200px;
  }

  @media (min-width: 425px) {
    max-width: 250px;
  }

  @media (min-width: 768px) {
    max-width: 400px;
  }

  @media (min-width: 1024px) {
    max-width: 250px;
  }
`

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Styled = {
  Controls,
  ButtonContainer,
  Centered,
}
