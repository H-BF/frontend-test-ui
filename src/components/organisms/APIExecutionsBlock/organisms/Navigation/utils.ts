import { TExecution } from 'localTypes/APIExecutions'

export const filterExecutions = (
  data: TExecution[],
  statusFilter: string[],
  groupFilter: string[],
  nameFilter?: string,
): TExecution[] => {
  let result = data

  if (nameFilter) {
    result = result.filter(element => element.name.toLowerCase().includes(nameFilter.toLowerCase()))
  }

  if (statusFilter.includes('pass') && !statusFilter.includes('fail')) {
    result = result.filter(element => element.pass_count > 0)
  }

  if (statusFilter.includes('fail') && !statusFilter.includes('pass')) {
    result = result.filter(element => element.fail_count > 0)
  }

  if (groupFilter.length > 0) {
    result = result.filter(({ name }) => {
      const groupName = name[0] === '[' ? name.split(']')[0].slice(1) : undefined
      if (groupName && groupFilter.includes(groupName)) {
        return true
      }
      if (!groupName && groupFilter.includes('Other')) {
        return true
      }
      return false
    })
  }

  return result
}
