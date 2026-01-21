* FACTOWAR: Jugabilidad
* By Paul Caballero
* Este documento describe la manera de jugar FactoWar todas las decisiones deben ajustarse a este.
```markdown
# 🕹️ WORKFLOW Y MECÁNICAS DE JUEGO (FactoWar)

Este documento define la lógica de interacción, tiempos y reglas del sistema. Toda modificación técnica debe respetar este flujo de supervivencia.

---

## 1. Inicio de Sesión y Atmósfera (Session Init)

El jugador ingresa al sistema y se establece el tono de **"Simulador de Crisis"**.

- **Modal de Bienvenida**: Aparece una sola vez. Al cerrarlo, comienza el **Estado IDLE**.
- **Estado IDLE (Vigilancia)**:
  - **Borde de Pantalla**: Detrás del Sidebar y Canvas, parpadea en rojo suavemente.
  - **HUD de Estadísticas (Top-Canvas)**: Los indicadores muestran los valores actuales de lo que sucede en la red. En esta etapa, los valores presentan pocas variaciones, simulando estabilidad.
  - **Marquee (Footer)**: Comunica mensajes de diagnóstico estable ("SISTEMA SINCRONIZADO", "ESPECTRO EN CALMA").  
    *Nota: El Marquee debe comunicar activamente lo que sucede en todas las etapas del juego.*
  - **Canvas**: Los nodos se mueven lentamente en su estado base.

---

## 2. La Incursión (The Intrusion)

- **Trigger**: 10 segundos después del inicio (o de terminar una partida anterior).
- **Alerta Visual**: El Borde de Pantalla acelera su parpadeo. El Marquee cambia a modo de alerta ("ANOMALÍA DETECTADA", "INYECCIÓN DE DATOS EN CURSO").
- **Aparición de Datos**: En la **FakeNews Box (Sidebar)** se "inyecta" el titular de la noticia falsa.
- **Selección de Levels**: El usuario tiene **5 segundos** para elegir la dificultad mediante el sistema complejo de navegación (dots y sliders). Si no elige, el sistema asigna uno por defecto.

---

## 3. Fase de Contención (Gameplay Activo)

Comienza la batalla por la red. El Marquee reporta el estado de la infección en tiempo real.

### A. Mecánica del Slider y Ghost Bar (Fricción)

- El jugador intenta mitigar la viralidad moviendo los tiradores de los **Sliders**.
- **La Ghost Bar**: Barra de relleno secundaria que representa la **REALIDAD del motor de juego** (color gris azulado).
- **Lógica de Fricción**:
  - La distancia entre el tirador y la Ghost Bar depende del **Level**.
  - **Level 1**: Control total (Ghost Bar pegada al tirador).
  - **Levels altos**: Resistencia severa. La Ghost Bar se queda trabada (ej. en 80%) aunque el jugador baje al 0%.
  - **Efecto de Rebote**: La Ghost Bar tiene una animación de "temblor" o "rebote" elástico para mostrar que está siendo forzada pero tiende a su posición original de resistencia.

---

## 4. El Estado LOCK (El Punto de No Retorno)

- A los **15 segundos exactos** de iniciada la fase activa:
  - **Bloqueo de Sliders**: Los mandos se deshabilitan y el jugador ya no puede moverlos.
  - **Visual**: El sistema indica que la noticia ha tomado control total. El Marquee intensifica sus mensajes ("SISTEMA COMPROMETIDO", "CONTROLES MANUALES ANULADOS").

---

## 5. Último Recurso: Power-Ups

- Tras el bloqueo, los **Power-Ups** son la única intervención posible.
- **Uso**: Tienen costo de **"Enfriamiento" (Cooldown)**.
- **Cooldown**: Una vez usado, queda deshabilitado por **2 partidas completas** (recarga del 50% por partida).

---

## 6. Monitoreo y HUD

Durante toda la partida, se vigila el **Top-Canvas**:

- **HUD de Estadísticas**: Muestra salud de la red, alcance y tiempo.
- **Nodos**: Iconos blancos dentro de círculos de color (ideología). El borde indica si están infectados o han cambiado de estado.

---

## 7. Fin de Partida

La partida finaliza oficialmente bajo dos condiciones:

1. **Vencimiento del Tiempo**: Se llega al final del cronómetro con salud en la red (**Victoria**).
2. **Colapso de la Red**: La salud llega al 0% (**Derrota**).

**Post-Partida**: El sistema muestra resultados y vuelve al **Estado IDLE** tras una pausa, reiniciando el ciclo para la próxima noticia.
```
### Ajuste de Tiempos (Timing)
Para asegurar que sea jugable pero tenso:

1.  **Idle -> Alerta:** 10 segs de inactividad.
2.  **Selección Nivel:** 5 segs (Cuenta atrás visual).
3.  **Intel & Sliders:** 15 segs (Aumentado de 10 a 15 para dar tiempo a leer los Tags y mover 5 sliders).
4.  **Juego (Fase Ajuste):** 15 segs (Sliders activos).
5.  **Juego (Fase Bloqueo):** Hasta el final (Día 30). Solo Power-Ups activos (si están cargados).

