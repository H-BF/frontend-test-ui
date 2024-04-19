import React, { FC, Fragment, useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { Card, Empty, Result, Pagination } from 'antd'
import { DoubleRightOutlined, ClearOutlined } from '@ant-design/icons'
import { TFilter, TLaunch } from 'localTypes/LaunchesBlock'
import { CenteredLoader, Spacer } from 'components'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { getFilteredLaunchesData } from 'api/launchesRequest'
import { ITEMS_PER_PAGE } from 'constants/Launches'
import { BASEPREFIX } from 'constants/basePrefix'
import { LaunchesTable } from './molecules'
import { groupLaunchesByPipeline, makeQueryStringForFilteredLaunchRequest } from './utils'
import { Styled } from './styled'

type TLaunchesBlockProps = {
  filters?: TFilter
} & ({ type: 'api'; currentService: string } | { type: 'hbf'; currentService?: undefined })

export const LaunchesBlock: FC<TLaunchesBlockProps> = ({ filters, type, currentService }) => {
  const [data, setData] = useState<TLaunch[][]>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalRows, setTotalRows] = useState<number>(0)
  const [selectedRows, setSelectedRows] = useState<React.Key[]>([])

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    setData([])
    getFilteredLaunchesData(
      makeQueryStringForFilteredLaunchRequest(filters),
      ITEMS_PER_PAGE * (page - 1),
      ITEMS_PER_PAGE,
      type,
      currentService,
    )
      .then(({ data }) => {
        setIsLoading(false)
        // setData(mainPageRightList)
        setTotalRows(data.totalRows)
        setData(groupLaunchesByPipeline(data.launchs))
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
  }, [filters, page, type, currentService])

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }
  if (isLoading) {
    return <CenteredLoader />
  }
  if (!data.length && !error && !isLoading) {
    return <Empty />
  }

  const selectRows = (row: React.Key, selected: boolean): void => {
    if (selected) {
      setSelectedRows([...selectedRows, row])
    } else {
      setSelectedRows([...selectedRows].filter(el => el !== row))
    }
  }

  return (
    <>
      {selectedRows.length > 0 && type === 'api' && (
        <>
          <Styled.FloatClearButton
            icon={<ClearOutlined />}
            onClick={() => setSelectedRows([])}
            type="default"
            badge={{ count: selectedRows.length, color: 'blue' }}
          />
          {selectedRows.length > 1 && (
            <Styled.FloatCompareButton
              icon={<DoubleRightOutlined />}
              type="primary"
              href={`${BASEPREFIX}/compare-api-launch/${currentService}/${selectedRows[0]}/${selectedRows[1]}`}
            />
          )}
        </>
      )}
      {data.map((launchesByPipeline, i) => (
        <Fragment key={launchesByPipeline[0].pipeline}>
          <Card title={`Pipeline # ${launchesByPipeline[0].pipeline}`}>
            <LaunchesTable data={launchesByPipeline} type={type} onRowSelect={selectRows} selectedRows={selectedRows} />
          </Card>
          {i + 1 < data.length && <Spacer />}
        </Fragment>
      ))}
      <Styled.PaginationContainer>
        <Pagination
          defaultCurrent={page}
          defaultPageSize={ITEMS_PER_PAGE}
          total={totalRows}
          onChange={page => setPage(page)}
        />
      </Styled.PaginationContainer>
    </>
  )
}
