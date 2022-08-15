import { useContext, useEffect, useState } from 'react'
import { Row, Col, Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const Signin = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext)

  // state
  const [loading, setLoading] = useState(false)

  // hook
  const router = useRouter()

  useEffect(() => {
    if (auth?.token) {
      router.push('/')
    }
  }, [auth])

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values)
    try {
      setLoading(true)
      const { data } = await axios.post('/signin', values)
      if (data?.error) {
        toast.error(data.error)
      } else {
        // console.log('sigin response ==> ', data)
        // save user and token to context
        setAuth(data)

        // save user and token to local storage
        localStorage.setItem('cms-auth', JSON.stringify(data))

        toast.success('Successfully signed in')

        // redirect user to home page
        if (data?.user?.role === 'Admin') {
          router.push('/admin')
        } else if (data?.user?.role === 'Author') {
          router.push('/author')
        } else {
          router.push('/subscriber')
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log('err => ', err)
      toast.error('Signin failed. Try again.')
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
          Sign In
        </h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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

          <Link href="/forgot-password">
            <a>Forgot Password!</a>
          </Link>
          <br />
          <br />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Login
            </Button>
            <br />
            Or{' '}
            <Link href="/signup">
              <a>Register now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Signin
