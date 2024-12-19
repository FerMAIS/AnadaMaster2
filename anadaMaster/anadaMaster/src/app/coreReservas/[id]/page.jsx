'use client'

import { useRouter } from "next/navigation";

function coreReservas({params}){
    const router = useRouter()
    const id = params.id 

    const handleCliente = async () => {
        router.push(`/coreReservas/${id}/cliente`);
    };

    const handleProducto = async () => {
        router.push(`/coreReservas/${id}/producto`);
    };

    const handlePedido = async () => {
        router.push(`/coreReservas/${id}/pedido`);
    };

    return(

        <div id="core">
            <h1>Core Reservas</h1>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleCliente}>Clientes</button>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handlePedido}>Pedidos</button>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleProducto}>Productos</button>
        </div>
    )
}

export default coreReservas;
