import styled from 'styled-components'
import { Tag } from 'antd'

type TGridProps = {
  $isVertical?: boolean
}

const Grid = styled.div<TGridProps>`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;

  @media (min-width: 1440px) {
    grid-template-columns: ${({ $isVertical = false }) => ($isVertical ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)')};
  }
`

type TCellProps = {
  $order?: number
  $isVertical?: boolean
}

const Cell = styled.div<TCellProps>`
  @media (min-width: 1440px) {
    order: ${({ $isVertical, $order = 'initial' }) => ($isVertical ? 'initial' : $order)};
  }
`

const ResponseBodyContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const ValidationTag = styled(Tag)`
  height: 22px;
  margin-bottom: 1em;
  margin-left: 10px;
`

const CodeSection = styled.pre`
  box-sizing: border-box;
  max-width: 40vw;
  height: 400px;
  margin: 0 auto;
  padding: 12px 20px;
  overflow: auto;
  background: whitesmoke;
  border-radius: 6px;
`

export const Styled = {
  Grid,
  Cell,
  ResponseBodyContainer,
  ValidationTag,
  CodeSection,
}
