Aquí tienes el **Manual de Estilo y Funcionalidad (UI/UX Specification)** definitivo para **FactoWar**.

Este documento funciona como una guía de construcción para desarrollo y diseño. Describe la estética **"Clean Tactical SaaS"** (Fondo Blanco) y el comportamiento detallado de cada componente.

---

# 📘 FACTOWAR: MANUAL DE ESTILO Y FUNCIONALIDAD

## 1. Identidad Visual (Look & Feel)

La estética emula un **panel de control de datos moderno**. Se aleja de la estética "videojuego arcade" para parecer una herramienta de análisis sociológico en tiempo real.

*   **Tema:** Light Mode (Clínico, Limpio, Alto Contraste).
*   **Colores Principales:**
    *   **Canvas/Fondo:** `#FFFFFF` (Blanco Puro).
    *   **Paneles (Sidebar):** `#F8FAFC` (Slate 50 - Gris Hielo).
    *   **Texto Principal:** `#0F172A` (Negro Tinta).
    *   **Bordes:** `#E2E8F0` (Gris Sutil).
*   **Colores Semánticos (Acciones):**
    *   **Amenaza (Infección):** `#EF4444` (Rojo Intenso).
    *   **Defensa (Acción):** `#2563EB` (Azul Real).
    *   **Éxito (Cura):** `#10B981` (Verde Esmeralda).
    *   **Neutro:** `#64748B` (Gris Acero).
*   **Tipografía:**
    *   **Datos y Títulos:** `JetBrains Mono` (Estilo técnico, monoespaciado).
    *   **Textos de Lectura:** `Inter` (Legibilidad alta).

---

## 2. ZONA 1: Header (Navegación)

**Ubicación:** Franja superior fija (sticky) (60px altura).
**Estilo:** Fondo magenta (`#c6057b`), Borde Inferior Gris (`#E2E8F0`).

### Elementos:
1.  **Logotipo:**
    *   *Visual:* Texto "FactoWar" en `Mono Bold`, color blanco. A su lado, un pequeño badge (pastilla) gris que dice `v1.0`.
    *   *Función:* Link a Home (reinicia la sesión si se pulsa durante el juego).
2.  **Menú de Navegación:**
    *   *Visual:* Enlaces de texto simple (`Inter Medium`, blanco).
    *   *Estados:* Normal (blanco), Hover (Negro).
    *   *Items:* Ranking, FACTOs, El Proyecto, Las FakeNews.
3.  **Widget de Identidad (Perfil):**
    *   *Visual:* A la derecha. Avatar del jugador + Alias.
    *   *Estado Invitado:* Muestra un icono de fantasma y el texto "Invitado".
    *   *Función:* Al hacer clic, abre el **Modal de Identidad** (ver Sección 5) para ingresar Token o ver estadísticas rápidas.

---

## 3. ZONA 2: Sidebar Izquierdo (Centro de Mando)

**Ubicación:** Columna izquierda fija (Ancho: 320px).
**Estilo:** Fondo Gris Pálido (`#F8FAFC`), borde derecho para separar del Canvas.
**Función:** Contiene todos los inputs que afectan al algoritmo.

### Módulo A: Tarjeta de Inteligencia (La Noticia)
*Visualiza contra qué está luchando el jugador.*

*   **Estilo:** Contenedor tipo "Card" (Fondo Blanco, Sombra suave, Borde Rojo).

*   **Elementos:**
    *   **Movimiento** Una pequeña rueda simula estar buscando entre las noticias antes de servir una.
    *   **Contexto:** Label pequeño en gris (ej. "CONTEXTO: LGBTIQ+").
    *   **Storytelling:** Texto (la historia del personaje).
    *   **Titular:** Texto grande y negrita (La Fake News).
    *   **Tags:** Pequeñas pastillas (chips) con borde rojo y texto rojo (ej. `#IndignaciónMoral`).
    *   *Tooltip:* Al pasar el mouse sobre un Tag, explica su efecto (ej. "Aumenta viralidad x1.5").

### Módulo B: Selector de Ecosistema (Dificultad)
*Define la resistencia del juego.*

