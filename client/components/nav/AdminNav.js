import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme'
import { useWindowWidth } from '@react-hook/window-size'
import {
  PushpinOutlined,
  CameraOutlined,
  MessageOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import Link from 'next/link'

const { Sider } = Layout

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  getItem(
    <Link href="/admin">
      <a>Dashboard</a>
    </Link>,
    'dashboard',
    <SettingOutlined />,
  ),
  //   Posts
  getItem('Posts', 'posts', <PushpinOutlined />, [
    getItem(
      <Link href="/admin/posts">
        <a>All Posts</a>
      </Link>,
      'all-posts',
    ),
    getItem(
      <Link href="/admin/posts/new">
        <a>Add New</a>
      </Link>,
      'new-post',
    ),
    getItem(
      <Link href="/admin/categories">
        <a>Categories</a>
      </Link>,
      'categories',
    ),
  ]),
  //   Library
  getItem('Media', 'media', <CameraOutlined />, [
    getItem(
      <Link href="/admin/media/library">
        <a>Library</a>
      </Link>,
      'library',
    ),
    getItem(
      <Link href="/admin/media/new">
        <a>Add New</a>
      </Link>,
      'new-media',
    ),
  ]),
  //   Comments
  getItem(
    <Link href="/admin/comments">
      <a>Comments</a>
    </Link>,
    'comments',
    <MessageOutlined />,
  ),
  //   Users
  getItem('Users', 'users', <UserSwitchOutlined />, [
    getItem(
      <Link href="/admin/users">
        <a>All Users</a>
      </Link>,
      'all-users',
    ),
    getItem(
      <Link href="/admin/users/new">
        <a>Add New</a>
      </Link>,
      'new-user',
    ),
  ]),
  //   Profile
  getItem(
    <Link href="/admin/userid">
      <a>Profile</a>
    </Link>,
    'profile',
    <UserOutlined />,
  ),
  //   Customize
  getItem(
    <Link href="/admin/customize">
      <a>Customize</a>
    </Link>,
    'customize',
    <BgColorsOutlined />,
  ),
]

const AdminNav = ({ currentDefault }) => {
  // state
  const [collapsed, setCollapsed] = useState(false)
  const [current, setCurrent] = useState(currentDefault)

  // hooks
  const onlyWidth = useWindowWidth()

  // context
  const [theme] = useContext(ThemeContext)

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true)
    } else if (onlyWidth >= 800) {
      setCollapsed(false)
    }
  }, [onlyWidth < 800])

  const onClick = (e) => {
    // console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme={theme}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        defaultSelectedKeys={['dashboard']}
        defaultOpenKeys={['posts', 'media', 'users']}
        mode="inline"
        items={items}
        style={{ height: '100vh' }}
      />
    </Sider>
  )
}

export default AdminNav
