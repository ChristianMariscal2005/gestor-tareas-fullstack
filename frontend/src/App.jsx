
import { useState, useEffect } from 'react'
import {
  obtenerTareas,
  crearTarea,
  editarTarea as actualizarTarea,
  eliminarTarea as eliminarTareaAPI,
}from './services/tareasApi'

import BarraLateral from './components/BarraLateral'
import Estadisticas from './components/Estadisticas'
import FormularioTarea from './components/FormularioTarea'
import FiltrosTareas from './components/FiltrosTareas'
import ListaTareas from './components/ListaTareas'

function App() {

  // Cargar tareas desde localStorage
  const [tareas, setTareas] = useState([])

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaLimite, setFechaLimite] = useState('')
  const [error, setError] = useState('')

  const [filtro, setFiltro] = useState('Todas')
  const [filtroNotificacion, setFiltroNotificacion] = useState('Todas')
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  const [tareaEditando, setTareaEditando] = useState(null)
  const [tituloEdicion, setTituloEdicion] = useState('')
  const [descripcionEdicion, setDescripcionEdicion] = useState('')
  const [fechaLimiteEdicion, setFechaLimiteEdicion] = useState('')

  const [prioridad, setPrioridad] = useState('Media')
  const [prioridadEdicion, setPrioridadEdicion] = useState('Media')

  const [ordenPrioridad, setOrdenPrioridad] = useState('ninguno')
  const [cargando, setCargando] = useState(true)
  const [errorApi, setErrorApi] = useState('') 

  // Guardar tareas automáticamente
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const datos = await obtenerTareas()
        setTareas(
          datos.map((tarea)=>({
            ...tarea,
            fechaLimite: tarea.fecha_limite || '',
          }))
        )
      } catch (error) {
        console.error('Error al cargar tareas:', error)
        setErrorApi('No se pudieron cargar las tareas desde el servidor')
      } finally {
        setCargando(false)
      }
    }

    cargarTareas()
  }, [])

  // Agregar una tarea
  const agregarTarea = async () => {
  if (!titulo.trim()) {
    setError('El título es obligatorio')
    return
  }

  try {
    const nuevaTarea = {
      titulo,
      descripcion,
      prioridad,
      estado: 'Pendiente',
      fecha_limite: fechaLimite || null,
      usuario_id: 1,
    }

    await crearTarea(nuevaTarea)

    const datos = await obtenerTareas()

    setTareas(
      datos.map((tarea) => ({
        ...tarea,
        fechaLimite: tarea.fecha_limite || '',
      }))
    )

    setTitulo('')
    setDescripcion('')
    setFechaLimite('')
    setPrioridad('Media')
    setError('')
  } catch (error) {
    console.error('Error al crear tarea:', error)
    setErrorApi('No se pudo guardar la tarea en el servidor')
  }
}

  // Eliminar una tarea
const eliminarTarea = async (id) => {
  try {
    setErrorApi('')

    await eliminarTareaAPI(id)

    setTareas((tareasAnteriores) =>
      tareasAnteriores.filter((tarea) => tarea.id !== id)
    )
    setErrorApi('')
  } catch (error) {
    console.error(error)
    setErrorApi('No se pudo eliminar la tarea. Intenta nuevamente.')
  }
}

  // Cambiar el estado de una tarea
const cambiarEstado = async (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id)

  if (!tarea) return

  let nuevoEstado = 'Pendiente'

  if (tarea.estado === 'Pendiente') {
    nuevoEstado = 'En progreso'
  } else if (tarea.estado === 'En progreso') {
    nuevoEstado = 'Completada'
  }

  try {
    setErrorApi('')

    await actualizarTarea(id, {
      estado: nuevoEstado,
    })

    setTareas((tareasAnteriores) =>
      tareasAnteriores.map((tarea) =>
        tarea.id === id
          ? { ...tarea, estado: nuevoEstado }
          : tarea
      )
    )
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    setErrorApi('No se pudo actualizar el estado de la tarea')
  }
}

  // Editar una tarea
  const editarTarea = (id) => {
    const tareaSeleccionada = tareas.find(
      (tarea) => tarea.id === id
    )

    if (!tareaSeleccionada) {
      return
    }

    setTareaEditando(tareaSeleccionada)
    setTituloEdicion(tareaSeleccionada.titulo)
    setDescripcionEdicion(tareaSeleccionada.descripcion)
    setPrioridadEdicion(tareaSeleccionada.prioridad || 'Media')
    setFechaLimiteEdicion(tareaSeleccionada.fechaLimite || '')
  }

  // Guardar edición

