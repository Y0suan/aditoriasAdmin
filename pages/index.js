import Layout from "@/components/Layout";
import Proximamente from "@/components/Proximamente";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Contador } from "@/components/Contador";
//adsadasdas
export default function Home() {
  const {data:session}=useSession();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        const lastThreeProducts = response.data.slice(-4); // Obtener los últimos 3 productos
        setProducts(lastThreeProducts);
      } catch (error) {
        console.error("Error al recuperar los productos:", error);
      }
    };
    fetchProducts();
  }, []);
  
  


  return<Layout>
    <div className="text-blue-600 flex justify-between">
      <h2>
        Hola,<b> {session?.user?.name}</b> 
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
      <Image src={session?.user?.image} alt="Avatar del usuario" className="w-6 h-6" width={48} height={48} />
      <span className="px-2">
       {session?.user?.name}
      </span>
      </div>
    </div>
    <Contador/>
  </Layout>
}
