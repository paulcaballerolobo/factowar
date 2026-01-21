* Proyecto maestro
* By Paul Caballero
* Este documento resume el proyecto maestro que rige toda las decisiones implementación de Factowar.

# Simulación de Dinámicas de Desinformación
## Análisis del Impacto de los Flujos de Información en la Democracia y los Derechos Digitales

**Fundación Igualdad**  
Av. Córdoba 4123 piso 2 - Ciudad Autónoma de Buenos Aires

**Proyecto de Investigación para Global South Alliance Datafication and Democracy Fund**

---

## NOTA IMPORTANTE: Proyecto Maestro

Este es el **proyecto maestro de investigación** de Fundación Igualdad sobre desinformación y derechos digitales. 

**FACTOWAR** es una herramienta derivada de este proyecto de investigación, diseñada específicamente como:
- Un simulador educativo e interactivo
- Implementación práctica de los hallazgos del modelo SEIZ
- Plataforma para visualizar y experimentar con las dinámicas de propagación de fake news
- Herramienta de alfabetización digital orientada al público general

Todo el desarrollo de FACTOWAR debe alinearse con los objetivos, metodología y marco teórico establecidos en este documento.

---

## 1. Tema y Planteamiento del Problema

### Impacto en Comunidades Vulnerables

La rápida propagación de narrativas falsas no solo distorsiona la percepción pública de los eventos, sino que también pone en riesgo a personas vulnerables de sufrir daños personales: sociales, psicológicos e incluso físicos, especialmente aquellas de comunidades marginadas como la población LGBTIQ+.

### Transformación Digital y Procesos Democráticos

La transformación digital de la sociedad ha afectado profundamente los procesos democráticos, y las redes sociales ahora moldean cómo los ciudadanos encuentran, interpretan y actúan sobre información política. Con miles de millones de usuarios diarios en todo el mundo, las redes sociales permiten que el contenido alcance grandes audiencias casi instantáneamente, creando condiciones fértiles para:

- Campañas de desinformación estratégicamente diseñadas
- Fake news propagadas deliberadamente para influir en la opinión pública
- Fomento de la polarización
- Socavamiento de la confianza en instituciones democráticas

### Hallazgos Clave de Investigación

- **Velocidad de la Desinformación:** El contenido falso o engañoso puede propagarse hasta **6 veces más rápido** que la información precisa, impulsado por el compromiso emocional y la amplificación algorítmica en redes sociales
- **Confianza Institucional:** Las personas que expresan opiniones políticas en línea tienden a reportar **niveles más bajos de confianza** en instituciones de gobierno, vinculando el discurso en redes sociales con el escepticismo institucional
- **Erosión Democrática:** La exposición persistente a narrativas falsas contribuye a:
  - Erosión de la confianza
  - Reducción de la cohesión social
  - Disminución de la fe en procesos electorales y cívicos

### Impacto Desproporcionado en Comunidades LGBTIQ+

Las investigaciones muestran que estas dinámicas afectan desproporcionadamente a comunidades vulnerables, incluyendo la población LGBTIQ+:

- Una porción significativa de la desinformación y fake news está **específicamente dirigida a personas LGBTIQ+**
- A menudo incorpora contenido que propaga prejuicios u odio
- Muchos usuarios perciben este contenido como verdadero
- En Estados Unidos, **3 de cada 4 adultos LGBTIQ+** reportaron haber encontrado desinformación anti-LGBTIQ+ en línea
- La exposición es particularmente alta entre individuos trans

Estos hallazgos subrayan la importancia de estudiar la desinformación no solo en términos generales, sino también en relación con comunidades cuya participación social y seguridad pueden verse particularmente afectadas.

### Hipótesis Central de Investigación

Este proyecto investiga cómo los mecanismos de amplificación de información en redes sociales, priorización algorítmica, cámaras de eco y retrasos en verificación de hechos influyen en la propagación de desinformación y fake news y afectan los procesos democráticos.

**Hipótesis:** Tales mecanismos en redes sociales pueden aumentar la polarización, debilitar la confianza institucional y desalentar la participación cívica informada, mientras que intervenciones estratégicas pueden ayudar a mitigar estos efectos en ecosistemas de medios digitales en evolución.

### Contexto Regional: América Latina y el Sur Global

