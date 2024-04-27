import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { BaseTemplate } from 'templates'
import { DefaultLayout, BarracudaDiffResult } from 'components'

export const BarracudaDiffResultPage: FC = () => {
  const { launchUuid, testInfoUuid, testResultUuid } = useParams<{
    launchUuid: string
    testInfoUuid: string
    testResultUuid: string
  }>()

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      key: 'home',
    },
    {
      title: <Link to="/barracuda/">Barracuda</Link>,
      key: 'barracuda',
    },
    {
      title: <Link to={`/barracuda/search/${launchUuid}`}>{launchUuid}</Link>,
      key: 'launchSearch',
    },
    {
      title: <Link to={`/barracuda/test-info/${launchUuid}`}>Launch Test Info</Link>,
      key: 'testInfo',
    },
    {
      title: <Link to={`/barracuda/test-result/${launchUuid}/${testInfoUuid}`}>{testInfoUuid} Results</Link>,
      key: 'testResult',
    },
    {
      title: 'Diff Result',
      key: 'diffResult',
    },
  ]

  return (
    <BaseTemplate>
      <Layout>
        <DefaultLayout.LayoutWithPadding>
          <DefaultLayout.BreadcrumbContainer>
            <Breadcrumb items={breadcrumbItems} />
          </DefaultLayout.BreadcrumbContainer>
          <DefaultLayout.ContentContainer>
            <BarracudaDiffResult id={testResultUuid} />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
