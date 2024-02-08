/* eslint-disable camelcase */
import React, { FC, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Empty, Result, Spin } from 'antd'
import { AxiosError } from 'axios'
import { getAssertionsData } from 'api/apiExecutionsRequest'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TAssertion } from 'localTypes/APIExecutions'
import { getStatusColor } from './utils'
import { Styled } from './styled'

type TDropdownProps = {
  id: string
  launchId: string
  statusFilters: string[]
}

export const Dropdown: FC<TDropdownProps> = ({ id, launchId, statusFilters }) => {
  const { serviceId, assertionId } = useParams<{ serviceId: string; assertionId: string }>()
  const history = useHistory()
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assertions, setAssertions] = useState<TAssertion[]>([])
  const [filteredAssertions, setFilteredAssertions] = useState<TAssertion[]>([])

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    setAssertions([])
    getAssertionsData(id)
      .then(({ data }) => {
        setIsLoading(false)
        setAssertions(data)
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
  }, [id])

  useEffect(() => {
    if (assertions) {
      if (statusFilters.length === 1) {
        setFilteredAssertions(assertions.filter(({ status }) => status === statusFilters[0]))
      } else {
        setFilteredAssertions(assertions)
      }
    }
  }, [id, assertions, statusFilters])

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }
  if (isLoading) {
    return <Spin />
  }
  if (!assertions.length && !error && !isLoading) {
    return <Empty />
  }

  return (
    <>
      {filteredAssertions.map(({ uuid, status, name, execution_uuid }) => (
        <Styled.Container key={uuid}>
          <div>
            <Styled.ValidationTag color={getStatusColor(status)} key={status}>
              {status.toUpperCase()}
            </Styled.ValidationTag>
          </div>
          <Button
            type={uuid === assertionId ? 'primary' : 'text'}
            onClick={() => history.push(`/api-launch/${serviceId}/${launchId}/${execution_uuid}/${uuid}`)}
          >
            <Styled.ButtonContainer>{name}</Styled.ButtonContainer>
          </Button>
        </Styled.Container>
      ))}
    </>
  )
}
