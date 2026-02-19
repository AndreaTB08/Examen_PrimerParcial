"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerGastos, eliminarGasto } from "./services/gastoService";
import { GastoContext } from "./contextos/GastoContext";

export default function Home() {

  const { gastos, setGastos, presupuesto, setPresupuesto } = useContext(GastoContext);
  const [inputPresupuesto, setInputPresupuesto] = useState("");
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
    const confirmar = confirm("¿Seguro que desea eliminar este gasto? ");
    if (!confirmar) return;

    await eliminarGasto(id);
    cargarGastos();
  }

  function guardarPresupuesto() {
    setPresupuesto(Number(inputPresupuesto));
  }

  const total = gastos.reduce(
    (acc: number, gasto: any) => acc + Number(gasto.monto),
    0
  );

  const porcentaje = presupuesto > 0 ? (total / presupuesto) * 100 : 0;

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Gastos</h1>

      <h3>Total Gastado: {total}</h3>

      <div style={{ marginBottom: 20 }}>
        <h3>Presupuesto Mensual</h3>

        <input
          type="number"
          placeholder="Monto de presupuesto mensual"
          value={inputPresupuesto}
          onChange={(e) => setInputPresupuesto(e.target.value)}
        />

        <button
          onClick={guardarPresupuesto}
          style={{ marginLeft: 10 }}
        >
          Guardar Presupuesto
        </button>

        {presupuesto > 0 && (
          <p>Presupuesto establecido: {presupuesto}</p>
        )}

        {porcentaje >= 80 && porcentaje < 100 && (
          <div style={{ backgroundColor: "yellow", padding: 10 }}>
            Ha alcanzado el 80% del presupuesto
          </div>
        )}

        {porcentaje >= 100 && (
          <div style={{ backgroundColor: "red", color: "white", padding: 10 }}>
            Has superado el limite del presupuesto
          </div>
        )}
      </div>

      <button onClick={() => router.push("/agregar")}>
        Agregar Gasto
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("auth");
          router.replace("/login");
        }}
        style={{ marginLeft: 10 }}
      >
        Cerrar Sesión
      </button>

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