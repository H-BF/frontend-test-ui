import React, { FC, useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { TFilter } from 'localTypes/HBFAssertions'
import { Styled } from './styled'

type TFiltersBlockProps = {
  onFilterChange: (filters: TFilter | undefined, changedValues?: TFilter) => void
  selectedSg: string[]
  resetAll: () => void
  dstPort?: string
  srcPort?: string
}

export const FiltersBlock: FC<TFiltersBlockProps> = ({ onFilterChange, resetAll, selectedSg, dstPort, srcPort }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldValue('dst_port', dstPort)
  }, [form, dstPort])

  useEffect(() => {
    form.setFieldValue('src_port', srcPort)
  }, [form, srcPort])

  const onValuesChange = (changedValues: TFilter, allValues: TFilter) => {
    onFilterChange(allValues, changedValues)
  }

  const onReset = () => {
    form.resetFields()
    resetAll()
  }

  return (
    <Form form={form} name="control-hooks" onValuesChange={onValuesChange}>
      <Styled.Container>
        <Styled.FormItem name="src_ip" label="SrcIp">
          <Input allowClear />
        </Styled.FormItem>
        <Styled.FormItem name="src_port" label="SrcPort">
          <Input allowClear />
        </Styled.FormItem>
        <Styled.FormItem name="dst_ip" label="DstIp">
          <Input allowClear />
        </Styled.FormItem>
        <Styled.FormItem name="dst_port" label="DstPort">
          <Input allowClear />
        </Styled.FormItem>
        <Styled.FormItem name="protocol" label="Protocol">
          <Select
            allowClear
            placeholder="protocol"
            options={[
              { label: 'tcp', value: 'tcp' },
              { label: 'udp', value: 'udp' },
            ]}
          />
        </Styled.FormItem>
        <Styled.FormItem name="from" label="From">
          <Input allowClear disabled={selectedSg.length > 0} />
        </Styled.FormItem>
        <Styled.FormItem name="to" label="To">
          <Input allowClear disabled={selectedSg.length > 0} />
        </Styled.FormItem>
        <Styled.FormItem name="status" label="Status">
          <Select
            allowClear
            placeholder="Status"
            options={[
              { label: 'pass', value: 'pass' },
              { label: 'fail', value: 'fail' },
            ]}
          />
        </Styled.FormItem>
        <Styled.FormItem name="msg_err" label="MsgErr">
          <Input allowClear />
        </Styled.FormItem>
        <Styled.ButtonFormItem>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Styled.ButtonFormItem>
      </Styled.Container>
    </Form>
  )
}
