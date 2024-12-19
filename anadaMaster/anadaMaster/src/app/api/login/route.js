import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';

export async function POST(request) {
    try {
        if (!existsSync("JsonFiles/personal.json")) {
            return NextResponse.json({ message: "NOK" });
        }
        // Leer usuarios del archivo
        const users = JSON.parse(readFileSync("JsonFiles/personal.json", 'utf-8'));

        // Obtener datos del usuario del request
        const { user, pass } = await request.json();

        // Verificar si existe un usuario con el mismo nombre y contraseña
        const userLog = users.find(u => u.nombre === user && u.contrasena === pass);
        if (userLog) {
            return NextResponse.json({ message: "OK", userId:userLog.id});
        } else {
            return NextResponse.json({ message: "NOK" });
        }
    } catch (error) {
        console.error("Error en POST /login:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
