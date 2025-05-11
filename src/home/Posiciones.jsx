import React from 'react'

function Posiciones() {


    return (
        <section className='padded'>
            <div className="container">
                <h2>Posiciones (top 10 mundial)</h2>
                <table className='table table-striped table-hover '>
                    <caption>Actualizado 2024</caption>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>País</th>
                            <th>Puntos actuales</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>USA</td>
                            <td>784.8</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>España</td>
                            <td>773.9</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Alemania</td>
                            <td>759.0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Serbia</td>
                            <td>757.9</td>
                            <td>+1</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Australia</td>
                            <td>756.3</td>
                            <td>-1</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Letonia</td>
                            <td>750.6</td>
                            <td>+2</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Canadá</td>
                            <td>746.2</td>
                            <td>-1</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Argentina</td>
                            <td>743.2</td>
                            <td>-1</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Francia</td>
                            <td>737.1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Lituania</td>
                            <td>713.1</td>
                            <td>0</td>
                        </tr>  
                    </tbody>

                </table>

            </div>
        </section>

    )
}

export default Posiciones