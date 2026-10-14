import express from 'express'
import { createCar, getCars, editCar, deleteCar, getCarById } from '../controllers/controllers.js'


const router = express.Router()
router.post('/', createCar)
router.get('/', getCars)
router.patch('/:id', editCar)
router.delete('/:id', deleteCar)
router.get('/:id', getCarById)
export default router