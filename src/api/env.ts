export const isDev = (): boolean => process.env.NODE_ENV === 'development'

// eslint-disable-next-line no-underscore-dangle
const prodApiUrl = window._env_.API_REPORT_CRUD_URI || ''
// eslint-disable-next-line no-underscore-dangle
const prodFuncUrl = window._env_.FUNC_REPORT_CRUD_URI || ''

export const getApiBaseEndpoint = (): string => (isDev() ? 'http://localhost:8002' : prodApiUrl)
export const getFuncBaseEndpoint = (): string => (isDev() ? '' : prodFuncUrl)
