import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export async function POST(request) {
    try {
        // Verificar si el archivo JSON existe
        if (!existsSync("JsonFiles/pedidos.json")) {
            return NextResponse.json({ message: "NOK", error: "Archivo no encontrado" });
        }

        // Leer los datos del archivo JSON
        const pedido = JSON.parse(readFileSync("JsonFiles/pedidos.json", 'utf-8'));

        // Obtener los datos del cuerpo de la solicitud
        const { formData } = await request.json(); 
        const id = formData.id;

        // Verificar si existe un usuario con el mismo ID
        const index = pedido.findIndex(p => p.id === id);
        
        if (index !== -1) {
            // Si el pedido existe, actualizamos los datos
            pedido[index] = { ...pedido[index], ...formData };

            // Guardar los datos actualizados en el archivo JSON
            writeFileSync("JsonFiles/pedidos.json", JSON.stringify(pedido, null, 2));

            return NextResponse.json({ message: "OK" });
        } else {
            return NextResponse.json({ message: "NOK", error: "pedido no encontrado" });
        }
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ message: "Error interno del servidor", error: error.message }, { status: 500 });
    }
}
