import axios, { AxiosResponse } from 'axios'
import { TLaunchResponse, TTestInfoResponse, TTestResultResponse } from 'localTypes/Barracuda'
import { getBarracudaBaseEndpoint } from './env'

export const getLaunchs = (): Promise<AxiosResponse<TLaunchResponse>> =>
  axios.get<TLaunchResponse>(`${getBarracudaBaseEndpoint()}/result/v1/launchs/`)

export const getTestInfos = (launchUuid: string): Promise<AxiosResponse<TTestInfoResponse>> =>
  axios.get<TTestInfoResponse>(`${getBarracudaBaseEndpoint()}/result/v1/test_info/?launchUuid=${launchUuid}`)

export const getTestResults = (testsInfoUuid: string): Promise<AxiosResponse<TTestResultResponse>> =>
  axios.get<TTestResultResponse>(`${getBarracudaBaseEndpoint()}/result/v1/tests_result/?testsInfoUuid=${testsInfoUuid}`)

export const getTestResultByUuid = (testResultUuid: string): Promise<AxiosResponse<TTestResultResponse>> =>
  axios.get<TTestResultResponse>(`${getBarracudaBaseEndpoint()}/result/v1/tests_result/?uuid=${testResultUuid}`)
