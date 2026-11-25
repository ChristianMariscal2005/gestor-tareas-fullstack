
const FiltrosTareas = ({
  setFiltro,
  setFiltroPrioridad
}) => {
  return (
    <div className="filtros">

      <div className="filtros-estado">
        <h3>Filtrar por estado</h3>

        <button type="button" onClick={() => setFiltro('Todas')}>
          Todas
        </button>

        <button type="button" onClick={() => setFiltro('Pendiente')}>
          Pendientes
        </button>

        <button type="button" onClick={() => setFiltro('En progreso')}>
          En progreso
        </button>

        <button type="button" onClick={() => setFiltro('Completada')}>
          Completadas
        </button>
      </div>

      <div className="filtros-prioridad">
        <h3>Filtrar por prioridad</h3>

        <button type="button" onClick={() => setFiltroPrioridad('Todas')}>
          Todas
        </button>

        <button type="button" onClick={() => setFiltroPrioridad('Baja')}>
          Baja
        </button>

        <button type="button" onClick={() => setFiltroPrioridad('Media')}>
          Media
        </button>

        <button type="button" onClick={() => setFiltroPrioridad('Alta')}>
          Alta
        </button>
      </div>

    </div>
  )
}

export default FiltrosTareas
