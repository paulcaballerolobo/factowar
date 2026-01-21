
# 🎨 FACTOWAR: ESPECIFICACIÓN TÉCNICA DE DISEÑO Y UX (V4.0)

Este documento es el estándar técnico absoluto. Combina la identidad visual sofisticada con todas las reglas de interacción, feedback educativo, comportamientos lógicos y especificaciones de ventanas modales.

---

## 1. FUNDAMENTOS Y PALETA DE COLORES (TOKENS)

### A. Colores de Sistema

**Neutrales:**

- **Black**: `#000000` (Header, Background Marquee, Textos Fuertes).
- **White**: `#FFFFFF` (Fondo Canvas, Texto Header, Tarjetas).
- **Sidebar-BG**: `#F8FAFC` (Gris Slate 50).
- **Border-Light**: `#E2E8F0` (Bordes generales).
- **Overlay**: `rgba(15, 23, 42, 0.8)` (Fondo de Modales).

**Acción y Estado:**

- **Electric-Blue**: `#2563EB` (Sliders, HUD Tiempo, Liberales).
- **Fuchsia**: `#D946EF` (HUD Viralidad, Progresistas).
- **Gray-Neutral**: `#94A3B8` (Nodos Neutros, Iconos inactivos).
- **Infection-Red**: `#EF4444` (Estado Infectado, HUD Salud Crítica, Alarma).
- **Cure-Green**: `#10B981` (Estado Curado, HUD Salud Alta).
- **Warning-Amber**: `#F59E0B` (Alertas medias).
- **Ghost-Bar**: `#64748B` (Realidad del motor - Gris Azulado).

### B. Tipografía



---

## 2. COMPONENTES DE ESTRUCTURA (LAYOUT)

### A. Header (Global)

- **Altura**: 64px.
- **CSS**: `position: sticky; top: 0; z-index: 1000; background: #000000;`.
- **Layout**: Flexbox (`justify-content: space-between`).
- **Izquierda**: Logo FactoWar (Blanco, Slab Serif, Bold).
- **Derecha**: Logo Fundación Igualdad (Negativo/Blanco).
- **Menú**: Items en Monospace, color blanco, `font-size: 14px`, `letter-spacing: 1px`.

### B. Sidebar (Panel de Instrumentos)

- **Ancho**: 320px (Fijo).
- **Altura**: `calc(100vh - 64px)`.
- **Estilos**:
  - `background: #F8FAFC;`
  - `border-right: 1px solid #E2E8F0;`
  - `padding: 24px;`
  - `overflow-y: auto;`
- **Orden Vertical**: FakeNews Box → Levels → Sliders → Power-Ups.

---

## 3. ESPECIFICACIONES DE MÓDULOS (SIDEBAR)

### A. FakeNews Box (Visualizador de Misión)

- **Contenedor**: Tarjeta Blanca, Radius 12px, Shadow md.
- **Estado IDLE**: Matriz de caracteres mutantes (Efecto "Desencriptando").
- **Estado RUNNING**: Borde izquierdo 4px Rojo. Label Contexto + Storytelling (Italic) + Titular (Serif Bold).
- **Tags**: Pastillas fondo rojo muy claro, texto rojo.

### B. Módulo de Levels (Selector de Dificultad)

- **Navegación**: Dots superiores (Click directo) + Slider lateral.
- **Feedback**: Transición Fade+Slide. Texto inferior de "Resistencia del Sistema".
- **Colores L1-L5**: Verde, Amarillo, Naranja, Rojo, Púrpura.

### C. Sliders con Ghost Bar y Educación

- **Ayuda**: Icono (?) hoverable con Tooltip explicativo elegante (Fondo negro, texto blanco).
- **Ghost Bar**: Barra trasera gris azulada (`#64748B`) con animación de rebote elástico (`cubic-bezier`).
- **Lock (15s)**: Grayscale + Animación de temblor.

### D. Power-Ups

- **Estilo**: Botón 48px, borde de color, barra de carga inferior.
- **Estados**: Ready (Color sólido/Borde) vs Cooldown (Gris/Rayado).

---

## 4. CANVAS Y SIMULACIÓN (LOOK & FEEL)

### A. Nodos (Entidades)

- **Círculo**: 24px. Relleno sólido (Azul/Fucsia/Blanco).
- **Icono**: SVG Outline Blanco (Usuario).
- **Borde**: 3px Sólido. Blanco (Normal), Rojo (Infectado), Verde (Curado).
- **Glow**: Sombra roja suave que se fusiona entre nodos infectados.

### B. HUD de Estadísticas (Top-Canvas)

Cajas flotantes diseñadas para lectura rápida.

**Contenedor General**:  
```css
display: flex;
gap: 16px;
position: absolute;
top: 24px;
left: 50%;
transform: translateX(-50%);
```

