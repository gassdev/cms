import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import AdminLayout from '../../../components/layout/AdminLayout'

const Posts = () => {
  return (
    <AdminLayout currentDefault="all-posts">
      <Row>
        <Col span={24}>
          <Button type="primary">
            <Link href="/admin/posts/new">
              <a>
                <PlusOutlined /> Add New
              </a>
            </Link>
          </Button>
          <h1>Posts</h1>
          <p>...</p>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default Posts
