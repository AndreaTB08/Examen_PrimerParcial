"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function iniciarSesion() {
    if (usuario === "admin" && clave === "admin123") {
      localStorage.setItem("auth", "true");
      router.replace("/presupuesto");
    } else {
      setError("Usuario o clave incorrectos");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Inicio de Sesión</h2>

      <div>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>

      <br />

      <button
        onClick={iniciarSesion}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "8px 16px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Iniciar Sesión
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}