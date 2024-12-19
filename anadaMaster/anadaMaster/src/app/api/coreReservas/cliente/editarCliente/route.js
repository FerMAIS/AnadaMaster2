import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export async function POST(request) {
    try {
        // Verificar si el archivo JSON existe
        if (!existsSync("JsonFiles/cliente.json")) {
            return NextResponse.json({ message: "NOK", error: "Archivo no encontrado" });
        }

        // Leer los datos del archivo JSON
        const cliente = JSON.parse(readFileSync("JsonFiles/cliente.json", 'utf-8'));

        // Obtener los datos del cuerpo de la solicitud
        const { formData } = await request.json(); 
        const id = formData.id;

        // Verificar si existe un usuario con el mismo ID
        const index = cliente.findIndex(p => p.id === id);
        
        if (index !== -1) {
            // Si el cliente existe, actualizamos los datos
            cliente[index] = { ...cliente[index], ...formData };

            // Guardar los datos actualizados en el archivo JSON
            writeFileSync("JsonFiles/cliente.json", JSON.stringify(cliente, null, 2));

            return NextResponse.json({ message: "OK" });
        } else {
            return NextResponse.json({ message: "NOK", error: "cliente no encontrado" });
        }
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ message: "Error interno del servidor", error: error.message }, { status: 500 });
    }
}
