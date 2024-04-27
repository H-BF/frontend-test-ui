export const getStatusColor = (status: string): string => {
  if (status === 'error') {
    return 'volcano'
  }
  if (status === 'finish') {
    return 'green'
  }
  return 'geekblue'
}
