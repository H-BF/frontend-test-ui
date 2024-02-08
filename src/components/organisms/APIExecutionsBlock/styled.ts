import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
  }
`

const Scrollable = styled.div`
  max-height: 90vh;
  overflow-x: auto;
`

export const Styled = { Grid, Scrollable }
