import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PersonalForm({ onSubmit }) {
    const [NUSS, setNUSS] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [NIF, setNIF] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [tipoEmpleado, setTipoEmpleado] = useState('');

    const handleNUSSChange = (e) => setNUSS(e.target.value);
    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleApellidoChange = (e) => setApellido(e.target.value);
    const handleNIFChange = (e) => setNIF(e.target.value);
    const handleFechaIngresoChange = (e) => setFechaIngreso(e.target.value);
    const handleDireccionChange = (e) => setDireccion(e.target.value);
    const handleTipoEmpleadoChange = (e) => setTipoEmpleado(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: uuidv4(),
            nombre,
            apellido,
            direccion,
            fechaIngreso,
            NUSS,
            NIF,
            tipoEmpleado,
        };
        onSubmit(newUser);
        setNombre('');
        setApellido('');
        setDireccion('');
        setFechaIngreso('');
        setNUSS('');
        setNIF('');
        setTipoEmpleado('');
    };

    return (
        <form className='UserEditor col' onSubmit={handleSubmit} id='form'>
            <div className='col'>
                <input type="text" className="form-control mt-2" placeholder="Nombre" value={nombre} onChange={handleNombreChange} />
                <input type="text" className="form-control mt-1" placeholder="Apellido" value={apellido} onChange={handleApellidoChange} />
                <input type="text" className="form-control mt-1" placeholder="Direccion" value={direccion} onChange={handleDireccionChange} />
                <input type="date" className="form-control mt-1" placeholder="fecha de ingreso" value={fechaIngreso} onChange={handleFechaIngresoChange} />
                <input type="text" className="form-control mt-1" placeholder="NUSS" value={NUSS} onChange={handleNUSSChange} />
                <input type="text" className="form-control mt-1" placeholder="NIF" value={NIF} onChange={handleNIFChange} />
                <input type="text" className="form-control mt-1" placeholder="Tipo de empleado" value={tipoEmpleado} onChange={handleTipoEmpleadoChange} />
                <button type="submit" className="btn btn-primary mt-3">Ingresar</button>
            </div>
        </form>
    );
}

export default PersonalForm;
