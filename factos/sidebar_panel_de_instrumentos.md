* FACTOWAR: Jugabilidad
* By Paul Caballero
* En este documento se detalla como es el **sidebar izquierdo** que conforma las herramientas que el usuario dispone para jugar. 
 
Esta es la **Especificación Técnica Definitiva del Sidebar**, reorganizada.

He añadido los estados visuales específicos (Reposo vs. Acción) y la lógica de cooldown de los Power-Ups.

---

# 🎛️ COMPONENTE: SIDEBAR (PANEL DE CONTROL)

**Jerarquía Visual:** Flujo de lectura vertical (De arriba a abajo.


---

## 1. Módulo: FAKENEWS BOX
**Prioridad:** Alta (Visualizador de Misión).

*   **Contenedor:** Tarjeta con fondo **Blanco Puro** (`#FFFFFF`), Borde redondeado `8px`, Sombra suave (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
*   **Altura:** Fija (ej. `200px`) para evitar saltos de layout.

### A. Estado IDLE (Modo Ruido de datos)
Mientras no hay una amenaza activa (o durante la espera inicial), este módulo representa la inestabilidad de la red.
*   **Visualización:** Un bloque de texto simulando "ruido de datos".
*   **Comportamiento de Animación:**
    *   **Matriz:** Una rejilla de caracteres (ej. 5 filas x 20 columnas) usando tipografía `JetBrains Mono`.
    *   **Mutación:** Cada 100ms, caracteres aleatorios de la rejilla cambian individualmente.
    *   **Restricción:** Solo se usan letras mayúsculas/minúsculas (A-Z, a-z). **Prohibido:** Números o símbolos especiales para mantener limpieza visual.
    *   **Efecto:** Cada cambio de letra tiene una transición CSS `opacity` (fade-in/fade-out rápido) para que el texto "respire" sin desplazar el contenido lateralmente.

### B. Estado RUNNING (Amenaza Revelada)
Al iniciar la jugada, la animación de caos se detiene y revela los datos limpios.

*   **Borde Indicador:** Aparece un borde izquierdo grueso (`4px`) de color **Rojo Alerta** (`#EF4444`).
*   **Elementos de Texto:**
    1.  **Label Contexto:** Arriba a la izquierda. Texto `10px`, Uppercase, Bold, color `#64748B`. (ej. `CONTEXTO: GÉNERO`).
    2.  **Storytelling:** Debajo del label. Tipografía `Inter`, `Italic`, `12px`, color `#334155`. (ej. *"Renato necesita tapar un escándalo..."*).
    3.  **Titular Fake:** Centro. Tipografía `JetBrains Mono`, `Bold`, `14px`, color `#0F172A`. (ej. **"EL AGUA TIENE HORMONAS..."**).
*   **Tags (Chips):**
    *   Ubicación: Parte inferior de la tarjeta.
    *   Estilo: `Flex-row`. Pastillas con fondo `#FEF2F2` (Rojo muy claro), Borde `#FCA5A5`, Texto `#EF4444`, `10px` Bold.

---

## 2. Módulo: LEVELS

**Ubicación:** Margen superior `20px` respecto a la tarjeta.

**Visualización**:Navegación Múltiple, el usuario elige nivel mediante Dots superiores, puntos laterales o click en la card.

**Estados de Puntos**: Normal (2x2px), Hover (Gris oscuro), Seleccionado (4x4px + Glow del color del nivel).

**Transición**: Fade + Slide lateral de 500ms al cambiar el contenido.

**Feedback**: Texto inferior: "Resistencia del Sistema: [Nivel]"

---

## 3. Módulo: Sliders


*   **Estructura:** Lista vertical de 5 controles. Espaciado `16px` entre ellos.
*   **Anatomía del Slider:**
    1.  **Label:** Arriba. Texto `10px` Uppercase, color `#64748B`. (ej. `ENGAGEMENT`).
    2.  **Track (Pista):** Línea de fondo color `#E2E8F0`, altura `4px`.
    3.  **Thumb (Tirador):** Círculo `16px`, Fondo Blanco, Borde `2px` Azul (`#2563EB`). Sombra suave.
    4.  **Ghost Bar (Visualización CRA):**
        *   Una barra de relleno secundaria, color `#94A3B8` con opacidad `50%`.
        *   **Comportamiento:** Muestra el valor real. Si el jugador mueve el Thumb a 0% pero el nivel es difícil, la Ghost Bar se queda trabada en 80%, visualizando la fricción del sistema.

*   **Estado GLITCH/LOCK (A los 15s de juego):**
    *   Los sliders se deshabilitan.
    *   Visualmente se vuelven monocromáticos (Grises).
    *   Animación CSS momentánea de "temblor" o distorsión para indicar que el sistema ha sido comprometido.

---

## 4. Módulo: Power-Ups
**Prioridad:** Crítica (Último Recurso).
**Ubicación:** Anclado al final del contenido o con margen superior grande (`auto`).

### Botón A: "🛡️ LANZAR CAMPAÑA"
*   **Contenedor:** Botón rectangular, altura `48px`.
*   **Estilos de Estado:**
    *   **Disponible (Ready):** Borde `2px` sólido **Verde** (`#10B981`). Fondo Blanco. Texto Verde Bold. Icono visible.
    *   **Enfriamiento (Cooldown):** Borde Gris (`#CBD5E1`). Fondo rayado gris suave. Texto Gris: *"RECARGANDO RECURSOS (2 PARTIDAS)"*.
    *   **Activo (In-Game):** Fondo Verde sólido. Texto Blanco: *"CAMPAÑA ACTIVA"*. Barra de progreso interna llenándose.

### Botón B: "⏸️ ACTIVAR FRICCIÓN"
*   **Contenedor:** Botón rectangular, altura `48px`. Margen superior `12px`.
*   **Estilos de Estado:**
    *   **Disponible (Ready):** Borde `2px` sólido **Azul** (`#2563EB`). Fondo Blanco. Texto Azul Bold.
    *   **Enfriamiento (Cooldown):** Borde Gris. Texto Gris: *"ENFRIANDO SISTEMAS (1 PARTIDA)"*.
    *   **Activo (In-Game):** Fondo Azul sólido. Texto Blanco parpadeante: *"FRICCIÓN: 05s"*.


