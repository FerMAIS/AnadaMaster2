import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';


export async function POST(request) {
  const data = await request.json();
  console.log(data)
  try {
      const pedido = existsSync("JsonFiles/pedidos.json") ? JSON.parse(readFileSync("JsonFiles/pedidos.json", 'utf-8')) : [];
      writeFileSync("JsonFiles/pedidos.json", JSON.stringify([...pedido, data], null, 2));
      return NextResponse.json({ message: "OK" });
  } catch (e) {
      console.error("Error al aceptar pedido:", e);
      writeFileSync("JsonFiles/pedido.json", JSON.stringify([...pedido, data], null, 2));
      return NextResponse.json({ message: "Archivo creado" });
  }
}

export async function GET() {
    try {    
      const jsonData = readFileSync("JsonFiles/pedidos.json", 'utf-8');
      const pedidos = JSON.parse(jsonData);
  

      return NextResponse.json({ datos: pedidos }, { status: 200 });
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
      const pedido = existsSync("JsonFiles/pedidos.json") 
          ? JSON.parse(readFileSync("JsonFiles/pedidos.json", 'utf-8')) 
          : [];

      // Filtrar el pedido para eliminar el registro con el ID dado
      const pedidoActualizado = pedido.filter((item) => item.id !== id);

      // Escribir los cambios al archivo
      writeFileSync("JsonFiles/pedidos.json", JSON.stringify(pedidoActualizado, null, 2));

      return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
      console.error("Error al eliminar el pedido:", error);
      return NextResponse.json({ message: "Error al eliminar el pedido" }, { status: 500 });
  }
}

  