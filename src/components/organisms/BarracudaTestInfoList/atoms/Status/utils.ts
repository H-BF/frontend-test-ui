export const getStatusColor = (status: string): string => {
  if (status === 'error') {
    return 'volcano'
  }
  if (status === 'pass') {
    return 'green'
  }
  return 'geekblue'
}
