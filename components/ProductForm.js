import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

const initialParticipant = {
  nombre: '',
  apellido: '',
  dni: '',
  representacion: ''
};

export default function ProductForm({
  _id,
  interes: existingInteres,
  sintesis: existingSintesis,
  motivo: existingMotivo,
  direccion: existingDireccion,
  lugar: existingLugar,
  fecha: existingFecha,
  participants:existingParticipants
}) {
  const router = useRouter(); // Agrega la instancia de useRouter
  const [interes, setInteres] = useState(existingInteres || '');
  const [sintesis, setSintesis] = useState(existingSintesis || '');
  const [motivo, setMotivo] = useState(existingMotivo || '');
  const [direccion, setDireccion] = useState(existingDireccion || '');
  const [lugar, setLugar] = useState(existingLugar || '');
  const [fecha, setFecha] = useState(existingFecha || '');

  const [participants, setParticipants] = useState(existingParticipants || []);
  const [goToAuditorias,setGoToAuditorias] = useState(false);




  
  const addParticipant = () => {
    setParticipants([
      ...participants,
      { 
        nombre: '', 
        apellido: '', 
        dni: '', 
        representacion: '',
        enRepresentacionde:''
      }
    ]);
  };
  
  const removeParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };
  
  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };
    // useEffect(()=>{
    //     axios.get('/api/categories').then(result =>{
    //         setCategories(result.data);
    //     })
    // }, []);
    async function saveProduct(ev){
        ev.preventDefault();
        const data = {
          interes,
          sintesis,
          motivo,
          direccion,
          lugar,
          fecha,
          participants,
        };
        
    console.log('Datos del formulario:', data);
        if(_id){
            //update
            await axios.put('/api/products',{...data,_id});
        }else{
            //create
            await axios.post('/api/products', data);
        }
        setGoToAuditorias(true);
    }
    if (goToAuditorias){
        router.push('/products');
    }

    return(
            <form onSubmit={saveProduct}>
            

           <div  className="div-form  "  >
           <h1>Datos Audiencia</h1>
            <label>Interés invocado</label>
            <input 
              type='text' 
              placeholder="Interés invocado"
              value={interes}
              onChange={ev => setInteres(ev.target.value)}
            />

            <label>Sintesis</label>
            <textarea 
              placeholder="Redacta Una Sintesis Adecuada"
              value={sintesis}
              onChange={ev => setSintesis(ev.target.value)}
            />

            <label>Motivo</label>
            <input 
            type="text" 
            placeholder="Motivo de la Audiencia" 
            value={motivo}
            onChange={ev => setMotivo(ev.target.value)}
            />
            
            <label>Direccion</label>
            <input 
              type="text" 
              placeholder="Direccion en Donde fue Realizada" 
              value={direccion}
              onChange={ev => setDireccion(ev.target.value)}
              />

            <label>Lugar</label>
            <input 
              type="text" 
              placeholder="Lugar en el que se Realizo la Audiencia" 
              value={lugar}
              onChange={ev => setLugar(ev.target.value)}
              />


              <label>Fecha y Hora</label>
              <input 
              type="date" 
              value={fecha}
              onChange={ev => setFecha(ev.target.value)}
              />
              </div>

              <div className="div-form mt-4 mb-4" >
              <h1 className="block">Participantes de La Audiencia</h1>
              <button onClick={addParticipant} type="button" className="btn-primary  text-sm mb-2">
              Agregar Participante
      </button>
      {participants.length > 0 &&
        participants.map((participant, index) => (
          <div className="flex  gap-1 mb-2" key={index}>
            <input
              type="text"
              value={participant.nombre}
              onChange={(e) => handleParticipantChange(index, 'nombre', e.target.value)}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={participant.apellido}
              onChange={(e) => handleParticipantChange(index, 'apellido', e.target.value)}
              placeholder="Apellido"
            />
            <input
              type="text"
              value={participant.dni}
              onChange={(e) => handleParticipantChange(index, 'dni', e.target.value)}
              placeholder="DNI"
            />
              <input
              type="text"
              value={participant.enRepresentacionde}
              onChange={(e) => handleParticipantChange(index, 'enRepresentacionde', e.target.value)}
              placeholder="Representacion"
            />
           <select
        value={participant.representacion}
        onChange={(e) => handleParticipantChange(index, 'representacion', e.target.value)}
      >
        <option value="">Selecciona un Participante</option>
        <option value="Sujeto Obligado">Sujeto Obligado</option>
        <option value="Solicitante">Solicitante</option>
        <option value="Otros Participantes">Otros Participantes</option>
      </select>
            <button
              onClick={() => removeParticipant(index)}
              type="button"
              className="btn-red"
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>
          </div>
        ))}
        </div>
      <button type="submit" className="btn-primary">
        Guardar
      </button>
              </form>
    )
}