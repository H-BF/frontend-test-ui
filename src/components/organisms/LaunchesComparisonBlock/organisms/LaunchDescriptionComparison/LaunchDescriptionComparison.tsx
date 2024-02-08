import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { TLaunch } from 'localTypes/LaunchesBlock'
import { UUID } from 'components'
import { isValueDifferent } from './utils'
import { KEYS_TO_COMPARE, DESCRIPTIONS } from './constants'
import { Styled } from './styled'

type TLaunchDescriptionComparisonProps = {
  launchFirst: TLaunch
  launchSecond: TLaunch
}

export const LaunchDescriptionComparison: FC<TLaunchDescriptionComparisonProps> = ({ launchFirst, launchSecond }) => {
  const { serviceId } = useParams<{
    serviceId: string
  }>()

  return (
    <div>
      <Typography.Title level={2}>Launch Info Comparison</Typography.Title>
      <Styled.Grid>
        <Card>
          <UUID text={launchFirst.uuid} />
          <div>
            <Typography.Text type="secondary">Service: </Typography.Text>
            <Styled.Background>{serviceId}</Styled.Background>
          </div>
          {KEYS_TO_COMPARE.map(key => (
            <div key={key}>
              <Typography.Text type="secondary">{DESCRIPTIONS[key]}: </Typography.Text>
              <Styled.Background $isValueDifferent={isValueDifferent(launchFirst[key], launchSecond[key])}>
                {launchFirst[key]}
              </Styled.Background>
            </div>
          ))}
        </Card>
        <Card>
          <UUID text={launchSecond.uuid} />
          <div>
            <Typography.Text type="secondary">Service: </Typography.Text>
            <Styled.Background>{serviceId}</Styled.Background>
          </div>
          {KEYS_TO_COMPARE.map(key => (
            <div key={key}>
              <Typography.Text type="secondary">{DESCRIPTIONS[key]}: </Typography.Text>
              <Styled.Background $isValueDifferent={isValueDifferent(launchFirst[key], launchSecond[key])}>
                {launchSecond[key]}
              </Styled.Background>
            </div>
          ))}
        </Card>
      </Styled.Grid>
    </div>
  )
}
