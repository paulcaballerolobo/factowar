---

# 📘 Manual de Operaciones: FACTOWAR
**Simulador Táctico de Defensa Cognitiva**

---

## 1. Introducción: ¿FactoWar es un simulador?

Hola. **FactoWar**, es un entorno diseñado para visualizar lo invisible: **la estructura viral de la mentira**.

En la vida real, las Fake News no son "errores" del sistema; son productos diseñados para explotar las vulnerabilidades de la arquitectura de las redes sociales. Este simulador simplifica esa complejidad en un modelo matemático (basado en el modelo epidemiológico SEIZ) para que puedas experimentar con las fuerzas que gobiernan la opinión pública.

Tu misión no es censurar contenidos, sino **gestionar la salud del ecosistema**. Deberás equilibrar la libertad de flujo de información (Engagement) con la seguridad cognitiva (Moderación), entendiendo que **cada decisión tiene un costo social**.

Seguro vas a querer darle un vistazo a la sección donde explicamos bien el modelo y la investigación que hay detrás. Es densa pero sabemos que te gustan los desafíos.

---

## 2. La Mecánica

En FactoWar, controlas 5 variables que representan las "perillas" invisibles de los algoritmos de redes sociales. Aquí explicamos qué representa cada una en el mundo real y por qué ponerlas a cero no es una solución mágica.

### 🎚️ 1. ENGAGEMENT (Velocidad de Propagación)
*   **Concepto Real:** Es el modelo de negocio de las plataformas. Prioriza el contenido que genera reacción (likes, shares) sobre el que es veraz. "Si sangra, manda".
*   **En el Juego:** Controla la velocidad y la atracción física de los nodos.
*   **Qué hace el algoritmo:**

    * Reduce la velocidad de notificaciones del contenido sospechoso
    * Disminuye la prioridad en el feed (lo muestra más abajo)
    * Ralentiza el refresh rate de ese contenido específico
* **Impacto:** *La gente ve la fake news más tarde y con menos frecuencia*
*   **Facto:**
    *   *¿Por qué no bajarlo a 0 siempre?* Si reducís el engagement a cero, matas la red social. Nadie interactúa, la plataforma se vuelve un "cementerio digital" (Game Over por aburrimiento). Tu reto es encontrar el punto medio donde la información fluye, pero la viralidad tóxica se frena.

### 🎚️ 2. CONTROVERSIA (Viralidad Emocional)
*   **Concepto Real:** Las noticias que nos enojan activan nuestro cerebro reptiliano, haciéndonos compartir antes de pensar y eso multiplica propagación de las noticias falsas.
*   **En el Juego:** Controla la probabilidad de infección inmediata ($P$).
*   **Qué hace el algoritmo:** 
    *   Penaliza contenido con muchas reacciones emocionales (angry, shock)
    *   Reduce boost por comentarios "acalorados"
    *   Deja de recomendar a usuarios con ideologías opuestas (evita echar leña al fuego)
* **Impacto:** *La fake news no se viraliza por generar peleas*
*   **Facto:**
    *   Contra noticias con el tag `#IndignaciónMoral`, este es tu parámetro crítico. Bajar la controversia simula algoritmos que "des-amplifican" contenido tóxico sin borrarlo (shadowbanning) , reduciendo su capacidad de secuestrar la atención emocional.

### 🎚️ 3. MODERACIÓN (El Sistema Inmune)
*   **Concepto Real:** Son los equipos humanos y las IAs que revisan contenido. En la realidad, la moderación nunca es instantánea ni perfecta debido al volumen de datos.
*   **En el Juego:** Controla la tasa de cura ($I \to Z$).
*   **Qué hace el algoritmo:** 
    *   Activa detección de patrones (palabras clave, imágenes similares)
    *   Shadow-banning progresivo: reduce alcance sin borrar
    *   Throttling: limita cuántas veces por minuto se puede compartir
    *   Prioriza contenido ya verificado vs. nuevo y sospechoso
* **Impacto:** *La propagación se frena automáticamente sin censura visible*
*   **Facto:**
    *   La moderación es **reactiva**, no preventiva. Solo funciona bien *después* de que la infección ya ocurrió (post Fact-Check). Por eso, confiar solo en la moderación (y descuidar la prevención) suele llevar a la derrota: la mentira viaja más rápido que la verdad.

### 🎚️ 4. PROPAGACIÓN (Alcance / Radio de Voz)
*   **Concepto Real:** La capacidad de un usuario de llegar a audiencias que no lo siguen (ej. la sección "Para Ti" en TikTok o los Retweets).
*   **En el Juego:** Define el radio de contacto físico de cada nodo.
*  **Qué hace el algoritmo:**
    * Limita el alcance por share (en vez de llegar a 100 amigos, llega a 20)
    * Reduce la probabilidad de aparecer en "Trending"
    * Disminuye el peso de los shares secundarios (shares de shares)
    * Aplica decay temporal: el alcance cae exponencialmente con el tiempo
