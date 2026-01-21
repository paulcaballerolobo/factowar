* Sistema de usuarios
* By Paul Caballero
* Este documento refleja la **Guía Completa del Sistema de Identidad y Tokens** de FactoWar. Este sistema sigue el principio de **"Zero Friction"** (Cero Fricción) y **"Lazy Registration"** (Registro Tardío).

---

# Sistema de Identidad Soberana (Token System)

## 1. Filosofía de Diseño
En FactoWar, no existen "cuentas" tradicionales. No pedimos correo electrónico, ni contraseñas, ni verificación social.
*   **Privacidad por Diseño:** No almacenamos datos personales.
*   **Inmediatez:** El jugador empieza a jugar en menos de 5 segundos.
*   **Responsabilidad:** La seguridad de la cuenta depende de que el usuario guarde su "Llave" (Token).

---

## 2. Flujo de Usuario (User Journey)

### A. Ingreso (Modo Invitado / Sesión Efímera)
Al entrar a la web, el usuario no se "loguea". Simplemente configura su apariencia temporal.

1.  **Input de Alias:** Escribe cualquier nombre (ej. "Luis"). *Nota: Los nombres no son únicos, pueden repetirse.*
2.  **Selector de Avatar:** Elige uno de los 5 arquetipos visuales.
3.  **Acción:** Clic en "INICIAR".
4.  **Estado:** En este punto, el usuario es un **Invitado**. Su progreso vive solo en la memoria temporal del navegador.

### B. Consolidación (Generación de Llave)
Este paso ocurre **SOLO AL FINALIZAR UNA PARTIDA** exitosa, cuando el usuario tiene un puntaje que desee guardar.

**REGLA**: El puntaje es siempre acumulativo durante la **Partida** (sesión del navegador). El jugador suma los puntos de cada **Jugada** individual exitosa o fallida al **Score REGLA (Total)**. El jugador puede elegir no guardar el progreso final, pero el sistema fomenta la acumulación para el Ranking.

1.  **Call to Action:** En el modal de "Victoria/Derrota", aparece el botón: **💾 GUARDAR MI RANGO**.
2.  **El Ritual de la Llave:**
    *   El sistema genera criptográficamente un string único (Token).
    *   **Formato:** `fw-[9caracteres]-[timestamp]` (ej. `fw-m2k9x8l1p-170933`)
    *   **Visualización:** Se muestra en una caja tipo "terminal" con borde de advertencia.
3.  **Advertencia de Seguridad:**
    > *" GUARDA ESTA LLAVE. FactoWar no guarda contraseñas. Si borras el historial de tu navegador o cambias de dispositivo, esta llave es la única forma de recuperar tu rango."*
4.  **Acciones:**
    *   `[COPIAR]` (Al portapapeles).
    *   `[DESCARGAR]` (Baja un archivo de texto `.factowar-key`).
5.  **Persistencia:** Al aceptar, el token se guarda en el `localStorage` del navegador.

### C. Retorno (Reanudar Sesión)
Si el usuario vuelve a entrar días después:

*   **Escenario 1 (Mismo Navegador):** El sistema detecta el token en `localStorage` y lo saluda automáticamente: *"Bienvenido de nuevo, Luis"*.
*   **Escenario 2 (Nuevo Dispositivo/Limpieza de Cookies):**
    1.  En la Home, el usuario hace clic en el enlace pequeño: **"¿Ya tienes llave? Reanudar."**
    2.  Se abre un input: **"Pega tu Llave de Operador"**.
    3.  El sistema valida el formato. Si es correcto, recupera el Historial y el Rango.

---

## 3. Los Arquetipos (Avatares)
El usuario elige su representación visual entre 5 iconos estilo "Flat Outline". Esto ayuda a identificarlo visualmente en el Ranking.

**SUGERENCIAS DE NOMBRES:**

1.  ** GHOST (Default):** El usuario anónimo. Perfil bajo.
2.  ** ANALISTA:** Icono de gafas/datos. Perfil lógico y calculador.
3.  ** CENTINELA:** Icono de escudo. Perfil defensivo y protector.
4.  ** ACTIVISTA:** Icono de rayo/megáfono. Perfil de acción directa.
5.  ** OPERADOR:** Icono de headset táctico. Perfil de coordinador de sistemas.

**REGLA:** Cada Avatar debe darle alguna habilidad.
**REGLA:** Los avatares no deben sugerir identidades estrictamente binarias. 

---

## 4. El Leaderboard (Privacidad Pública)
Como los nombres (Alias) pueden repetirse, el sistema utiliza un **ID Corto** derivado del Token para diferenciar usuarios en la tabla de posiciones.

**Visualización en la Tabla:**

| Rango | Operador | Nivel | Score |
| :--- | :--- | :--- | :--- |
| 🥇 1 | **[Icono] Luis #A9F2** | Zona Zero | 62,450 |
| 🥈 2 | **[Icono] Maria #X7B1** | Laberinto | 58,100 |
| 🥉 3 | **[Icono] Luis #M2K9** | Eco | 45,200 |

*   **Nombre:** Elegido por el usuario (puede haber mil "Luis").
*   **#ID:** Los últimos 4 caracteres del hash del Token (generado por sistema). Garantiza unicidad visual sin revelar la llave completa.
*   **REGLA:** Los nombres visualmente deben tener más peso visual que los ID 

---

## 5. Especificación Técnica (Datos)

### Estructura del Objeto de Identidad (JSON)
Este JSON es una Sugerencia del manejo de este sistema, seria lo que se guarda en el navegador del usuario y se envía a la base de datos (si la hubiera) para el ranking.

**REGLA:** Actualizar este script si se modifica o reemplaza por otro y comentarlo

```javascript
{
  "identity": {
    "alias": "Luis",             // Nombre visible (Editable)
    "avatarId": 3,               // 1-5 (Centinela)
    "token": "fw-a8z9m2k1-...",  // LA LLAVE PRIVADA (No compartir)
    "shortId": "#A9F2",          // Identificador público (Derivado)
    "createdAt": 16238492011     // Timestamp
  },
  "stats": {
    "rankTitle": "Veterano",     // Título basado en score
    "maxScore": 62450,           // Mejor puntuación histórica
    "maxLevelBeaten": 5,         // Nivel más difícil superado
    "gamesPlayed": 12            // Contador de partidas
  }
}
```

### Reglas de Seguridad
1.  **Nunca mostrar el Token completo en el Leaderboard.** Solo el Alias y el ShortID.
2.  **Validación:** El Token funciona como autenticación. Quien tiene el Token, tiene la cuenta.
3.  **Sin Recuperación:** No existe "Olvidé mi contraseña" porque no existe email asociado. Esto es intencional para enseñar sobre soberanía de datos.