import React, { FC, Dispatch, SetStateAction } from 'react'
import { Select, Input } from 'antd'
import { Styled } from './styled'

type TFiltersBlockProps = {
  groupOptions: string[]
  onStatusChange: Dispatch<SetStateAction<string[]>>
  onGroupChange: Dispatch<SetStateAction<string[]>>
  onNameChange: Dispatch<SetStateAction<string | undefined>>
}

export const FiltersBlock: FC<TFiltersBlockProps> = ({ groupOptions, onStatusChange, onGroupChange, onNameChange }) => {
  return (
    <Styled.Container>
      <Input placeholder="Name" onChange={value => onNameChange(value.target.value)} allowClear />
      <Select
        onChange={values => onStatusChange(values)}
        allowClear
        mode="multiple"
        placeholder="Status"
        defaultValue={['fail']}
        options={[
          { label: 'pass', value: 'pass' },
          { label: 'fail', value: 'fail' },
        ]}
      />
      <Select
        onChange={values => onGroupChange(values)}
        allowClear
        mode="multiple"
        placeholder="Group"
        options={groupOptions.map(el => ({ label: el, value: el }))}
      />
    </Styled.Container>
  )
}
