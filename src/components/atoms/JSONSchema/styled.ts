import styled from 'styled-components'

const CodeSection = styled.pre`
  box-sizing: border-box;
  max-width: 40vw;
  max-height: 400px;
  margin: 0 auto;
  padding: 12px 20px;
  overflow: auto;
  overflow-x: auto;
  background: whitesmoke;
  border-radius: 6px;

  @media (min-width: 1440px) {
    max-width: initial;
  }
`

export const Styled = {
  CodeSection,
}
