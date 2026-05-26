# Analisis de Bocetos TandisWrapped: Evolucion de Boceto1 a Boceto2

Este documento resume las caracteristicas, mejoras y diferencias clave entre los dos prototipos de **TandisWrapped**, un dashboard interactivo para el alumno **Maximo Rodrigo** que presenta sus habitos semanales con visuales 3D, graficos ecualizadores y un coach basado en IA.

---

## Estructura General y Navegacion

Ambos bocetos mantienen cuatro secciones principales:

- **Inicio** – Resumen rapido con mini-grafico de progreso y accesos directos.
- **Wrapped** – Visualizaciones 3D (vinilos giratorios, discos rotos, ecualizador semanal).
- **Bitacora** – Tabla editable de actividades (dia, horario, tarea, prioridad, check).
- **Coach IA** – Chat con inteligencia artificial que responde usando datos en tiempo real de Maximo.

La navegacion usa pestanas fijas con indicador de seccion activa. En **boceto2** se mejora el feedback visual con bordes y sombras mas pronunciadas, y se anade un indicador de estado *online* en el perfil del estudiante.

---

## Datos y Logica de Calculo (Algoritmos 1-4)

Ambos prototipos trabajan con el mismo conjunto de datos (actividades de Maximo Rodrigo, categorias *Indispensable / Necesaria / Deseable*). Los cuatro algoritmos principales se mantienen:

1. **Habito estrella** – Actividad con mas repeticiones realizadas.
2. **Habito a mejorar** – Actividad con mas omisiones (fallos).
3. **Dia de maximo rendimiento** – Se asigna una puntuacion ponderada por prioridad (3, 2, 1 punto) y se elige el dia con mayor suma.
4. **Playlist de rescate** – Lista de tareas fallidas ordenadas por prioridad (Indispensable > Necesaria > Deseable) y frecuencia de fallo.

La tabla de la bitacora es **interactiva**: marcar/desmarcar casillas recalcula todos los datos al instante, actualizando tanto el Wrapped como el chat del coach.

---

## Visualizaciones y Componentes 3D (Wrapped)

| Componente               | Boceto1                                 | Boceto2 (mejoras)                                           |
| ------------------------ | --------------------------------------- | ----------------------------------------------------------- |
| **Vinilo holografico**   | CSS repeating-radial-gradient + giro. | Identico, pero se anade animation: holo-shift (cambio de tono) y mayor tamano (110px). |
| **Vinilo roto**          | Dos mitades con clip-path y desplazamiento. | Mismo principio, pero se incluye un centro roto mas definido (broken-center) y sombras mas llamativas. |
| **Ecualizador 3D**       | Chart.js de barras con gradientes (2D). | **Personalizado totalmente en CSS** – cada barra tiene pseudo-elementos ::before y ::after que generan un efecto 3D (bordes inclinados). Las barras usan perspectiva (perspective: 800px) y se animan en altura. Ademas, la barra del dia con mayor puntuacion resalta con colores dorado/verde y sombra extra. |
| **Efecto tilt (3D hover)** | Se aplica rotateX/rotateY segun el puntero. | Mismo comportamiento, pero se anade scale3d(1.02,1.02,1.02) para mayor sensacion de profundidad. |

> Ambos bocetos cumplen la consigna: **no utilizan SVG** (todo es CSS puro), y ningun grafico depende de Mermaid.

---

## Dashboard de Inicio

- **Boceto1** muestra tres metricas rapidas (habito dominante, mejor energia, atencion requerida) y un mini-doughnut con porcentaje de completado.
- **Boceto2** simplifica el inicio: integra el doughnut en una tarjeta central junto al mensaje de bienvenida, y elimina las tarjetas secundarias para dar mayor protagonismo al acceso al Wrapped. La tipografia es mas atrevida y se anade un fondo degradado con blur.

---

## Bitacora (Tabla de actividades)

Ambos prototipos generan dinamicamente la tabla a partir del arreglo maximoData. Las columnas: Dia, Horario, Actividad, Prioridad (con etiquetas de color) y un checkbox con estilo "neon".