#### Interacción
- **Navegación múltiple:** El usuario puede seleccionar un nivel mediante:
  - Click en los dots superiores (navegación directa)
  - Click en los puntos del slider lateral (izquierdo o derecho)
  
#### Comportamiento
- Al seleccionar un nivel, el contenido cambia con transición animada (fade + slide, 500ms)
- El nivel seleccionado se indica mediante:
  - Dot superior expandido con color del nivel
  - Puntos laterales más grandes con borde de color y shadow
  - Card principal con borde de acento del nivel correspondiente

#### Estados Visuales
- **Normal:** Puntos pequeños en gris (2x2px)
- **Hover:** Cambio de color a gris más oscuro
- **Seleccionado:** Punto expandido (3x3px) con borde de color y shadow
- **Transición:** Animación suave al cambiar entre niveles
*   **Feedback:** Al seleccionar un nivel (ej. "Zona Zero"), cambia de color aparece un texto debajo en rojo: *"Resistencia del Sistema: EXTREMA"*.

#### Niveles Disponibles

| Nivel | Nombre | Tagline | Dificultad | Color |
|-------|--------|---------|------------|-------|
| 1 | El Ágora | "La Verdad Importa" | ▓░░░░ (1/5) | Azul/Cyan |
| 2 | La Plaza | "Ruido de Fondo" | ▓▓░░░ (2/5) | Verde/Esmeralda |
| 3 | Cámara de Eco | "Amistades Peligrosas" | ▓▓▓░░ (3/5) | Ámbar/Naranja |
| 4 | El Laberinto | "Terreno Hostil" | ▓▓▓▓░ (4/5) | Rojo/Rosa |
| 5 | Zona Zero | "Viralidad Total" | ▓▓▓▓▓ (5/5) | Púrpura/Fucsia |



#### Estructura Visual del Card

##### Layout Vertical Compacto (de arriba hacia abajo):

1. **Header**
   - Título: "NIVEL [número]" (texto bold, 2xl, centrado)
   - Barrita de dificultad: 5 segmentos horizontales

2. **Identificación**
   - Ícono circular (outline) + Nombre del nivel
   - Disposición horizontal centrada

3. **Subtítulo**
   - Tagline en itálica (texto pequeño, centrado)

4. **Footer (layout horizontal)**
   - Izquierda: Descripción del escenario (caja con backdrop blur)
   - Derecha: Botón "ELEGIR" (rojo, compacto)

##### Sistema de Colores por Nivel

##### Nivel 1 - El Ágora
```css
Gradiente: from-blue-50 to-cyan-50
Borde: border-blue-500
Dot: bg-blue-500
```

##### Nivel 2 - La Plaza
```css
Gradiente: from-green-50 to-emerald-50
Borde: border-green-500
Dot: bg-green-500
```

##### Nivel 3 - Cámara de Eco
```css
Gradiente: from-amber-50 to-orange-50
Borde: border-amber-500
Dot: bg-amber-500
```

##### Nivel 4 - El Laberinto
```css
Gradiente: from-red-50 to-rose-50
Borde: border-red-500
Dot: bg-red-500
```

##### Nivel 5 - Zona Zero
```css
Gradiente: from-purple-50 to-fuchsia-50
Borde: border-purple-500
Dot: bg-purple-500
```


####  Especificaciones de Diseño

##### Contenedor Principal
- Ancho máximo: 576px (max-w-xl)
- Padding: 12px (p-3)
- Fondo: Blanco
- Bordes redondeados: 12px (rounded-xl)
- Sombra: shadow-lg

##### Card de Nivel
- Altura mínima: 250px
- Padding interno: 16px (p-4)
- Borde: 2px sólido (color según nivel)
- Bordes redondeados: 8px (rounded-lg)
- Fondo: Gradiente específico por nivel

##### Sliders Laterales
- Ancho: 32px (w-8)
- Línea continua: 2px de grosor, color gris-200
- Puntos normales: 2x2px, borde gris-300
- Puntos activos: 3x3px, borde con color del nivel

