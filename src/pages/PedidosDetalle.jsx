import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiWebURL } from "../utils"
import nofoto from "./../assets/images/nofoto.jpg"
import "./PedidosDetalle.css"



function PedidosDetalle() {
    const params = useParams()
    console.log(params)

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState([])

    useEffect(() => {

        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + params.idpedido
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPedidoSeleccionado(data)
            })
    }


    return (
        <>
            <div className='row'>
                <h2 className="text-center mt-5 mb-5">Pedido: {params.idpedido}</h2>
            </div>
            <section className='pedidos container detalles'>
                <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4 container">
                    {pedidoSeleccionado.map(item =>
                        <div className="col" key={item.idpedido}>
                            <div className="card">
                                <img src={item.imagenchica === null
                                    ? nofoto
                                    : ApiWebURL + item.imagenchica}
                                    className="card-img-top card-body card-tite" alt={item.nombre} />
                                <table className="table table-sm table-striped table-bordered">
                                    <tbody>
                                    <tr>
                                        <th>ID Producto:</th>
                                        <td>{item.idproducto}</td>
                                    </tr>
                                    <tr>
                                        <th>Precio:</th>
                                        <td>S/ {parseFloat(item.precio).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th>Cantidad:</th>
                                        <td>{item.cantidad}</td>
                                    </tr>
                                    <tr>
                                        <th>Nombre:</th>
                                        <td>{item.nombre}</td>
                                    </tr>
                                    <tr>
                                        <th>Detalle</th>
                                        <td>{item.detalle}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </>
    )
}

export default PedidosDetalle