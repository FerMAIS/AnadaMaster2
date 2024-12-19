'use client';

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Pedidos from "./pedidos/Pedidos";

function Pedido() {
    const [pedido, setPedido] = useState([]);
    const [Producto, setProducto] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [cantidades, setCantidades] = useState({});
    const [idCliente, setidCliente] = useState('');
    const [estado, setEstado] = useState('tramite');
    const [fecha, setFecha] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [mostrarPedidos, setMostrarPedidos] = useState(false);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const response = await fetch('/api/coreReservas/producto', { method: "GET" });
                const data = await response.json();
                setProducto(data.datos || []);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
                setProducto([]);
            }
        };
        cargarProducto();
    }, []);

    useEffect(() => {
        const total = Producto.reduce((acc, item) => {
            const cantidad = cantidades[item.Id] || 0;
            return acc + item.precio * cantidad;
        }, 0);
        setPrecioTotal(total - total * (descuento / 100));
    }, [cantidades, descuento, Producto]);

    const handleVerPedidos = () => {
        setMostrarPedidos(true); 
    };

    const agregarProducto = (id) => {
        setCantidades((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const eliminarProducto = (id) => {
        setCantidades((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    const aceptarPedido = async () => {
        const nuevoPedido = {
            id: uuidv4(),
            idCliente: idCliente,
            estado,
            fecha,
            descuento,
            cantidadBotellas: cantidades,
            precioTotal
        };
        setDescuento('');
        setEstado('tramite');
        setFecha('');
        setPrecioTotal('');
        setidCliente('');
        setCantidades('');
        console.log("Pedido aceptado:", nuevoPedido);
        try {
            const response = await fetch('/api/coreReservas/pedido', { method: "POST", body: JSON.stringify(nuevoPedido)});
            const data = await response.json();
            setPedido(data.datos || []);
        } catch (error) {
            setPedido([]);
        }
    };

    return (
        <div className="p-6" id="hacer-pedido">
            {mostrarPedidos ? (
                <Pedidos productos={Producto} />
            ) : (
                <div id="form-pedido">
                    <h1 className="text-2xl font-bold mb-4">Pedido</h1>
                    {mensaje && <p className="text-green-600">{mensaje}</p>}

                    <button
                        id="botonPedido"
                        onClick={handleVerPedidos}
                    >
                        Ver pedidos
                    </button>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Id del Cliente:</label>
                        <input
                            type="text"
                            value={idCliente}
                            onChange={(e) => setidCliente(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Ingrese el id del cliente"
                        />
                    </div>

                    <div className="mb-4">
                        <label >Estado del Pedido:</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="tramite">Trámite</option>
                            <option value="cerrado">Cerrado</option>
                            <option value="entregado">Entregado</option>
                            <option value="enviado">Enviado</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Fecha:</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Descuento (%):</label>
                        <input
                            type="number"
                            value={descuento}
                            min="0"
                            onChange={(e) => setDescuento(Number(e.target.value))}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Ingrese el porcentaje de descuento"
                        />
                    </div>

                    <div className="grid grid-rows-3 gap-6" id="lista-pedidos">
                        {Producto.map(item => (
                            <div key={item.Id} className="bg-white shadow-lg rounded-lg p-4">
                                <h2 className="text-lg font-bold">{item.nombre}</h2>
                                <p>Descripción: {item.descripcion}</p>
                                <p>Precio: {item.precio}€</p>
                                <p>Cantidad disponible: {item.cantidadBotellas}</p>
                                <p>Formato: {item.formatoBotella}</p>
                                <p>Cosecha: {item.cosecha}</p>
                                <div className="mt-4 flex items-center">
                                    <button
                                        onClick={() => eliminarProducto(item.Id)}
                                         className="button-cantidad button-menos"
                                    >
                                        -
                                    </button>
                                    <span className="cantidad-central">{cantidades[item.Id] || 0}</span>
                                    <button
                                        onClick={() => agregarProducto(item.Id)}
                                        className="button-cantidad button-mas"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Precio Total: {parseFloat(precioTotal).toFixed(2)}€</h3>
                    </div>

                    <button
                        id="botonPedido"
                        onClick={aceptarPedido}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
                    >
                        Aceptar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pedido;
