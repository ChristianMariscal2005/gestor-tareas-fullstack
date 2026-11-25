
const FormularioTarea = ({
  titulo,
  setTitulo,
  descripcion,
  setDescripcion,
  prioridad,
  setPrioridad,
  fechaLimite,
  setFechaLimite,
  error,
  agregarTarea
}) => {
  return (
    <>
      <form
        className="formulario-tarea"
        onSubmit={(evento)=>{
          evento.preventDefault()
          agregarTarea()
        }}
      >
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={titulo}
          onChange={(evento) =>{setTitulo(evento.target.value)}}
        />

        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
        />

        <select
          value={prioridad}
          onChange={(evento) => setPrioridad(evento.target.value)}
        >
          <option value="Baja">Prioridad Baja</option>
          <option value="Media">Prioridad Media</option>
          <option value="Alta">Prioridad Alta</option>
        </select>

        <input
          type="date"
          value={fechaLimite}
          onChange={(evento) => setFechaLimite(evento.target.value)}
        />

        <button type="submit">
          Agregar tarea
        </button>
      </form>

      {error && <p>{error}</p>}
    </>
  )
}

export default FormularioTarea
