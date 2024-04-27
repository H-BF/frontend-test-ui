export const getStatusColor = (status: string): string => {
  if (status === 'fail') {
    return 'volcano'
  }
  if (status === 'pass') {
    return 'green'
  }
  return 'geekblue'
}
