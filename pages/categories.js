import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

export default function Categories(){
  const [products, setProducts] = useState([]);
    const [filteredParticipants, setFilteredParticipants] = useState({});
  
    useEffect(() => {
      axios.get('/api/products').then(response => {
        setProducts(response.data);
      });
    }, []);
  
    useEffect(() => {
      // Filtrar participantes por representacion y crear un nuevo array por cada valor obtenido
      const participantsByRepresentation = {};
      products.forEach(product => {
        if (Array.isArray(product.participants)) {
          product.participants.forEach(participante => {
            const { nombre, apellido, dni, representacion } = participante;
            if (!participantsByRepresentation[representacion]) {
              participantsByRepresentation[representacion] = [];
            }
            participantsByRepresentation[representacion].push({ nombre, apellido, dni, representacion });
          });
        }
      });
      setFilteredParticipants(participantsByRepresentation);
    }, [products]);

  return (
    <Layout>
      <h1>Participantes</h1>
      <div>
      <table className="basic mt-4  ">
        <thead>
          <tr className="" >
            <td >Nombre</td>
            <td>Apellido</td>
            <td>DNI</td>
            <td>Representación</td>
          </tr>
        </thead>
        
          {Object.keys(filteredParticipants).map(representation => (
            <tbody key={representation}>
              <tr>
                <th colSpan="4" className="bg-gray-200 text-left text-gray-700  px-4 py-2">{representation}</th>
              </tr>
              {filteredParticipants[representation].map((participant, index) => (
                <tr key={index}>
                  <td >{participant.nombre}</td>
                  <td>{participant.apellido}</td>
                  <td >{participant.dni}</td>
                  <td >{participant.representacion}</td>
                </tr>
              ))}
            </tbody>
          ))}
        
      </table>
    </div>


    </Layout>
  );
}

