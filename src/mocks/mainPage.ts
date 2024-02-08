import { TLaunch } from 'localTypes/LaunchesBlock'

export const mainPageLeftList = [
  {
    key: 'api',
    label: 'API reports',
  },
  {
    key: 'hbf',
    label: 'Func reports',
  },
]

export const mainPageRightList: TLaunch[] = [
  {
    uuid: '1',
    date: '2023-08-28 11:00:00',
    pipeline: 1,
    job: 1,
    src_branch: 'SWARM-1',
    commit: 'db2758a4',
    fail_count: 0,
    pass_count: 0,
    duration: 1000,
    tag: 'string',
    status: 'create',
  },
  {
    uuid: '2',
    date: '2023-08-28 12:00:00',
    pipeline: 2,
    job: 1,
    src_branch: 'SWARM-2',
    commit: '4e1c98cf',
    fail_count: 0,
    pass_count: 0,
    duration: 20000,
    tag: 'string',
    status: 'in_process',
  },
  {
    uuid: '3',
    date: '2023-08-28 13:00:00',
    pipeline: 2,
    job: 1,
    src_branch: 'SWARM-3',
    commit: '5axc98cf',
    fail_count: 0,
    pass_count: 1,
    duration: 20000,
    tag: 'string',
    status: 'finish',
  },
  {
    uuid: '4',
    date: '2023-08-28 14:00:00',
    pipeline: 4,
    job: 1,
    src_branch: 'SWARM-4',
    commit: '4dsf98cf',
    fail_count: 0,
    pass_count: 0,
    duration: 20000,
    tag: 'string',
    status: 'error',
  },
]
