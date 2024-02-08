import React, { FC, Fragment, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Empty, Result, Spin } from 'antd'
import { TExecution } from 'localTypes/APIExecutions'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { getExecutionsData } from 'api/apiExecutionsRequest'
import { NavElement, FiltersBlock } from './molecules'
import { filterExecutions } from './utils'
import { Styled } from './styled'

type TNavigationProps = {
  statusFilter: string[]
  setStatusFilter: Dispatch<SetStateAction<string[]>>
}

export const Navigation: FC<TNavigationProps> = ({ statusFilter, setStatusFilter }) => {
  const { serviceId, launchId, executionId } = useParams<{
    serviceId: string
    launchId: string
    executionId?: string
    assertionId?: string
  }>()
  const history = useHistory()
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<TExecution[]>([])
  const [groupFilter, setGroupFilter] = useState<string[]>([])
  const [nameFilter, setNameFilter] = useState<string>()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    if (launchId) {
      setData([])
      getExecutionsData(launchId)
        .then(({ data }) => {
          setIsLoading(false)
          setData(data.executions)
        })
        .catch((error: AxiosError<TRequestErrorData>) => {
          setIsLoading(false)
          if (error.response) {
            setError({ status: error.response.status, data: error.response.data })
          } else if (error.status) {
            setError({ status: error.status })
          } else {
            setError({ status: 'Error while fetching' })
          }
        })
    }
  }, [launchId, history])

  useEffect(() => {
    if (data.length > 0 && !executionId) {
      history.push(
        `/api-launch/${serviceId}/${launchId}/${
          filterExecutions(data, ['fail'], [], undefined)[0]?.uuid || data[0].uuid
        }`,
      )
    }
  }, [data, serviceId, executionId, launchId, history])

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }
  if (isLoading) {
    return <Spin />
  }
  if (!data.length && !error && !isLoading) {
    return <Empty />
  }

  const groupNames = data
    .map(({ name }) => {
      if (name[0] === '[') {
        return name.split(']')[0].slice(1)
      }
      return 'Other'
    })
    .filter((value, index, array) => array.indexOf(value) === index)
  const filteredData = filterExecutions(data, statusFilter, groupFilter, nameFilter)

  return (
    <Styled.Container>
      <FiltersBlock
        groupOptions={groupNames}
        onStatusChange={setStatusFilter}
        onGroupChange={setGroupFilter}
        onNameChange={setNameFilter}
      />
      {filteredData.map((item, i) => (
        <Fragment key={item.uuid}>
          <NavElement item={item} statusFilters={statusFilter} />
          {i + 1 < filteredData.length && <Styled.CustomSpacingDivider />}
        </Fragment>
      ))}
    </Styled.Container>
  )
}
