'use client'

import { useRouter } from "next/navigation";

function coreBodega({params}){
    const router = useRouter()
    const id = params.id 

    const handlePersonal = async () => {
        router.push(`/coreBodega/${id}/personal`);
    };

    const handleMateriaPrima = async () => {
        router.push(`/coreBodega/${id}/materiaPrima`);
    };

    return(

        <div id="core">
            <h1>Core Bodega</h1>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handlePersonal}>Personal</button>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleMateriaPrima}>Materia Prima</button>
        </div>
    )
}

export default coreBodega;
