import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import './EmpleadosSeleccionados.css'

function Empleados() {

    const [listaEmpleados, setListaEmpleados] = useState([])
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "empleados.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaEmpleados(data)
                // seleccionarEmpleado(data[0])
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2  g-4">

            {listaEmpleados.map(item =>
                <div className="col"  key={item.idempleado}>
                    <div className="card">
                        <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt={item.nombres} />
                        <div className="card-body">
                            <h5 className="card-title seagreencolor">{item.nombres} {item.apellidos} <i class="bi bi-person-up icono-seleccionar-empleado" 
                                onClick={() => agregarEmpleado(item)}
                                title="Añadir empleado"
                                ></i></h5>
                            <p className="card-text">{item.cargo}</p>
                        </div>
                    </div>
                </div>
            )}

            </div>
        )
    }

    // const agregarEmpleado = (item) => {
    //     console.log(item)
    //     setEmpleadoSeleccionado(item)
    // }
    
     const agregarEmpleado = (item) => {
        console.log(item)
        let empleados = []
        if (sessionStorage.getItem("carritoempleados")){
            empleados = JSON.parse(sessionStorage.getItem("carritoempleados"))
            let index = -1
            for(let i=0; i<empleados.length; i++){
                if(item.idempleado === empleados[i].idempleado){
                    index = i
                    break
                }
            }
            if(index === -1){
                empleados.push(item)
            }
        }
        else{
            empleados.push(item)
        }
        sessionStorage.setItem("carritoempleados",JSON.stringify(empleados))
    }

    return (
        <section id='empleados' className='padded'>
            <div className="container">
                <h2>Empleados</h2>
                {dibujarCuadricula()}
            </div>
        </section>
    )
}

export default Empleados