+ **Impacto:** *Impacto: Cada fake news compartida llega a menos gente, la cadena se rompe*
*   **Facto:**
    *   Reducir la propagación simula poner "cortafuegos" o cuarentenas informativas. Es efectivo para aislar un brote, pero si se abusa, fragmenta la sociedad en islas desconectadas, impidiendo que el desmentido (la verdad) llegue a quienes más lo necesitan.

>     **Analogía:** Es como tener un brote de gripe y aplicar distanciamiento social (↓propagación) + cubrebocas (↓engagement) + ventilación (↓controversia) + vacunas (↑moderación) todo a la vez.

### 🎚️ 5. DELAY FACT-CHECK (La Ventana de Vulnerabilidad)
*   **Concepto Real:** La asimetría temporal. Crear una mentira toma 5 minutos; desmentirla con rigor toma días.
*   **En el Juego:** Un contador de días que bloquea la cura.
*   **Facto:**
    *   Este parámetro te enseña la lección más dura: **La verdad siempre llega tarde.** Durante esa ventana de tiempo (el "Delay"), la red está indefensa. Tu única estrategia es la contención (Fricción/Engagement) hasta que llegue la caballería (Verificación).

---

## 3. Dinámicas Sociales Simuladas

El simulador recrea fenómenos psicosociales reales que verás ocurrir en el Canvas. Aprende a identificarlos.

### 🌪️ El "Caldo de Cultivo" (Incubación)
Verás nodos amarillos (**Expuestos**) que no se vuelven rojos de inmediato.
*   **Teoría:** Representa el "Efecto Dormilón". La gente ve el titular, duda, pero el mensaje queda sembrado. Si el entorno (vecinos) se infecta, ellos caerán después por presión social.
*   **Acción:** Es el momento crítico para usar **Fricción**.

### 🧩 Cámaras de Eco (Polarización)
Verás que los nodos Azules y Fucsias se repelen físicamente cuando la Polarización sube del 60%.
*   **Teoría:** La "Homofilia". Tendemos a agruparnos con quienes piensan igual. Cuando la polarización es extrema, se rompe el puente de diálogo (los nodos Grises desaparecen o se radicalizan).
*   **Consecuencia:** Una vez formadas las cámaras de eco, la **Campaña de Educación** pierde efectividad, porque la información externa es rechazada como "ataque". ¡Actúa antes de que se formen!

### 🔥 El Efecto McLuhan (El Medio es el Mensaje)
Noticias con tags visuales (`#ContenidoCaliente`) infectan más rápido que las textuales.
*   **Teoría:** Los medios de "Alta Definición" (video/foto) saturan nuestros sentidos y reducen nuestra capacidad crítica. El simulador penaliza tu tiempo de reacción ante estos estímulos.

---

## 4. Arsenal Táctico: Soluciones Estructurales

Los Power-Ups no son "poderes mágicos", representan soluciones de política pública y diseño ético.

### 🛡️ LANZAR CAMPAÑA (Alfabetización Mediática)
*   **Qué representa:** Invertir en educación digital a largo plazo (Prebunking). Enseñar a la gente a detectar manipulación *antes* de verla.
*   **Por qué tarda en cargar:** Porque la educación no es instantánea. Requiere tiempo y recursos.
*   **Lección:** La mejor defensa es una ciudadanía crítica, pero es una estrategia de siembra, no de reacción.

### ⏸️ ACTIVAR FRICCIÓN (Diseño Ético)
*   **Qué representa:** Agregar pasos extra antes de compartir (ej. "No has leído el artículo, ¿seguro que quieres retwittearlo?").
*   **Por qué dura poco:** Porque la fricción cansa al usuario ("fatiga de decisión"). Si se mantiene siempre activa, el usuario abandona la plataforma.
*   **Lección:** La fricción es una herramienta quirúrgica para momentos de crisis, no un estado permanente.

---

## 5. La Resistencia del Sistema (CRA)

¿Por qué en el Nivel 5 ("Zona Zero") tus controles no funcionan?
*   **La Realidad:** Las redes sociales son empresas privadas optimizadas para el lucro (Engagement). Aunque tú (el operador ético) quieras bajar la viralidad, la **arquitectura subyacente del algoritmo** (el "Piso Estructural") está diseñada para resistirse y volver a maximizar la atención.
*   **El Aprendizaje:** En entornos hostiles, la voluntad individual no basta contra un diseño sistémico perverso.

---

**FactoWar** no es solo un juego de ganar o perder. Es un espejo de nuestra realidad digital.
¿Podrás mantener la integridad de la red sin sacrificar la libertad de sus usuarios?

Aquí tienes la sección final del manual, enfocada en la **Progresión (Niveles)** y la **Identidad (Ranking)**, manteniendo el tono pedagógico y explicando el porqué de cada diseño.

---

## 6. Los Ecosistemas: Niveles de Dificultad
En FactoWar, no eliges "Dificultad Fácil o Difícil", eliges en qué **Territorio Digital** vas a operar. Cada nivel representa un tipo de comunidad online con sus propias reglas no escritas y resistencias estructurales.

