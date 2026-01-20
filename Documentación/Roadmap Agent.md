* FACTOWAR: Agent Development Roadmap
* By Paul Caballero
* Este documento representa la hoja de ruta para el desarrollo de Factowar

---

### **HOJA DE RUTA PARA EL AGENTE DE DESARROLLO**
* **Proyecto:** FactoWar. 
* **Contexto:** Herramienta educativa gamificada de la **Fundación Igualdad** para comprender y mitigar la desinformación, con foco en comunidades vulnerables relacionadas con la diversidad sexual.  
* **Objetivo Final:** Un juego de estrategia adulto, no académico, donde cada línea de código refuerce el aprendizaje sobre dinámicas de desinformación.

---

### **1. PRINCIPIOS FUNDAMENTALES (EL "POR QUÉ")**
Antes de escribir una línea, el agente debe verificar que su propuesta respete estos tres pilares:

*   **1.1. Pedagogía por Jugabilidad:** El jugador **no** lee un paper. **Aprende** con las herramientas del juego. El código debe **priorizar la experiencia sensorial que enseña**.
*   **1.2. Coherencia Narrativo-Sistémica:** Todo elemento (nodo, HUD, mensaje del marquee) debe ser contribuir a la narrativa: "Una noticia falsa se propaga en una red social modelada por un algoritmo". Un cambio en una variable matemática (`realControversy`) **debe** traducirse inmediatamente en un cambio visual/emocional claro.
*   **1.3. Fidelidad al Modelo SEIZ y la Ecología de Medios:** El motor no es arbitrario. Está fundamentado en el **modelo SEIZ** (Susceptible, Expuesto, Infectado, Escéptico) y en los conceptos de **McLuhan** (medios calientes/fríos). Cualquier nueva mecánica o variable debe poder mapearse a estos marcos teóricos. Ej: Una nueva "etiqueta" de noticia debe modificar parámetros SEIZ (`p`, `ε`, `β`) o la "temperatura" del medio.

### **2. REGLAS DE DECISIÓN PARA NUEVAS ITERACIONES (EL "CÓMO")**
Cuando el agente genere código, módulos o ideas, debe seguir esta cadena de decisión:

*   **2.1. Anclar en el Documento Maestro:** Cualquier nueva función debe poder explicarse como una implementación de algo descrito en los archivos de documentación. Si es completamente nueva, el agente **debe justificarla** mostrando cómo extiende o refuerza esos principios.
*   **2.2. La Regla del Feedback en Tándem:** Todo `input` del jugador **y** todo `output` del sistema  deben estar en un **ciclo de retroalimentación visible y comprensible**.
*   **2.3. Traducción Visual de Conceptos Abstractos:** El agente debe proponer constantemente formas de **visualizar variables clave**.
    

### **3. CHECKLIST DE VERIFICACIÓN POR ITERACIÓN**
Antes de considerar completa cualquier entrega de código, el agente debe auto-evaluar:

- [ ] **¿Cada nueva variable o función tiene un anclaje claro en los documentos de diseño (Motor Lógico, Diccionario, SEIZ)?**
- [ ] **¿El cambio propuesto hace el juego más **comprensible** (pedagogía) y más **tenso/atractivo** (jugabilidad), sin comprometer uno por el otro?**
- [ ] **¿Se mantiene el **tono adulto y estratégico**? (Ej: Evitar mensajes infantiles, mantener la estética de "centro de control").**
- [ ] **¿La mecánica **ilustra un fenómeno real** de desinformación (cámara de eco, delay de verificación, viralidad emocional)?**
- [ ] **¿La interfaz da **feedback** de las acciones del jugador?**
- [ ] **¿Se preserva la **narrativa de "Operador defendiendo la red"** y el contexto de impacto en comunidades LGBTIQ+?**

**Análisis de Ambigüedades e Inconsistencias antes de la Traducción a Reglas:**

