import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from 'antd'
import { BaseTemplate } from 'templates'
import { DefaultLayout, BarracudaLaunchsList } from 'components'

export const BarracudaLaunchsPage: FC = () => {
  const { launchId } = useParams<{ launchId?: string }>()

  return (
    <BaseTemplate>
      <Layout>
        <DefaultLayout.LayoutWithPadding>
          <DefaultLayout.ContentContainer>
            <BarracudaLaunchsList id={launchId} />
          </DefaultLayout.ContentContainer>
        </DefaultLayout.LayoutWithPadding>
      </Layout>
    </BaseTemplate>
  )
}
