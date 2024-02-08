import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { DefaultLayout, LaunchesComparisonBlock } from 'components'
import { BaseTemplate } from 'templates'

export const CompareAPILaunchPage: FC = () => {
  const { serviceId, launchFirstId, launchSecondId } = useParams<{
    serviceId: string
    launchFirstId: string
    launchSecondId: string
  }>()

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      key: 'home',
    },
    {
      title: <Link to="/api">API</Link>,
      key: 'api',
    },
    {
      title: <Link to={`/api/${serviceId}`}>{serviceId}</Link>,
      key: serviceId,
    },
    {
      title: `API Launch Comparison`,
      key: 'comparison',
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
            <LaunchesComparisonBlock launchFirstId={launchFirstId} launchSecondId={launchSecondId} />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
