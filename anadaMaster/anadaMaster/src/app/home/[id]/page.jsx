'use client'

import { useRouter } from "next/navigation";

function home({params}){

    const router = useRouter()
    const id = params.id

    const handleCoreReservas = async () => {
        router.push(`/coreReservas/${id}`);
    };

    const handleCoreBodega = async () => {
        router.push(`/coreBodega/${id}`);
    };

    return(
        <div id="inicio">
            <h1> Añada Master </h1>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleCoreReservas}>Core Reservas</button>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleCoreBodega}>Core Bodega</button>
        </div>
    )
}

export default home;
