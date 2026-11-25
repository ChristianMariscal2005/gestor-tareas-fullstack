const estadisticas = ({pendientes,  enProgreso, completadas})=>{

    return (
        <section className=" estadisticas">
            <article className="tarjeta">
                <h3>Tareas pendientes</h3>
                <p>{pendientes}</p>
            </article>

            <article className="tarjeta">
                <h3>En progreso</h3>
                <p>{enProgreso}</p>
            </article>

            <article className="tarjeta">
                <h3>Completadas</h3>
                <p>{completadas}</p>
            </article>
        </section>
    )
}

export default estadisticas;
