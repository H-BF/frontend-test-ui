export type TLaunchStatus = 'create' | 'in_process' | 'finish' | 'error'

export type TLaunch = {
  uuid: string
  date: string
  pipeline: number
  job: number
  src_branch: string
  commit: string
  fail_count: number
  pass_count: number
  duration: number
  tag: string
  status: TLaunchStatus
}

export type TLaunchError = {
  uuid: string
  launch_uuid: string
  message: string
}

export type TLaunchResponse = {
  totalRows: number
  launchs: TLaunch[]
}

export type TFilter = {
  pipeline?: string
  job?: string
  srcBranch?: string
  commit?: string
  tag?: string
  status?: string
}

export type TUniqueServices = {
  service_names: string[]
}
