import React from 'react'

export const Contador = () => {
  return (
    <div className='contador-cont'>
    <div className='card-cont'>
        <h4>Total de Auditorias Registradas</h4>
        <p className='card-cont-numer' >01</p><p></p>
    </div>
    <div className='card-cont'>
        <h4>Total de Participantes Registrados</h4>
        <p className='card-cont-numer' >04</p><p></p>
    </div>
    <div className='card-cont'>
        <h4>Ultima Auditoria Fue Hace</h4>
        <p></p>
        <div><p className='card-cont-numer' >10</p><p className='text-center' >dias</p></div>
    </div>
    </div>
  )
}
