import styled from 'styled-components'

type TFailCountProps = {
  $quantity?: number
}

const FailCount = styled.div<TFailCountProps>`
  display: inline-block;
  padding: 8px;
  color: ${({ $quantity }) => ($quantity && $quantity > 0 ? '#d4380d' : 'initial')};
  background: ${({ $quantity }) => ($quantity && $quantity > 0 ? '#fff2e8' : 'initial')};
  border: 1px solid white;
  border-color: ${({ $quantity }) => ($quantity && $quantity > 0 ? '#ffbb96' : 'white')};
  border-radius: 50%;
`

export const Styled = {
  FailCount,
}
