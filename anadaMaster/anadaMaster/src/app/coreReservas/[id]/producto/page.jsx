'use client';

import { useState, useEffect } from "react";
import IngresarProducto from './components/IngresarProducto';
import EditarProducto from './components/EditarProducto';
import { v4 as uuidv4 } from 'uuid';

function Producto() {
    const [Producto, setProducto] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [nuevoProducto, setNuevoProducto] = useState(null);
    const [editando, setEditando] = useState(null);

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

    const agregarProducto = async (nuevoProducto) => {
        try {
            nuevoProducto.Id = uuidv4()
            const response = await fetch('/api/coreReservas/producto', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto),
            });
            const data = await response.json();
            if (data.message === "OK") {
                setProducto([
                    ...Producto, 
                    { ...nuevoProducto, Id: Producto.length ? Math.max(...Producto.map(item => item.Id)) + 1 : 1 }
                ]);
                console.log(Producto)
                setMensaje("Producto agregado correctamente");
            } else {
                setMensaje("Error al agregar producto");
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
            setMensaje("Error interno");
        } finally {
            setNuevoProducto(null);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`/api/coreReservas/producto?id=${id}`, { method: "DELETE" });
            const data = await response.json();
            if (data.message === "OK") {
                setProducto(prev => prev.filter(item => item.Id !== id));
                setMensaje("Producto eliminado");
            } else {
                setMensaje("No se pudo eliminar el producto");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            setMensaje("Error interno");
        }
    };

    const actualizarProducto = async (editando) => {
        try {
            const response = await fetch('/api/coreReservas/producto', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editando),
            });
            const data = await response.json();
            if (data.message === "OK") {
                setProducto(prev => prev.map(item => item.Id === editando.Id ? editando : item));
                setMensaje("Producto actualizado correctamente");
            } else {
                setMensaje("Error al actualizar producto");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            setMensaje("Error interno");
        } finally {
            setEditando(null);
        }
    };

    return (
        <div id="cliente">
            <h1 className="text-2xl font-bold mb-4">Productos</h1>
            {mensaje && <p className="text-green-600">{mensaje}</p>}

            <button
                onClick={() => setNuevoProducto((prev) => prev ? null : { nombre: '', descripcion: '', precio: '', cantidadBotellas: '', formatoBotella: '', cosecha: '' })}
            >
                {nuevoProducto ? 'Agregar Producto' : 'Agregar Producto'}
            </button>
            {nuevoProducto && (
                <IngresarProducto 
                    nuevoProducto={nuevoProducto} 
                    setNuevoProducto={setNuevoProducto} 
                    onAgregar={agregarProducto} 
                />
            )}

            <div className="mt-12">
                <div className="grid grid-cols-1 gap-6">
                    {Producto.length > 0 ? (
                        Producto.map(item => (
                            <div key={item.Id} className="bg-white shadow-lg rounded-lg p-4">
                                <h2 className="text-lg font-bold">{item.nombre}</h2>
                                <p>Descripción: {item.descripcion}</p>
                                <p>Precio: {item.precio}€</p>
                                <p>Cantidad disponible: {item.cantidadBotellas}</p>
                                <p>Formato: {item.formatoBotella}</p>
                                <p>Cosecha: {item.cosecha}</p>
                                <button
                                    onClick={() => eliminarProducto(item.Id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => setEditando(item)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No hay productos.</p>
                    )}
                </div>
            </div>

            {editando && (
                <EditarProducto 
                    editando={editando} 
                    setEditando={setEditando} 
                    onActualizar={actualizarProducto} 
                />
            )}
        </div>
    );
}

export default Producto;
