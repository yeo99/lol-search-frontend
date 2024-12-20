import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ChatAdd: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{width: '100%', marginTop: '40%'}}
    >
      <Form.Item name="title" label="제목" rules={[{ required: true }]}>
        <Input placeholder='채팅방 제목을 입력해주세요' />
      </Form.Item>
      
      <Form.Item name="headcount" label="인원수" rules={[{ required: true }]}>
        <Select
          placeholder="인원수를 선택해주세요"
          allowClear
        >
          <Option value="2">2</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            제출
          </Button>
          <Button htmlType="button" onClick={onReset}>
            초기화
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default ChatAdd;




