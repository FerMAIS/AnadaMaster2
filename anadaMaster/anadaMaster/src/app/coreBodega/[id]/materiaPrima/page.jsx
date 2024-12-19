'use client';

import { useState, useEffect } from "react";
import IngresarMateriaPrima from './components/IngresarMateriaPrima';

function MateriaPrima() {
    const [materiaPrima, setMateriaPrima] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [nuevoElemento, setNuevoElemento] = useState(null);

    useEffect(() => {
        const cargarMateriaPrima = async () => {
            try {
                const response = await fetch('/api/coreBodega/materiaPrima', { method: "GET" });
                const data = await response.json();
                setMateriaPrima(data.datos || []);
            } catch (error) {
                console.error("Error al cargar la materia prima:", error);
                setMateriaPrima([]);
            }
        };
        cargarMateriaPrima();
    }, []);

    const agregarMateriaPrima = async (nuevoElemento) => {
        if(nuevoElemento.Calidad < 3){
            setMensaje("Error, la calidad de la uva no puede ser menor a 3")
        }
        else{
            try {
                const response = await fetch('/api/coreBodega/materiaPrima', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoElemento),
                });
                const data = await response.json();
                if (data.message === "OK") {
                    setMateriaPrima([
                        ...materiaPrima, 
                        { ...nuevoElemento, Id: materiaPrima.length ? Math.max(...materiaPrima.map(item => item.Id)) + 1 : 1 }
                    ]);
                    setMensaje("Materia prima agregada correctamente");
                } else {
                    setMensaje("Error al agregar materia prima");
                }
            } catch (error) {
                console.error("Error al agregar materia prima:", error);
                setMensaje("Error interno");
            } finally {
                setNuevoElemento(null);
            }
        }
    };

    const eliminarMateriaPrima = async (id) => {
        try {
            const response = await fetch(`/api/coreBodega/materiaPrima?id=${id}`, { method: "DELETE" });
            const data = await response.json();
            if (data.message === "OK") {
                setMateriaPrima(prev => prev.filter(item => item.Id !== id));
                setMensaje("Materia prima eliminada");
            } else {
                setMensaje("No se pudo eliminar la materia prima");
            }
        } catch (error) {
            console.error("Error al eliminar la materia prima:", error);
            setMensaje("Error interno");
        }
    };

    return (
        <div className="p-6" id="cliente">
            <h1 className="text-2xl font-bold mb-4">Materia Prima</h1>
            {mensaje && <p className="text-green-600">{mensaje}</p>}

            <button
                onClick={() => setNuevoElemento((prev) => prev ? null : { Nombre: '', Cantidad_kg: '', Origen: '', Calidad: '' })}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"
            >
                {nuevoElemento ? 'Agregar Materia Prima' : 'Agregar Materia Prima'}
            </button>

            {nuevoElemento && (
                <IngresarMateriaPrima 
                    nuevoElemento={nuevoElemento} 
                    setNuevoElemento={setNuevoElemento} 
                    onAgregar={agregarMateriaPrima} 
                />
            )}

            <div className="grid grid-cols-3 gap-6">
                {materiaPrima.map(item => (
                    <div key={item.Id} className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-lg font-bold">{item.Nombre}</h2>
                        <p>Cantidad: {item.Cantidad_kg} kg</p>
                        <p>Origen: {item.Origen} </p>
                        <p>Descripción: {item.Cantidad_kg} kg</p>
                        <p>Tipo de uva: {item.Tipo_de_uva} </p>
                        <p>Grado de adurez: {item.Grado_de_madurez} </p>
                        <p>Calidad: {item.Calidad_de_la_uva}</p>
                        <button
                            onClick={() => eliminarMateriaPrima(item.Id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MateriaPrima;
