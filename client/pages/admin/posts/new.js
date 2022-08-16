import { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout'
import Editor from 'rich-markdown-editor'
import { Col, Input, Row, Select } from 'antd'
import { ThemeContext } from '../../../context/theme'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'

const { Option } = Select

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      400,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64',
    )
  })

const uploadImage = async (file) => {
  // console.log(file)
  try {
    const image = await resizeFile(file)
    // console.log('image base64 ==> ', image)
    const { data } = await axios.post('/upload-image', { image })
    console.log('UPLOAD FILE RESPONSE ==> ', data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const NewPost = () => {
  // load from local storage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem('post-title')) {
        return JSON.parse(localStorage.getItem('post-title'))
      }
    }
  }
  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem('post-content')) {
        return JSON.parse(localStorage.getItem('post-content'))
      }
    }
  }

  const [theme] = useContext(ThemeContext)

  const [title, setTitle] = useState(savedTitle())
  const [content, setContent] = useState(savedContent())
  const [categories, setCategories] = useState([])
  const [loadedCategories, setLoadedCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setLoadedCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AdminLayout currentDefault="new-post">
      <Row>
        <Col span={14} offset={1}>
          <h1>Create new post</h1>
          <Input
            value={title}
            placeholder="Give your post a title"
            size="large"
            onChange={(e) => {
              setTitle(e.target.value)
              localStorage.setItem('post-title', JSON.stringify(e.target.value))
            }}
          />
          <br />
          <br />
          <div className="editor-scroll">
            <Editor
              dark={theme === 'light' ? false : true}
              defaultValue={content}
              onChange={(v) => {
                setContent(v())
                localStorage.setItem('post-content', JSON.stringify(v()))
              }}
              uploadImage={uploadImage}
            />
          </div>
          <br />
          <br />
          <pre>{JSON.stringify(loadedCategories, null, 4)}</pre>
        </Col>

        <Col span={6} offset={1}>
          <h4>Categories</h4>
          <Select
            mode="multiple"
            allowClear={true}
            style={{ width: '100%' }}
            onChange={(v) => setCategories(v)}
          >
            {loadedCategories.map((item) => (
              <Option key={item.name}>{item.name}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default NewPost
