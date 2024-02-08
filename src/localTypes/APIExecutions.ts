import { JSONSchemaType } from 'ajv'

export type TExecution = {
  uuid: string
  name: string
  launch_uuid: string
  request_uuid: string
  response_uuid: string
  fail_count: number
  pass_count: number
}

export type TExecutionResponse = {
  totalRows: number
  executions: TExecution[]
}

export type TAssertion = {
  uuid: string
  name: string
  execution_uuid: string
  json_schema?: string
  error_message?: string
  status: string
}

export type TJSONParseResult =
  | string
  | number
  | boolean
  | null
  | TJSONParseResult[]
  | { [key: string]: TJSONParseResult }

export type TRequest = {
  uuid: string
  method: string
  url: string
  header?: TJSONParseResult
  body?: TJSONParseResult
}

export type TResponse = {
  uuid: string
  status: string
  code: number
  header?: TJSONParseResult
  body?: TJSONParseResult
}

export type TJSONSchema = {
  uuid: string
  name: string
  launch_uuid: string
  json_schema: JSONSchemaType<unknown>
}
