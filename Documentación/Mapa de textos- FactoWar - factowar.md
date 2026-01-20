Aquí tienes el **Guion Textual Completo de la Home**.

Este documento estructura **cada palabra** que aparece en la interfaz, organizada por módulos, estados y condiciones de aparición.

---

# 📄 MAPA DE TEXTOS: FACTOWAR DASHBOARD

## 1. ZONA SUPERIOR: Navegación Global

| Elemento UI | Texto Visualizado | Condición / Estado |
| :--- | :--- | :--- |
| **Logo** | **FactoWar** | Siempre visible. |
| **Versión** | **v1.0** | Badge pequeño junto al logo. |
| **Menú Principal** | **FAQs**<br>**El Modelo**<br>**Claves**<br>**Ranking** | Enlaces de navegación (siempre visibles). |
| **Widget Perfil** | **👻 Invitado** | Estado por defecto (sin guardar partida). |
| **Widget Perfil** | **[Icono Avatar] [Alias del Jugador]** | Estado tras Login/Carga de Token. |

---

## 2. ZONA IZQUIERDA: Panel de Control

### Módulo: Tarjeta de Amenaza (Información Dinámica)
*El texto cambia según la historia cargada aleatoriamente.*

| Elemento UI | Texto (Variables) |
| :--- | :--- |
| **Etiqueta Contexto** | **CONTEXTO: GÉNERO**<br>**CONTEXTO: FEMINISMO**<br>**CONTEXTO: LGBTIQ+**<br>**CONTEXTO: SEXUALIDAD**<br>**CONTEXTO: DISCRIMINACIÓN** |
| **Storytelling** | *(Ejemplo)* "Renato, estratega político, necesita tapar un escándalo financiero atacando la educación pública."<br>*(Ver Base de Datos para las 10 variantes)* |
| **Titular Fake** | *(Ejemplo)* **"¡URGENTE! El Ministerio decreta uso obligatorio de faldas para niños varones en preescolar."** |
| **Tags (Chips)** | **#IndignaciónMoral**<br>**#AlertaEmocional**<br>**#ContenidoCaliente**<br>**#BrechaDeCuriosidad**<br>**#LíderDeOpinión** |

### Módulo: Selector de Ecosistema
*Opciones disponibles*

Botón de selección: Elegi tu nivel de juego.

| Opción | Texto Principal | Tagline (Subtexto) |
| :--- | :--- | :--- |
| **Nivel 1** | **1. El Ágora** | "La Verdad Importa" |
| **Nivel 2** | **2. La Plaza** | "Ruido de Fondo" |
| **Nivel 3** | **3. Cámara de Eco** | "Amistades Peligrosas" |
| **Nivel 4** | **4. El Laberinto** | "Terreno Hostil" |
| **Nivel 5** | **5. Zona Zero** | "Viralidad Total" |

*Feedback al seleccionar un nivel (aparece debajo del selector):*
> **"Nivel de Resistencia Algorítmica: [Baja / Media / Extrema]"**

### Módulo: Controles del Operador (Deslizadores)
*El jugador mueve estos sliders para intentar frenar la infección. El sistema opone resistencia (CRA).*

| Etiqueta (Label) | Tooltip / Explicación (Hover) | Feedback de Resistencia (Si el sistema bloquea) |
| :--- | :--- | :--- |
| **ENGAGEMENT** | "Velocidad de propagación algorítmica." | *⚠️ Algoritmo prioriza viralidad* |
| **CONTROVERSIA** | "Viralidad emocional y radicalización." | *⚠️ Resistencia emocional alta* |
| **MODERACIÓN** | "Intervención del sistema inmune." | *🚫 Moderación saturada* |
| **PROPAGACIÓN** | "Alcance de voz de cada usuario." | - |
| **DELAY VERIFICACIÓN** | "Días hasta el Fact-Check oficial." | - |



### Módulo: Botonera Táctica (Power-Ups)

