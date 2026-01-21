 * Diseño técnico de algoritmos
 * By Paul Caballero
 * Este diseño técnico traduce las teorías de McLuhan y el modelo epidemiológico **SEIZ** (Susceptible-Expuesto-Infectado-Escéptico) a lógica programable para una aplicación React.

 
#Algoritmo

El algoritmo se divide en tres bloques: **Inicialización de Constantes**, **Motor Físico (Movimiento)** y **Motor Lógico (Estados SEIZ)**.

---

### 1. Estructura de Datos y Entradas (Inputs)

El algoritmo recibe un objeto de configuración (`simulationConfig`) basado en los sliders del administrador y los tags de la noticia generada.

#### A. Variables Globales (Configuración)
```typescript
interface SimulationConfig {
  // Parámetros del Administrador (Sliders)
  engagementRate: number;      // 0.0 a 1.0 (Afecta tasa de contacto Beta)
  controversy: number;         // 0.0 a 1.0 (Afecta virilidad P)
  moderation: number;          // 0.0 a 1.0 (Probabilidad de transición a Z)
  polarization: number;        // 0.0 a 1.0 (Fuerza de repulsión entre grupos)
  factCheckDelay: number;      // Días (simulados) hasta que se activa la "cura"
  currentTime: number;         // Tiempo actual de simulación (ticks)

  // Tags de la Noticia (Multiplicadores)
  tags: {
    hotContent: boolean;       // #ContenidoCaliente (Salto directo S -> I)
    moralOutrage: boolean;     // #IndignaciónMoral (Multiplicador Beta)
    curiosityGap: boolean;     // #BrechaDeCuriosidad (Favorece S -> E)
    emotionalAlert: boolean;   // #AlertaEmocional (Reduce incubación E -> I)
    kolImpact: boolean;        // #LíderDeOpinión (Radio de influencia global)
  }
}
```

#### B. Objeto Nodo (Estado Individual)
Cada una de las 100 partículas tiene este estado:
```typescript
interface Node {
  id: number;
  x: number; y: number;        // Posición en Canvas
  vx: number; vy: number;      // Velocidad (Física)
  ideology: 'blue' | 'fuchsia' | 'neutral'; // Tribu original
  
  // Estado SEIZ
  state: 'S' | 'E' | 'I' | 'Z'; 
  
  // Contadores internos
  incubationTimer: number;     // Tiempo que lleva en estado E
  infectionTime: number;       // Momento en que se infectó (para calcular impacto)
  radicalized: boolean;        // True si era 'neutral' y pasó a amarillo
  stubbornness: number;        // 0.0 a 1.0 (Resistencia al cambio, alfabetización)
}
```

---

### 2. Algoritmo Matemático SEIZ (Lógica de Infección)

Este cálculo se ejecuta en cada *tick* (paso de tiempo) de la simulación.

#### Paso 1: Calcular Coeficientes Dinámicos
Primero, traducimos los sliders y tags a coeficientes matemáticos ($ \beta, b, \rho, l $).

1.  **Tasa de Contacto ($\beta$):** Probabilidad de transmisión por cercanía.
    $$ \beta = 0.05 \times (1 + \text{engagementRate} \times 2.5) $$
    *   *Si `#IndignaciónMoral`:* $\beta = \beta \times 1.4$
    *   *Si `#LíderDeOpinión`:* $\beta = \beta \times 2.0$ (Super-spreader)

2.  **Probabilidad de Infección Directa ($p$):** Salto de $S \to I$ (sin pensar).
    $$ p = \text{controversy} \times 0.5 $$
    *   *Si `#ContenidoCaliente`:* $p = p + 0.3$ (Alta definición visual = menos duda).

3.  **Tasa de Incubación ($\rho$):** Velocidad de $E \to I$.
    $$ \rho = 0.1 $$
    *   *Si `#AlertaEmocional`:* $\rho = 0.4$ (El miedo reduce el tiempo de reflexión).
    *   *Si `#BrechaDeCuriosidad`:* Favorece la entrada a $E$, pero mantiene $\rho$ bajo (la gente duda/investiga).

4.  **Efectividad del Fact-Check ($l$):** Probabilidad de $I \to Z$ o $E \to Z$.
    *   Solo se activa si `currentTime > factCheckDelay`.
    *   Fórmula de decaimiento logarítmico (cuanto más tarde, menos efectivo):
    $$ \text{FuerzaCura} = \text{moderation} \times \frac{1}{\ln(1 + \text{factCheckDelay})} $$

#### Paso 2: Transiciones de Estado (Por Nodo)

Para cada nodo $n$, iteramos sobre sus vecinos dentro del `RADIO_INFLUENCIA` (ej. 25px):

**A. De Susceptible ($S$) a Expuesto ($E$) o Infectado ($I$)**
Si el nodo es $S$, cuenta cuántos vecinos son $I$ ($N_{inf}$).

