
import { useState, useEffect } from "react";

const EditarPersonal = ({ personal, onActualizar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        fechaIngreso: '',
        NUSS: '',
        NIF: '',
        tipoEmpleado: '',
    });

    useEffect(() => {
        if (personal) {
            setFormData({
                id: personal.id,
                nombre: personal.nombre,
                apellido: personal.apellido,
                direccion: personal.direccion,
                fechaIngreso: personal.fechaIngreso,
                NUSS: personal.NUSS,
                NIF: personal.NIF,
                tipoEmpleado: personal.tipoEmpleado,
            });
        }
    }, [personal]);

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
            <h2 className="text-xl font-semibold">Editar Personal</h2>
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
                    <label htmlFor="NUSS">NUSS</label>
                    <input
                        type="text"
                        id="NUSS"
                        name="NUSS"
                        value={formData.NUSS}
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
                <div>
                    <label htmlFor="tipoEmpleado">Tipo de Empleado</label>
                    <input
                        type="text"
                        id="tipoEmpleado"
                        name="tipoEmpleado"
                        value={formData.tipoEmpleado}
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

export default EditarPersonal;
