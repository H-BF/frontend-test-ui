import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 64px;
  background: #001529;
  padding-inline: 50px;
`

const Link = styled.a`
  display: contents;
  color: white;
`

const Heading = styled.h1`
  margin-left: 30px;
`

const Menu = styled.div`
  min-width: 250px;
`

export const Styled = {
  Container,
  Link,
  Heading,
  Menu,
}
