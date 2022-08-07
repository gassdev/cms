import { useContext, useState } from 'react'
import { Row, Col, Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const Signup = () => {
  // state
  const [loading, setLoading] = useState(false)

  // hook
  const router = useRouter()
  // console.log(router)

  // context
  const [auth, setAuth] = useContext(AuthContext)

  // FormInstance
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values)
    try {
      setLoading(true)
      const { data } = await axios.post('/signup', values)
      if (data?.error) {
        toast.error(`${data.error}`)
      } else {
        // console.log('signup response ==> ', data)

        // save in context
        setAuth(data)

        // save in local storage
        localStorage.setItem('cms-auth', JSON.stringify(data))

        toast.success('Successfully signed up!')
        form.resetFields()
      }
      setLoading(false)
      // redirect
      router.push('/admin')
    } catch (err) {
      toast.error('Signup failed. Try again')
      console.log(err)
      setLoading(false)
    }
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
          form={form}
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
              loading={loading}
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