**Estilo de Caja (Card)**:
- **Fondo**: `rgba(255, 255, 255, 0.85)` (Blanco translúcido).
- **Borde**: `1px solid #E2E8F0`.
- **Backdrop Filter**: `blur(8px)`.
- **Radius**: 8px.
- **Padding**: `8px 16px`.
- **Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`.

**Configuración de Indicadores**:

#### 1. Salud de la Red (Health)
- **Icono (Izq)**: ShieldCheck (Outline Flat).  
  *Color:* Dinámico (Verde → Rojo).
- **Datos (Der)**:
  - **Valor**: `95%` (Tipografía Monospace Bold, Tamaño 20px).
  - **Label**: `INTEGRIDAD` (Tipografía System, Tamaño 10px, Color `#64748B`).

#### 2. Alcance Viral (Spread)
- **Icono (Izq)**: Globe o Activity (Outline Flat).  
  *Color:* `#D946EF` (Fuchsia).
- **Datos (Der)**:
  - **Valor**: `1.2k` (Monospace Bold).
  - **Label**: `ALCANCE` (System Small).

#### 3. Tiempo (Timer)
- **Icono (Izq)**: Clock (Outline Flat).  
  *Color:* `#2563EB` (Electric Blue).
- **Datos (Der)**:
  - **Valor**: `00:30` (Monospace Bold).
  - **Label**: `DÍA / CICLO` (System Small).

---

## 5. EFECTOS GLOBALES Y MARQUEE

### A. Siri-Glow Border

Haz de luz multicolor perimetral (inset). Frecuencia aumenta con el peligro.

### B. Marquee Inteligente (Footer)

Cinta de diagnóstico en la parte inferior.

**Contenedor**:
- **Altura**: 32px.
- **Fondo**: `#000000` (Negro Puro).
- **Borde superior**: `1px solid #333`.

**Tipografía**: JetBrains Mono, 12px.

**Animación**: Desplazamiento lineal continuo (20px/s).

**Estados y Comportamientos**:

#### Estado IDLE / ESTABLE:
- **Color Texto**: `#10B981` (Cure-Green).
- **Icono**: CheckCircle (Outline, Stroke 1.5px).
- **Contenido**: `"SISTEMA SINCRONIZADO // MONITOREO DE NODOS ACTIVO // SIN AMENAZAS"`.

#### Estado ALERTA (Incursión/Infección Media):
- **Color Texto**: `#F59E0B` (Warning-Amber).
- **Icono**: AlertTriangle (Outline).
- **Contenido**: `"⚠️ ANOMALÍA DETECTADA EN SECTOR 4 // INYECCIÓN DE DATOS NO VERIFICADOS // RECOMENDACIÓN: ACTIVAR FILTROS"`.

#### Estado CRÍTICO / LOCK:
- **Color Texto**: `#EF4444` (Infection-Red).
- **Icono**: Lock o Siren (Outline).
- **Contenido**: `"⛔ SISTEMA COMPROMETIDO // CONTROLES MANUALES DESHABILITADOS // ERROR DE INTEGRIDAD // EJECUTANDO PROTOCOLOS DE EMERGENCIA"`.

---

## 6. VENTANAS MODALES (SISTEMA)

Diseño flotante, limpio y táctico. No invasivo pero autoritario.

**Estructura Base (Overlay & Card)**

**Overlay (Fondo)**:
- **Color**: `#0F172A` (Slate 900) con opacidad 0.85.
- **Backdrop Filter**: `blur(8px)`.

**Modal Card**:
- **Fondo**: `#FFFFFF` (Blanco Puro).
- **Borde**: `1px solid #E2E8F0`.
- **Radius**: 16px.
- **Padding**: 40px.
- **Ancho Máximo**: 600px.
- **Sombra**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`.

### A. Modal de Bienvenida (Session Init)

- **Header**: Logo FactoWar (Negro, pequeño, centrado).
- **Título**: `"La verdad está bajo ataque."` (Slab Serif, Grande 32px, Centrado).
- **Cuerpo**: `"En la era de la posverdad, la indiferencia es complicidad. Tienes 30 días para evitar el colapso de la red."` (Serif Modern, Gris oscuro).
- **Acción**: Botón `"INICIAR SISTEMA"` (Fondo Negro, Texto Blanco, Hover: Scale transform).

### B. Modal de Resultados (Game Over / Win)

- **Indicador Visual Superior**: Círculo grande con Icono.
  - **Victoria**: Icono Shield Verde.
  - **Derrota**: Icono X-Circle Rojo.
- **Dato Principal**: `"PUNTAJE DE INTEGRIDAD: 85%"` (Monospace, Muy Grande).
- **Grid de Análisis**: 3 columnas pequeñas (Tiempo sobrevivido, Nodos salvados, Nivel de Amenaza).
- **Acciones**:
  - **Primario**: `"GUARDAR PROGRESO"` (Negro).
  - **Secundario**: `"REINTENTAR"` (Outline Gris).

### C. Modal de Identidad (Registro)

- **Título**: `"Identificación de Operador"`.
- **Inputs**:
  - **Estilo**: `height: 48px, background: #F1F5F9, border: none, border-radius: 8px, padding: 0 16px`. Focus: Ring azul.
  - **Campos**: Alias / Avatar Selector.
- **Token Box**: Caja visual tipo "Ticket" mostrando el código único de usuario generado.
```