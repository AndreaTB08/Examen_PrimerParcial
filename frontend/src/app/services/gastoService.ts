export interface Gasto {
  idgasto: number;
  categoria: string;
  monto: number;
  fecha: string;
}

const API_URL = "http://localhost:5001/gasto";

export async function obtenerGastos(): Promise<Gasto[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function obtenerGastoPorId(id: number): Promise<Gasto> {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function crearGasto(gasto: Omit<Gasto, "idgasto">) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gasto),
  });
}

export async function actualizarGasto(id: number, gasto: Omit<Gasto, "idgasto">) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gasto),
  });
}

export async function eliminarGasto(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}