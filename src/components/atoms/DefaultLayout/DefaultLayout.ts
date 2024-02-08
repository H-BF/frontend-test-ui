import { Layout } from 'antd'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row;
`

const LayoutWithPadding = styled(Layout)`
  padding: 0 24px 24px;
`

type TSiderProps = {
  $width: number
}

const Sider = styled.div<TSiderProps>`
  width: ${({ $width }) => $width}px;
  height: calc(100vh - 64px);
`

const BackgroundContainer = styled.div`
  position: relative;
  height: 100%;
  height: 100%;
  width: 100%;
  background: #001529;
  box-sizing: border-box;
`

const Resizer = styled.div`
  position: absolute;
  right: 0;
  width: 10px;
  height: 100%;
  cursor: grab;
  user-select: none;
`

const MenuItemsContainer = styled.div`
  max-width: 95%;
`

const ScrollableUnderHeaderContainer = styled.div`
  max-height: calc(100vh - 64px);
  overflow-y: auto;
`

const FullWidthContainer = styled.div`
  width: 100%;
`

const ContentContainer = styled(Layout.Content)`
  min-height: 280px;
  margin: 0;
  padding: 24px;
`

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`

export const DefaultLayout = {
  FlexContainer,
  Sider,
  BackgroundContainer,
  Resizer,
  LayoutWithPadding,
  MenuItemsContainer,
  ScrollableUnderHeaderContainer,
  FullWidthContainer,
  ContentContainer,
  BreadcrumbContainer,
}
