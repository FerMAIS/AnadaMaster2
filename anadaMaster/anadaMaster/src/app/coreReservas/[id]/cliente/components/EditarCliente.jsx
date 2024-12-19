
import { useState, useEffect } from "react";

const EditarCliente = ({ cliente, onActualizar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        fechaIngreso: '',
        NIF: '',
    });

    useEffect(() => {
        if (cliente) {
            setFormData({
                id: cliente.id,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                direccion: cliente.direccion,
                fechaIngreso: cliente.fechaIngreso,
                NIF: cliente.NIF,
            });
        }
    }, [cliente]);

    const handleCambiar = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onActualizar(formData);
    };

    return (
        <div className="mt-6 bg-white p-6 shadow rounded-lg" id="editar">
            <h2 className="text-xl font-semibold">Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                    <input
                        type="date"
                        id="fechaIngreso"
                        name="fechaIngreso"
                        value={formData.fechaIngreso}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="NIF">NIF</label>
                    <input
                        type="text"
                        id="NIF"
                        name="NIF"
                        value={formData.NIF}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditarCliente;
