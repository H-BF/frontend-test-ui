export const isDev = (): boolean => process.env.NODE_ENV === 'development'

// eslint-disable-next-line no-underscore-dangle
export const FUNC_REPORTS = window._env_.FUNC_REPORTS || ''

export const getFuncReportsFlag = (): boolean => {
  if (isDev()) {
    return true
  }
  return FUNC_REPORTS === 'enabled'
}
