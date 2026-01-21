 * Documento de base científica del modelo de propagación de noticias falsas.
 * By Paul Caballero
 * Este documento da contexto y base científica al desarrollo del juego de estrategia Factowar

# Propagación de Fake News
## Optimización Algorítmica de la Desinformación

### Introducción

La comprensión de la dinámica de información en ecosistemas digitales requiere un enfoque multidisciplinar. Las fake news no son errores de transmisión, sino procesos complejos de contagio social que se alimentan de vulnerabilidades psicológicas, estructuras de red y arquitecturas de plataformas sociales.

Este documento detalla la organización lógica del algoritmo de propagación para el simulador, analizando cómo las características intrínsecas de una noticia alteran los parámetros fundamentales del modelo de contagio.

---

## Modelo SEIZ: Fundamentos Matemáticos

El modelo SEIZ es superior a modelos tradicionales como SIR porque introduce compartimentos críticos que reflejan el comportamiento del usuario ante la duda y resistencia activa.

### Estados de la Población

La población de la red social se divide en cuatro estados:

1. **Susceptibles (S):** Usuarios no expuestos a la fake news, vulnerables por falta de información previa.
2. **Expuestos (E):** Individuos que recibieron la información pero están en periodo de incubación/duda, evaluando veracidad.
3. **Infectados (I):** Agentes activos de propagación que aceptaron la desinformación y la difunden activamente.
4. **Escépticos (Z):** Usuarios que deciden no compartir y actúan como barreras que frenan la propagación.

### Parámetros Fundamentales

| Parámetro | Definición Técnica | Relevancia en Simulación |
|-----------|-------------------|--------------------------|
| **β** | Tasa de contacto entre S e I | Visibilidad de la noticia en el feed |
| **b** | Tasa de contacto entre S y Z | Impacto del fact-checking y comentarios correctivos |
| **ρ** | Tasa de contacto entre E e I | Presión social que empuja a compartir |
| **p** | Probabilidad de infección inmediata de S | "Golpe" inicial (sensacionalismo extremo) |
| **ε** | Tasa de transición de E a I | Tiempo que tarda en "caer" tras ver la noticia |
| **l** | Probabilidad de S → Z | Eficacia de resistencia cognitiva/educación mediática |

**Nota:** El modelo SEIZ es especialmente robusto para temas polarizantes, superando al SIR en precisión (demostrado durante COVID-19).

---

## Ecología de los Medios: Teoría de McLuhan

### Medios Calientes vs. Fríos

Marshall McLuhan clasificó los medios según su "temperatura", lo que determina cómo percibimos la información.

#### Medios Calientes (Alta Definición)
- **Características:** Saturados de datos, requieren poca participación del receptor
- **Ejemplos:** Videos HD, deepfakes, imágenes explícitas, titulares definitivos
- **Efecto algorítmico:** Aumenta **p** (infección directa)
- **Comportamiento:** Usuario reacciona impulsivamente, menos tiempo en estado E

#### Medios Fríos (Baja Definición)
- **Características:** Requieren alta participación del público para "completar" la información
- **Ejemplos:** Mensajes crípticos, hilos complejos, imágenes de baja resolución
- **Efecto algorítmico:** Aumenta población en **E** (exposición), mayor **ε** a largo plazo
- **Comportamiento:** Usuario se siente emocionalmente invertido en "descubrir la verdad"

### Tabla Comparativa: Temperatura del Contenido

| Característica del Contenido | Clasificación McLuhan | Impacto Algorítmico (SEIZ) | Ejemplo en Simulador |
|------------------------------|----------------------|----------------------------|---------------------|
| Alta fidelidad visual, explícito | Caliente | ↑ p (Infección instantánea) | Video sensacionalista de choque |
| Texto corto, requiere contexto | Frío | ↑ E (Duda/Participación) | Pregunta retórica sobre complot |
| Formato interactivo (Encuestas) | Muy Frío | ↑ ε (Adopción profunda) | "Vota si crees que X miente" |
| Datos masivos, infografías claras | Caliente | ↓ ε (Menos tiempo de duda) | Gráficos falsos pero profesionales |

---

## Líderes de Opinión (KOL): Multiplicadores de Viralidad

### Autoridad y Sesgo de Prestigio

Los usuarios poseen un "sesgo de autoridad" que los hace percibir mensajes de fuentes reputadas como más creíbles, independientemente de su veracidad.

**Efectos en el modelo:**
- Cuando un KOL comparte fake news, la probabilidad **p** de infección directa se dispara
- El usuario no verifica porque confía en la "curaduría" de la figura que admira
- Los KOL son nodos con conectividad masiva pero su influencia puede decaer con el tiempo

