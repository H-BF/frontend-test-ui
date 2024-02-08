import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import Ajv, { DefinedError, JSONSchemaType } from 'ajv'
import { UUID } from 'components'
import { TRequest, TResponse, TJSONParseResult } from 'localTypes/APIExecutions'
import { stringifyJSONWithErrors } from './utils'
import { Styled } from './styled'

type TRequestResponseBlockProps = {
  request: TRequest
  response: TResponse
  jsonSchema?: JSONSchemaType<unknown>
  isVertical?: boolean
}

export const RequestResponseBlock: FC<TRequestResponseBlockProps> = ({ request, response, jsonSchema, isVertical }) => {
  const [responseBody, setResponseBody] = useState<TJSONParseResult | undefined>(response?.body)
  const [validateErrors, setValidateErrors] = useState<DefinedError[]>([])

  useEffect(() => {
    if (response.body) {
      setResponseBody(response.body)
      if (response.body && jsonSchema) {
        const ajv = new Ajv({ allErrors: true })
        const validate = ajv.compile(jsonSchema)
        const valid = validate(response.body)
        if (!valid) {
          setValidateErrors((validate.errors as DefinedError[]) || [])
        }
      }
    }
  }, [response.body, jsonSchema])

  return (
    <Styled.Grid $isVertical={isVertical}>
      <Styled.Cell $isVertical={isVertical} $order={1}>
        <Typography.Title level={3}>Request</Typography.Title>
        <UUID text={request.uuid} />
      </Styled.Cell>
      <Styled.Cell $isVertical={isVertical} $order={3}>
        <Typography.Title level={4}>Header</Typography.Title>
        <Styled.CodeSection>{request.header && JSON.stringify(request.header, null, 2)}</Styled.CodeSection>
      </Styled.Cell>
      <Styled.Cell $isVertical={isVertical} $order={5}>
        <Typography.Title level={4}>Body</Typography.Title>
        <Styled.CodeSection>{request.body && JSON.stringify(request.body, null, 2)}</Styled.CodeSection>
      </Styled.Cell>
      <Styled.Cell $isVertical={isVertical} $order={2}>
        <Typography.Title level={3}>Response</Typography.Title>
        <UUID text={response.uuid} />
      </Styled.Cell>
      <Styled.Cell $isVertical={isVertical} $order={4}>
        <Typography.Title level={4}>Header</Typography.Title>
        <Styled.CodeSection>{response.header && JSON.stringify(response.header, null, 2)}</Styled.CodeSection>
      </Styled.Cell>
      <Styled.Cell $isVertical={isVertical} $order={6}>
        <Styled.ResponseBodyContainer>
          <Typography.Title level={4}>Body</Typography.Title>
          {jsonSchema && validateErrors.length === 0 && <Styled.ValidationTag color="green">OK</Styled.ValidationTag>}
          {jsonSchema && validateErrors.length > 0 && (
            <Styled.ValidationTag color="volcano">Error</Styled.ValidationTag>
          )}
        </Styled.ResponseBodyContainer>
        <Styled.CodeSection>{responseBody && stringifyJSONWithErrors(responseBody, validateErrors)}</Styled.CodeSection>
      </Styled.Cell>
    </Styled.Grid>
  )
}
