import { DefinedError } from 'ajv'
import { Tooltip } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'
import { Fragment } from 'react'

const addErrorElement = (path: string, errors: DefinedError[]): JSX.Element | string => {
  const currentErrors = errors.filter(error => error.instancePath === path)
  if (currentErrors.length > 0) {
    const messages = currentErrors.map(error => error.message).join(' | ')
    return (
      <Tooltip title={messages}>
        <CloseCircleTwoTone twoToneColor="red" />
      </Tooltip>
    )
  }
  return ''
}

export const stringifyJSONWithErrors = (
  data: unknown,
  errors: DefinedError[],
  level = 1,
  currentPath = '',
): string | JSX.Element | (string | JSX.Element)[] | undefined => {
  const tabulation = ' '
  if (typeof data === 'undefined') {
    return undefined
  }
  if (!data && typeof data === 'object') {
    return 'null'
  }
  if (typeof data === 'string') {
    return '"' + data.replace(/"/g, '\\"') + '"'
  }
  if (typeof data === 'number') {
    return String(data)
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false'
  }
  if (data && Array.isArray(data)) {
    if (data.length === 0) {
      return `${tabulation}[]`
    }
    return (
      <>
        [<br />
        {data.map((value, index) => {
          if (value === undefined) {
            return 'null'
          }
          return (
            <Fragment key={JSON.stringify(value)}>
              {addErrorElement(`${currentPath}/${index}`, errors)}
              {tabulation.repeat(level + 1)}
              {stringifyJSONWithErrors(value, errors, level + 1, `${currentPath}/${index}`)}{' '}
              {index + 1 < Object.keys(data).length && (
                <>
                  ,<br />
                </>
              )}
            </Fragment>
          )
        })}
        <br />
        {tabulation.repeat(level)}]
      </>
    )
  }
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    return (
      <>
        {addErrorElement(currentPath, errors)}
        {' {'}
        <br />
        {Object.keys(data).map((key, index) => (
          <Fragment key={currentPath + key}>
            {addErrorElement(`${currentPath}/${key}`, errors)}
            {tabulation.repeat(level + 1)}
            {stringifyJSONWithErrors(key, errors, level + 2, `${currentPath}/${key}`)}:{' '}
            {stringifyJSONWithErrors(data[key as keyof typeof data], errors, level + 2, `${currentPath}/${key}`)}
            {index + 1 < Object.keys(data).length && (
              <>
                ,<br />
              </>
            )}
          </Fragment>
        ))}
        <br />
        {tabulation.repeat(level)}
        {'}'}
      </>
    )
  }
  return '{}'
}
