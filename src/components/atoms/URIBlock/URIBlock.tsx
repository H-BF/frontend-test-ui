import React, { FC } from 'react'
import { Styled } from './styled'

type TURIBlockProps = {
  method: string
  url: string
  status: string
  code: number
}

export const URIBlock: FC<TURIBlockProps> = ({ method, url, status, code }) => {
  return (
    <Styled.URIBlock>
      <Styled.URIMethodCell $method={method}>{method}</Styled.URIMethodCell>
      <Styled.URICell>{url.split('v1')[1]}</Styled.URICell>
      <Styled.URIStatusCell $status={status}>
        <div>
          {status} / {code}
        </div>
      </Styled.URIStatusCell>
    </Styled.URIBlock>
  )
}
