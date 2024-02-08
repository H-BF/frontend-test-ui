export type TAssertion = {
  uuid: string
  launch_uuid: string
  src_ip: string
  src_port: string
  dst_ip: string
  dst_port: string
  protocol: string
  from: string
  to: string
  status: string
  msg_err: string
}

export type TAssertionResponse = {
  totalRows: number
  assertions: TAssertion[]
}

export type TFilter = { [key in keyof Partial<TAssertion>]: string }

export type THistoryAction =
  | {
      type: 'changeView'
      prevValue: string | number
    }
  | {
      type: 'selectSG'
      prevValue: string[]
    }
  | {
      type: 'selectSrcPort' | 'selectDstPort'
      prevValue: string | undefined
    }
  | {
      type: 'selectNW'
      prevValue: string | undefined
    }
