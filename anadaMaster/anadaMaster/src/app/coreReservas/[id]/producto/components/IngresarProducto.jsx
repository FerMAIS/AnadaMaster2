function IngresarProducto({ nuevoProducto, setNuevoProducto, onAgregar }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregar(nuevoProducto);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4" id="form">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                />
                <textarea
                    placeholder="Descripción"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                />
                <input
                    type="number"
                    step="0.01" 
                    min="0"
                    placeholder="Precio"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    min="0"
                    placeholder="Cantidad de botellas disponibles"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.cantidadBotellas}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidadBotellas: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Formato de la botella"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.formatoBotella}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, formatoBotella: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cosecha"
                    className="p-2 border rounded-lg"
                    value={nuevoProducto.cosecha}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, cosecha: parseInt(e.target.value) })}
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

export default IngresarProducto;