- **Boceto1** usa border-collapse tradicional y un color de fondo ligeramente diferente.
- **Boceto2** mejora el contraste, el hover de las filas y los checkboxes son mas grandes (22px vs 20px). Ademas, el resumen de progreso se muestra en una tarjeta aparte con sombra verde.

---

## Coach IA – Integracion Gemini 2.5 Flash

La principal diferencia entre bocetos:

|                 | Boceto1                                                                          | Boceto2                                                                                                      |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Motor**       | Simula respuestas con setTimeout y condiciones predefinidas (modo estatico).     | **Integracion real con la API Gemini 2.5 Flash** (utiliza fetch con la URL oficial de Google).               |
| **Prompt contextual** | No existe.                                                                 | Construye un systemInstruction enriquecido con los datos en vivo de Maximo: porcentaje de efectividad, habito estrella, habito fallado, mejor dia y lista de tareas urgentes. Ademas fija un tono juvenil, mexicano y sin saludos largos. |
| **Manejo de errores** | –                                                                                | Implementa reintentos con **backoff exponencial** (hasta 5 intentos) y muestra un mensaje amigable si falla. |
| **Indicador de escritura** | No hay.                                                                   | Muestra tres puntos animados (typing-indicator) mientras se espera la respuesta de la API.                   |

Ademas, en **boceto2** el chat formatea texto en **negrita** (con **) proveniente de la IA para mejorar la legibilidad.

---

## Estilos y Paleta de Colores

- **Boceto1**: fondo `#05050a` (azul muy oscuro), acentos en `#10b981` (esmeralda), `#8b5cf6` (purpura) y `#ec4899` (rosa). Efecto de vidrio (backdrop-filter) con radio 1.25rem.
- **Boceto2**: fondo `#0a0a12` (un poco mas claro pero igualmente nocturno), acentos principales `#1DB954` (verde Spotify), `#9333ea` (purpura mas intenso) y `#ec4899`. Mayor contraste en las tarjetas y bordes mas definidos. Se anaden gradientes radiales fijos en el fondo.

---

## Rendimiento y Detalles Tecnicos

| Aspecto               | Boceto1                         | Boceto2                                              |
| --------------------- | ------------------------------- | ---------------------------------------------------- |
| **Librerias externas**| Tailwind, Chart.js              | Tailwind, Chart.js (solo para el doughnut)         |
| **Responsive**        | Si, con grid y flex             | Si, con mejor manejo de desbordamiento en tablas y ecualizador (overflow-x-auto) |
| **Actualizacion en tiempo real** | Si, al marcar checkboxes se refrescan todos los elementos. | Idem, pero ademas el ecualizador 3D se re-renderiza solo si la vista Wrapped esta activa (optimizacion). |
| **Accesibilidad**     | Inputs con onchange directo.    | Anade estados disabled en el boton de envio mientras se carga la respuesta de Gemini. |

---

## Conclusiones y Recomendaciones

**Boceto2** es claramente una evolucion superior:

- Ecualizador 3D personalizado – cumple de manera mas fiel la peticion de un "ecualizador 3D" sin depender de Chart.js.
- Coach con IA real – usando Gemini 2.5 Flash, el asistente se vuelve util, personalizado y entretenido para un publico juvenil.
- Estetica mas pulida – sombras, gradientes y efectos de hover mas inmersivos.
- Resiliencia en llamadas API – reintentos automaticos y mensajes de error amigables.

**Puntos a mantener del Boceto1** (si se desea una version hibrida):
- El diseno de tres metricas rapidas en la pantalla de inicio puede servir para usuarios que quieran un vistazo inmediato.
- La animacion del vinilo holografico con cambio de tono (holo-shift) del Boceto2 podria aplicarse tambien a otros elementos.

**En resumen:** el segundo boceto es la base ideal para un producto final, ofreciendo una experiencia envolvente, datos actualizables en tiempo real y un coach con inteligencia artificial integrada, todo ello sin emplear SVG ni graficos externos complejos.