##### Dots de Navegación Superior
- Normales: 2x2px, circulares, gris-300
- Activos: 6x2px (expandidos), color del nivel
- Espaciado: 8px (gap-2)

##### Botón "ELEGIR"
- Color: bg-red-600 / hover:bg-red-700
- Padding: px-4 py-3
- Texto: Font bold, tamaño xs
- Ícono: Flecha derecha (3x3px)
- Efecto hover: scale-105 + shadow aumentado

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
**Estilo:** Fondo Blanco Puro. Es el área de visualización de datos. Se divide en dos secciones:

Perfecto. A continuación te detallo **el área derecha completa**, descompuesta en **módulos técnicos**, siguiendo **exactamente el estilo del ejemplo** que diste: nombre del módulo, explicación breve en cursiva, bullets claros, foco en UI + mecánica + feedback.

---

### Módulo A: HUD Narrativo y Estado de Partida

*La capa que le da contexto, objetivo y presión al jugador.*

* **Elementos:**

  * Título principal (CTA).
  * Subtítulo narrativo.
  * Reloj de simulación.
* **Contenido:**

  * **Título:** “Toma el control de la red.”
  * **Subtítulo:** “¿Podés detener esta noticia falsa antes de que se difunda sin control?”
* **Diseño:**

  * Tipografía sans-serif, peso fuerte.
  * Subtítulo en color de acento (fucsia).
* **Funcionalidad:**

  * El texto no es decorativo: define el **objetivo de la ronda**.
  * Refuerza el rol del jugador como agente activo.
* **Feedback:**

  * El subtítulo puede cambiar levemente según el estado crítico de la red (ej.: más urgente si la propagación escala).

---

### Módulo B: Reloj de Simulación

*El enemigo invisible: el tiempo.*

* **Elemento:** Contador de tiempo `HH:MM:SS`.
* **Ubicación:** Esquina superior derecha del área principal.
* **Funcionalidad:**

  * Avanza mientras la simulación está en Play.
  * Se congela en Pausa.
* **Feedback:**

  * A mayor velocidad de propagación, el reloj puede emitir un pulso visual sutil.
* **Significado lúdico:**

  * El tiempo es presión sistémica, no decorado.

---

### Módulo C: Puntaje Global

*La recompensa visible del jugador.*

* **Elemento principal:** Puntaje acumulado (ej.: `12.450 PTS`).
* **Contexto textual:** “Tu desempeño en la lucha contra la desinformación”.
* **Diseño:**

  * Tipografía grande.
  * Alto contraste.
* **Funcionalidad: El puntaje se incrementa por:**

    * reducción de propagación
    * aumento de escepticismo
    * contención de clusters radicalizados
* **Feedback:**

  * Micro-animaciones al sumar puntos.
  * El puntaje es el **refuerzo positivo central** del sistema.

---

### Módulo D: Controles Temporales

*El control del ritmo.*

* **Elementos:**

  * Botón Play.
  * Botón Pausa.
  * Botón Avance.
* **Diseño:**

  * Iconos outline.
  * Fondo neutro.
* **Funcionalidad:**

  * Play/Stop: la red evoluciona.
  * Pausa: permite lectura estratégica.
* **Feedback:**

  * El canvas responde inmediatamente al cambio de estado temporal.

---

### Módulo E: Progreso del Ciclo de Noticia

*La vida útil de la fake news.*

* **Elemento:** Indicador “Día X / 30”.
* **Diseño:**

  * Barra horizontal de progreso.
  * Color de avance dinámico.
* **Funcionalidad:**

  * Representa el ciclo completo de propagación.
  * Al llegar al último día, la ronda termina.
* **Feedback:**

  * A mayor propagación, el avance visual parece más agresivo.

---

### Módulo F: Indicadores Sistémicos (KPI en tiempo real)

*El tablero de signos vitales de la red.*

* **Elementos (icono + porcentaje):**

  * Exposición
  * Impacto
  * Polarización
  * Escepticismo
* **Diseño:**

  * Íconos outline.
  * Colores de estado (azul, fucsia, neutro).
* **Funcionalidad:**

  * Reflejan el estado global emergente.
  * Se recalculan continuamente.