### Nivel 1: EL ÁGORA (Cultura Crítica)
*   **Qué simula:** Foros científicos, comunidades académicas o redes sociales descentralizadas (ej. Mastodon, Wikipedia).
*   **Comportamiento:**
    *   Los usuarios verifican fuentes por defecto.
    *   La resistencia del sistema es mínima: si decides moderar, la moderación ocurre.
*   **Lección:** Un entorno donde el diseño prioriza la calidad sobre la velocidad es naturalmente resistente a la mentira.

### Nivel 2: LA PLAZA (Red Abierta)
*   **Qué simula:** Redes generalistas clásicas (ej. Facebook en sus inicios, LinkedIn).
*   **Comportamiento:**
    *   Hay ruido y rumores, pero la diversidad de opiniones actúa como amortiguador.
    *   Tus intervenciones funcionan bien, pero requieren vigilancia constante.

### Nivel 3: CÁMARA DE ECO (Tribalismo)
*   **Qué simula:** Grupos cerrados de WhatsApp/Telegram o subreddits políticos.
*   **Comportamiento:**
    *   **Alta Polarización:** Los nodos se agrupan por color rápidamente.
    *   **Resistencia:** La información que contradice al grupo es rechazada. Aquí, la estrategia de "Engagement" es menos efectiva que la de "Controversia".
*   **Lección:** En grupos cerrados, la identidad tribal pesa más que los hechos.

### Nivel 4: EL LABERINTO (Opacidad Algorítmica)
*   **Qué simula:** Algoritmos de recomendación opacos (ej. YouTube, Instagram Reels).
*   **Comportamiento:**
    *   **Latencia:** Tus acciones tienen "retraso". Mueves un slider y el efecto tarda días (segundos) en notarse.
    *   La desinformación se esconde en la saturación de contenido visual.

### Nivel 5: ZONA ZERO (Viralidad Total)
*   **Qué simula:** Redes de video corto ultra-rápidas (ej. TikTok, Twitter/X en crisis).
*   **Comportamiento:**
    *   **Resistencia Extrema:** El algoritmo está optimizado agresivamente para la retención. Si intentas bajar la viralidad, el sistema luchará contra ti ("Piso Estructural" del 90%).
    *   **Caos:** La infección es casi instantánea. Solo los operadores más expertos (que dominan el uso de Fricción y Campaña) pueden sobrevivir aquí.
*   **Lección:** Hay arquitecturas donde la moderación humana es casi irrelevante frente a la velocidad de la máquina.

---

## 7. Sistema de Identidad: Privacidad y Persistencia
FactoWar aplica los principios de **Privacidad por Diseño**. Queremos enseñarte que no es necesario entregar tus datos personales para participar en la vida digital.

### 👻 Identidad Efímera ("Zero Friction")
*   **Cómo funciona:** Puedes empezar a jugar inmediatamente como "Invitado". No te pedimos email, ni teléfono, ni contraseña.
*   **La Filosofía:** Eliminamos las barreras de entrada para que te concentres en la experiencia educativa, no en llenar formularios.

### 🔐 La Llave Maestra (Token de Operador)
*   **Qué es:** Si logras un puntaje digno de ser guardado, el sistema te ofrecerá generar una **Identidad Criptográfica**.
*   **Tu Responsabilidad:** Recibirás un código único (ej. `fw-x89-m21`). **Tú eres el dueño de tu llave.** Nosotros no la guardamos asociada a tu nombre real.
    *   Si pierdes la llave, pierdes tu rango.
    *   Si cambias de navegador, usa tu llave para recuperar tu perfil.
*   **Lección:** Soberanía digital. Tú controlas tu acceso, no una base de datos centralizada vulnerable.

---

## 8. El Ranking: Meritocracia Digital
El tablero de clasificación no premia a quien juega más tiempo, sino a quien **mejor defiende la red**.

### Sistema de Puntuación (Score)
El puntaje no es arbitrario. Refleja la eficiencia de tu gestión:
1.  **Integridad (Salud):** +127 pts por cada % salvado. (Prioridad: No dejes que la red muera).
2.  **Eficiencia (Tiempo):** +43 pts por cada segundo ahorrado. (Prioridad: Actúa rápido).
3.  **Bonus Ético (Estrategia):** +1850 pts por usar Campañas Educativas. (Prioridad: Soluciones de fondo, no parches).
4.  **Multiplicador de Riesgo:** Ganar en la "Zona Zero" multiplica tu puntaje x3.5.

### Rangos de Operador
Tu desempeño acumulado define tu estatus en la comunidad FactoWar:

*   🥉 **Novato:** Aprendiendo las mecánicas básicas.
*   🥈 **Operador:** Capaz de gestionar crisis en entornos moderados.
*   🥇 **Veterano:** Experto en contención de viralidad y uso de fricción.
*   🏆 **LEYENDA (God Tier):** El 1% de jugadores que han salvado una red "Zona Zero" con más del 90% de integridad. Estos usuarios han demostrado una comprensión profunda de la ecología de medios.