En América Latina y regiones similares, las brechas digitales, marcos regulatorios más débiles y recursos limitados de verificación de hechos exacerban estas dinámicas.

#### Patrones de Consumo de Medios (Digital News Report 2025)

- **77%** de las personas en América Latina acceden a noticias en línea
- **~60%** usan redes sociales como fuente principal
- **Solo 16-18%** leen periódicos impresos
- **Menos de la mitad** ve noticias en televisión

Esto resalta la erosión de los medios tradicionales como fuentes principales de información.

#### Barreras Económicas

- **Baja disposición a pagar:** Solo 14-16% de los usuarios en la región pagan por contenido de noticias en línea
- **Declive de la circulación impresa**
- **Uso generalizado de teléfonos móviles** para acceso a información
- Resultado: Audiencias empujadas hacia plataformas sociales de acceso gratuito

---

## 2. Alcance del Proyecto

Esta investigación se enfoca en tres preguntas interrelacionadas:

### Preguntas de Investigación

1. **¿Cómo impactan diferentes dimensiones de dataficación en la propagación de información?**
   - Sesgo de engagement
   - Amplificación de controversia
   - Bucles de retroalimentación algorítmica
   - Sus efectos en la formación de opinión en redes cívicas

2. **¿Cuál es el rol de las cámaras de eco y desinformación en la erosión de confianza?**
   - Efectos en la participación entre diversos grupos ideológicos
   - Impacto dentro de entornos en línea

3. **¿Qué intervenciones pueden mitigar daños democráticos?**
   - Retrasos en verificación de hechos
   - Efectividad de la moderación
   - Mayor exposición a puntos de vista diversos

### Plataforma de Simulación

El proyecto emplea una **plataforma de simulación basada en agentes SEIZ**, desarrollada internamente por Fundación Igualdad, que modela dinámicas de información a través de:

- **100 nodos interconectados**
- Cada uno representando un usuario arquetípico con rasgos definidos:
  - Inclinación ideológica
  - Susceptibilidad a desinformación
  - Patrones de engagement

### Variables Manipulables

La simulación permite manipular:

- Sesgo en algoritmos de engagement
- Fuerza de cámaras de eco
- Eficacia de mecanismos de moderación
- Mecanismos de verificación de hechos

### Estado de la Plataforma

- Actualmente en **beta privada**
- Accesible vía enlace seguro para colaboradores de investigación
- Será refinada iterativamente basándose en resultados preliminares y feedback experto

### Enfoque Metodológico

Este alcance abarca tanto:

- **Modelado cuantitativo**
- **Interpretación cualitativa**

Asegurando que los resultados sean relevantes para políticas públicas y fundamentados en marcos de derechos digitales aplicables a sociedades digitales emergentes.

---

## 3. Metodología

### 3.1. Diseño de Simulación

#### Marco del Modelo

Aprovechamos un **modelo epidemiológico SEIZ** (Susceptible–Expuesto–Infectado–Escéptico) adaptado al contagio informacional.

**Estructura de Red:**
- Cada nodo en la red interactúa a través de reglas definidas para:
  - Exposición a mensajes
  - Aceptación
  - Compartir
  - Rechazo

#### Parámetros Clave

| Parámetro | Descripción |
|-----------|-------------|
| **Sesgo de engagement** | Tendencia de algoritmos a priorizar contenido altamente sensacionalista |
| **Amplificación de controversia** | Probabilidad de que desinformación contenciosa sea circulada adicionalmente |
| **Efectividad de moderación** | Capacidad de plataformas o mecanismos comunitarios para suprimir contenido falso |
| **Fuerza de cámara de eco** | Grado en que nodos interactúan preferentemente con pares ideológicamente alineados |
| **Retraso en verificación** | Lapso de tiempo entre propagación de desinformación y difusión de información correctiva |

#### Datos de Entrada

- Conjuntos curados de noticias del mundo real (verificadas y falsas) extraídas de:
  - Datasets existentes de verificación de hechos
  - Reportes de medios públicos
- Etiquetado ideológico basado en:
  - Metadatos
  - Análisis de contenido para modelar diversos segmentos de usuarios

#### Métricas de Resultado

- Alcance y vida útil de clusters de desinformación
- Cambios en estados de creencia de nodos a lo largo del tiempo
- Polarización de red medida vía distancia entre centros de clusters
- Sensibilidad de resultados a diferentes estra