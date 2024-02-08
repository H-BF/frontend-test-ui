import React, { FC, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import { BASEPREFIX } from 'constants/basePrefix'
import { mainPageLeftList } from 'mocks'
import { getFuncReportsFlag } from 'constants/env'
import { Styled } from './styled'

export const Header: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const [currentSection, setCurrentSection] = useState<string>(location.pathname.split('/')[1])
  const isFuncRerportsEnabled = getFuncReportsFlag()

  return (
    <Styled.Container>
      <Styled.Link href={`${BASEPREFIX}/`}>
        <Styled.Heading>Test Platform</Styled.Heading>
      </Styled.Link>
      {isFuncRerportsEnabled && (
        <Styled.Menu>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentSection]}
            onSelect={({ key }) => {
              history.push(`/${key}/`)
              setCurrentSection(key)
            }}
            items={mainPageLeftList}
          />
        </Styled.Menu>
      )}
    </Styled.Container>
  )
}
