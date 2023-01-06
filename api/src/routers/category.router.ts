import express from 'express'
import dotenv from 'dotenv'
import { createCategory,
         deleteCategory,
         updateCategory,
         getCategory,
         getAllCategories } from '../controllers/category.controller'

 dotenv.config()
const router = express.Router()

router.get('/', getAllCategories)
router.post('/', createCategory)
router.get('/:categoryId', getCategory)

router.put('/:categoryId', updateCategory)
router.delete('/:categoryId', deleteCategory)

export default router