1.  **Objetivo 3:** Hay una duplicación en la numeración (dos "3."). El primero habla del tono ("juego de estrategia adulto"), el segundo de los inputs del jugador. Esto requiere separación clara.
2.  **"Adulto" vs. "Jóvenes y adultos":** Hay una ligera tensión entre describir el juego como para "jóvenes y adultos" y luego insistir en que debe sentirse como un "juego de estrategia **adulto**". La intención es clara: evitar un tono infantil o simplón, pero mantener la accesibilidad. La regla debe captar esto.
3.  **Definición de "Inputs":** La lista es clara, pero la conexión directa entre la "Selección de temáticas" (ej: LGBTIQ+) y su *efecto mecánico y educativo* no está explicitada. ¿Cómo cambia la selección de tema la simulación? Esto debe ser especificado para el agente.
4.  **"Power Ups":** Se describe que "llevan tiempo", pero no queda claro si esto es un coste de recurso en el juego, un retraso en su efecto, o ambas cosas. Necesita precisión mecánica.
5.  **"Outputs" - Punto 1:** "Comportamiento de las partículas... debe tener sentido educativo y narrativo". Esto es vital pero abstracto. El agente necesitará directrices más concretas sobre qué comportamientos son pedagógicos (ej: partículas con colores/etiquetas diferentes que se agrupan en "cámaras de eco", partículas que cambian de estado tras una interacción con una noticia falsa, etc.).
6.  **"Outputs" - Punto 2:** "HUDS... los tiempos deben contribuir a generar ansiedad". Esto es una **intención de diseño de experiencia (DX)** clave. No es solo una descripción funcional ("ser dinámico"), sino una directriz emocional. Debe ser traducida como un requerimiento para la jugabilidad.
7.  **Coherencia General:** La estructura pasa de "Objetivos" a una lista de características (inputs/outputs). Para un agente, es más efectivo tener un conjunto unificado de **Principios de Diseño y Reglas de Implementación** derivados de esos objetivos.

---

## **Reglas para el Agente de Codificación 

**Contexto:** FactoWar es un simulador-estrategia gamificado cuyo **propósito central es educativo**. No es una simulación pasiva ni un "juego serio" académico. Es un juego atractivo que, a través de la jugabilidad, enseña sobre la dinámica de la desinformación y el poder del diseño de plataformas.

---

#### **A. PRINCIPIOS DE DISEÑO FUNDAMENTALES (NORTH STAR)**

1.  **Principio del Desafío Significativo:** La jugabilidad debe ser un **juego de estrategia con toma de decisiones constante**, donde el jugador sienta presión, consecuencias por sus acciones y un objetivo claro que requiera gestión activa. Evitar interfaces o modos pasivos donde el jugador solo observe.
2.  **Principio de la Pedagogía Integrada (Learning by Playing):** Toda mecánica, elemento visual (asset) y texto debe servir, en primer o segundo orden, para ilustrar cómo se propaga la desinformación y cómo las herramientas de diseño/gestión de redes sociales (desde algoritmos hasta moderación) pueden contenerla o amplificarla. El jugador debe terminar la partida comprendiendo *conceptos*, no solo habiendo ganado o perdido.
3.  **Principio del Tono Adulto-Accesible:** La estética, copy (textos) y dinámicas deben resonar con el lenguaje visual y de jugabilidad de un **juego de estrategia contemporáneo para PC/móvil** (ej: simile a un tower defense o simulador de ecosistemas con elementos de gestión). El lenguaje debe ser claro, directo y atractivo, **nunca académico, burocrático o infantil**. El público objetivo son jóvenes y adultos, por lo que la sofisticación está en la mecánica, no en la jerga.
4.  **Principio de Coherencia Narrativa-Sistémica:** La narrativa emergente (lo que el jugador "siente" que está pasando) debe nacer directamente de la simulación de sistemas. El comportamiento de las partículas, los cambios en los HUDs y los mensajes del marquee deben contar una **historia unificada** sobre el estado de la red social simulada.

---

#### **B. REGLAS DE IMPLEMENTACIÓN PARA INPUTS (DECISIONES DEL JUGADOR)**

* **Regla B.1: Los Inputs son Herramientas Educativas.** Cada control dado al jugador debe corresponderse con una **elección de diseño de red social o un factor del mundo real**.
    * **Regla B.1.a: Selección de Tema (LGBTIQ+, feminismo, etc.):** Esta elección no es solo temática. **Debe** modificar parámetros de simulación base como la `propensión_inicial_a_creer`, la `polarización_base` de las partículas, o la `velocidad_base_de_propagación` para reflejar cómo ciertos temas son más susceptibles a la desinformación en contextos específicos.
    * **Regla B.1.b: Tags de Noticias Falsas.** No son decorativos. Cada tag (ej: "emocional", "controversial", "pseudo-científico") **debe** afectar de manera única y predecible a variables como `radio_de_infeccion`, `persistencia_en_muro`, o `resistencia_a_la_verificacion`.
    * **Regla B.1.c: Nivel de Dificultad.** No es solo un escalar de números. Debe representar **tipos de plataformas sociales** (ej: "Foro Moderado" = fácil, "Red Viral" = medio, "Foro Anónimo" = difícil), cambiando conjuntos de parámetros como `anonimato`, `alcance_algortimico`, `umbral_de_moderacion`.
    * **Regla B.1.d: Sliders (Herramientas de Gobernanza):** Deben mapear directamente a controles que un administrador real tiene: `strictness_fact_check` (umbral de verificación), `virality_weight` (peso del algoritmo hacia contenido viral), `content_diversity` (fuerza para romper burbujas). Su efecto debe ser comprensible y documentado en la UI.
    * **Regla B.1.e: Power Ups (Intervenciones de Alto Coste):** Representan acciones reales, costosas y lentas. Ej: "Campaña de Educación Masiva", "Colaboración con Medios Tradicionales". Su implementación en el juego **debe** conllevar un **coste significativo de recursos escasos** y un **retraso (delay) notable** antes de surtir efecto, enseñando así su valor y sus limitaciones prácticas.

