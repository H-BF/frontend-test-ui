import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { BaseTemplate } from 'templates'
import { DefaultLayout, APIExecutionsBlock } from 'components'

export const APILaunchPage: FC = () => {
  const { serviceId, launchId } = useParams<{ serviceId: string; launchId: string }>()

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
      title: `API Launch ${launchId} Info`,
      key: 'launchInfo',
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
            <APIExecutionsBlock />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