const guardarEdicion = async (evento) => {
  evento.preventDefault()

  if (!tituloEdicion.trim() || !descripcionEdicion.trim()) {
    return
  }

  try {
    const datosActualizados = {
      titulo: tituloEdicion.trim(),
      descripcion: descripcionEdicion.trim(),
      prioridad: prioridadEdicion,
      estado: tareaEditando.estado,
      fecha_limite: fechaLimiteEdicion || null,
    }

    await actualizarTarea(tareaEditando.id, datosActualizados)

    const datos = await obtenerTareas()

    setTareas(
      datos.map((tarea) => ({
        ...tarea,
        fechaLimite: tarea.fecha_limite
          ? String(tarea.fecha_limite).slice(0, 10)
          : '',
      }))
    )

    setTareaEditando(null)
    setTituloEdicion('')
    setDescripcionEdicion('')
    setPrioridadEdicion('Media')
    setFechaLimiteEdicion('')
  } catch (error) {
    console.error('Error al editar tarea:', error)
    setErrorApi('No se pudieron guardar los cambios de la tarea')
  }
}


  // Cancelar edición
  const cancelarEdicion = () => {
    setTareaEditando(null)
    setTituloEdicion('')
    setDescripcionEdicion('')
    setPrioridadEdicion('Media')
    setFechaLimiteEdicion('')
  }

  // Calcular estadísticas
  const cantidadPendientes = tareas.filter(
    (tarea) => tarea.estado === 'Pendiente'
  ).length

  const cantidadEnProgreso = tareas.filter(
    (tarea) => tarea.estado === 'En progreso'
  ).length

  const cantidadCompletadas = tareas.filter(
    (tarea) => tarea.estado === 'Completada'
  ).length

  // Obtener clase CSS según el estado
  const obtenerClaseEstado = (estado) => {
    if (estado === 'Pendiente') {
      return 'estado pendiente'
    }

    if (estado === 'En progreso') {
      return 'estado progreso'
    }

    return 'estado completada'
  }

  // Obtener estado de la fecha límite
  const obtenerEstadoFecha = (fechaLimite) => {
    if (!fechaLimite) {
      return 'Sin fecha'
    }

    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    const fechaTarea = new Date(`${fechaLimite}T00:00:00`)

    if (fechaTarea < hoy) {
      return 'Vencida'
    }

    if (fechaTarea.getTime() === hoy.getTime()) {
      return 'Vence hoy'
    }

    return 'A tiempo'
  }


  const obtenerDiasRestantes = (fechaLimite)=>{
    if(!fechaLimite){
      return null
    }

    const hoy = new Date()
    hoy.setHours(0,0,0,0)

    const fechaTarea = new Date(`${fechaLimite}T00:00:00`)

    const diferencia = fechaTarea.getTime() - hoy.getTime()

    return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
  }

  const tareasConAlertas = tareas.filter((tarea)=>{
    const diasRestantes = obtenerDiasRestantes(tarea.setFechaLimite)

    return (
      tarea.estado !== 'completada' &&
      diasRestantes !== null &&
      diasRestantes <= 3 
    )
  })

  const tareasVencidas = tareas.filter((tarea)=>{
    const dias = obtenerDiasRestantes(tarea.fechaLimite)

    return tarea.estado !== 'Completaa' && dias !== null && dias < 0
  })

  const tareasVencenHoy = tareas.filter((tarea)=>{
    const dias = obtenerDiasRestantes(tarea.fechaLimite0)

    return tarea.estado !== 'Completada'  && dias===0
  })

  const tareasProximas = tareas.filter((tarea)=>{
    const dias = obtenerDiasRestantes(tarea.fechaLimite)

    return tarea.estado !== 'Completada'  && dias >= 1 && dias<=3
  })



