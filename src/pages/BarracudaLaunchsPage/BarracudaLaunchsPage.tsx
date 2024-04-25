import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { BaseTemplate } from 'templates'
import { BarracudaLaunchsList } from 'components'

export const BarracudaLaunchsPage: FC = () => {
  const { launchId } = useParams<{ launchId?: string }>()

  return (
    <BaseTemplate>
      <BarracudaLaunchsList id={launchId} />
    </BaseTemplate>
  )
}
