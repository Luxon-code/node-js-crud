const Tareas = require('../models/Tareas')

exports.getTareas = async (req, res) => {
  const tareas = await Tareas.find()
  res.json(tareas)
}

exports.getTareasEstado = async (req, res) => {
  const tarea = await Tareas.find({ estado: req.params.estado })
  res.json(tarea)
}

exports.createTarea = async (req, res) => {
  const newTarea = new Tareas(req.body)
  await newTarea.save()
  res.json(newTarea)
}

exports.updateTarea = async (req, res) => {
  const updatedTarea = await Tareas.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedTarea)
}

exports.deleteTarea = async (req, res) => {
  await Tareas.findByIdAndDelete(req.params.id)
  res.json({ message: 'Usuario eliminado' })
}
