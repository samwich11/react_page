import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import "./Proveedores.css"

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState("")
    const [filasPagina, setFilasPagina] = useState(5)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalFilas, setTotalFilas] = useState(0)
    const [pagina, setPagina] = useState(0)
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [columnaAnterior, setColumnaAnterior] = useState("")

    const [idproveedor, setIdproveedor] = useState("")
    const [nombreempresa, setNombreEmpresa] = useState("")
    const [nombrecontacto, setNombreContacto] = useState("")
    const [cargocontacto, setCargoContacto] = useState("")
    const [direccion, setDireccion] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [region, setRegion] = useState("")
    const [codigopostal, setCodigoPostal] = useState("")
    const [pais, setPais] = useState("")
    const [telefono, setTelefono] = useState("")
    const [fax, setFax] = useState("")

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
                setTotalFilas(data.length)
                setTotalPaginas(Math.ceil(data.length / filasPagina))

            })
    }

    const seleccionarColumna = (event, columna) => {
        console.log(columna)
        let iconosOrden = document.querySelectorAll("#tabla-proveedores th i")
        iconosOrden.forEach(item => item.remove())

        let ascendente = estadoAscendente
        if (columna !== columnaAnterior) {
            ascendente = 1
        }
        else {
            ascendente = -ascendente
        }
        const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente
        )
        let icono = ascendente === 1 ? '<i class="bi bi-caret-down-fill"></i>' : '<i class="bi bi-caret-up-fill"></i>'
        event.currentTarget.innerHTML += icono


        setListaProveedoresFiltrados(resultado)
        setColumnaAnterior(columna)
        setEstadoAscendente(ascendente)
    }

    const dibujarTabla = () => {
        return (
            <table className="table" id="tabla-proveedores">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={(event) => seleccionarColumna(event, "nombreempresa")}>Empresa</th>
                        <th onClick={(event) => seleccionarColumna(event, "nombrecontacto")}>Contacto</th>
                        <th onClick={(event) => seleccionarColumna(event, "ciudad")}>Ciudad</th>
                        <th onClick={(event) => seleccionarColumna(event, "pais")}>País</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td><i className="bi bi-eye" title="Mostrar" data-bs-toggle="modal"
                                data-bs-target="#showModal" onClick={() => llenarCampos(item)}></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => retroceder()}>Retroceder</a></li>
                    {dibujarNumerosPaginacion()}
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => avanzar()}>Avanzar</a></li>
                </ul>
            </nav>
        )
    }

    const dibujarNumerosPaginacion = () => {
        return (
            <>
                {Array.from({ length: totalPaginas }).map((item, index) =>
                    <li className={index === pagina ? "page-item active" : "page-item"} key={index}>
                        <a className="page-link" href="#"
                            onClick={() => setPagina(index)}>
                            {index + 1}
                        </a>
                    </li>
                )}
            </>
        )
    }

    const retroceder = () => {
        if (pagina > 0) {
            setPagina(pagina - 1)
        }
    }
    const avanzar = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1)
        }
    }

    const dibujarShowModal = () => {
        return (
            <div className="modal fade" id="showModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">({idproveedor}) {nombreempresa}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => updateDirector(event)}>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Nombre contacto:</th>
                                            <td>{nombrecontacto}</td>
                                        </tr>
                                        <tr>
                                            <th>Cargo contacto:</th>
                                            <td>{cargocontacto}</td>
                                        </tr>
                                        <tr>
                                            <th>Dirección:</th>
                                            <td>{direccion}</td>
                                        </tr>
                                        <tr>
                                            <th>Ciudad:</th>
                                            <td>{ciudad}</td>
                                        </tr>
                                        <tr>
                                            <th>Región:</th>
                                            <td>{region}</td>
                                        </tr>
                                        <tr>
                                            <th>Código Postal</th>
                                            <td>{codigopostal}</td>
                                        </tr>
                                        <tr>
                                            <th>País:</th>
                                            <td>{pais}</td>
                                        </tr>
                                        <tr>
                                            <th>Teléfono:</th>
                                            <td>{telefono}</td>
                                        </tr>
                                        <tr>
                                            <th>Fax:</th>
                                            <td>{fax}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const llenarCampos = (item) => {
        setIdproveedor(item.idproveedor)
        setNombreEmpresa(item.nombreempresa)
        setNombreContacto(item.nombrecontacto)
        setCargoContacto(item.cargocontacto)
        setDireccion(item.direccion)
        setCiudad(item.ciudad)
        setRegion(item.region)
        setCodigoPostal(item.codigopostal)
        setPais(item.pais)
        setTelefono(item.telefono)
        setFax(item.fax)
    }

    return (
        <section id='proveedores' className='padded'>
            <div className="container">
                <h2>Proveedores</h2>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                        value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                </div>
                {dibujarTabla()}
                {dibujarPaginacion()}
                {dibujarShowModal()}
            </div>
        </section>
    )
}

export default Proveedores