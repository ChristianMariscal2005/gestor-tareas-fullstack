
const ListaTareas = ({
  tareas,
  obtenerClaseEstado,
  obtenerEstadoFecha,
  eliminarTarea,
  cambiarEstado,
  editarTarea
}) => {

  return (
    <div className="contenedor-tareas">

      {tareas.map((tarea) => {

        const estadoFecha = obtenerEstadoFecha(tarea.fechaLimite)

        return (
          <article className="tarea" key={tarea.id}>

            <div className="informacion-tarea">
              <h3>{tarea.titulo}</h3>
              <p>{tarea.descripcion}</p>

              <p>
                Fecha límite: {tarea.fechaLimite || 'Sin fecha'}
              </p>

              <span className={`fecha ${estadoFecha.toLowerCase().replaceAll(' ', '-')}`}>
                {estadoFecha}
              </span>
            </div>

            <span className={obtenerClaseEstado(tarea.estado)}>
              {tarea.estado}
            </span>

            <span className={`prioridad ${tarea.prioridad?.toLowerCase() || 'media'}`}>
              Prioridad: {tarea.prioridad || 'Media'}
            </span>

            <button
              type="button"
              onClick={() => eliminarTarea(tarea.id)}
            >
              Eliminar
            </button>

            <button
              type="button"
              onClick={() => cambiarEstado(tarea.id)}
            >
              Cambiar estado
            </button>

            <button
              type="button"
              onClick={() => editarTarea(tarea.id)}
            >
              Editar
            </button>

          </article>
        )
      })}

      {tareas.length === 0 && (
        <p>No hay tareas para este filtro.</p>
      )}

    </div>
  )
}

export default ListaTareas
