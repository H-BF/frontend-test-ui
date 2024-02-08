export type TRequestErrorData = {
  title: string
  msg: string
}

export type TRequestError = {
  status: number | string
  data?: TRequestErrorData
}
