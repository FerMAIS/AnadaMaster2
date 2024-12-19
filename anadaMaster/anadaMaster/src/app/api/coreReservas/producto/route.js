import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const filePath = "JsonFiles/producto.json";

// Leer datos del archivo JSON
function readData() {
    if (existsSync(filePath)) {
        return JSON.parse(readFileSync(filePath, 'utf-8'));
    }
    return [];
}

// Guardar datos en el archivo JSON
function writeData(data) {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Obtener todos los datos
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json({ message: "OK", datos: data });
    } catch (error) {
        console.error("Error en GET /producto:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}

// Crear o agregar nueva producto
export async function POST(request) {
    try {
       
        const data = readData();
        const nuevaproducto = await request.json();
        data.push(nuevaproducto);

        writeData(data);

        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error en POST /producto:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}

// Editar una producto existente
export async function PUT(request) {
    try {
        const data = readData();
        const { Id, ...rest } = await request.json();

        const index = data.findIndex(item => item.Id === Id);
        if (index === -1) {
            return NextResponse.json({ message: "NOK: Producto no encontrada" });
        }

        data[index] = { ...data[index], ...rest };
        writeData(data);

        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error en PUT /producto:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}

// Eliminar una producto
export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        let data = readData();
        const initialLength = data.length;
        data = data.filter(item => item.Id !== id);

        if (data.length === initialLength) {
            return NextResponse.json({ message: "NOK: Producto no encontrada" });
        }

        writeData(data);
        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error en DELETE /producto:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
