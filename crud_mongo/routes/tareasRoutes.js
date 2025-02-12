const express = require('express')
const router = express.Router()
const tareaController = require('../controllers/tareasController')

router.get('/', tareaController.getTareas)
router.get('/:estado', tareaController.getTareasEstado)
router.post('/', tareaController.createTarea)
router.put('/:id', tareaController.updateTarea)
router.delete('/:id', tareaController.deleteTarea)

module.exports = router
