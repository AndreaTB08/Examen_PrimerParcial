"use client";

import { createContext, useState, useEffect } from "react";
import { obtenerGastos, Gasto } from "../services/gastoService";

interface GastoContextType {
  gastos: Gasto[];
  setGastos: React.Dispatch<React.SetStateAction<Gasto[]>>;
  presupuesto: number;
  setPresupuesto: React.Dispatch<React.SetStateAction<number>>;
}

export const GastoContext = createContext<GastoContextType>({
  gastos: [],
  setGastos: () => {},
  presupuesto: 0,
  setPresupuesto: () => {}
});

export function GastoProvider({ children }: { children: React.ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [presupuesto, setPresupuesto] = useState<number>(0);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerGastos();
      setGastos(data);
    }
    cargar();
  }, []);

  return (
    <GastoContext.Provider
      value={{
        gastos,
        setGastos,
        presupuesto,
        setPresupuesto
      }}
    >
      {children}
    </GastoContext.Provider>
  );
}