import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { BaseTemplate } from 'templates'
import { DefaultLayout, BarracudaTestInfoList } from 'components'

export const BarracudaTestInfoPage: FC = () => {
  const { launchUuid } = useParams<{ launchUuid: string }>()

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
      title: `Barracuda Launch Info`,
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
            <BarracudaTestInfoList id={launchUuid} />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
