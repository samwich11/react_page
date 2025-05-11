import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import './EmpleadosSeleccionados.css'

function EmpleadosSeleccionados() {
    const [ListaEmpleados, setListaEmpleados] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const datosEmpleados = JSON.parse(sessionStorage.getItem("carritoempleados"))
        setListaEmpleados(datosEmpleados)
        console.log(datosEmpleados)
        if (datosEmpleados !== null) {
            //  dibujarTabla()
        }
    }


    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "1%" }}>Id</th>
                        <th style={{ width: "12%" }} className="text-center centrar-texto">Nombre</th>
                        <th style={{ width: "5%" }} className="text-center centrar-texto">Cargo</th>
                        <th style={{ width: "14%" }} className="text-center">Fecha Contratación</th>
                        <th style={{ width: "8%" }} className="text-center">País</th>
                        <th style={{ width: "10%" }} className="text-center">Teléfono</th>
                        <th style={{ width: "10%" }} className="text-center">Foto</th>
                        <th style={{ width: "1%" }} className="text-center">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaEmpleados !== null
                    ?ListaEmpleados.map(item =>
                        <tr key={item.idempleado}>
                            <td className="text-center centrar-texto">{item.idempleado}</td>
                            <td className="text-center centrar-texto">{item.nombres} {item.apellidos}</td>
                            <td className="text-center centrar-texto">{item.cargo}</td>
                            <td className="text-center centrar-texto">{item.fechacontratacion}</td>
                            <td className="text-center centrar-texto">{item.pais}</td>
                            <td className="text-center centrar-texto">{item.telefono}</td>
                            <td><img src={item.foto === null
                                ? noFoto
                                : ApiWebURL + "fotos/"+ item.foto}
                                className="img-fluid w-50 mx-auto d-block" alt={item.nombre} /></td>
                                
                            <td className="text-center centrar-texto" ><i className="bi bi-x-lg icono-eliminar" title="Eliminar" 
                                    onClick={() => eliminarEmpleado(item)}></i></td>
                        </tr>
                    ):<div className="alert alert-warning" role="alert">
                        No hay empleados para mostrar
                    </div>}
                </tbody>
            </table>
        )
    }

    const eliminarEmpleado = (item) => {
        let empleadoMenos = ListaEmpleados.filter(itemCart => itemCart.idempleado !== item.idempleado)
        setListaEmpleados(empleadoMenos)
        sessionStorage.setItem("carritoempleados", JSON.stringify(empleadoMenos))
        dibujarTabla()
    }

    const vaciarEmpleados = () => {
        setListaEmpleados([])
        sessionStorage.setItem("carritoempleados", JSON.stringify([]))
        dibujarTabla()
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Empleados Seleccionados</h2>
                {dibujarTabla()}
                <button className='btn btn-danger' 
                    onClick={() => vaciarEmpleados()}>Vaciar empleados</button>

            </div>

        </section>
    )
}

export default EmpleadosSeleccionados