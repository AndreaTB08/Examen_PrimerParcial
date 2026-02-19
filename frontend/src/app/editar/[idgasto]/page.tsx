"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { actualizarGasto, Gasto } from "../../services/gastoService";

export default function EditarGasto() {
  const params = useParams();
  const router = useRouter();
  const idgasto = Number(params.idgasto);

  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    async function cargar() {
      const response = await fetch(
        `http://localhost:5001/gasto/${idgasto}`
      );
      const data: Gasto = await response.json();

      setCategoria(data.categoria);
      setMonto(String(data.monto));
      setFecha(data.fecha);
    }

    if (idgasto) {
      cargar();
    }
  }, [idgasto]);

  async function actualizar() {
    await actualizarGasto(idgasto, {
      categoria,
      monto: Number(monto),
      fecha,
    });

    router.push("/");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Editar Gasto</h2>

      <div>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <br />

      <button
        onClick={actualizar}
        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Actualizar
      </button>
    </div>
  );
}