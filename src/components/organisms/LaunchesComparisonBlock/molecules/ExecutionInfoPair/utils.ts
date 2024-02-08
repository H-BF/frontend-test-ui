import { TAssertion } from 'localTypes/APIExecutions'

export const findElementByStatusAndNameInAssertionsArray = (assertion: TAssertion, arr: TAssertion[]): boolean =>
  arr.some(({ name, status }) => name === assertion.name && status === assertion.status)
