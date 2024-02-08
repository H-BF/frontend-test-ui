import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navigation, ExecutionInfo, AssertionInfo } from './organisms'
import { Styled } from './styled'

export const APIExecutionsBlock: FC = () => {
  const { executionId, assertionId } = useParams<{ executionId?: string; assertionId?: string }>()
  const [statusFilter, setStatusFilter] = useState<string[]>(['fail'])

  return (
    <Styled.Grid>
      <Styled.Scrollable>
        <Navigation statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </Styled.Scrollable>
      <Styled.Scrollable>
        {executionId && !assertionId && <ExecutionInfo id={executionId} statusFilter={statusFilter} />}
        {assertionId && <AssertionInfo id={assertionId} />}
      </Styled.Scrollable>
    </Styled.Grid>
  )
}
