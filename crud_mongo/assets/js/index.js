const url = 'http://localhost:5000/tareas'
function listarTabla () {
  fetch(url)

    .then(response => response.json())

    .then(data => {
      console.log(data)
      document.getElementById('tabla').innerHTML = ''
      data.forEach(element => {
        document.getElementById('tabla').innerHTML += `<tr>
                        <td>${element.titulo}</td>
                        <td>${element.descripcion}</td>
                        <td>${formatFecha(element.fechaVencimineto)}</td>
                        <td>   
                            <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input" onclick="actualizarEstado(${element._id})" type="checkbox" id="estadoInput${element._id}" ${element.estado === true ? 'checked' : ''}>
                                <label class="form-check-label" for="userEstado" id="estado${element._id}">${element.estado === true ? 'Completado' : 'Pendiente'}</label>
                            </div>
                        </td>
                        <td class="d-flex justify-content-center"><a type="button" class="btn btn-primary" onClick="eliminarTarea('${element._id}')">Eliminar<i class="bi bi-trash-fill"></i></a></td>
                    </tr>`
      })
    })

    .catch(error => console.log(error))
}

function formatFecha (fechaString) {
  try {
    // Convertir la cadena de fecha en un objeto Date
    const fecha = new Date(fechaString)

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      throw new Error('Fecha inválida')
    }

    // Formatear la fecha en formato legible (YYYY-MM-DD HH:MM:SS)
    const opciones = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }

    return fecha.toLocaleString('es-ES', opciones).replace(',', '')
  } catch (error) {
    return 'Error al formatear la fecha'
  }
}

function crearTarea (datos) {
  fetch(url, {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json'

    },

    body: JSON.stringify(datos)

  })
    .then(response => response.json())

    .then(data => {
      console.log(data)
      listarTabla()
    })

    .catch(error => console.log(error))
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form')

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    const datos = {}
    datos.titulo = document.getElementById('titulo').value
    datos.descripcion = document.getElementById('descripcion').value
    datos.fechaVencimineto = document.getElementById('fecha').value
    datos.estado = false

    console.log('Datos del formulario:', datos)
    crearTarea(datos)
  })
})

function eliminarTarea (id) {
  fetch(`${url + '/' + id}`, {

    method: 'DELETE'

  })

    .then(response => response.json())

    .then(data => {
      console.log(data)
      listarTabla()
    })

    .catch(error => console.log(error))
}

function actualizarEstado (id, status) {
  if (status === false) {
    status = true
  } else {
    status = false
  }

  fetch(`${url + '/' + id}`, {

    method: 'PUT',

    headers: {

      'Content-Type': 'application/json'

    },

    body: JSON.stringify({ estado: status })

  })

    .then(response => response.json())

    .then(data => {
      console.log(data)
      listarTabla()
    })

    .catch(error => console.log(error))
}

listarTabla()// prueba de cambio
