const mongoose = require('mongoose')

const TareasSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaVencimineto: Date,
  estado: Boolean
}, { versionKey: false })

module.exports = mongoose.model('Tareas', TareasSchema)
