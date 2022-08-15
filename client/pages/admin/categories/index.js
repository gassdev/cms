import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout'
import { Form, Input, Row, Col, Button, List, Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CategoryUpdateModal from '../../../components/modal/CategoryUpdateModal'

const Categories = () => {
  // state
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [updatingCategory, setUpdatingCategory] = useState({})
  const [visible, setVisible] = useState(false)

  // hook
  const [form] = Form.useForm()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  const onFinish = async (values) => {
    // console.log(values)
    try {
      setLoading(true)
      const { data } = await axios.post('/category', values)
      // console.log(data)
      setCategories([data, ...categories])
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success('Category created successfully.')
        form.resetFields()
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Category create failed.')
      setLoading(false)
    }
  }

  const handleDelete = async (item) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        const { data } = await axios.delete(`/category/${item.slug}`)
        setCategories(categories.filter((c) => c._id !== data._id))
        toast.success('Category successfully deleted!')
      } catch (err) {
        console.log(err)
        toast.error('Category delete failed.')
      }
    }
  }

  const handleEdit = (item) => {
    setUpdatingCategory(item)
    setVisible(true)
  }

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values,
      )
      if (data?.error) {
        toast.error(data.error)
      } else {
        const newCategories = categories.map((category) => {
          if (category._id === data._id) {
            return data
          }
          return category
        })

        setCategories(newCategories)
        toast.success('Category successfully updated')
        setVisible(false)
        setUpdatingCategory({})
      }
    } catch (err) {
      console.log(err)
      toast.error('Category update failed.')
    }
  }

  return (
    <AdminLayout currentDefault="categories">
      <Row>
        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Categories</h1>
          <p>Add new category</p>

          <Form form={form} onFinish={onFinish}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Category Name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>
        <CategoryUpdateModal
          visible={visible}
          setVisible={setVisible}
          handleUpdate={handleUpdate}
          updatingCategory={updatingCategory}
        />
      </Row>
    </AdminLayout>
  )
}

export default Categories
