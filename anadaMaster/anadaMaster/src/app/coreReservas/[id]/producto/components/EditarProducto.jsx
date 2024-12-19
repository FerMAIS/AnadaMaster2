function IngresarProducto({ editando, setEditando, onActualizar }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onActualizar(editando);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4" id="editar">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="p-2 border rounded-lg"
                    value={editando.nombre}
                    onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                />
                <textarea
                    placeholder="Descripción"
                    className="p-2 border rounded-lg"
                    value={editando.descripcion}
                    onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    className="p-2 border rounded-lg"
                    value={editando.precio}
                    onChange={(e) => setEditando({ ...editando, precio: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Cantidad de botellas disponibles"
                    className="p-2 border rounded-lg"
                    value={editando.cantidadBotellas}
                    onChange={(e) => setEditando({ ...editando, cantidadBotellas: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Formato de la botella"
                    className="p-2 border rounded-lg"
                    value={editando.formatoBotella}
                    onChange={(e) => setEditando({ ...editando, formatoBotella: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cosecha"
                    className="p-2 border rounded-lg"
                    value={editando.cosecha}
                    onChange={(e) => setEditando({ ...editando, cosecha: parseInt(e.target.value) })}
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