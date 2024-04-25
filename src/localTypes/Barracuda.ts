export type TLaunch = {
  uuid: string
  test_suite: string
  date: string
  pipeline: number
  job: number
  src_branch: string
  commit: string
  fail_count: number | null
  pass_count: number | null
  duration: number
  tag: string
  status: string
}

export type TLaunchResponse = {
  launchs: TLaunch[]
}

export type TTestInfo = {
  uuid: string
  launch_uuid: string
  name: string
  version: number
  description: string
  status: string
}

export type TTestInfoResponse = {
  testsInfo: TTestInfo[]
}

export type TTestResult = {
  uuid: string
  tests_info_uuid: string
  ip: string
  referense: JSON
  reseached: JSON
  comprasion_results: JSON
  status: string
}

export type TTestResultResponse = {
  testsResult: TTestResult[]
}
