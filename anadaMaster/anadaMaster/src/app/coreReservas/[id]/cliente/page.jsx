'use client';

import { useState, useEffect } from "react";
import IngresarCForm from "./components/IngresarCForm.jsx";
import EditarCliente from "./components/EditarCliente.jsx";

function Cliente({ params }) {
    const id = params.id;
    const [cliente, setcliente] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        const mostrarcliente = async () => {
            try {
                const response = await fetch('/api/coreReservas/cliente', { method: "GET" });

                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }

                const data = await response.json();
                setcliente(data.datos || []);
            } catch (error) {
                console.error("Error al cargar el cliente:", error);
                setcliente([]);
            }
        };

        mostrarcliente();
    }, [id]);

    const handleIngresar = () => {
        setMostrarFormulario((prevMostrarFormulario) => !prevMostrarFormulario);
    };

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`/api/coreReservas/cliente?id=${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error("No se pudo eliminar el cliente.");
            }
            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("cliente eliminado correctamente");
                setcliente((prev) => prev.filter((item) => item.id !== id));
            } else {
                setMensaje("No se pudo eliminar el cliente.");
            }
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            setMensaje("Error al eliminar el cliente.");
        }
    };

    const handleEditar = (cliente) => {
        setEditando(cliente);
    };

    const handleActualizar = async (formData) => {
        try {
            const response = await fetch('/api/coreReservas/cliente/editarCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            if (!response.ok) {
                throw new Error("No se pudo actualizar el cliente.");
            }

            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("cliente actualizado correctamente");
                setcliente((prev) =>
                    prev.map((item) =>
                        item.id === editando.id ? { ...item, ...formData } : item
                    )
                );
                setEditando(null);
            } else {
                setMensaje("No se pudo actualizar el cliente.");
            }
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            setMensaje("Error al actualizar el cliente.");
        }
    };

    const addcliente = async (cliente) => {
        console.log("hola")
        if (cliente.nombre === '' || cliente.apellido === '' || cliente.NIF === '' || cliente.direccion === '' || cliente.fechaIngreso === '') {
            setMensaje('Introduzca todos los datos');
        } else {
            try {
                const response = await fetch('/api/coreReservas/cliente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cliente),
                });
                const data = await response.json();
                console.log(data.id)
                if (data.message === "OK") {
                    setMensaje('Enhorabuena, se ingresó el cliente');
                    setcliente((prevClientes) => [...prevClientes, { ...cliente, id: data.id }]);
                    setMostrarFormulario(false);
                } else {
                    setMensaje('Error, al ingresar cliente');
                }
            } catch (error) {
                setMensaje('Error');
            }
        }
    };


    return (
        <div id="cliente">
            <h1>Clientes</h1>
            <div id="mensaje" className="text-center">
                {mensaje}
            </div>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleIngresar}>
                {mostrarFormulario ? 'Ingresar cliente' : 'Ingresar cliente'}
            </button>

            {mostrarFormulario && <IngresarCForm onSubmit={addcliente} />}

            <div className="mt-12">
                <div className="grid grid-cols-1 gap-6">
                    {cliente.length > 0 ? (
                        cliente.map((cliente, index) => (
                            <div key={index} className="bg-white p-6 shadow rounded-lg">
                                <h3 className="text-xl font-semibold">Nombre: {cliente.nombre}</h3>
                                <p className="text-gray-600 mt-2">Apellido: {cliente.apellido}</p>
                                <p className="text-gray-600 mt-2">Dirección: {cliente.direccion}</p>
                                <p className="text-gray-600 mt-2">Fecha de Ingreso: {cliente.fechaIngreso}</p>
                                <p className="text-gray-600 mt-2">NIF: {cliente.NIF}</p>

                                <button
                                    onClick={() => handleEliminar(cliente.id)}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 text-lg shadow-md"
                                >
                                    Eliminar
                                </button>

                                <button
                                    onClick={() => handleEditar(cliente)}
                                    className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-200 text-lg shadow-md ml-2"
                                >
                                    Editar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No hay clientes.</p>
                    )}
                </div>
            </div>

            {editando && (
                <EditarCliente cliente={editando} onActualizar={handleActualizar} />
            )}
        </div>
    );
}

export default Cliente;
