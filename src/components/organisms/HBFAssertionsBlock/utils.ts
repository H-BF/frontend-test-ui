/* eslint-disable camelcase */
import { TAssertion, TFilter } from 'localTypes/HBFAssertions'

export const filterData = (data: TAssertion[], filters: TFilter | undefined): TAssertion[] => {
  let result: TAssertion[] = data

  if (filters) {
    ;(Object.keys(filters) as (keyof typeof filters)[]).forEach((key: keyof typeof filters) => {
      if (filters[key]) {
        result = result.filter(el => el[key] === filters[key])
      }
    })
    return result
  }

  return result
}

export const filterForSelected = (data: TAssertion[], selectedSg: string[], selectedNW?: string): TAssertion[] => {
  let result: TAssertion[] = data
  const filteredSelected = selectedSg.filter(el => el)

  if (filteredSelected.length === 0) {
    return data
  }
  if (filteredSelected.length === 1) {
    return data.filter(el => el.from === selectedSg[0] || el.to === selectedSg[0])
  }
  if (selectedNW) {
    result = result.filter(({ src_ip, dst_ip }) => src_ip === selectedNW || dst_ip === selectedNW)
  }
  return result.filter(
    el =>
      (el.from === selectedSg[0] && el.to === selectedSg[1]) || (el.from === selectedSg[1] && el.to === selectedSg[0]),
  )
}
