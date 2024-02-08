/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Badge, Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { TExecution } from 'localTypes/APIExecutions'
import { Dropdown } from './molecules'
import { Styled } from './styled'

type TNavElementProps = {
  item: TExecution
  statusFilters: string[]
}

export const NavElement: FC<TNavElementProps> = ({ item, statusFilters }) => {
  const { uuid, name, pass_count, fail_count, launch_uuid } = item
  const [isDropDown, setIsDropDown] = useState<boolean>(false)
  const { serviceId, executionId, assertionId } = useParams<{
    serviceId: string
    executionId: string
    assertionId?: string
  }>()
  const history = useHistory()

  useEffect(() => {
    if (executionId === uuid) {
      setIsDropDown(true)
    }
  }, [executionId, uuid])

  return (
    <>
      <Styled.Controls>
        <div>
          <Button
            type={uuid === executionId && !assertionId ? 'primary' : 'text'}
            onClick={() => history.push(`/api-launch/${serviceId}/${launch_uuid}/${uuid}`)}
          >
            <Styled.ButtonContainer>{name}</Styled.ButtonContainer>
          </Button>
        </div>
        <Styled.Centered>
          {(statusFilters.includes('pass') || statusFilters.length === 0) && (
            <Badge count={pass_count} style={{ backgroundColor: '#52c41a' }} />
          )}
          {(statusFilters.includes('fail') || statusFilters.length === 0) && <Badge count={fail_count} />}
        </Styled.Centered>
        <Styled.Centered>
          {isDropDown && <UpOutlined onClick={() => setIsDropDown(!isDropDown)} />}
          {!isDropDown && <DownOutlined onClick={() => setIsDropDown(!isDropDown)} />}
        </Styled.Centered>
      </Styled.Controls>
      {isDropDown && (
        <div>
          <Dropdown launchId={launch_uuid} id={uuid} statusFilters={statusFilters} />
        </div>
      )}
    </>
  )
}
