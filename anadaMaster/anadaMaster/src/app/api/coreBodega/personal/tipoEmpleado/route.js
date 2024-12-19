import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export async function POST(request) {
    try {
        if (!existsSync("JsonFiles/personal.json")) {
            return NextResponse.json({ message: "NOK" });
        }
        // Leer usuarios del archivo
        const personal = JSON.parse(readFileSync("JsonFiles/personal.json", 'utf-8'));

        const { id } = await request.json(); 
        // Verificar si existe un usuario con el mismo ID
        const existe = personal.find(p => p.id === id);
        if (existe) {
            const tipoEmpleado = existe.tipoEmpleado
            return NextResponse.json({ message: "OK", tipoEmpleado });
        } else {
            return NextResponse.json({ message: "NOK" });
        }
    } catch (error) {
        console.error("Error", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}