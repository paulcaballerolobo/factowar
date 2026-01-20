 * FACTOWAR: Manual de Estilo UI/UX (v1.0)
 * By Paul Caballero
 * Este documento define la estética, los componentes visuales y la experiencia de usuario diseñada para generar una sensación táctica y de control sistémico.

---

# 🎨 FACTOWAR: MANUAL DE ESTILO Y UX

## 1. Concepto Visual
FactoWar no es un juego plano; es un **simulador táctico de alta tensión**. La estética se inspira en centros de control de ciberseguridad y visualizadores de datos avanzados.

*   **Atmósfera:** Limpia, profesional, con acentos de color vibrantes (glows).
*   **Color de Fondo:** Blanco puro (`#FFFFFF`) para el canvas, para que los nodos resalten.
*   **Paleta de Colores Críticos:**
    *   **Magenta (`#FF00FF`):** Acción, Peligro, Viralidad.
    *   **Cyan (`#00FFFF`):** Datos, Tecnología, Neutralidad.
    *   **Rojo (`#FF0000`):** Infección (Estado I).
    *   **Verde (`#00FF00`):** Verdad/Cura (Estado Z).
    *   **Azul/Fucsia:** Ideologías enfrentadas.

---

## 2. ZONA 1: Header (Título y Marquee)
**Ubicación:** Franja superior de la pantalla.

*   **Logotipo:** "FACTOWAR" en tipografía Sans-Serif Bold, itálica, color magenta.
*   **Marquee (Cinta de Noticias):** Debajo del título, una cinta negra con texto verde neón desplazándose.
    *   *Función:* Mostrar alertas sistémicas en tiempo real.

---

## 3. ZONA 2: Panel Lateral (Control del Operador)
**Ubicación:** Lado izquierdo (Sidebar).
**Estilo:** Fondo gris muy claro o blanco con bordes definidos.

### Módulo A: Tarjeta de Amenaza
*Muestra la noticia que se está filtrando.*
*   **Estilo:** Borde magenta neón.
*   **Contenido:** Titular en negrita, Tags (`#IndignaciónMoral`, etc.).

### Módulo B: Selector de Nivel
*   **Diseño:** Botones tipo "Toggle" o Tabs. No usar dropdowns clásicos.
*   **Niveles:** 1. El Ágora... 5. Zona Zero.
*   **Efecto:** Al seleccionar un nivel, el color de acento del Sidebar cambia sutilmente para reflejar el peligro.

### Módulo C: Controles de Variables (Sliders)
*Las perillas que el jugador mueve.*

*   **Elementos:** 5 Deslizadores (Engagement, Controversia, Moderación, Propagación, Delay).
*   **Diseño del Slider:**
    *   **Pista (Track):** Línea gris.
    *   **Tirador (Thumb):** Círculo blanco con borde azul.
*   **Funcionalidad (La Resistencia):**
    *   Cuando el jugador arrastra el tirador, aparece una **"Barra Fantasma"** (Ghost Bar) semitransparente que se queda atrás.
    *   *Significado:* La posición del tirador es lo que el jugador *quiere*. La barra fantasma es lo que el sistema *permite* (CRA).
    *   *Feedback:* Si la resistencia es alta, el cursor vibra levemente.

### Módulo D: Botonera Táctica (Power-Ups)
*   **Ubicación:** Pie del Sidebar.
*   **Botón 1: "🛡️ LANZAR CAMPAÑA"**
    *   *Estilo:* Borde Verde, Texto Verde.
    *   *Acción:* Al clic, se vuelve gris y una barra de progreso interna empieza a llenarse.
    *   *Función:* Blindaje de nodos.
*   **Botón 2: "⏸️ ACTIVAR FRICCIÓN"**
    *   *Estilo:* Borde Azul, Texto Azul.
    *   *Acción:* Al clic, muestra "ACTIVO: 05s" y cuenta hacia atrás.
    *   *Función:* Ralentización global.

---

## 4. ZONA 3: Canvas Central (Campo de Batalla)

**Ubicación:** El resto de la pantalla.
**Estilo:** Fondo Blanco Puro. Es el área de visualización de datos.

### Módulo A: HUD Narrativo y Estado de Partida
*   **Título:** "Toma el control de la red."
*   **Subtítulo:** "¿Podés detener esta noticia falsa antes de que se difunda sin control?"
*   **Reloj:** Contador de tiempo `HH:MM:SS` avanzando.

### Módulo B: Visualización de Nodos
*   **Elementos:** 100 nodos (estilo partículas).
*   **Código de Color:**
    *   🔵 **Azul:** Susceptible (Ideología A).
    *   🟣 **Fucsia:** Susceptible (Ideología B).
    *   ⚪ **Gris:** Neutro.
    *   🔴 **Rojo:** Infectado (Estado I).
    *   🟢 **Verde:** Escéptico/Curado (Estado Z).
*   **Efecto Visual:** Los nodos rojos tienen un "Glow" (difuminado) rojo suave alrededor, simulando la carga viral.

#### Micro-Textos (Chat Bubbles)
*   **Visual:** Pequeños tooltips que aparecen y desaparecen sobre los nodos.
*   **Contenido:** Emojis (😡, 📢) o frases cortas ("¡Increíble!", "Fake News").
*   **Función:** Dar vida a la simulación y feedback visual del estado emocional de la red.

---

## 5. ZONA 4: Footer (Notificaciones)
**Ubicación:** Franja inferior.

### Módulo: Marquee (Cinta)
*   **Visual:** Texto Verde Neón desplazándose.
*   **Contenido:** Mensajes de estado ("ALERTA: PICO DE VIRALIDAD").

---

## 6. MODALES (Interacciones Críticas)

### A. Modal de Resultados (Fin de Partida)
*   **Estilo:** Overlay blanco (90% opacidad). Tarjeta central con borde de color.
*   **Elementos:** Score Numérico, Análisis de la partida, Botón "GUARDAR RANGO".

### B. Modal de Identidad (Registro)
*   **Elementos:** Input Alias, Selector Avatar, Caja de Token (Código único).
