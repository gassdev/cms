import {
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ToggleTheme from './ToggleTheme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext)

  // state
  const [current, setCurrent] = useState('mail')

  // hook
  const router = useRouter()
  // console.log(router.pathname)

  const roleBasedLink = () => {
    if (auth?.user?.role === 'Admin') {
      return '/admin'
    } else if (auth?.user?.role === 'Author') {
      return '/author'
    } else {
      return '/subscriber'
    }
  }

  const items = [
    {
      label: (
        <Link href="/">
          <a>CMS</a>
        </Link>
      ),
      key: 'mail',
      icon: <MailOutlined />,
    },
    auth?.user === null && {
      style: { marginLeft: 'auto' },
      label: (
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      ),
      key: 'signup',
      icon: <UserAddOutlined />,
    },

    auth?.user === null && {
      label: (
        <Link href="/signin">
          <a>Signin</a>
        </Link>
      ),
      key: 'signin',
      icon: <LoginOutlined />,
    },

    auth?.user !== null && {
      style: { marginLeft: 'auto' },
      label: auth?.user?.name || 'Dashboard',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Management',
          children: [
            {
              label: (
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              ),
              key: 'setting:2',
            },
          ],
        },
      ],
    },

    auth?.user !== null && {
      onClick: () => signOut(),
      label: 'Signout',
      key: 'signout',
      icon: <LogoutOutlined />,
    },
    {
      label: <ToggleTheme />,
    },
  ]

  useEffect(() => {
    switch (router?.pathname) {
      case '/':
        setCurrent('mail')
        break
      case '/signup':
        setCurrent('signup')
        break
      case '/signin':
        setCurrent('signin')
        break
      case '/admin':
        setCurrent('setting:2')
        break
    }
  }, [router.pathname])

  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }

  const signOut = () => {
    // remove from local storage
    localStorage.removeItem('cms-auth')
    // remove from context
    setAuth({ user: null, token: '' })

    // redirect to login page
    router.push('/signin')
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
    />
  )
}

export default TopNav