const notificacionesFiltradas =
  filtroNotificacion === 'Vencidas'
    ? tareasVencidas
    : filtroNotificacion === 'Hoy'
      ? tareasVencenHoy
      : filtroNotificacion === 'Proximas'
        ? tareasProximas
        : [...tareasVencidas, ...tareasVencenHoy, ...tareasProximas]



  // Filtrar tareas


  const tareasFiltradas = tareas.filter((tarea) => {

    const coincideEstado =
      filtro === 'Todas' || tarea.estado === filtro

    const coincideBusqueda =
      tarea.titulo.toLowerCase().includes(busqueda.toLowerCase())

    const coincidePrioridad =
      filtroPrioridad === 'Todas' ||
      tarea.prioridad === filtroPrioridad

    return coincideEstado && coincideBusqueda && coincidePrioridad
  })

  // Ordenar tareas por prioridad
  const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {

    const prioridades = {
      Alta: 3,
      Media: 2,
      Baja: 1
    }

    return prioridades[b.prioridad] - prioridades[a.prioridad]
  })

  ///////////////////////////////////////////////////////
  return (
    <div className="app">

      <BarraLateral />

      <main className="contenido-principal">

        <header>
          <h1>Panel principal</h1>
          <p>Bienvenido a TaskFlow. Organiza tus actividades.</p>
        </header>

        {error && <p className="mensaje-error">{error}</p>}
        {cargando && <p>Cargando tareas desde el servidor...</p> }
        {errorApi && <p className='mensaje-error'>{errorApi}</p> }

        {tareasConAlertas.length > 0 && (

<section className="centro-notificaciones">

  <h2>Centro de notificaciones</h2>

  <div className="resumen-notificaciones">

    <button
      type="button"
      className="resumen vencidas"
      onClick={() => setFiltroNotificacion('Vencidas')}
    >
      <strong>{tareasVencidas.length}</strong>
      <span>Vencidas</span>
    </button>

    <button
      type="button"
      className="resumen hoy"
      onClick={() => setFiltroNotificacion('Hoy')}
    >
      <strong>{tareasVencenHoy.length}</strong>
      <span>Vencen hoy</span>
    </button>

    <button
      type="button"
      className="resumen proximas"
      onClick={() => setFiltroNotificacion('Proximas')}
    >
      <strong>{tareasProximas.length}</strong>
      <span>Próximas</span>
    </button>

  </div>

  <div className="lista-notificaciones">

    <button
      type="button"
      onClick={() => setFiltroNotificacion('Todas')}
    >
      Ver todas
    </button>

    {notificacionesFiltradas.map((tarea) => (
      <article className="notificacion" key={tarea.id}>

        <strong>{tarea.titulo}</strong>

        <p>{obtenerEstadoFecha(tarea.fechaLimite)}</p>

        <button
          type="button"
          onClick={() => editarTarea(tarea.id)}
        >
          Editar tarea
        </button>

      </article>
    ))}

    {notificacionesFiltradas.length === 0 && (
      <p>No tienes notificaciones en esta categoría.</p>
    )}

  </div>

</section>

        )}

        <Estadisticas
          pendientes={cantidadPendientes}
          enProgreso={cantidadEnProgreso}
          completadas={cantidadCompletadas}
        />

        <section className="lista-tareas">

          <FormularioTarea
            titulo={titulo}
            setTitulo={setTitulo}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            prioridad={prioridad}
            setPrioridad={setPrioridad}
            fechaLimite={fechaLimite}
            setFechaLimite={setFechaLimite}
            error={error}
            agregarTarea={agregarTarea}
          />

          <h2>Mis tareas</h2>

          <input
            className="buscador-tareas"
            type="text"
            placeholder="Buscar tarea..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />

          <FiltrosTareas
            setFiltro={setFiltro}
            setFiltroPrioridad={setFiltroPrioridad}
          />

          <div className="ordenamiento">
            <label>Ordenar por prioridad:</label>

            <select
              value={ordenPrioridad}
              onChange={(evento) => setOrdenPrioridad(evento.target.value)}
            >
              <option value="ninguno">Orden original</option>
              <option value="prioridad">Mayor prioridad primero</option>
            </select>
          </div>

          <ListaTareas
            tareas={
              ordenPrioridad === 'prioridad'
                ? tareasOrdenadas
                : tareasFiltradas
            }
            obtenerClaseEstado={obtenerClaseEstado}
            obtenerEstadoFecha={obtenerEstadoFecha}
            eliminarTarea={eliminarTarea}
            cambiarEstado={cambiarEstado}
            editarTarea={editarTarea}
          />

          {tareaEditando && (
            <form
              className="formulario-edicion"
              onSubmit={guardarEdicion}
            >
              <h2>Editar tarea</h2>

              <input
                type="text"
                placeholder="Título"
                value={tituloEdicion}
                onChange={(evento) => setTituloEdicion(evento.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={descripcionEdicion}
                onChange={(evento) => setDescripcionEdicion(evento.target.value)}
              />

              <select
                value={prioridadEdicion}
                onChange={(evento) => setPrioridadEdicion(evento.target.value)}
              >
                <option value="Baja">Prioridad Baja</option>
                <option value="Media">Prioridad Media</option>
                <option value="Alta">Prioridad Alta</option>
              </select>

              <input
                type="date"
                value={fechaLimiteEdicion}
                onChange={(evento) => setFechaLimiteEdicion(evento.target.value)}
              />

              <div className="acciones-edicion">

                <button type="submit">
                  Guardar cambios
                </button>

                <button type="button" onClick={cancelarEdicion}>
                  Cancelar
                </button>

              </div>
            </form>
          )}

        </section>

      </main>

    </div>
  )
}

export default App
