"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { actualizarGasto, Gasto } from "../../services/gastoService";

export default function EditarGasto() {
  const { idgasto } = useParams();
  const router = useRouter();

  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    async function cargar() {
      const response = await fetch(
        `http://localhost:5001/gasto/${idgasto}`
      );
      const data: Gasto = await response.json();

      setCategoria(data.categoria);
      setDescripcion(data.descripcion || "");
      setMonto(String(data.monto));
      setFecha(data.fecha);
    }

    if (idgasto) cargar();
  }, [idgasto]);

  async function actualizar() {
    await actualizarGasto(Number(idgasto), {
      categoria,
      descripcion,
      monto: Number(monto),
      fecha,
    });

    router.push("/gastos");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Editar Gasto</h2>

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <br /><br />

      <button
        onClick={actualizar}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "6px 14px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Actualizar
      </button>
    </div>
  );
}