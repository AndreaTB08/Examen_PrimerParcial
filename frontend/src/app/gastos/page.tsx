"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { obtenerGastos, eliminarGasto } from "../services/gastoService";
import { GastoContext } from "../contextos/GastoContext";

export default function Gastos() {

  const { gastos, setGastos } = useContext(GastoContext);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      router.replace("/login");
      return;
    }

    cargarGastos();
  }, [router]);

  async function cargarGastos() {
    const data = await obtenerGastos();
    setGastos(data);
  }

  async function handleEliminar(id: number) {
    const confirmar = confirm("¿Seguro que desea eliminar este gasto?");
    if (!confirmar) return;

    await eliminarGasto(id);
    cargarGastos();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Gastos</h1>

      <button onClick={() => router.push("/agregar")}>
        Agregar Gasto
      </button>

      <button
        onClick={() => router.push("/presupuesto")}
        style={{ marginLeft: 10 }}
      >
        Volver a Presupuesto
      </button>

      <br /><br />

      {gastos.map((gasto: any) => (
        <div key={gasto.idgasto} style={{ marginBottom: 25 }}>
          <p><strong>Categoria:</strong> {gasto.categoria}</p>
          <p><strong>Descripción:</strong> {gasto.descripcion}</p>
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