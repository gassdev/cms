import express from 'express'

const router = express.Router()

// middlewares
import { isAdmin, requireSignin } from '../middlewares'

// controllers
import { uploadImage } from '../controllers/post'

router.post('/upload-image', requireSignin, isAdmin, uploadImage)

export default router
