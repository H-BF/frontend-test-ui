import React, { FC, Dispatch, SetStateAction } from 'react'
import { Card, Button, Form, Input, Select } from 'antd'
import { TFilter } from 'localTypes/LaunchesBlock'
import { Styled } from './styled'

type TLaunchesFiltersBlockProps = {
  onFilterChange: Dispatch<SetStateAction<TFilter | undefined>>
}

export const LaunchesFiltersBlock: FC<TLaunchesFiltersBlockProps> = ({ onFilterChange }) => {
  const [form] = Form.useForm()

  const onFinish = (values: TFilter) => {
    onFilterChange(values)
  }

  const onReset = () => {
    form.resetFields()
    onFilterChange(undefined)
  }

  return (
    <Card>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Styled.Container>
          <Styled.FormItem name="pipeline" label="Pipeline">
            <Input />
          </Styled.FormItem>
          <Styled.FormItem name="job" label="Job">
            <Input />
          </Styled.FormItem>
          <Styled.FormItem name="srcBranch" label="Src Branch">
            <Input />
          </Styled.FormItem>
          <div />
          <Styled.FormItem name="commit" label="Commit">
            <Input />
          </Styled.FormItem>
          <Styled.FormItem name="tag" label="Tag">
            <Input />
          </Styled.FormItem>
          <Styled.FormItem name="status" label="Status">
            <Select
              allowClear
              placeholder="Status"
              options={[
                { label: 'create', value: 'create' },
                { label: 'in_process', value: 'in_process' },
                { label: 'finish', value: 'finish' },
                { label: 'error', value: 'error' },
              ]}
            />
          </Styled.FormItem>
          <Styled.ButtonFormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Styled.ButtonFormItem>
        </Styled.Container>
      </Form>
    </Card>
  )
}
