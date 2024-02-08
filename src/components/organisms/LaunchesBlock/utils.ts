import { TLaunch, TFilter } from 'localTypes/LaunchesBlock'

export const groupLaunchesByPipeline = (launches: TLaunch[]): TLaunch[][] => {
  const result: TLaunch[][] = []
  const uniquePipelines = launches
    .map(launch => launch.pipeline)
    .filter((value, index, self) => self.indexOf(value) === index)

  uniquePipelines.forEach(pipeline => {
    result.push(launches.filter(launch => launch.pipeline === pipeline))
  })
  return result
}

export const makeQueryStringForFilteredLaunchRequest = (filters: TFilter | undefined): string => {
  const queryArr: string[] = []
  if (filters) {
    ;(Object.keys(filters) as (keyof typeof filters)[]).forEach((key: keyof typeof filters) => {
      if (filters[key]) {
        queryArr.push(`${key}=${filters[key]}`)
      }
    })
  }
  const queryString = queryArr.length ? queryArr.join('&') : ''
  if (queryString) {
    return `&${queryString}`
  }
  return ''
}
