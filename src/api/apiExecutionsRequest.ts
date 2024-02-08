import axios, { AxiosResponse } from 'axios'
import { TExecutionResponse, TExecution, TAssertion, TRequest, TResponse, TJSONSchema } from 'localTypes/APIExecutions'
import { getApiBaseEndpoint } from './env'

export const getExecutionsData = (launchUuid: string): Promise<AxiosResponse<TExecutionResponse>> =>
  axios.get<TExecutionResponse>(`${getApiBaseEndpoint()}/api/v1/executions?launchUuid=${launchUuid}`)

export const getExecutionData = (uuid: string): Promise<AxiosResponse<TExecution>> =>
  axios.get<TExecution>(`${getApiBaseEndpoint()}/api/v1/execution?uuid=${uuid}`)

export const getAssertionsData = (executionUuid: string): Promise<AxiosResponse<TAssertion[]>> =>
  axios.get<TAssertion[]>(`${getApiBaseEndpoint()}/api/v1/assertions?executionUuid=${executionUuid}`)

export const getAssertionData = (uuid: string): Promise<AxiosResponse<TAssertion>> =>
  axios.get<TAssertion>(`${getApiBaseEndpoint()}/api/v1/assertion?uuid=${uuid}`)

export const getRequestData = (uuid: string): Promise<AxiosResponse<TRequest>> =>
  axios.get<TRequest>(`${getApiBaseEndpoint()}/api/v1/request?uuid=${uuid}`)

export const getResponseData = (uuid: string): Promise<AxiosResponse<TResponse>> =>
  axios.get<TResponse>(`${getApiBaseEndpoint()}/api/v1/response?uuid=${uuid}`)

export const getJsonSchemaData = (uuid: string): Promise<AxiosResponse<TJSONSchema>> =>
  axios.get<TJSONSchema>(`${getApiBaseEndpoint()}/api/v1/json_schema?uuid=${uuid}`)