* **Feedback:**

  * Cambios bruscos generan animaciones sutiles.
* **Significado:**

  * El jugador aprende a **leer patrones**, no números aislados.


### Módulo G: Barra de Estado de la Noticia

*El “enemigo” actual.*

* **Elementos:**

  * Cálculo del Puntaje parcial.
  * Tag de noticia (ej.: #IndignacionMoral).
  * Estado de verificación.
* **Diseño:**

  * Barra horizontal destacada.
  * Chips compactos, poco redondeados.
* **Funcionalidad:**

  * Resume el estado del conflicto informativo activo.
* **Feedback:**

  * Cambios de estado (verificación, viralidad) se reflejan en color y texto.


### Módulo H: Visualización de Nodos
Ubicado en la parte inferior.

*   **Elementos:** 100 nodos (estilo partículas).
*   **caracteristicas** 3 íconos svg (masc/fem/neutro) distribuidos en prpoporción aleatoria
*   **Código de Color:**
    *   🔵 **Azul:** Susceptible (Ideología A).
    *   🟣 **Fucsia:** Susceptible (Ideología B).
    *   ⚪ **Gris:** Neutro.
    *   🔴 **Rojo:** Infectado (Estado I).
    *   🟢 **Verde:** Escéptico/Curado (Estado Z).
*   **Efecto Visual:** Los nodos rojos tienen un "Glow" (difuminado) rojo suave alrededor, simulando la carga viral. Sin líneas que los conecten, ni grillas.

#### Micro-Textos (Chat Bubbles)
*   **Visual:** Pequeños tooltips o globos de texto que aparecen y desaparecen (Fade In/Out) sobre los nodos.
*   **Contenido:** Emojis (😡, 📢) o frases cortas ("¡Increíble!", "Fake News").
*   **Función:** Dar vida a la simulación y feedback visual del estado emocional de la red. Representan reacciones emocionales. No aportan datos, aportan clima.
* **Feedback:** Aparecen más seguido en estados Expuesto e Infectado.



### Módulo D: Botón CTA (Inicio)
*   **Estado:** Solo visible al inicio (Estado IDLE).
*   **Estilo:** Botón central grande. Fondo magenta, Texto Blanco Bold "ACTUÁ YA".
*   **Animación:** Pulso suave (Scale 1.0 -> 1.05).
*   **Función:** Inicia el Timer y el Algoritmo.

---

## 5. ZONA 4: Footer (Notificaciones)

**Ubicación:** Franja inferior (30px altura).
**Estilo:** Fondo Negro (Alto contraste con el resto blanco).

### Módulo: Marquee (Cinta)
*   **Visual:** Texto Verde Neón (tipo terminal) desplazándose de derecha a izquierda.
*   **Contenido:** Mensajes de estado del sistema ("ALERTA: PICO DE VIRALIDAD", "SISTEMA ESTABILIZADO").

---

## 6. MODALES (Interacciones Críticas)

### A. Modal de Resultados (Fin de Partida)
*   **Trigger:** Salud llega a 0 o Día llega a 30.
*   **Estilo:** Overlay blanco (90% opacidad). Tarjeta central con borde de color (Verde=Win, Rojo=Loss).
*   **Elementos:**
    *   Título Grande ("AMENAZA NEUTRALIZADA").
    *   Score Numérico ("12,450 pts").
    *   Análisis: Texto breve explicando por qué ganó/perdió.
    *   **Botón Principal:** "💾 GUARDAR MI RANGO" (Abre Identidad).
    *   Botón Secundario: "Reiniciar".

### B. Modal de Identidad (Registro)
*   **Trigger:** Botón "Guardar Rango" o clic en Perfil.
*   **Elementos:**
    *   Input: "Alias" (Nombre público).
    *   Selector Avatar: 5 iconos seleccionables.
    *   **Caja de Token:** Un recuadro con borde amarillo punteado que muestra el código único (`fw-xyz...`).
    *   **Botón Copiar:** Icono de portapapeles.
    *   **Input Recuperación:** (Solo si es usuario recurrente) "Pega tu llave aquí".