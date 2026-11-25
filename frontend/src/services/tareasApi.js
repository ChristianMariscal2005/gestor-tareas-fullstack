
const API_URL = 'http://localhost:3000/tareas'

export const obtenerTareas = async () => {
  const respuesta = await fetch(API_URL)

  if (!respuesta.ok) {
    throw new Error('Error al obtener las tareas')
  }

  return await respuesta.json()
}

export const crearTarea = async (datos) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    throw new Error('Error al crear la tarea')
  }

  return await respuesta.json()
}

export const editarTarea = async (id, datos) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    throw new Error('Error al editar la tarea')
  }

  return await respuesta.json()
}

export const eliminarTarea = async (id)=>{
  const respuesta = await fetch(`${API_URL}/${id}`,{
    method: 'DELETE',
  })

  if(!respuesta.ok){
    throw new Error('Error al eliminar la tarea')
  }

  return await respuesta.json()
}