require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/db')

const app = express()
app.use(express.json())
app.use(cors())

// Conectar a MongoDB
connectDB()

// Importar rutas
const tareasRoutes = require('./routes/tareasRoutes')

app.use('/tareas', tareasRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`))
