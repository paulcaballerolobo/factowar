 * MAPA DE TEXTOS Y MICROCOPY (v1.0)
 * By Paul Caballero
 * Este documento organiza todos los textos que el usuario verá en la interfaz, desde títulos narrativos hasta mensajes de error y frases de los "nodos" del canvas.
---
## Nota de alcance
Este documento describe la visión conceptual y las mecánicas de FactoWar.
No define una arquitectura técnica ni una implementación cerrada.
Las decisiones técnicas deben surgir de la interpretación de este diseño.

# 📝 MAPA DE TEXTOS Y MICROCOPY

## 1. TEXTOS ESTRUCTURALES (LAYOUT)

### Zona: Header
*   **Logo:** `FACTOWAR`
*   **Eslogan (Opcional):** `Simulador de Resistencia Algorítmica`

### Zona: Sidebar (Panel de Control)
*   **Sección Amenaza:** `SITUACIÓN ACTUAL`
*   **Sección Nivel:** `ECOSISTEMA DIGITAL`
*   **Sección Sliders:** `CONTROL DE VARIABLES`
*   **Sección Power-ups:** `ACCIONES TÁCTICAS`

### Zona: Canvas (HUD)
*   **Barra de Salud:** `INTEGRIDAD DEL SISTEMA`
*   **Contador Temporal:** `DÍA [01] / 30`
*   **Identidad:** `OP_ID_#XXXX`
*   **Score Actual:** `SCORE JUGADA`
*   **Score Acumulado:** `SCORE PARTIDA`

### Zona: HUDs Flotantes (Métricas en Tiempo Real)

#### HUD 1: EXPOSICIÓN
*   **Valor:** Porcentaje de nodos en estado E (Expuestos)
*   **Explicación:** Representa qué tan extendida está la "duda" en la red. Nodos que han visto la desinformación pero aún no la comparten.
*   **Interpretación:**
    *   0-30%: Bajo - La mayoría de la red no ha sido alcanzada
    *   30-60%: Medio - La desinformación se está propagando
    *   60-100%: Alto - Exposición masiva, riesgo de colapso

#### HUD 2: IMPACTO
*   **Valor:** Número total de nodos afectados (E + I)
*   **Explicación:** Alcance total de la desinformación. Suma de nodos expuestos e infectados.
*   **Interpretación:** Cuanto mayor sea el número, más extendida está la fake news en la red.

#### HUD 3: POLARIZACIÓN
*   **Valor:** Porcentaje de fragmentación ideológica (0-100%)
*   **Explicación:** Mide qué tan concentrada está la infección en un solo grupo ideológico vs. distribuida equitativamente.
*   **Interpretación:**
    *   0-30%: Baja - Infección distribuida equitativamente
    *   30-70%: Media - Formación de cámaras de eco
    *   70-100%: Alta - Un grupo ideológico domina la narrativa

#### HUD 4: CLUSTERS
*   **Valor:** Número de grupos aislados detectados
*   **Explicación:** Cantidad de "burbujas" de nodos del mismo color que están físicamente cerca entre sí.
*   **Interpretación:** Más clusters = Mayor fragmentación de la red en grupos aislados.

---

## 2. TEXTOS DINÁMICOS (MÓDULOS)

### Módulo: Tarjeta de Amenaza (Información Dinámica)
*El texto cambia según la historia cargada aleatoriamente.*

| Elemento UI | Texto (Variables) |
| :--- | :--- |
| **Etiqueta Contexto** | **CONTEXTO: [POLÍTICA / SALUD / CLIMA]** |
| **Storytelling** | *(Ejemplo)* "Un grupo extremista ha filtrado un audio manipulado para generar pánico en el Sector A." |
| **Titular Fake** | *(Ejemplo)* **"¡CONFIRMADO! El agua potable contiene nanobots de rastreo estatal."** |
| **Tags (Chips)** | **#IndignaciónMoral**<br>**#AlertaEmocional**<br>**#ContenidoCaliente** |

### Módulo: Selector de Ecosistema
*Opciones disponibles en el botón de selección.*

| Opción | Texto Principal | Tagline (Subtexto) |
| :--- | :--- | :--- |
| **Nivel 1** | **1. El Ágora** | "La Verdad Importa" |
| **Nivel 2** | **2. La Plaza** | "Ruido de Fondo" |
| **Nivel 3** | **3. Cámara de Eco** | "Amistades Peligrosas" |
| **Nivel 4** | **4. El Laberinto** | "Terreno Hostil" |
| **Nivel 5** | **5. Zona Zero** | "Viralidad Total" |

