function IngresarMateriaPrima({ nuevoElemento, setNuevoElemento, onAgregar }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregar(nuevoElemento);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4" id="form">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="p-2 border rounded-lg"
                    value={nuevoElemento.Nombre}
                    onChange={(e) => setNuevoElemento({ ...nuevoElemento, Nombre: e.target.value })}
                />
                <input
                    type="number"
                    min="0"
                    placeholder="Cantidad (kg)"
                    className="p-2 border rounded-lg"
                    value={nuevoElemento.Cantidad_kg}
                    onChange={(e) => setNuevoElemento({ ...nuevoElemento, Cantidad_kg: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Origen"
                    className="p-2 border rounded-lg"
                    value={nuevoElemento.Origen}
                    onChange={(e) => setNuevoElemento({ ...nuevoElemento, Origen: e.target.value })}
                />
                <input
                    type="number"
                    min="0"
                    max="5"
                    placeholder="Calidad (1-5)"
                    className="p-2 border rounded-lg"
                    value={nuevoElemento.Calidad}
                    onChange={(e) => setNuevoElemento({ ...nuevoElemento, Calidad: parseInt(e.target.value) })}
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
            >
                Guardar
            </button>
        </form>
    );
}

export default IngresarMateriaPrima;
