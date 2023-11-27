import  Link  from "next/link";
import { useSession } from "next-auth/react";


export default function Logo(){
  const {data:session}=useSession();
    return(
        <Link href={'/'} className="flex gap-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        <span className="text-blue font-medium text-lg">
        Gestor  
        </span>
        <span className="text-lg">
            de Auditorias
        </span>
        {/* <div className="flex flex-col items-center">
        <img src={session?.user?.image} alt="" className="w-12 h-12 rounded-full"/>
        <span className="px-2 font-medium text-black">
        {session?.user?.name}
        </span>
        </div> */}
        </Link>
    )
}