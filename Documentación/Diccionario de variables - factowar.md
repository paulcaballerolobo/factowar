/*
 * FACTOWAR: Diccionario Maestro de Variables (v1.0)
 * By Paul Caballero
 */

Este documento técnico reúne las variables que componen la lógica del simulador, su definición matemática, su impacto en el modelo SEIZ y cómo interactúan entre sí bajo la arquitectura de "Resistencia Algorítmica".

---

# 📘 FACTOWAR: DICCIONARIO DE VARIABLES Y LÓGICA

## 1. Variables de Estado Global (Game Loop)
*Controlan el flujo temporal y el ciclo de vida de la sesión.*

| Variable | Tipo | Definición | Impacto en Dinámica |
| :--- | :--- | :--- | :--- |
| `gameState` | `String` | Estado actual: `'IDLE'`, `'RUNNING'`, `'PAUSED'`, `'ENDED'`. | Controla si el motor físico está activo o congelado. |
| `day` | `Int` | Contador de tiempo simulado (0 a 30). 1 seg real = 1 día. | Trigger de eventos. Si `day == 30`, termina el juego. |
| `isFactChecked` | `Boolean` | Bandera que indica si la verificación oficial ya ocurrió. | Se vuelve `true` cuando `day >= factCheckDelay`. Habilita la transición $I \to Z$ (Cura). |

---

## 2. Variables de Configuración de Nivel (Ecosistema)
*Definidas por el nivel de dificultad seleccionado (1 a 5). Son constantes durante la partida.*

| Variable | Tipo | Definición | Impacto en Dinámica |
| :--- | :--- | :--- | :--- |
| `difficultyLevel` | `Int` | ID del nivel (1=Ágora ... 5=Zona Zero). | Selecciona el preset de resistencia. |
| `CRA` | `Float` | **Coeficiente de Resistencia Algorítmica** (0.0 - 1.0). | Define cuánto control pierde el jugador. <br>`ValorReal = ValorJugador * CRA`. |
| `structuralFloor` | `Float` | **Piso Estructural** (0.0 - 1.0). | El valor mínimo de "maldad" que la red impone. En Zona Zero, el piso es 0.9 (casi imposible de limpiar). |

---

## 3. Variables de la Amenaza (Noticia Fake & Tags)
*Propiedades ocultas de la noticia cargada. Modifican las reglas físicas al inicio.*

| Variable / Tag | Efecto Lógico | Impacto en Modelo SEIZ |
| :--- | :--- | :--- |
| `base_engagement` | `Float (0-1)` | Velocidad base de movimiento de los nodos. |
| `base_controversy` | `Float (0-1)` | Probabilidad base de infección al contacto. |
| **`#IndignaciónMoral`** | Multiplicador | **Aumenta `Controversia` x 1.5.** (Más ira = más contagio $E \to I$). |
| **`#ContenidoCaliente`** | Switch Lógico | **Bypass de Incubación.** El 30% de los contactos saltan la fase de duda ($S \to I$ directo). |
| **`#BrechaDeCuriosidad`** | Multiplicador | **Aumenta `Engagement` x 1.3.** (Más clicks = más movimiento $S \to E$). |
| **`#LíderDeOpinión`** | Multiplicador | **Duplica `Propagación`.** El radio de infección de los nodos rojos se duplica ($r \times 2$). |
| **`#AlertaEmocional`** | Resistencia | **Nerf a la Moderación.** La efectividad de la cura ($I \to Z$) se reduce un 50%. |

---

## 4. Variables de Control del Jugador (Sliders)
*Estas son las variables que el jugador intenta manipular. Su valor final depende de la resistencia del nivel.*

### 4.1. Engagement (`engagementRate`)
*   **Definición:** Velocidad de propagación / Frecuencia de notificación.
*   **Efecto SEIZ:** Controla $\beta$ (Tasa de contacto).
*   **Impacto Visual:** Velocidad de movimiento de los nodos.
*   **Cálculo:** `RealEngagement = Floor + (PlayerInput * (1 - CRA))`

### 4.2. Controversia (`controversy`)
*   **Definición:** Viralidad emocional / Capacidad de radicalizar.
*   **Efecto SEIZ:** Controla $P$ (Probabilidad $E \to I$).
*   **Impacto Visual:** Frecuencia con la que un nodo amarillo se vuelve rojo.

