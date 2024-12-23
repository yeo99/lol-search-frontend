import React from 'react';
import { Button, Form, Input, message, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); 

  const onFinish = async (values: any) => {
    const token = localStorage.getItem('token');

    if(!token) {
      message.error('다시 로그인 해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9999/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: values.title,
        }),
      });

      console.log(response);

      if(response.ok) {
        message.success('채팅방이 생성되었습니다.')
        form.resetFields();
        navigate('/');
      } else {
        const error = await response.json();
        message.error(error.message);
      }

    } catch(error) {
      console.error('Error: ', error);
      message.error('채팅방 추가 중 문제가 발생했습니다. 다시 시도해주세요.')
    }

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
      <Form.Item name="title" label="제목" rules={[{ required: true, message: '채팅방 제목을 입력해주세요' }]}>
        <Input placeholder='채팅방 제목을 입력해주세요' />
      </Form.Item>
      
      <Form.Item name="headcount" label="인원수" rules={[{ required: true, message: '인원수를 선택해주세요' }]}>
        <Select placeholder="인원수를 선택해주세요" allowClear>
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




