import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { BaseTemplate } from 'templates'
import { BarracudaTestResultList } from 'components'

export const BarracudaTestResultPage: FC = () => {
  const { testInfoUuid } = useParams<{ testInfoUuid: string }>()

  return (
    <BaseTemplate>
      <BarracudaTestResultList id={testInfoUuid} />
    </BaseTemplate>
  )
}
