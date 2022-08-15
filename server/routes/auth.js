import express from 'express'

const router = express.Router()

// middelware
import { isAdmin, requireSignin } from '../middlewares/index'

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
} = require('../controllers/auth')

router.get('/', (req, res) => {
  return res.json({
    data: 'Welcome to our service',
  })
})
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/current-admin', requireSignin, isAdmin, currentUser)

export default router