*   **Probabilidad de Infección ($P_{inf}$):**
    $$ P_{inf} = 1 - (1 - (\beta \times p))^{N_{inf}} $$
    *   *Lógica:* Si `Math.random() < P_inf`, el nodo pasa a **Infectado ($I$)**.

*   **Probabilidad de Exposición ($P_{exp}$):** (Solo si no se infectó directamente)
    $$ P_{exp} = 1 - (1 - (\beta \times (1-p)))^{N_{inf}} $$
    *   *Lógica:* Si `Math.random() < P_exp`, el nodo pasa a **Expuesto ($E$)**. Inicia `incubationTimer`.

**B. De Expuesto ($E$) a Infectado ($I$)**
Si el nodo es $E$:
*   Incrementar `incubationTimer`.
*   Si `incubationTimer > (1 / ρ)`, el nodo pasa a **Infectado ($I$)**.

**C. Radicalización (Neutros)**
Si el nodo es `neutral` y estado $I$:
*   Si tiene $> 3$ vecinos $I$ (de color azul/fucsia), `radicalized = true` (Se vuelve Amarillo visualmente).

**D. Recuperación a Escéptico ($Z$)**
Si el nodo es $E$ o $I$ y el Fact-Check está activo:
*   Probabilidad de cura:
    $$ P_{cure} = \text{FuerzaCura} \times (1 + \text{stubbornness}) $$
*   Si `Math.random() < P_cure`, el nodo pasa a **Escéptico ($Z$)**. Corta la cadena de transmisión.

---

### 3. Motor Físico (Movimiento y Cámaras de Eco)

Utiliza un sistema de fuerzas simple para simular la polarización social en el Canvas.

#### Cálculo de Velocidad ($v_x, v_y$)
Para cada nodo, calcular vector de fuerza resultante:

1.  **Atracción por Afinidad (Clustering):**
    *   Si Node A y Node B tienen la misma `ideology`, se atraen.
    *   $$ F_{attract} = \text{engagementRate} \times (1 - \frac{\text{distancia}}{\text{RADIO}}) $$

2.  **Repulsión por Oposición (Polarización):**
    *   Si Node A y Node B tienen ideologías opuestas (Azul vs Fucsia).
    *   $$ F_{repulse} = \text{polarization} \times \frac{50}{\text{distancia}^2} $$
    *   *Nota:* Si `polarization > 0.6`, la fuerza se duplica, rompiendo el centro gris.

3.  **Fricción:** Multiplicar velocidad por `0.9` para evitar caos infinito.

---

### 4. Sistema de Visualización (Renderizado)

Variables visuales mapeadas al estado del nodo para CSS/Canvas:

| Estado del Nodo | Color Base (`fill`) | Borde / Anillo (`stroke`) | Animación |
| :--- | :--- | :--- | :--- |
| **Susceptible (S)** | Ideología (Azul/Fucsia/Gris) | Ninguno | Movimiento suave. |
| **Expuesto (E)** | Ideología original | Blanco / Amarillo tenue (Alpha 0.5) | **Pulsación Lenta:** Opacidad del borde varía (Sine Wave 0.5Hz). |
| **Infectado (I)** | Ideología original | **Rojo Intenso (#FF0000)** | **Pulsación Rápida:** Radio del borde se expande y desvanece (1.5Hz). |
| **Radicalizado** | **Amarillo (#FFD700)** | Rojo Intenso | Igual que Infectado, pero el cuerpo cambia de color. |
| **Escéptico (Z)** | Color original (desaturado) | Gris Oscuro (Grueso 3px) | Estático o muy lento. "Escudo" visual. |

#### Mapa de Calor (Fondo)
Para generar el efecto de "mancha de infección" en el fondo:
1.  Crear una textura/canvas secundario de baja resolución.
2.  Por cada nodo **Infectado ($I$)**, dibujar un círculo radial rojo con `globalAlpha = 0.1` y radio grande (ej. 60px).
3.  Aplicar filtro de desenfoque (Blur) al canvas de fondo.
4.  Resultado: Las zonas con alta densidad de infectados brillan en rojo difuso.

### Resumen de Métricas de Salida

Para el panel de control, calcular en cada frame:

1.  **Exposición:** $\frac{\text{Count}(E) + \text{Count}(I)}{100} \times 100$
2.  **Impacto (Viralidad):** Sumatoria de todos los $I$ multiplicada por la velocidad de crecimiento ($\Delta I / \Delta t$).
3.  **Polarización Real:** Distancia promedio entre el centro de masa del grupo Azul y el grupo Fucsia.
4.  **Estado Verificación:**
    *   Si `currentTime < factCheckDelay`: Texto "NO VERIFICADO" (Gris).
    *   Si `currentTime >= factCheckDelay`: Texto "DESMENTIDA" (Rojo) + Icono Check.