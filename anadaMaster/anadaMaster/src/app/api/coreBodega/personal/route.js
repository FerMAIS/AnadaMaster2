import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';


export async function POST(request) {
    const data = await request.json();
    try {
        const personal = existsSync("JsonFiles/personal.json") ? JSON.parse(readFileSync("JsonFiles/personal.json", 'utf-8')) : [];
        writeFileSync("JsonFiles/personal.json", JSON.stringify([...personal, data], null, 2));
        return NextResponse.json({ message: "OK" });
    } catch (e) {
        console.error("Error al dar de alta al personal:", e);
        writeFileSync("JsonFiles/personal.json", JSON.stringify([...personal, data], null, 2));
        return NextResponse.json({ message: "Archivo creado y noticia subida" });
    }
}

export async function GET() {
    try {    
      // Leer el archivo JSON
      const jsonData = readFileSync("JsonFiles/personal.json", 'utf-8');
      const personal = JSON.parse(jsonData);
  
      // Devolver todos los datos del personal
      return NextResponse.json({ datos: personal }, { status: 200 });
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
      return NextResponse.json({ error: 'No se pudieron cargar los datos del personal' }, { status: 500 });
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
        const personal = existsSync("JsonFiles/personal.json") 
            ? JSON.parse(readFileSync("JsonFiles/personal.json", 'utf-8')) 
            : [];

        // Filtrar el personal para eliminar el registro con el ID dado
        const personalActualizado = personal.filter((item) => item.id !== id);

        // Escribir los cambios al archivo
        writeFileSync("JsonFiles/personal.json", JSON.stringify(personalActualizado, null, 2));

        return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el personal:", error);
        return NextResponse.json({ message: "Error al eliminar el personal" }, { status: 500 });
    }
}

  