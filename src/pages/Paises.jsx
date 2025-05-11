import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from "../utils"

function Paises() {

    const [listaPaises, setListaPaises] = useState([])
    const [codigo, setCodigo] = useState("")
    const [pais, setPais] = useState("")
    const [capital, setCapital] = useState("")
    const [area, setArea] = useState("")
    const [poblacion, setPoblacion] = useState("")
    const [continente, setContinente] = useState("")

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "paises.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaPaises(data)
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Código</th>
                        <th>País</th>
                        <th>Capital</th>
                        <th>Área</th>
                        <th>Población</th>
                        <th>Continente</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPaises.map(item =>
                        <tr key={item.idpais}>
                            <td>{item.idpais}</td>
                            <td>{item.codpais}</td>
                            <td>{item.pais}</td>
                            <td>{item.capital}</td>
                            <td>{item.area}</td>
                            <td>{item.poblacion}</td>
                            <td>{item.continente}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Nuevo País</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertPais(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Código"
                                        required minLength="3" maxLength="3"
                                        value={codigo} onChange={(event) => setCodigo(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="País"
                                        required minLength="2" maxLength="30"
                                        value={pais} onChange={(event) => setPais(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Capital"
                                        required minLength="2" maxLength="30"
                                        value={capital} onChange={(event) => setCapital(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Área"
                                        // required minLength="1" maxLength="20"
                                        value={area} onChange={(event) => setArea(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Población"
                                        // required minLength="1" maxLength="20"
                                        value={poblacion} onChange={(event) => setPoblacion(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Continente"
                                        required minLength="2" maxLength="2"
                                        value={continente} onChange={(event) => setContinente(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const insertPais = (event) => {
        event.preventDefault()
        console.log(codigo + "  - -  " + pais + "  - -  " + capital + "  - -  " + area + "  - -  " + poblacion + "  - -  " + continente)

        const rutaServicio = ApiWebURL + "paisesinsert.php"

        let formData = new FormData()
        formData.append("codpais", codigo)
        formData.append("pais", pais)
        formData.append("capital", capital)
        formData.append("area", area)
        formData.append("poblacion", poblacion)
        formData.append("continente", continente)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                leerServicio()
                setCodigo("")
                setPais("")
                setCapital("")
                setArea("")
                setPoblacion("")
                setContinente("")
                document.querySelector("#insertModal .btn-close").click()
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Países</h2>
                <div className="mb-3">
                    <button className="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#insertModal">Nuevo País</button>
                </div>
                {dibujarTabla()}
                {dibujarInsertModal()}
            </div>

        </section>
    )
}

export default Paises