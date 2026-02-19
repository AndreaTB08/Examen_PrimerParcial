"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GastoContext } from "../contextos/GastoContext";

export default function Presupuesto() {

  const { presupuesto, setPresupuesto, gastos } = useContext(GastoContext);
  const [inputPresupuesto, setInputPresupuesto] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      router.replace("/login");
    }
  }, [router]);

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
      <h1>Presupuesto Mensual</h1>

      <input
        type="number"
        placeholder="Monto de presupuesto mensual"
        value={inputPresupuesto}
        onChange={(e) => setInputPresupuesto(e.target.value)}
      />

      <button onClick={guardarPresupuesto} style={{ marginLeft: 10 }}>
        Guardar Presupuesto
      </button>

{presupuesto > 0 && (
  <>
    <p>Presupuesto establecido: {presupuesto}</p>
    <p>Total gastado actualmente: {total}</p>
  </>
)}

      {porcentaje >= 80 && porcentaje < 100 && (
        <div style={{ backgroundColor: "yellow", padding: 10 }}>
          Ha alcanzado el 80% del presupuesto
        </div>
      )}

      {porcentaje >= 100 && (
        <div style={{ backgroundColor: "red", color: "white", padding: 10 }}>
          Has superado el limite del presupuesto, debes ajustar gastos
        </div>
      )}

      <br />

      <button onClick={() => router.push("/gastos")}>
        Ir a Gastos
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
    </div>
  );
}