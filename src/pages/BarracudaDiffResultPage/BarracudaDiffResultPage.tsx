import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { BaseTemplate } from 'templates'
import { BarracudaDiffResult } from 'components'

export const BarracudaDiffResultPage: FC = () => {
  const { testResultUuid } = useParams<{ testResultUuid: string }>()

  return (
    <BaseTemplate>
      <BarracudaDiffResult id={testResultUuid} />
    </BaseTemplate>
  )
}
