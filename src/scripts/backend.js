const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 3000

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('estudiantes.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message)
  } else {
    console.log('Conexión a la base de datos SQLite establecida')
    // Crear tabla si no existe
    db.run(
      `CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ci TEXT UNIQUE,
      nombre TEXT,
      apellido TEXT,
      grado TEXT,
      sexo TEXT
    )`,
      (err) => {
        if (err) {
          console.error('Error al crear la tabla:', err.message)
        } else {
          console.log('Tabla estudiantes creada correctamente')
        }
      }
    )
  }
})

// Ruta para agregar estudiante
app.post('/agregar_estudiante', (req, res) => {
  const { ci, nombre, apellido, grado, sexo } = req.body

  // Verificar si el CI ya está registrado
  db.get('SELECT * FROM estudiantes WHERE ci = ?', [ci], (err, row) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ success: false, error: err.message })
      return
    }

    if (row) {
      res
        .status(400)
        .json({ success: false, error: 'La cédula ya está registrada' })
      return
    }

    // Insertar estudiante si el CI no está registrado
    const sql =
      'INSERT INTO estudiantes (ci, nombre, apellido, grado, sexo) VALUES (?, ?, ?, ?, ?)'
    const values = [ci, nombre, apellido, grado, sexo]

    db.run(sql, values, function (err) {
      if (err) {
        console.error('Error al insertar estudiante:', err)
        res.status(500).json({ success: false, error: err.message })
        return
      }
      console.log(`Estudiante agregado con ID: ${this.lastID}`)
      res.json({ success: true })
    })
  })
})

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`)
})
