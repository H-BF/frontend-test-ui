import React, { FC, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Empty, Result } from 'antd'
import { TLaunch } from 'localTypes/LaunchesBlock'
import { TExecution } from 'localTypes/APIExecutions'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { getLaunchData } from 'api/launchesRequest'
import { getExecutionsData } from 'api/apiExecutionsRequest'
import { CenteredLoader, Spacer } from 'components'
import { LaunchDescriptionComparison, ExecutionComparison } from './organisms'

type TLaunchesComparisonBlockProps = {
  launchFirstId: string
  launchSecondId: string
}

type TFullData = (TLaunch & {
  executions?: TExecution[]
})[]

export const LaunchesComparisonBlock: FC<TLaunchesComparisonBlockProps> = ({ launchFirstId, launchSecondId }) => {
  const [data, setData] = useState<TFullData>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    let result: TFullData = []
    Promise.all([getLaunchData(launchFirstId), getLaunchData(launchSecondId)])
      .then(([value1, value2]) => {
        result = [value1.data, value2.data]
        Promise.all([getExecutionsData(value1.data.uuid), getExecutionsData(value2.data.uuid)]).then(
          ([value1, value2]) => {
            result = [
              { ...result[0], executions: value1.data.executions },
              { ...result[1], executions: value2.data.executions },
            ]
            setIsLoading(false)
            setData(result)
          },
        )
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
  }, [launchFirstId, launchSecondId])

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }
  if (isLoading) {
    return <CenteredLoader />
  }
  if (data.length === 0 && !error && !isLoading) {
    return <Empty />
  }

  return (
    <>
      <LaunchDescriptionComparison launchFirst={data[0]} launchSecond={data[1]} />
      {data[0].executions && data[1].executions && (
        <>
          <Spacer />
          <ExecutionComparison executionsFirst={data[0].executions} executionsSecond={data[1].executions} />
        </>
      )}
    </>
  )
}
