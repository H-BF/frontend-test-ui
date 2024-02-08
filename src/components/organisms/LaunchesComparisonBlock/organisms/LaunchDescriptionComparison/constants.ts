import { TLaunch } from 'localTypes/LaunchesBlock'

export const KEYS_TO_COMPARE: (keyof TLaunch)[] = ['status', 'src_branch', 'commit', 'fail_count', 'pass_count', 'tag']

export const DESCRIPTIONS: { [key in keyof Partial<TLaunch>]: string } = {
  uuid: 'uuid',
  status: 'status',
  src_branch: 'src branch',
  commit: 'commit',
  fail_count: 'fail count',
  pass_count: 'pass count',
  tag: 'tag',
}
