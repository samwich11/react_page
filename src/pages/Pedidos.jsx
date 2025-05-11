import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import { Link } from "react-router-dom"

function Pedidos() {
    const [ListaPedidos, setListaPedidos] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaPedidos(data)
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Pedidos</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Fecha de Pedido</th>
                            <th>Nombre Ususario</th>
                            <th>Nombres</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListaPedidos.map(item =>
                            <tr key={item.idpedido}>
                                <td><Link to={"/pedidosdetalle/" + item.idpedido}>{item.idpedido}</Link></td>
                                <td>{item.fechapedido}</td>
                                <td>{item.usuario}</td>
                                <td>{item.nombres}</td>
                                <td>{item.total}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Pedidos