* **Regla B.2: Retroalimentación Inmediata y Visible.** Todo ajuste de un input por parte del jugador (especialmente sliders y power ups) **debe** generar un cambio perceptible en la simulación en un plazo razonable: cambios en el **flujo/color/agrupación de partículas**, actualizaciones bruscas en los **HUDs**, o **mensajes contextuales en el marquee** que confirmen la acción ("Algoritmo ajustado: el contenido polarizado se está amplificando").

---

#### **C. REGLAS DE IMPLEMENTACIÓN PARA OUTPUTS (RESPUESTA DEL SISTEMA)**

* **Regla C.1: Comportamiento de Partículas con Significado.**
    *   Cada partícula es un **agente con un estado interno** (`credulidad`, `polarizacion`, `influencia`).
    *   Sus interacciones visuales (unión, repulsión, cambio de color, desaparición) **deben** ser el reflejo directo de cambios en su estado interno debido a la mecánica de propagación y a las herramientas del jugador.
    *   El agente debe implementar **comportamientos emergentes que ilustren fenómenos educativos**: formación de "clusters" (cámaras de eco), propagación en cascada, resistencia al cambio de opinión.

* **Regla C.2: HUDs Dinámicos y Pedagógicos que Generen Tensión.**
    *   Los HUDs (contadores de `noticias_en_circulacion`, `usuarios_afectados`, `nivel_de_credibilidad_promedio`) **no son solo informativos, son el pulso del juego**.
    *   **Deben** actualizarse en **tiempo real**, con animaciones que destaquen cambios críticos (números que se ponen rojos y crecen rápidamente).
    *   Su diseño y la **velocidad a la que cambian los valores** debe contribuir activamente a la **tensión jugable (gameplay tension)**. Un HUD estable es un juego aburrido; uno que se descontrola rápido, es desafiante.
    *   Incluir **visualizaciones pedagógicas** (mini-gráficos, tendencias) que ayuden al jugador a correlacionar sus acciones con los efectos en el sistema.

* **Regla C.3: Marquee como Narrador Contextual.**
    *   El marquee es la "voz" de la simulación. **No debe** mostrar logs técnicos.
    *   Debe estar acompañado de íconos que sumen a la experiencia visual del jugador. No usar emojis en el Marquee.
    *   **Debe** emitir **mensajes breves, inmersivos y narrativos** que traduzcan eventos sistémicos a la historia de la red: _"La etiqueta #Pánico está ganando tracción en el cluster 'Foro Central'", "Una verificación tardía está ralentizando el rumor X, pero no lo detiene"_.
    *   Aporta "vida" y contexto, haciendo que los números y partículas cuenten una historia.

* **Regla C.4: Fin de Partida que Fomente el Re-juego y la Reflexión.**
    *   El modal final **no es solo una pantalla de "Ganaste/Perdiste"**.
    *   **Debe** presentar un **análisis post-mortem pedagógico**: gráficos claros de la propagación, eficacia de las herramientas usadas, puntos de inflexión clave.
    *   El copy (texto) **debe** redactarse para **incitar a la repetición**: _"Intentaste moderación fuerte tarde. ¿Qué pasa si activas la verificación desde el minuto 1 en una red con alto anonimato?"_.
    *   Su objetivo es cerrar el ciclo de aprendizaje y convertir la conclusión en el inicio de una nueva hipótesis de juego.

---
**Resumen Ejecutivo para el Agente:** Tu tarea es codificar un **sistema simulado interactivo y atractivo** donde cada línea de código respete que los **inputs son lecciones** y los **outputs son feedback pedagógico**. La diversión nace de dominar un sistema complejo que, a su vez, enseña algo real sobre el mundo. Prioriza la **claridad del feedback visual** y la **coherencia entre mecánica y mensaje**.