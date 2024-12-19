import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';


export async function POST(request) {
    const data = await request.json();
    try {
        const cliente = existsSync("JsonFiles/cliente.json") ? JSON.parse(readFileSync("JsonFiles/cliente.json", 'utf-8')) : [];
        writeFileSync("JsonFiles/cliente.json", JSON.stringify([...cliente, data], null, 2));
        return NextResponse.json({ message: "OK", id: data.id});
    } catch (e) {
        console.error("Error al dar de alta al cliente:", e);
        writeFileSync("JsonFiles/cliente.json", JSON.stringify([...cliente, data], null, 2));
        return NextResponse.json({ message: "Archivo creado y noticia subida" });
    }
}

export async function GET() {
    try {    
      // Leer el archivo JSON
      const jsonData = readFileSync("JsonFiles/cliente.json", 'utf-8');
      const cliente = JSON.parse(jsonData);
  
      // Devolver todos los datos del cliente
      return NextResponse.json({ datos: cliente }, { status: 200 });
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
      return NextResponse.json({ error: 'No se pudieron cargar los datos del cliente' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
        }

        // Leer el archivo JSON existente
        const cliente = existsSync("JsonFiles/cliente.json") 
            ? JSON.parse(readFileSync("JsonFiles/cliente.json", 'utf-8')) 
            : [];

        // Filtrar el cliente para eliminar el registro con el ID dado
        const clienteActualizado = cliente.filter((item) => item.id !== id);

        // Escribir los cambios al archivo
        writeFileSync("JsonFiles/cliente.json", JSON.stringify(clienteActualizado, null, 2));

        return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        return NextResponse.json({ message: "Error al eliminar el cliente" }, { status: 500 });
    }
}

  