import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState({});

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    const participantsByProduct = {};
    products.forEach(product => {
      const participants = product.participants;
      if (Array.isArray(participants)) {
        participants.forEach(participant => {
          const { nombre, apellido, dni, representacion } = participant;
          if (!participantsByProduct[product._id]) {
            participantsByProduct[product._id] = {};
          }
          if (!participantsByProduct[product._id][representacion]) {
            participantsByProduct[product._id][representacion] = [];
          }
          participantsByProduct[product._id][representacion].push({ nombre, apellido, dni });
        });
      }
    });
    setFilteredParticipants(participantsByProduct);
  }, [products]);

  return (
    <Layout>
      <Link className="btn-primary" href={'/products/new'}>
        Crea una nueva Publicacion
      </Link>

      <div className="flex flex-wrap pt-4 gap-4 h-screen max-w-full">
        {products.map(product => (
          <div className="div-card" key={product._id}>
            <div>
              <p className="subtitle">Fecha</p>
              <p>{product.fecha}</p>
              <p className="subtitle">Interes</p>
              <p>{product.interes}</p>
              <p className="subtitle">Sintesis</p>
              <p>{product.sintesis}</p>
            </div>

            {filteredParticipants[product._id] && (
  <div className="flex flex-col">
    <p className="subtitle">Representantes</p>
    <div className="flex gap-4">
    {Object.keys(filteredParticipants[product._id]).map(representation => (
      <div key={representation}>
        <p className="subtitle">{representation}</p>
        {Array.isArray(filteredParticipants[product._id][representation]) ? (
          filteredParticipants[product._id][representation].map((participant, index) => (
            <div key={index}>
              <p>{participant.nombre}</p>
              <p>{participant.apellido}</p>
              <p>{participant.dni}</p>
            </div>
          ))
        ) : (
          <p>No hay representantes para esta categoría</p>
        )}
      </div>
    ))}
    </div>
  </div>
)}

            <div className="flex flex-col gap-4 justify-end">
            <Link className="btn-default" href={'/products/edit/'+product._id}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                             </svg>
                                                
                                             </Link>
                                             <Link className="btn-red" href={'/products/delete/'+product._id}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                             </svg>
                                                 
                                             </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}


    