### Módulo: Controles del Operador (Deslizadores)

| Etiqueta (Label) | Tooltip / Explicación (Hover) | Feedback de Resistencia |
| :--- | :--- | :--- |
| **ENGAGEMENT** | "Velocidad de propagación algorítmica." | *⚠️ Algoritmo prioriza viralidad* |
| **CONTROVERSIA** | "Viralidad emocional y radicalización." | *⚠️ Resistencia emocional alta* |
| **MODERACIÓN** | "Intervención del sistema inmune." | *🚫 Moderación saturada* |
| **PROPAGACIÓN** | "Alcance de voz de cada usuario." | - |
| **DELAY VERIFICACIÓN** | "Días hasta el Fact-Check oficial." | - |

---

## 3. MICRO-TEXTOS DE NODOS (Canvas Bubbles)
*Frases aleatorias que aparecen sobre los agentes.*

**Nodos Infectados (Rojos):**
*   "¡Esto es indignante!"
*   "No puedo creerlo 😡"
*   "¡Compartan ya!"
*   "RT por favor"
*   "Es obvio que es verdad"
*   "¡Qué horror!"

**Nodos Escépticos (Verdes):**
*   "¿Fuente?"
*   "Es fake news."
*   "Chequeado: Falso."
*   "No compartas."
*   "Clickbait."

---

## 4. MENSAJES DE ESTADO (Marquee / Footer)

Aquí tienes el **Listado Maestro de Triggers y Mensajes de Sistema**.

Este documento conecta la narrativa con la lógica. Define exactamente **qué condición matemática o estado del juego** dispara cada mensaje en el Marquee (Cinta de noticias) o en los Toasts (Notificaciones flotantes).

---

### 1. Mensajes de Sistema (Estado del Juego)
*Se disparan por cambios en el ciclo de vida de la partida (`gameState`).*

| Mensaje Visual | Trigger (Condición Lógica) |
| :--- | :--- |
| **"SISTEMA ONLINE. ESPERANDO SELECCIÓN DE AMENAZA..."** | `gameState === 'IDLE'` (Al cargar la web). |
| **"ALERTA: PICO DE #INDIGNACIÓN DETECTADO EN SECTOR NEUTRO."** | `activeNews.tags.includes('#IndignaciónMoral')` AND `neutralsInfected > 10`. |
| **"ADVERTENCIA: CONTENIDO #CALIENTE VIRALIZANDO A ALTA VELOCIDAD."** | `activeNews.tags.includes('#ContenidoCaliente')` AND `realEngagement > 0.8`. |
| **"PELIGRO: FORMACIÓN DE CÁMARAS DE ECO. RUPTURA DEL DIÁLOGO."** | `polarizationMetric > 60%`. |
| **"BOLETÍN: VERIFICACIÓN OFICIAL PUBLICADA. INICIANDO RECUPERACIÓN."** | `day === playerControls.delay` (El día actual iguala al delay configurado). |
| **"FALLO CRÍTICO DEL SISTEMA. LA RED HA COLAPSADO."** | `networkHealth <= 0` OR `gameState === 'GAME_OVER_COLLAPSE'`. |

---

### 2. Comportamiento de los Nodos (Mecánica SEIZ)
*Se disparan cuando variables internas del motor de infección cruzan ciertos umbrales.*

| Mensaje Visual | Trigger (Condición Lógica) |
| :--- | :--- |
| **"DETECTADA #BRECHADECURIOSIDAD. EL CLICKBAIT ESTÁ ROMPIENDO EL FIREWALL MENTAL."** | `activeNews.tags.includes('#BrechaDeCuriosidad')` AND `exposedCount (E) > 30%`. |
| **"UN #LÍDERDEOPINIÓN HA ENTRADO EN EL MAPA. RADIO DE CONTAGIO DUPLICADO."** | `activeNews.tags.includes('#LíderDeOpinión')` (Al inicio de la partida). |
| **"INFECCIÓN MASIVA EN CURSO. LOS NODOS AMARILLOS ESTÁN COLAPSANDO A ROJO."** | `infectedRate (Nuevos infectados por segundo) > 5`. |
| **"EFECTO BURBUJA DETECTADO: LOS NODOS PÚRPURAS ESTÁN IGNORANDO LA MODERACIÓN."** | `clusterFuchsia.infected > 80%` AND `realModeration > 0.5` (Moderación alta pero inefectiva). |
| **"ALERTA DE PROXIMIDAD: TASA DE CONTACTO SUPERANDO EL LÍMITE DE SEGURIDAD."** | `realPropagation > 0.8` (El radio de contacto físico es muy amplio). |

