import type { ColumnsType } from 'antd/es/table'
import { TColumns } from './types'

export const getStatusColor = (status: string): string => {
  if (status === 'error') {
    return 'volcano'
  }
  if (status === 'pass') {
    return 'green'
  }
  return 'geekblue'
}

export const filterColumns = (columns: ColumnsType<TColumns>, filters: string[] | undefined): ColumnsType<TColumns> => {
  if (!filters || filters.length === 0) {
    return columns
  }
  return columns.filter(column => column.key && !filters.includes(String(column.key)))
}
