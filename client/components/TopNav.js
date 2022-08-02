import {
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useState } from 'react'
import ToggleTheme from './ToggleTheme'
import Link from 'next/link'
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
  {
    label: (
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    ),
    key: 'signup',
    icon: <UserAddOutlined />,
  },
  {
    label: (
      <Link href="/signin">
        <a>Signin</a>
      </Link>
    ),
    key: 'signin',
    icon: <UserOutlined />,
  },
  {
    style: { marginLeft: 'auto' },
    label: 'Dashbaord',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Management',
        children: [
          {
            label: (
              <Link href="/admin">
                <a>Admin</a>
              </Link>
            ),
            key: 'setting:2',
          },
        ],
      },
    ],
  },
  {
    label: <ToggleTheme />,
  },
]

const TopNav = () => {
  const [current, setCurrent] = useState('mail')

  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default TopNav