### Cámaras de Eco y Asortatividad

Los KOL están en centros de "cámaras de eco" donde usuarios con ideologías similares refuerzan creencias y filtran información discrepante.

**Efecto en SEIZ:** Ajusta la tasa **b** (contacto S-Z). En cámaras de eco, los usuarios están protegidos del contacto con Escépticos, reduciendo posibilidad de neutralización.

### Tabla de Factores KOL

| Factor del Líder de Opinión | Variable Algorítmica | Efecto en la Propagación |
|----------------------------|---------------------|-------------------------|
| Alcance (Seguidores) | β (Tasa de contacto) | Expansión masiva del alcance inicial |
| Credibilidad / Prestigio | p (Probabilidad de infección) | Reducción de la duda inicial |
| Afinidad Ideológica | 1-l (Resistencia al escepticismo) | El usuario ignora correcciones |
| Frecuencia de Posteo | ε (Tasa de transición) | La repetición acelera aceptación |

---

## Lenguaje como Vector de Contagio

### Factor "Humilló": Contagio Moral y Outrage

Términos como "humilló", "destrozó", "quedó en evidencia" apelan a la **indignación moral** (moral outrage).

**Características:**
- Mezcla de ira y asco por percepción de transgresión de normas sociales
- **Efectividad:** Por cada palabra moral-emocional adicional, probabilidad de compartir aumenta 13-20%
- Fomenta "compartir sin leer" basándose solo en titular
- Reduce transición hacia estado Z (Escéptico)

**Efecto algorítmico:**
- ↑ β (tasa de contacto)
- ↑ p (probabilidad de infección)
- ↓ l (resistencia al escepticismo)

### Factor "Sabías que": Brecha de Curiosidad

Explota la "Curiosity Gap" de George Loewenstein: estado de privación cognitiva que surge de percibir una laguna en el conocimiento.

**Relación Curvilínea (U invertida):**
- **Baja Concreción:** Titular muy vago → Curiosidad baja
- **Alta Concreción:** Titular revela todo → No hay incentivo para clic
- **Punto Óptimo:** Confianza moderada en encontrar respuesta + incertidumbre significativa

**Efecto algorítmico:**
- Aumenta transición S → E
- Con uso equilibrado, acelera **ε** (E → I)
- Usuario siente gratificación psicológica al "completar" el rompecabezas

### Tabla de Disparadores Lingüísticos

| Disparador Lingüístico | Mecanismo Psicológico | Efecto en SEIZ | Multiplicador de Viralidad |
|-----------------------|----------------------|----------------|---------------------------|
| "Humilló / Destrozó" | Indignación Moral / Identidad | ↑ β, ↑ p, ↓ l | 1.13x - 1.20x por palabra |
| "¿Sabías que...?" | Brecha de Curiosidad (Gap) | ↑ E (Transición a Expuesto) | Variable según concreción |
| "Urgente / Alerta" | Arousal Emocional / Miedo | ↓ ε (Transición rápida) | Alta velocidad de pico inicial |
| "El secreto de X" | Exclusividad / Sesgo de Información | ↑ ρ (Presión de grupo) | Aumento de persistencia |

---

## El Algoritmo como Entorno: Leyes de los Medios

### Tétrada de McLuhan aplicada al Algoritmo de Redes Sociales

1. **Extensión (Enhancement):** Extiende red social, capacidad de recibir info en tiempo real, sesgos cognitivos y velocidad de indignación

2. **Obsolescencia (Obsolescence):** Hace obsoleta la búsqueda de verdad objetiva y pensamiento reflexivo lento, sustituyéndolos por reacción inmediata

3. **Recuperación (Retrieval):** Recupera la "tribu" y comunicación oral/aural (aldea global) donde rumor e intuición tribal prevalecen sobre logos y lógica lineal

4. **Reversión (Reversal):** Cuando conectividad es total, revierte en vigilancia constante y fragmentación polarizada ("comunicación" = guerra de guerrillas terminológica)

### Concepto Clave: Ground vs Figure

- El algoritmo no es solo un canal, es el **Ground** (fondo) que condiciona la **Figure** (noticia)
- Un algoritmo diseñado para maximizar tiempo de pantalla aumenta artificialmente **β** de contenido "caliente" o "indignante"
- Crea bucles de retroalimentación donde usuario entrena al algoritmo y viceversa

### Reversión del Medio Sobrecalentado

Cuando un proceso se lleva al límite, tiende a volverse lo opuesto:
- Exceso de información → Apatía o "parálisis por análisis"
- En SEIZ: Aumento repentino de Z (Escépticos) no por convicción sino por agotamiento informativo
- **Implementar:** Variable de "saturación de red" que disminuya **β** al superarse

