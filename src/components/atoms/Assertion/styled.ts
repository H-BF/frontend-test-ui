import styled from 'styled-components'
import { Typography, Tag } from 'antd'

const Header = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;

  @media (min-width: 1440px) {
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
  }
`

const TitleWithNoMargin = styled(Typography.Title)`
  display: inline;

  &.ant-typography {
    margin-top: 0;
    margin-right: 10px;
    margin-bottom: 0;
  }
`

const ValidationTag = styled(Tag)`
  min-width: 46px;
  height: 22px;
  text-align: center;
`

const Message = styled.div`
  font-size: 16px;
  line-height: 18px;
`

export const Styled = {
  Header,
  TitleWithNoMargin,
  ValidationTag,
  Message,
}
