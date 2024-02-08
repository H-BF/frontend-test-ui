import React, { FC, useState, useEffect, useCallback } from 'react'
import { AxiosError } from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import { Menu, Tooltip, Result, Spin, Empty } from 'antd'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { BaseTemplate } from 'templates'
import { DefaultLayout, LaunchesBlock, Spacer, LaunchesFiltersBlock } from 'components'
import { TFilter } from 'localTypes/LaunchesBlock'
import { getUniqueServices } from 'api'
import { mainPageLeftList } from 'mocks'

export const MainPageAPI: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const [apiServiceName, setApiServiceName] = useState<string>(location.pathname.split('/')[2])
  const [currentFilters, setCurrentFilters] = useState<TFilter | undefined>()
  const [apiServicesList, setApiServicesList] = useState<string[]>([])
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setApiServiceName(`${location.pathname.split('/')[2]}`)
  }, [location, history])

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    getUniqueServices()
      .then(({ data }) => {
        setIsLoading(false)
        setApiServicesList(data.service_names)
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
  }, [])

  const [isResizable, setIsResizable] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number>()

  const handleResize = () => {
    setIsResizable(true)
  }

  const handleMouseUp = () => {
    setIsResizable(false)
  }

  const handleMouseMove = useCallback(
    (event: MouseEventInit) => {
      if (isResizable) {
        if (event.clientY) {
          setContainerWidth(event.clientX)
        }
      }
    },
    [isResizable],
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizable, handleMouseMove])

  return (
    <BaseTemplate>
      <DefaultLayout.FlexContainer>
        <DefaultLayout.Sider $width={containerWidth || 200}>
          <DefaultLayout.BackgroundContainer>
            <DefaultLayout.Resizer onMouseDown={() => handleResize()} />
            <DefaultLayout.MenuItemsContainer>
              {isLoading ? (
                <Spin />
              ) : (
                <DefaultLayout.ScrollableUnderHeaderContainer>
                  <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[apiServiceName || '']}
                    onSelect={({ key }) => {
                      history.push(`/api/${key}`)
                      setApiServiceName(key)
                    }}
                    items={apiServicesList.map(el => ({
                      key: el,
                      label: (
                        <Menu.Item key={el}>
                          <Tooltip title={el} placement="bottom">
                            {el}
                          </Tooltip>
                        </Menu.Item>
                      ),
                    }))}
                  />
                </DefaultLayout.ScrollableUnderHeaderContainer>
              )}
            </DefaultLayout.MenuItemsContainer>
          </DefaultLayout.BackgroundContainer>
        </DefaultLayout.Sider>
        <DefaultLayout.FullWidthContainer>
          <DefaultLayout.ScrollableUnderHeaderContainer>
            <DefaultLayout.ContentContainer>
              <LaunchesFiltersBlock onFilterChange={setCurrentFilters} />
              <Spacer />
              {error && <Result status="error" title={error.status} subTitle={error.data?.title} />}
              {!mainPageLeftList.length && !error && !isLoading && <Empty />}
              {apiServiceName !== 'undefined' && apiServiceName?.length > 0 && (
                <LaunchesBlock filters={currentFilters} currentService={apiServiceName} type="api" />
              )}
            </DefaultLayout.ContentContainer>
          </DefaultLayout.ScrollableUnderHeaderContainer>
        </DefaultLayout.FullWidthContainer>
      </DefaultLayout.FlexContainer>
    </BaseTemplate>
  )
}
