import axios, { AxiosResponse } from 'axios'
import { TAssertionResponse } from 'localTypes/HBFAssertions'
import { getFuncBaseEndpoint } from './env'

// export const getAssertionsData = (
//   launchUuid: string,
//   queryString: string,
//   offset: number,
//   limit: number,
// ): Promise<AxiosResponse<TAssertionResponse>> =>
//   axios.get<TAssertionResponse>(
//     `${getFuncBaseEndpoint()}/hbf/v1/assertions?launchUUID=${launchUuid}&offset=${offset}&limit=${limit}${queryString}`,
//   )

export const getAllAssertionsData = (launchUuid: string): Promise<AxiosResponse<TAssertionResponse>> =>
  axios.get<TAssertionResponse>(`${getFuncBaseEndpoint()}/hbf/v1/assertions?launchUUID=${launchUuid}`)
