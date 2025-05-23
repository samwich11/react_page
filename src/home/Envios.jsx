import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from "../utils"

function Envios() {

    const [listaEnvios, setListaEnvios] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    /*
    function leerServicio(){
    }
    */

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "envios.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaEnvios(data)
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Envíos</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Telèfono</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEnvios.map(item =>
                            <tr key={item.idempresaenvio}>
                                <td>{item.idempresaenvio}</td>
                                <td>{item.nombre}</td>
                                <td>{item.telefono}</td>
                                <td>{item.latitud}</td>
                                <td>{item.longitud}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Envios