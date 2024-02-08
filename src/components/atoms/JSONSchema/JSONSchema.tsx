import React, { FC, useState, useEffect } from 'react'
import { Empty, Result, Spin, Typography } from 'antd'
import { AxiosError } from 'axios'
import { TRequestErrorData, TRequestError } from 'localTypes/api'
import { TJSONSchema } from 'localTypes/APIExecutions'
import { getJsonSchemaData } from 'api/apiExecutionsRequest'
import { Styled } from './styled'

type TJSCONSchemaProps = {
  id: string
}

export const JSCONSchema: FC<TJSCONSchemaProps> = ({ id }) => {
  const [error, setError] = useState<TRequestError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [jsonSchema, setJsonSchema] = useState<TJSONSchema>()

  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    setJsonSchema(undefined)
    getJsonSchemaData(id)
      .then(({ data }) => {
        setJsonSchema(data)
        setIsLoading(false)
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

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <Result status="error" title={error.status} subTitle={error.data?.title} />
  }

  if (!jsonSchema && !error && !isLoading) {
    return <Empty />
  }

  if (jsonSchema) {
    return (
      <>
        <Typography.Text type="secondary">schema uuid: </Typography.Text>
        {jsonSchema.uuid}
        <Styled.CodeSection>{JSON.stringify(jsonSchema.json_schema, null, 2)}</Styled.CodeSection>
      </>
    )
  }

  return null
}
