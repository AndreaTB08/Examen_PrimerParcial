"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearGasto } from "../services/gastoService";

export default function AgregarGasto() {
  const router = useRouter();

  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  async function guardar() {
    await crearGasto({
      categoria,
      monto: Number(monto),
      fecha,
    });

    router.push("/");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Agregar Gasto</h2>

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Monto"
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

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}