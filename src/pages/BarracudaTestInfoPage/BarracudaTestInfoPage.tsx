import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { BaseTemplate } from 'templates'
import { BarracudaTestInfoList } from 'components'

export const BarracudaTestInfoPage: FC = () => {
  const { launchUuid } = useParams<{ launchUuid: string }>()

  return (
    <BaseTemplate>
      <BarracudaTestInfoList id={launchUuid} />
    </BaseTemplate>
  )
}
