import Category from '../models/category'
import slugify from 'slugify'

export const create = async (req, res) => {
  const { name } = req.body
  const categoryExists = await Category.findOne({ name })
  // console.log(categoryExists)
  // return
  if (categoryExists) {
    return res.json({
      error: 'Category already exists',
    })
  }
  try {
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save()

    // console.log('saved category ==> ', category)
    res.json(category)
  } catch (err) {
    console.log(err)
  }
}

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 })
    res.json(categories)
  } catch (err) {
    console.log(err)
  }
}

export const removeCategory = async (req, res) => {
  try {
    const { slug } = req.params
    const category = await Category.findOneAndDelete({ slug })
    res.json(category)
  } catch (err) {
    console.log(err)
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { slug } = req.params
    const prevCategory = await Category.findOne({ slug })
    const { name } = req.body
    const categoryExists = await Category.findOne({ name })
    // console.log(categoryExists)
    // return
    if (categoryExists && categoryExists.name !== prevCategory.name) {
      return res.json({
        error: 'Category already exists',
      })
    }
    const category = await Category.findOneAndUpdate(
      { slug },
      {
        name,
        slug: slugify(name),
      },
      { new: true },
    )
    res.json(category)
  } catch (err) {
    console.log(err)
  }
}
