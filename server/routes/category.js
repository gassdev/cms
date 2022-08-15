import express from 'express'

const router = express.Router()

// middelware
import { isAdmin, requireSignin } from '../middlewares/index'

// controllers
import {
  create,
  getAllCategories,
  removeCategory,
  updateCategory,
} from '../controllers/category'

router.post('/category', requireSignin, isAdmin, create)
router.get('/categories', getAllCategories)
router.delete('/category/:slug', requireSignin, isAdmin, removeCategory)
router.put('/category/:slug', requireSignin, isAdmin, updateCategory)

export default router
