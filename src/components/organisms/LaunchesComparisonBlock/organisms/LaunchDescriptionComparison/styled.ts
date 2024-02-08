import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-row-gap: 50px;
  grid-template-columns: 1fr;

  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr;
  }
`

type TBackgroundProps = {
  $isValueDifferent?: boolean
}

const Background = styled.span<TBackgroundProps>`
  background-color: ${({ $isValueDifferent }) => ($isValueDifferent ? '#fff2e8' : 'initial')};
`

export const Styled = {
  Grid,
  Background,
}