### 4.3. Moderación (`moderation`)
*   **Definición:** Intervención algorítmica / Sistema inmune.
*   **Efecto SEIZ:** Controla la Tasa de Cura ($I \to Z$).
*   **Nota:** Solo funciona si el `CRA` lo permite. En niveles altos, tiene un "techo" (cap) máximo.

### 4.4. Propagación (`propagation`)
*   **Definición:** Alcance en la red / Radio de voz.
*   **Efecto SEIZ:** Define el `contact_radius` (distancia en píxeles para considerar "vecino").
*   **Impacto:** Si es alto, un solo nodo rojo infecta a medio mapa sin moverse.

### 4.5. Fact-Check Delay (`factCheckDelay`)
*   **Definición:** Retraso de la verdad (0-30 días).
*   **Efecto:** Bloquea la cura hasta el día X.

---

## 5. Variables de Power-Ups (Estrategia)
*Acciones de un solo uso que rompen las reglas.*

| Variable | Tipo | Efecto |
| :--- | :--- | :--- |
| `campaignActive` | `Bool` | Si es `true` (y completó carga), divide `Controversia` por 5 (Escudo masivo). |
| `frictionActive` | `Bool` | Si es `true`, reduce `Engagement` (velocidad) en un 70% durante 5 segs. |
| `highLiteracy` | `Bool` | (Pasivo) Si el nivel es "Ágora", los nodos azules/fucsias tienen resistencia natural. |

---

## 6. Variables de Métricas (Salud y Puntuación)

### 6.1. Fórmula de Salud de la Red (`networkHealth`)
Se calcula en tiempo real (cada frame). Determina si hay **Game Over**.

```javascript
// Cálculo de Daño (0.0 a 1.0)
const damage = (realEngagement * 0.3) + 
               (realControversy * 0.1) + 
               ((1 - realModeration) * 0.2) + 
               (realPropagation * 0.4);

// Salud (0 a 100)
const networkHealth = 100 - (damage * 100);
```

### 6.2. Puntuación Final (`totalScore`)
Se calcula al terminar la partida.

$$ \text{Score} = [(\text{Health} \times 127) + (\text{TimeLeft} \times 43) + \text{Bonus}] \times \text{LevelMult} $$

---

## 7. Escenarios de Final de Partida
*Condiciones lógicas que determinan el mensaje final al jugador.*

### 💀 Escenario: Explosión Inmediata
*   **Condición:** `networkHealth < 10` y `day < 5`.
*   **Variables:** `engagement ~1.0`, `moderation ~0.0`.
*   **Narrativa:** "FIN DE LA VERDAD. Toda la red infectada en tiempo récord."

### ✅ Escenario: Balance Óptimo (Victoria Estándar)
*   **Condición:** `networkHealth > 50`.
*   **Variables:** `engagement ~0.6`, `moderation ~0.6`.
*   **Narrativa:** "RED SALUDABLE. Propagación controlada. La desinformación existió pero no dominó."

### 🛡️ Escenario: Máxima Protección (Victoria Perfecta)
*   **Condición:** `networkHealth > 85`.
*   **Variables:** `engagement < 0.3`, `moderation > 0.8`, `PowerUps Used`.
*   **Narrativa:** "INMUNIDAD DE REBAÑO. La fake news fue eliminada antes de alcanzar masa crítica."

### 📉 Escenario: Red Sofocada (Derrota por Aburrimiento)
*   **Condición:** `engagement == 0.0` y `propagation == 0.0` durante > 10 segs.
*   **Narrativa:** "CEMENTERIO DIGITAL. Cero interés. Los usuarios abandonaron la plataforma por exceso de restricción."

---

## 8. Variables de Entidad (Nodos Individuales)
*Propiedades de cada uno de los 100 agentes en el Canvas.*

| Variable | Descripción |
| :--- | :--- |
| `state` | `S` (Susceptible), `E` (Expuesto), `I` (Infectado), `Z` (Escéptico/Curado). |
| `clusterID` | `0` (Azul), `1` (Fucsia), `2` (Neutro). Define afinidad. |
| `velocity` | Vector `(vx, vy)`. Afectado por `engagement` (velocidad escalar) y `polarization` (dirección). |
| `shielded` | `Boolean`. `True` si "Campaña" está activa. |
