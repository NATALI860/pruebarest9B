const express = require('express')
const router = express.Router()
const ejercicioController = require('../controllers/ejercicioController')

router.get('/ejercicios', ejercicioController.buscarTodo)
.post('/ejercicios',ejercicioController.guardarEjercicio)
.get('/ejercicios/:key/:value',ejercicioController.buscarEjercicio,ejercicioController.mostrarEjercicio)
.delete('/ejercicios/:key/:value',ejercicioController.buscarEjercicio,ejercicioController.eliminarEjercicio)
.put('/ejercicios/:key/:value', ejercicioController.buscarEjercicio, ejercicioController.actualizarEjercicio)


module.exports=router