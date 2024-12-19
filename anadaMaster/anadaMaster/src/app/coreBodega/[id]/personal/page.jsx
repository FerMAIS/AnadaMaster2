'use client';

import { useState, useEffect } from "react";
import IngresarPForm from "./components/IngresarPForm.jsx";
import EditarPersonal from "./components/EditarPersonal.jsx";

function Personal({ params }) {
    const id = params.id;
    const [personal, setPersonal] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tipoEmpleado, setTipoEmpleado] = useState('');
    const [editando, setEditando] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [accesoPermitido, setAccesoPermitido] = useState(false);

    useEffect(() => {
        const mostrarPersonal = async () => {
            try {
                const response = await fetch('/api/coreBodega/personal', { method: "GET" });

                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }

                const data = await response.json();
                setPersonal(data.datos || []);
            } catch (error) {
                console.error("Error al cargar el personal:", error);
                setPersonal([]);
            }
        };

        const obtenerTipoEmpleado = async () => {
            try {
                const result = await fetch('/api/coreBodega/personal/tipoEmpleado', {
                    method: 'POST',
                    body: JSON.stringify({ id }),
                    headers: { 'Content-type': 'application/json' },
                });
                const data = await result.json();
                setTipoEmpleado(data.tipoEmpleado);
                setAccesoPermitido(data.tipoEmpleado === "Administrador")
            } catch (error) {
                console.error('Error fetching tipo empleado:', error);
                setMensaje('ERROR al obtener el tipo de empleado');
                setAccesoPermitido(false);
            }
        };

        mostrarPersonal();
        obtenerTipoEmpleado();
    }, [id]);

    if (!accesoPermitido) {
        return <p className="text-red-600 text-center mt-10">No tienes acceso a esta página.</p>;
    }

    const handleIngresar = () => {
        setMostrarFormulario((prevMostrarFormulario) => !prevMostrarFormulario);
    };

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`/api/coreBodega/personal?id=${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error("No se pudo eliminar el personal.");
            }
            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("Personal eliminado correctamente");
                setPersonal((prev) => prev.filter((item) => item.id !== id));
            } else {
                setMensaje("No se pudo eliminar el personal.");
            }
        } catch (error) {
            console.error("Error al eliminar el personal:", error);
            setMensaje("Error al eliminar el personal.");
        }
    };

    const handleEditar = (personal) => {
        setEditando(personal);
    };

    const handleActualizar = async (formData) => {
        try {
            const response = await fetch('/api/coreBodega/personal/editarPersonal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            if (!response.ok) {
                throw new Error("No se pudo actualizar el personal.");
            }

            const data = await response.json();
            if (data.message === "OK") {
                setMensaje("Personal actualizado correctamente");
                setPersonal((prev) =>
                    prev.map((item) =>
                        item.id === editando.id ? { ...item, ...formData } : item
                    )
                );
                setEditando(null);
            } else {
                setMensaje("No se pudo actualizar el personal.");
            }
        } catch (error) {
            console.error("Error al actualizar el personal:", error);
            setMensaje("Error al actualizar el personal.");
        }
    };

    const addPersonal = async (personal) => {
        if (personal.nombre === '' || personal.apellido === '' || personal.NUSS === '' || personal.NIF === '' || personal.direccion === '' || personal.fechaIngreso === '' || personal.tipoUsuario === '') {
            setMensaje('Introduzca todos los datos');
        } else {
            try {
                const response = await fetch('/api/coreBodega/personal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(personal),
                });
                const data = await response.json();
                if (data.message === "OK") {
                    setMensaje('Enhorabuena, se ingresó el personal');
                    setPersonal((prevPersonal) => [...prevPersonal, { ...personal, id: data.id }]);
                    setMostrarFormulario(false);
                } else {
                    setMensaje('Error, al ingresar personal');
                }
            } catch (error) {
                setMensaje('Error');
            }
        }
    };

    const personalFiltrado = personal.filter((p) =>
        p.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="cliente">
            <h1>Personal</h1>
            <p>{mensaje}</p>
            <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleIngresar}>
                {mostrarFormulario ? 'Ingresar Personal' : 'Ingresar Personal'}
            </button>
            {mostrarFormulario && <IngresarPForm onSubmit={addPersonal} />}

            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Buscar por apellido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                />
            </div>

            <div className="mt-12">
                <div className="grid grid-cols-1 gap-6">
                    {personalFiltrado.length > 0 ? (
                        personalFiltrado.map((personal, index) => (
                            <div key={index} className="bg-white p-6 shadow rounded-lg">
                                <h3 className="text-xl font-semibold">{personal.nombre} {personal.apellido}</h3>
                                <p className="text-gray-600 mt-2"><strong>Dirección: </strong>{personal.direccion}</p>
                                <p className="text-gray-600 mt-2"><strong>Fecha de Ingreso: </strong> {personal.fechaIngreso}</p>
                                <p className="text-gray-600 mt-2"><strong>NUSS: </strong> {personal.NUSS}</p>
                                <p className="text-gray-600 mt-2"><strong>NIF: </strong> {personal.NIF}</p>
                                <p className="text-gray-600 mt-2"><strong>Tipo de empleado: </strong>{personal.tipoEmpleado}</p>

                                <button
                                    onClick={() => handleEliminar(personal.id)}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 text-lg shadow-md"
                                >
                                    Eliminar
                                </button>

                                {tipoEmpleado === "Administrador" && (
                                    <button
                                        onClick={() => handleEditar(personal)}
                                        className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-200 text-lg shadow-md ml-2"
                                    >
                                        Editar
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No hay personal.</p>
                    )}
                </div>
            </div>

            {editando && (
                <EditarPersonal personal={editando} onActualizar={handleActualizar} />
            )}
        </div>
    );
}

export default Personal;
