import styled from 'styled-components'

const URIBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  word-break: break-all;

  @media (min-width: 1440px) {
    grid-template-columns: auto 1fr auto;
    width: 50%;
  }
`

type TURIMethodCellProps = {
  $method?: string
}

const URIMethodCell = styled.div<TURIMethodCellProps>`
  padding: 10px 15px;
  color: white;
  font-weight: 700;
  background: ${({ $method }) => ($method === 'POST' ? '#49cc90' : '#61affe')};
  border: 2px solid ${({ $method }) => ($method === 'POST' ? '#49cc90' : '#61affe')};
  border-bottom: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  @media (min-width: 1440px) {
    border: 2px solid ${({ $method }) => ($method === 'POST' ? '#49cc90' : '#61affe')};
    border-right: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: initial;
    border-bottom-left-radius: 6px;
  }
`

const URICell = styled.div`
  padding: 10px 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
  border: 2px solid #f0f0f0;
  border-bottom: 0;

  @media (min-width: 1440px) {
    border: 2px solid #f0f0f0;
    border-right: 0;
  }
`

type TURIStatusCellProps = {
  $status?: string
}

const URIStatusCell = styled.div<TURIStatusCellProps>`
  padding: 10px 10px;
  background: ${({ $status }) => ($status === 'OK' ? '#f6ffed' : '#fff2e8')};
  border: 2px solid #f0f0f0;
  border-color: ${({ $status }) => ($status === 'OK' ? '#b7eb8f' : '#ffbb96')};
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;

  @media (min-width: 1440px) {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: initial;
  }
`

export const Styled = {
  URIMethodCell,
  URIBlock,
  URICell,
  URIStatusCell,
}