---

### 3. Estado de la Red y Riesgos (Salud)
*Advertencias sobre condiciones de derrota inminente.*

| Mensaje Visual | Trigger (Condición Lógica) |
| :--- | :--- |
| **"ADVERTENCIA DE ABURRIMIENTO: ENGAGEMENT DEMASIADO BAJO."** | `realEngagement < 0.2` (El usuario bajó mucho el slider). |
| **"PELIGRO DE RED SOFOCADA. SI NO HAY INTERACCIÓN, LA PLATAFORMA MORIRÁ."** | `realEngagement < 0.1` AND `realPropagation < 0.1`. |
| **"SALUD DE LA RED POR DEBAJO DEL 25%. INTEGRIDAD ESTRUCTURAL COMPROMETIDA."** | `networkHealth < 25`. |
| **"INFECCIÓN CRÍTICA ANTES DEL DÍA 5. RIESGO DE EXPLOSIÓN INMEDIATA."** | `infectedCount > 50` AND `day < 5`. |

---

### 4. Acciones y Power-Ups (Feedback del Jugador)
*Se disparan cuando el usuario interactúa con los botones o sliders.*

| Mensaje Visual | Trigger (Condición Lógica) |
| :--- | :--- |
| **"FRICCIÓN ACTIVADA. REDUCIENDO LA VELOCIDAD DE LOS NODOS EN UN 70%."** | `powerUps.friction.active === true`. |
| **"CAMPAÑA DE INTEGRIDAD LANZADA. PROBABILIDAD DE INFECCIÓN DIVIDIDA POR 5."** | `powerUps.campaign.ready === true` (Barra de progreso llega a 100). |
| **"ESCUDOS DE FACT-CHECK ACTIVOS."** | `isFactChecked === true` (Se activó la cura). |
| **"RESISTENCIA ALGORÍTMICA (CRA) BAJA. TUS ÓRDENES TIENEN PRIORIDAD."** | `difficultyLevel === 1` (Nivel Ágora) AND `Slider Change Event`. |
| **"ERROR: EL ALGORITMO RESISTE TU INTERVENCIÓN."** | `difficultyLevel === 5` (Zona Zero) AND `Slider Change Event` (Intento de bajar engagement). |
| **"RETRASO DE VERIFICACIÓN FINALIZADO. INICIANDO PROCESO DE INMUNIDAD DE REBAÑO."** | `day > playerControls.delay` AND `curedCount (Z) > 10`. |

---

### 5. Mensajes de "Atmósfera" (UI/UX)
*Textos de carga y gestión de identidad para inmersión.*

| Mensaje Visual | Trigger (Condición Lógica) |
| :--- | :--- |
| **"SINCRONIZANDO TOKEN DE ACCESO..."** | Al abrir el `IdentityModal` (Modal de registro). |
| **"IDENTIDAD DE OPERADOR VERIFICADA."** | Al validar correctamente un token en `localStorage`. |
| **"ANALIZANDO SESGOS COGNITIVOS..."** | Al cambiar de Nivel en el Selector (Simulación de carga). |
| **"PREDOMINANCIA DE #INDIGNACIÓNMORAL DETECTADA."** | Al cargar una Historia que contiene ese Tag específico. |

---

## 5. MODALS DE CIERRE

### Escenario A: VICTORIA
*   **Título:** `🎉 AMENAZA NEUTRALIZADA`
*   **Subtítulo:** `"Has defendido la verdad en un entorno hostil."`
*   **Análisis:** `"Lograste contener la narrativa. El uso oportuno de la Fricción evitó que la viralidad se disparara."`

### Escenario B: DERROTA
*   **Título:** `💀 COLAPSO INFORMATIVO`
*   **Subtítulo:** `"La mentira se ha convertido en la nueva verdad."`
*   **Análisis:** `"Fallaste en contener la viralidad. La indignación fue más rápida que tu capacidad de respuesta."`