---

## Escenarios de Simulación

### Escenario 1: Entorno de Alta Fidelidad y Moderación

**Configuración:**
- Plataforma aplica etiquetas de advertencia
- Reduce alcance de noticias sospechosas

**Ajustes SEIZ:**
- ↓↓ β (visibilidad)
- ↑↑ l (probabilidad de escepticismo)

**Resultado:** Desinformación muere rápidamente sin alcanzar masa crítica

---

### Escenario 2: Aldea Global sin Límites (Baseline)

**Configuración:**
- Estado actual de muchas redes
- Algoritmo prioriza controversia

**Ajustes SEIZ:**
- ↑↑ β (alta)
- p multiplicado por factores de indignación ("humilló")
- ↓ ε (mínima)

**Resultado:** Crecimiento exponencial de I (Infectados) y formación de burbujas de filtro resistentes a la verdad

---

### Escenario 3: Respuesta del Fact-Checker (Delay de Corrección)

**Configuración:**
- Modela tiempo que tardan organizaciones de verificación

**Ajustes SEIZ:**
- Retraso temporal antes de que **b** (contacto S-Z) aumente

**Resultado:** Si delay > pocas horas, noticia ya infectó mayoría de red. Corrección tiene efecto limitado o contraproducente (efecto de "verdad implícita")

---

### Escenario 4: Factor "Actualidad" (Time-Sensitivity)

**Configuración:**
- Noticias sobre eventos ocurriendo "ahora mismo"

**Ajustes SEIZ:**
- Durante primeras horas, compartimento **E** se vacía casi instantáneamente hacia **I**
- ↑↑ ε (muy alto)

**Justificación:** En incertidumbre (atentado, desastre natural), necesidad de sentido del usuario supera capacidad crítica

---

### Tabla Resumen de Escenarios

| Escenario | Estrategia de Algoritmo | Parámetros SEIZ Clave | Impacto en Curva de Infección |
|-----------|------------------------|----------------------|------------------------------|
| Moderación Activa | Reducción de alcance algorítmico | ↓ β, ↑ l | Curva aplanada, fin rápido |
| Cámara de Eco | Conectividad altamente sesgada | ↓ b, ↑ ρ | Persistencia a largo plazo |
| Viralidad por Outrage | Priorización de contenido emocional | ↑↑ p, ↑↑ β | Pico vertical y masivo |
| Inoculación Previa | Educación mediática del usuario | ↑↑ l (inicial) | Susceptibles nunca pasan a Infectados |

---

## Realismo Cognitivo: Arousal Emocional

### Neurociencia del Engagement

La desinformación viaja más rápido porque genera **arousal** (activación) fisiológica que algoritmos detectan y premian.

**Hallazgos:**
- Respuestas pupilares y ritmo cardíaco aumentan ante estímulos de sorpresa, miedo, asco
- Emociones típicas de fake news con palabras como "humilló"
- **Implementación:** p (infección) no es constante, sino función de intensidad emocional del contenido

### Desensibilización de la Violencia

- Para que noticia siga siendo viral, debe ser cada vez más extrema
- Desinformación tiende a escalar en agresividad verbal (respuesta evolutiva a saturación del medio)
- **Implementar:** "Tasa de fatiga" donde impacto de disparadores lingüísticos disminuye con tiempo, a menos que se introduzcan nuevos elementos de sorpresa o transgresión moral



---

## Palancas Críticas para Protección

Para proteger la integridad del discurso democrático:

1. **Reducción de β algorítmica:** Limitar visibilidad de contenido no verificado
2. **Fortalecimiento de l educativa:** Programas de alfabetización mediática
3. **Aumento de b:** Promover fact-checking visible y accesible
4. **Detección de KOL maliciosos:** Monitorear influencers que propagan desinformación
5. **Moderación de disparadores lingüísticos:** Algoritmos que detecten y atenúen lenguaje de indignación
6. **Prebunking:** Inoculación cognitiva antes de exposición a fake news

---

## Referencias Clave

- McLuhan: "El medio es el mensaje" - estructura del medio determina percepción
- Incremento de 13-20% en shares por cada palabra moral-emocional
- Brecha de Curiosidad: Relación curvilínea (U invertida) entre concreción y engagement
- Tétrada de McLuhan: Extensión, Obsolescencia, Recuperación, Reversión
- Arousal emocional medible vía respuesta pupilar y ritmo cardíaco

---


*Documento basado en investigación multidisciplinar: epidemiología, ecología de medios, lingüística cognitiva y neurociencia del engagement.*