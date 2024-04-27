import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { BaseTemplate } from 'templates'
import { DefaultLayout, BarracudaTestResultList } from 'components'

export const BarracudaTestResultPage: FC = () => {
  const { launchUuid, testInfoUuid } = useParams<{ launchUuid: string; testInfoUuid: string }>()

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
      key: 'launchInfo',
    },
    {
      title: `${testInfoUuid} Test Result`,
      key: 'testInfo',
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
            <BarracudaTestResultList id={testInfoUuid} launchId={launchUuid} />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
