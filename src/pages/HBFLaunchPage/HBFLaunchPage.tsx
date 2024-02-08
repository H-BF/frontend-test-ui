import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { BaseTemplate } from 'templates'
import { DefaultLayout, HBFAssertionsBlock } from 'components'

export const HBFLaunchPage: FC = () => {
  const { id } = useParams<{ id: string }>()

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      key: 'home',
    },
    {
      title: <Link to="/hbf">Func</Link>,
      key: 'api',
    },
    {
      title: `HBF Launch ${id} Info`,
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
          <DefaultLayout.ContentContainer>{id && <HBFAssertionsBlock id={id} />}</DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