| Botón | Texto Estado: Inactivo | Texto Estado: Activo/Cargando |
| :--- | :--- | :--- |
| **Botón 1** | **🛡️ LANZAR CAMPAÑA** | **PREPARANDO... [Barra %]**<br>**CAMPAÑA ACTIVA** |
| **Botón 2** | **⏸️ ACTIVAR FRICCIÓN** | **FRICCIÓN ACTIVA (05s)**<br>**FRICCIÓN ACTIVA (04s)...** |

---

## 3. ZONA CENTRAL: Canvas y HUD

### Módulo 1: Overlay de Inicio (Antes de jugar)

| Elemento UI | Texto |
| :--- | :--- |
| **Texto Motivacional** | **"La verdad está bajo asedio. Elige tu ecosistema, prepara tu defensa y evita el colapso de la red."** |
| **Botón CTA** | **ACTUÁ YA** |

### Módulo 2: HUD (Heads-Up Display) - Métricas en Tiempo Real
* Después de la botonera play/stop. Se ubican las estadísticas aquí para visibilidad inmediata sobre el juego.*

| Métrica | Texto Visualizado | Variable Calculada en Engine |
| :--- | :--- | :--- |
| **EXPOSICIÓN** | **[45]%** | Sí. Cálculo: `(Count(E) + Count(I)) / TotalNodes`. |
| **IMPACTO** | **[ALTO]** | Sí. Derivado de la velocidad de infección (`infectedRate`). |
| **POLARIZACIÓN** | **[65]%** | Sí. Cálculo de distancia promedio entre Cluster Azul y Fucsia. |
| **ESCEPTICISMO** | **[12]%** | Sí. Cálculo: `Count(Z) / TotalNodes`. |

**Confirmación técnica:** Todas estas variables están definidas en el diccionario previo y calculadas en el `seizEngine.js` dentro del objeto `metrics` que retorna `calculateFrame`.

### Módulo 2: HUD (Heads-Up Display)

| Elemento UI | Texto | Notas |
| :--- | :--- | :--- |
| **Barra Superior** | **INTEGRIDAD DE LA RED** | Etiqueta sobre la barra de vida. |
| **Contador** | **DÍA [01] / 30** | Variable numérica. |
| **Etiquetas Nodos** | *Tooltip al pasar mouse:*<br>**Usuario Susceptible**<br>**Usuario Infectado**<br>**Usuario Expuesto**<br>**Usuario Escéptico** | Micro-texto flotante sobre nodos. |

### Módulo 3: Micro-textos de Nodos (Chat Bubbles)
*Estos textos aparecen efímeramente (fade-in / fade-out) sobre los nodos en el Canvas. Son aleatorios.*

**Banco de Frases: Nodos Infectados (Rojos)**
*(Simulan reacción emocional y compartir)*
*   "¡Esto es indignante!"
*   "No puedo creerlo 😡"
*   "¡Compartan ya!"
*   "RT por favor"
*   "Es obvio que es verdad"
*   "¡Qué horror!"
*   "¿Vieron esto?"

**Banco de Frases: Nodos Escépticos (Verdes/Curados)**
*(Simulan pensamiento crítico y corrección)*
*   "Fuente?"
*   "Es fake news."
*   "Chequeado: Falso."
*   "No compartas."
*   "Clickbait."
*   "Contexto, por favor."


### Módulo 4: Estado de Pausa

| Elemento UI | Texto |
| :--- | :--- |
| **Overlay** | **SISTEMA EN PAUSA** | Aparece al hacer clic en el botón de pausa. |

---

## 4. ZONA INFERIOR: Cockpit de Datos

### Módulo: Métricas en Tiempo Real

| Etiqueta (Label) | Valor (Variable) | Estado Crítico (Cambio Color) |
| :--- | :--- | :--- |
| **EXPOSICIÓN** | **[0-100]%** | - |
| **IMPACTO** | **BAJO / MEDIO / ALTO / CRÍTICO** | Rojo si es CRÍTICO. |
| **POLARIZACIÓN** | **[0-100]%** | Rojo si > 60%. |
| **ESCEPTICISMO** | **[0-100]%** | Verde si > 30%. |

