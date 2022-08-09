import { useContext, useState } from 'react'
import { Row, Col, Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
  // context
  const [_, setAuth] = useContext(AuthContext)

  // state
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  // hook
  const router = useRouter()
  const [form] = Form.useForm()

  const forgotPasswordRequest = async (values) => {
    // console.log(values)
    try {
      setLoading(true)
      const { data } = await axios.post('/forgot-password', values)
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success('Check your email. Password reset code is sent.')
        setVisible(true)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error('Password reset request failed. Try again.')
    }
  }

  const resetPassword = async (values) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/reset-password', values)
      if (data?.error) {
        toast.error(data.error)
      } else {
        form.resetFields(['email'])
        toast.success(
          'Password changed succesfully. Please login with your new password.',
        )
        setVisible(false)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Password reset failed. Try again.')
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
          Forgot Password
        </h1>

        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={visible ? resetPassword : forgotPasswordRequest}
        >
          {/* email */}
          <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          {/* password */}
          {visible && (
            <>
              <Form.Item name="resetCode">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter reset code"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your new Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="New Password"
                />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Submit
            </Button>
            <br />

            <Link href="/signin">
              <a>Login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default ForgotPassword
