import { useState, useEffect } from "react";

const EditarPedido = ({ pedido, onActualizar, productosDisponibles, onCancelar }) => {
    const [formData, setFormData] = useState({
        id: "",
        idCliente: "",
        estado: "",
        fecha: "",
        descuento: 0,
        cantidadBotellas: {},
        precioTotal: 0,
    });

    useEffect(() => {
        if (pedido) {
            setFormData({
                id: pedido.id,
                idCliente: pedido.idCliente,
                estado: pedido.estado,
                fecha: pedido.fecha,
                descuento: pedido.descuento,
                cantidadBotellas: pedido.cantidadBotellas,
                precioTotal: pedido.precioTotal,
            });
        }
    }, [pedido]);

    const calcularPrecioTotal = (cantidadBotellas) => {
        return Object.entries(cantidadBotellas).reduce((total, [idProducto, cantidad]) => {
            const producto = productosDisponibles.find((p) => p.Id === idProducto);
            const precioUnitario = producto ? producto.precio : 0;
            return total + cantidad * precioUnitario;
        }, 0);
    };

    const handleCambiar = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("cantidadBotellas-")) {
            const idProducto = name.replace("cantidadBotellas-", "");
            const nuevaCantidad = parseInt(value, 10) || 0;

            setFormData((prevData) => {
                const nuevaCantidadBotellas = {
                    ...prevData.cantidadBotellas,
                    [idProducto]: nuevaCantidad,
                };
                const nuevoPrecioTotal = calcularPrecioTotal(nuevaCantidadBotellas);

                return {
                    ...prevData,
                    cantidadBotellas: nuevaCantidadBotellas,
                    precioTotal: nuevoPrecioTotal,
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === "descuento" || name === "precioTotal" ? parseFloat(value) || 0 : value,
            }));
        }
    };

    const handleAgregarBotella = () => {
        const { nuevaBotellaId, nuevaBotellaCantidad, cantidadBotellas } = formData;

        if (!nuevaBotellaId || nuevaBotellaCantidad <= 0) {
            alert("Selecciona un producto y define una cantidad válida.");
            return;
        }

        const productoSeleccionado = productosDisponibles.find(
            (producto) => producto.Id === nuevaBotellaId
        );

        if (!productoSeleccionado) {
            alert("Producto no encontrado.");
            return;
        }

        const precioUnitario = productoSeleccionado.precio;
        const precioAdicional = precioUnitario * nuevaBotellaCantidad;

        setFormData((prevData) => {
            const nuevaCantidadBotellas = {
                ...prevData.cantidadBotellas,
                [nuevaBotellaId]: (prevData.cantidadBotellas[nuevaBotellaId] || 0) + nuevaBotellaCantidad,
            };
            const nuevoPrecioTotal = calcularPrecioTotal(nuevaCantidadBotellas);

            return {
                ...prevData,
                cantidadBotellas: nuevaCantidadBotellas,
                precioTotal: nuevoPrecioTotal,
                nuevaBotellaId: "",
                nuevaBotellaCantidad: 0,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nuevaBotellaId, nuevaBotellaCantidad, ...pedidoLimpio } = formData;
        onActualizar(pedidoLimpio);
    };

    return (
        <div className="mt-6 bg-white p-6 shadow rounded-lg" id="editar-pedido">
            <h2 className="text-xl font-semibold">Editar pedido</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <strong><label htmlFor="estado" className="block text-sm font-medium mb-2">Estado:</label></strong>
                    <select
                        id="estado"
                        value={formData.estado}
                        onChange={handleCambiar}
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="tramite">Trámite</option>
                        <option value="cerrado">Cerrado</option>
                        <option value="entregado">Entregado</option>
                        <option value="enviado">Enviado</option>
                    </select>
                    </div>
                <div>
                    <strong><label htmlFor="fecha">Fecha</label></strong>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <strong><label htmlFor="descuento">Descuento</label></strong>
                    <input
                        type="number"
                        min="0"
                        id="descuento"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <strong><label htmlFor="precioTotal">Precio Total</label></strong>
                    <input
                        type="number"
                        step="0.01"
                        id="precioTotal"
                        name="precioTotal"
                        value={formData.precioTotal}
                        onChange={handleCambiar}
                        className="border p-2 w-full"
                        disabled
                    />
                </div>
                <div>
                    <strong>Cantidad de botellas:</strong>
                    {Object.entries(formData.cantidadBotellas).map(([idProducto, cantidad]) => (
                        <div key={idProducto} className="mt-2">
                            <label htmlFor={`cantidadBotellas-${idProducto}`}>Producto ID: {idProducto}</label>
                            <input
                                type="number"
                                min="0"
                                id={`cantidadBotellas-${idProducto}`}
                                name={`cantidadBotellas-${idProducto}`}
                                value={cantidad}
                                onChange={handleCambiar}
                                className="border p-2 w-full"
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <strong>Agregar nueva botella:</strong>
                    <div className="mt-2">
                        <select
                            id="nuevaBotellaId"
                            name="nuevaBotellaId"
                            value={formData.nuevaBotellaId}
                            onChange={handleCambiar}
                            className="border p-2 w-full"
                        >
                            <option value="">Seleccione un producto</option>
                            {productosDisponibles.map((producto) => (
                                <option key={producto.Id} value={producto.Id}>
                                    {producto.nombre} (Precio: {producto.precio})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2">
                        <strong><label htmlFor="nuevaBotellaCantidad">Cantidad</label></strong>
                        <input
                            type="number"
                            min="0"
                            id="nuevaBotellaCantidad"
                            name="nuevaBotellaCantidad"
                            value={formData.nuevaBotellaCantidad}
                            onChange={handleCambiar}
                            className="border p-2 w-full"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAgregarBotella}
                        className="mt-2 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Agregar Botella
                    </button>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPedido;
