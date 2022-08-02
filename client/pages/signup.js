import { Row, Col, Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Signup = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <Row>
      <Col span={8} offset={8}>
        <h1
          style={{
            paddingTop: '100px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Sign Up
        </h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* name */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
            />
          </Form.Item>
          {/* email */}
          <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <br />
            Or{' '}
            <Link href="/signin">
              <a>Login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Signup