### Módulo: Marquee (Cinta de Noticias)
*Mensajes que rotan según eventos del juego.*

1.  *Inicio:* **"SISTEMA ONLINE. ESPERANDO SELECCIÓN DE AMENAZA..."**
2.  *Evento Infección:* **"ALERTA: PICO DE #INDIGNACIÓN DETECTADO EN SECTOR NEUTRO."**
3.  *Evento Viral:* **"ADVERTENCIA: CONTENIDO #CALIENTE VIRALIZANDO A ALTA VELOCIDAD."**
4.  *Evento Polarización:* **"PELIGRO: FORMACIÓN DE CÁMARAS DE ECO. RUPTURA DEL DIÁLOGO."**
5.  *Acción Jugador:* **"CONTRAMEDIDA: CAMPAÑA DE ALFABETIZACIÓN DESPLEGADA."**
6.  *Evento Fact-Check:* **"BOLETÍN: VERIFICACIÓN OFICIAL PUBLICADA. INICIANDO RECUPERACIÓN."**
7.  *Game Over:* **"FALLO CRÍTICO DEL SISTEMA. LA RED HA COLAPSADO."**

---

## 5. MODALS: Pantallas de Cierre (Pop-ups)

Estos textos aparecen sobre la pantalla al terminar la partida.

### Escenario A: VICTORIA (Integridad > 50%)

| Elemento | Texto |
| :--- | :--- |
| **Título** | **🎉 AMENAZA NEUTRALIZADA** |
| **Subtítulo** | **"Has defendido la verdad en un entorno hostil."** |
| **Score** | **[14,582] PTS** |
| **Análisis** | **"Lograste contener la narrativa. El uso oportuno de la Fricción evitó que la viralidad se disparara en el día crítico."** |
| **Botón Primario** | **💾 GUARDAR MI RANGO** |
| **Botón Secundario** | **REINICIAR SISTEMA** |

### Escenario B: DERROTA (Integridad < 10%)

| Elemento | Texto |
| :--- | :--- |
| **Título** | **💀 COLAPSO INFORMATIVO** |
| **Subtítulo** | **"La mentira se ha convertido en la nueva verdad."** |
| **Score** | **[850] PTS** |
| **Análisis** | **"Fallaste en contener la viralidad de la Zona Zero. La indignación moral fue más rápida que tu capacidad de moderación."** |
| **Botón Primario** | **INTENTAR NUEVAMENTE** |

---

## 6. MODAL: Sistema de Identidad

Se agregan los textos para el manejo del Token y recuperación de cuenta.

### Estado: Nuevo Usuario (Generando Llave)

| Elemento UI | Texto |
| :--- | :--- |
| **Etiqueta Caja** | **TU LLAVE DE ACCESO (TOKEN BOX):** |
| **Contenido Caja** | **fw-a8z9-m2k1-lop9-x7q2** *(Código seleccionable)* |
| **Botón Copiar** | **COPIAR AL PORTAPAPELES** |
| **Advertencia** | **"Copia este código. Si borras tus cookies, es la única forma de volver a entrar."** |

### Estado: Usuario Recurrente (Ya tengo llave)
*Opción "Reclamar Identidad" o "Ingresar con Token".*

| Elemento UI | Texto |
| :--- | :--- |
| **Título** | **ACCESO DE OPERADOR** |
| **Input Label** | **Pega tu Llave de Acceso:** |
| **Placeholder** | *fw-xxxx-xxxx-xxxx...* |
| **Botón Acción** | **CARGAR PERFIL** |
| **Mensaje Error** | *"Error: Llave no válida o corrupta."* |
| **Mensaje Éxito** | *"Identidad verificada. Bienvenido, [Alias]."* |



---

## 2. ZONA IZQUIERDA: Panel de Control (Actualización)

Se agrega el **Módulo de Controles de Variables (Sliders)**.
*Ubicación: Entre la Tarjeta de Amenaza y la Botonera Táctica.*



## 3. ZONA CENTRAL: Canvas y HUD (Actualización)


---



---

