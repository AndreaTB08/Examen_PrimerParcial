"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerGastos, eliminarGasto, Gasto } from "./services/gastoService";

export default function Home() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const router = useRouter();

  useEffect(() => {
    cargarGastos();
  }, []);

  async function cargarGastos() {
    const data = await obtenerGastos();
    setGastos(data);
  }

  async function handleEliminar(id: number) {
    await eliminarGasto(id);
    cargarGastos();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Gastos</h1>

      <button
        onClick={() => router.push("/agregar")}
        style={{ marginBottom: 20 }}
      >
        Agregar Gasto
      </button>

      {gastos.map((gasto) => (
        <div key={gasto.idgasto} style={{ marginBottom: 15 }}>
          <p><strong>Categoria:</strong> {gasto.categoria}</p>
          <p><strong>Monto:</strong> {gasto.monto}</p>
          <p><strong>Fecha:</strong> {gasto.fecha}</p>

          <button
            onClick={() => router.push(`/editar/${gasto.idgasto}`)}
            style={{ marginRight: 10 }}
          >
            Editar
          </button>

          <button
            onClick={() => handleEliminar(gasto.idgasto)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Eliminar
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}