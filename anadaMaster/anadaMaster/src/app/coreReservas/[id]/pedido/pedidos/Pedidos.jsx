'use client';

import { useState, useEffect } from "react";
import EditarPedido from "./components/EditarPedido";


const Pedidos = ({productos}) => {
    const [pedido, setPedido] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [editando, setEditando] = useState(null);
    
    useEffect(() => {
        const getPedidos = async () => {
            try {
                const response = await fetch('/api/coreReservas/pedido', { method: "GET" });
                const data = await response.json();
                setPedido(data.datos || []);
            } catch (error) {
                console.error("Error al cargar los pedidos:", error);
                setPedido([]);
            }
        };
        getPedidos();
    }, []);

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`/api/coreReservas/pedido?id=${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error("No se pudo eliminar el pedido.");
            }
            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("pedido eliminado correctamente");
                setPedido((prev) => prev.filter((item) => item.id !== id));
            } else {
                setMensaje("No se pudo eliminar el pedido.");
            }
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            setMensaje("Error al eliminar el pedido.");
        }
    };
    
    const handleEditar = (pedido) => {
        setEditando(pedido);
    };

    const handleActualizar = async (formData) => {
        try {
            const response = await fetch('/api/coreReservas/pedido/editarPedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            if (!response.ok) {
                throw new Error("No se pudo actualizar el pedido.");
            }

            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("pedido actualizado correctamente");
                setPedido((prev) =>
                    prev.map((item) =>
                        item.id === editando.id ? { ...item, ...formData } : item
                    )
                );
                setEditando(null);
            } else {
                setMensaje("No se pudo actualizar el pedido.");
            }
        } catch (error) {
            console.error("Error al actualizar el pedido:", error);
            setMensaje("Error al actualizar el pedido.");
        }
    };

    return (
        <div className="p-6" id="pedido">
            <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
            {mensaje && <p className="text-green-600">{mensaje}</p>}

            <div className="grid grid-rows-3 gap-6" id="lista-pedidos">
                {pedido.map(item => (
                    <div key={item.id}>
                        <h2 className="text-lg font-bold">Pedido ID: {item.id}</h2>
                        <p><strong>Id cliente: </strong>{item.idCliente}</p>
                        <p><strong>Estado:</strong> {item.estado}</p>
                        <p><strong>Fecha:</strong> {item.fecha}</p>
                        <div>
                            <strong>Cantidad de botellas:</strong>
                            <ul>
                                {Object.entries(item.cantidadBotellas).map(([idProducto, cantidad]) => (
                                    <li key={idProducto}>
                                        {cantidad} botella(s) del producto con ID: {idProducto}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p><strong>Descuento:</strong> {item.descuento}€</p>
                        <p><strong>Precio Total:</strong> {item.precioTotal.toFixed(2)}€</p>
                        <button
                            onClick={() => handleEliminar(item.id)}
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={() => handleEditar(item)}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
            {editando && (
                <EditarPedido pedido={editando} onActualizar={handleActualizar} productosDisponibles={productos}/>
            )}
        </div>
    );
}

export default Pedidos;
