import axios, { AxiosResponse } from 'axios'
import { TLaunchResponse, TLaunchError, TLaunch, TUniqueServices } from 'localTypes/LaunchesBlock'
import { getApiBaseEndpoint, getFuncBaseEndpoint } from './env'

// export const getLaunchesData = (): Promise<AxiosResponse<TLaunchResponse>> =>
//   axios.get<TLaunchResponse>(`${getBaseEndpoint()}/api/v1/launchs`)

export const getFilteredLaunchesData = (
  queryString: string,
  offset: number,
  limit: number,
  type: string,
  serviceName?: string,
): Promise<AxiosResponse<TLaunchResponse>> => {
  if (type === 'api') {
    return axios.get<TLaunchResponse>(
      `${getApiBaseEndpoint()}/${type}/v1/launchs?serviceName=${serviceName}&offset=${offset}&limit=${limit}${queryString}`,
    )
  }
  return axios.get<TLaunchResponse>(
    `${getFuncBaseEndpoint()}/${type}/v1/launchs?offset=${offset}&limit=${limit}${queryString}`,
  )
}

export const getLaunchError = async (launchUuid: string, type: string): Promise<string> => {
  if (type === 'api') {
    return axios
      .get<TLaunchError>(`${getApiBaseEndpoint()}/${type}/v1/launch_error?launchUuid=${launchUuid}`)
      .then(({ data }) => data.message)
      .catch(() => 'Error fetching error')
  }
  return axios
    .get<TLaunchError>(`${getFuncBaseEndpoint()}/${type}/v1/launch_error?launchUuid=${launchUuid}`)
    .then(({ data }) => data.message)
    .catch(() => 'Error fetching error')
}

export const getLaunchData = (id: string): Promise<AxiosResponse<TLaunch>> =>
  axios.get<TLaunch>(`${getApiBaseEndpoint()}/api/v1/launch?uuid=${id}`)

export const getUniqueServices = (): Promise<AxiosResponse<TUniqueServices>> =>
  axios.get<TUniqueServices>(`${getApiBaseEndpoint()}/api/v1/launchs/unique_service`)
