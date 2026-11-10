# Ubicá Costa Rica — guía de instalación (versión 4)

INEC · Unidad de Cartografía · Comisión TUC

Juego diario de geografía: cada día hay 20 lugares de Costa Rica para ubicar en el mapa, de menor a mayor dificultad. Hay 10 segundos para marcar cada lugar. El modo Práctica tiene siempre los mismos 5 lugares. Los puntajes del reto diario se guardan en una hoja de Google Sheets y el juego muestra una tabla de posiciones del día y del mes.

## Contenido del paquete

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El juego. Aquí se pega la URL de la hoja (paso 2). |
| `lugares.js` | Banco de 238 lugares puntuales, entre ellos 22 parques nacionales y 112 poblados. Se puede editar. |
| `distritos.geojson` | Polígonos de los distritos. En los distritos se ganan 100 puntos si la marca cae dentro. |
| `mapa.js` | Límites de provincias y países vecinos (Natural Earth). |
| `Code.gs` | Script de Google Apps Script que guarda puntajes y arma la tabla. |
| `LEEME.md` | Esta guía. |

---

## Paso 1 · Crear la hoja de puntajes (Google Sheets + Apps Script)

1. Entrá a [sheets.google.com](https://sheets.google.com) y creá una hoja nueva. Ponele un nombre, por ejemplo **Ubicá CR – Puntajes**.
2. En el menú, abrí **Extensiones → Apps Script**.
3. Borrá el código de ejemplo y pegá todo el contenido de `Code.gs`. Guardá con el ícono del disquete.
4. Hacé clic en **Implementar → Nueva implementación**.
   - En el engranaje de *Seleccionar tipo*, elegí **Aplicación web**.
   - **Descripción:** Ubicá CR.
   - **Ejecutar como:** *Yo* (tu cuenta).
   - **Quién tiene acceso:** *Cualquier usuario*.
5. Pulsá **Implementar**. Google pedirá autorizar el acceso a la hoja:
   - elegí tu cuenta;
   - si aparece *“Google no verificó esta app”*, entrá a **Configuración avanzada → Ir a Ubicá CR (no seguro)**. Es normal en scripts propios;
   - aceptá los permisos.
6. Copiá la **URL de la aplicación web**. Termina en `/exec`.

La pestaña **Puntajes** se crea sola con el primer registro.

> **¿Por qué “Cualquier usuario”?** El juego envía los puntajes sin que cada persona inicie sesión en Google. Si se elige “Solo usuarios de mi dominio”, el navegador bloquea la conexión. La URL es difícil de adivinar y el script solo acepta puntajes válidos, pero no conviene publicarla fuera de la Unidad.

## Paso 2 · Conectar el juego con la hoja

Abrí `index.html` con un editor de texto (Bloc de notas, VS Code o el editor web de GitHub). Buscá esta línea, cerca del inicio del script:

```js
const SCRIPT_URL = "";
```

y pegá la URL entre las comillas:

```js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfy.../exec";
```

## Paso 3 · Publicar el juego en la web

### Opción A · GitHub Pages (recomendada, gratis)

1. Creá una cuenta en [github.com](https://github.com) si no tenés.
2. Pulsá **New repository**.
   - **Nombre:** `ubica-cr`.
   - Marcá **Public**. GitHub Pages gratuito requiere repositorio público.
   - Pulsá **Create repository**.
3. En el repositorio vacío, pulsá **uploading an existing file**. Arrastrá `index.html`, `lugares.js`, `mapa.js` y `distritos.geojson`, y pulsá **Commit changes**.
4. Abrí **Settings → Pages**.
   - En *Source*, elegí **Deploy from a branch**.
   - En *Branch*, elegí **main** y la carpeta **/(root)**.
   - Pulsá **Save**.
5. Esperá uno o dos minutos y recargá esa página. Aparecerá la dirección del juego:
   `https://TU-USUARIO.github.io/ubica-cr/`

Para hacer cambios, editá el archivo en GitHub (ícono del lápiz) y guardá con **Commit changes**. El sitio se actualiza solo en uno o dos minutos.

### Opción B · Vercel

1. Subí los archivos a GitHub como en la opción A, pasos 1 a 3. Aquí el repositorio puede ser privado.
2. Entrá a [vercel.com](https://vercel.com) con tu cuenta de GitHub.
3. Pulsá **Add New → Project**, importá el repositorio `ubica-cr` y pulsá **Deploy**. No hace falta configurar nada más, porque es un sitio estático.
4. Vercel da una dirección como `https://ubica-cr.vercel.app`. Cada cambio en GitHub se publica automáticamente.

## Paso 4 · Probar

1. Abrí la dirección del juego, escribí un nombre de prueba y completá el reto.
2. Al final debe aparecer **“Puntaje registrado en la tabla de posiciones.”**
3. Revisá que en la hoja haya una fila nueva en **Puntajes**.
4. Pulsá **Posiciones** en el juego para ver la tabla del día y del mes.
5. Borrá la fila de prueba en la hoja.
6. Compartí el enlace con la Unidad.

---

## Actualizar de la versión 3 a la versión 4

Solo cambia `index.html`. La hoja y el script de Google no se tocan.

1. **Copiar la URL del script.** Copiá la línea `const SCRIPT_URL = "...";` de tu `index.html` actual al nuevo.
2. **Subir a GitHub.** Usá **Add file → Upload files** con el `index.html` nuevo y pulsá **Commit changes**. Es un solo commit.
3. **Esperar la publicación.** En **Actions**, la ejecución *pages build and deployment* debe terminar con check verde. Luego recargá el juego con **Ctrl + F5**.

### Qué cambió en la versión 4

- **Pantalla de inicio del reto diario.** El cronómetro ya no arranca al escribir el nombre. Primero aparece una pantalla con dos botones: **Iniciar reto diario** y **Hacer la práctica primero**. El tiempo de la primera pregunta empieza solo al pulsar *Iniciar*.
- **Al terminar la práctica** aparece el botón **Ir al reto diario**, que vuelve a esa pantalla de inicio.
- **Reto empezado.** Si alguien cierra o recarga entre dos preguntas, al volver ve **Continuar** y el cronómetro espera hasta que lo pulse. Recargar *durante* una pregunta la sigue contando como tiempo agotado.

## Actualizar de la versión 2 a la versión 3

Igual que en la actualización anterior, la hoja, la URL del script y la dirección del juego siguen siendo las mismas.

1. **Copiar la URL del script.** Copiá la línea `const SCRIPT_URL = "...";` de tu `index.html` actual al `index.html` nuevo.
2. **Actualizar el script de la hoja.** El máximo pasa de 1500 a 2000 puntos.
   - Pegá el `Code.gs` nuevo en **Extensiones → Apps Script** y guardá.
   - Abrí **Implementar → Gestionar implementaciones → ✏️ Editar**, elegí **Nueva versión** y pulsá **Implementar**.
   - Si te saltás este paso, la hoja rechaza los puntajes mayores a 1500.
3. **Subir a GitHub.** Usá **Add file → Upload files** con `index.html` y `lugares.js`. `mapa.js` y `distritos.geojson` no cambiaron, pero subirlos de nuevo no hace daño.
4. **Verificar.** Recargá con **Ctrl + F5**.
   - Debe decir **Lugar 1 de 20**.
   - Arriba del nombre del lugar debe aparecer la barra del cronómetro.

> Igual que antes, conviene actualizar de noche: la hoja acepta un solo registro por persona y por día.

### Qué cambió en la versión 3

- **20 lugares por día, máximo 2000 puntos.** El orden va de menor a mayor dificultad:

  | Lugares | Tipo |
  |---|---|
  | 1–3 | Fáciles |
  | 4–7 | Medios |
  | 8–9 | Parques nacionales |
  | 10–11 | Difíciles |
  | 12–13 | Distritos |
  | 14–15 | Poblados |
  | 16–20 | Los más difíciles: distritos pequeños (menos de 20 km²) y poblados alejados, nivel **Experto** |

- **Cronómetro de 10 segundos por lugar.** Si se acaba el tiempo:
  - con una marca puesta sin confirmar, se toma esa marca;
  - sin marca, el lugar vale 0 y en el resumen aparece como ⬛.
- **Recargar o salir no reinicia el tiempo.** Si alguien recarga la página o cambia de pestaña del juego (Práctica, Posiciones) en medio de una pregunta del reto, esa pregunta cuenta como tiempo agotado.
- **Práctica fija.** Siempre los mismos 5 lugares, también con cronómetro, y nunca se registra en la hoja.
- **112 poblados en el banco** (antes 54). Los nuevos vienen de GeoNames y de una lista revisada a mano. Todos se verificaron contra la capa de distritos para confirmar el cantón. Los poblados a más de 40 km de San José quedan en nivel Experto.

### Ajustes rápidos en `index.html`

```js
const TIEMPO = 10;   // segundos por lugar
const PRACTICA = ["Volcán Irazú","Puerto Limón","Playa Tamarindo","PN Corcovado, estación Sirena","San Gerardo de Dota"];
const RONDAS = [1,1,1, 2,2,2,2, "PN","PN",3, 3,"D","D", 4,4, "D+",5,5,"D+",5];
```

- En `RONDAS`, los números son niveles: 1 Fácil, 2 Media, 3 Difícil, 4 Poblado y 5 Experto. `"PN"` es un parque nacional, `"D"` un distrito y `"D+"` un distrito pequeño.
- Los nombres de `PRACTICA` deben escribirse exactamente como en `lugares.js`.
- Si cambiás la cantidad de rondas, ajustá `MAX_PUNTOS` en `Code.gs` a rondas × 100.

## Actualizar de la versión 1 a la versión 2

Si ya tenés la versión 1 funcionando, no hace falta crear nada nuevo. La hoja, la URL del script y la dirección del juego siguen siendo las mismas.

**1. Copiar la URL del script.** Abrí tu `index.html` actual (en GitHub o en tu computadora) y copiá la URL de la línea `const SCRIPT_URL = "...";`. Pegala en la misma línea del `index.html` nuevo.

**2. Actualizar el script de la hoja.** Hay que subir el máximo de puntos de 1000 a 1500.
   - En la hoja, abrí **Extensiones → Apps Script**.
   - Reemplazá todo el código por el contenido del `Code.gs` nuevo y guardá.
   - Abrí **Implementar → Gestionar implementaciones**.
   - Pulsá **✏️ Editar**, elegí **Versión: Nueva versión** y pulsá **Implementar**.
   - La URL no cambia. Si te saltás este paso, la hoja rechaza los puntajes mayores a 1000.

**3. Subir los archivos nuevos a GitHub.** En el repositorio, pulsá **Add file → Upload files**. Arrastrá `index.html`, `lugares.js`, `mapa.js` y `distritos.geojson`, y pulsá **Commit changes**. Los archivos con el mismo nombre se reemplazan. En uno o dos minutos GitHub Pages (o Vercel) publica la versión nueva.

**4. Verificar.** Abrí el juego y recargá con **Ctrl + F5** (en Mac, **Cmd + Shift + R**) para no ver la versión guardada en caché.
   - Arriba debe aparecer la franja **INEC · Unidad de Cartografía · Comisión TUC**.
   - El contador debe decir **Lugar 1 de 15**.

> **Cuándo actualizar.** Hacelo de noche o temprano en la mañana. Quien ya jugó el reto de 10 lugares ese día ve un reto nuevo de 15 al recargar, pero la hoja no le acepta un segundo registro del mismo día.
>
> **Tabla del mes.** Los días jugados con la versión 1 valen hasta 1000 y los nuevos hasta 1500. Como todos jugaron los mismos retos, la comparación del mes sigue siendo justa. Si preferís arrancar limpio, cambiá el nombre de la pestaña **Puntajes** (por ejemplo a *Puntajes v1*). El script crea una pestaña nueva con el siguiente registro.

## Usar la capa oficial de distritos del INEC

El paquete trae una capa provisional con 471 distritos, tomada de OpenStreetMap (geoBoundaries, ODbL) y simplificada. Esa capa tiene límites de alrededor de 2017, así que no incluye todos los distritos vigentes. Algunos cantones recientes, como Monteverde, aparecen bajo su cantón anterior, y faltan por completo los distritos de Coto Brus y Parrita.

Para pasar a los 494 distritos oficiales, en QGIS:

1. Cargá la capa oficial de distritos (división territorial administrativa vigente).
2. Simplificá los polígonos: **Vectorial → Herramientas de geometría → Simplificar**.
   - **Tolerancia:** 50 m si la capa está en CRTM05, o 0,0005 si está en grados.
   - Esto deja el archivo liviano sin cambiar la forma de los distritos a la escala del juego.
3. Exportá la capa simplificada con clic derecho → **Exportar → Guardar objetos como…**
   - **Formato:** GeoJSON.
   - **Nombre de archivo:** `distritos.geojson`.
   - **SRC:** EPSG:4326 – WGS 84. Es obligatorio.
   - **Campos:** dejá marcados solo los de provincia, cantón y distrito.
   - En *Opciones de capa*, poné **COORDINATE_PRECISION = 5**.
4. Revisá que el archivo pese menos de 5 MB. La capa provisional pesa unos 0,7 MB.
5. En `index.html`, ajustá esta línea con los nombres exactos de los campos de tu capa:

   ```js
   const CAMPOS = { provincia: "provincia", canton: "canton", distrito: "distrito" };
   ```

   Por ejemplo, si los campos se llaman `NOM_PROV`, `NOM_CANT` y `NOM_DIST`:

   ```js
   const CAMPOS = { provincia: "NOM_PROV", canton: "NOM_CANT", distrito: "NOM_DIST" };
   ```

6. Subí `distritos.geojson` e `index.html` a GitHub como en el paso 3 de la actualización.

El juego calcula solo el punto de referencia de cada distrito, su área y cuántos distritos tiene su cantón. Estos datos aparecen como dato curioso. El pie del panel muestra cuántos distritos se cargaron: debe decir **494**.

> Al cambiar la capa de distritos o `lugares.js` también cambia la selección de los retos. Hacelo de noche, igual que una actualización.

## Mantenimiento

**Cambiar el script después de publicado.** Si editás `Code.gs`, entrá a **Implementar → Gestionar implementaciones → ✏️ Editar** y en *Versión* elegí **Nueva versión**. Así la URL no cambia. Si en cambio creás una *Nueva implementación*, la URL será otra y habrá que actualizarla en `index.html`.

**Agregar o corregir lugares.** Cada línea de `lugares.js` tiene este formato:

```js
["Nombre", "Categoría", nivel, latitud, longitud, "Cantón, Provincia", "Dato curioso"],
```

- El nivel va de 1 a 5: 1 es Fácil, 2 Media, 3 Difícil, 4 Poblado y 5 Experto.
- Las coordenadas van en grados decimales WGS84. La longitud es negativa.
- Las coordenadas actuales son aproximadas. Antes de un uso formal conviene verificarlas contra las capas oficiales (centros de distrito, poblados del MGN).

> Agregar o quitar lugares cambia la selección de los retos, incluido el del día en curso para quien todavía no lo haya jugado. Los puntajes ya registrados en la hoja no se ven afectados. Lo ideal es hacer los cambios de noche, después de que todos hayan jugado.

**Composición del reto.** Ver *Ajustes rápidos* en la sección de la versión 3. Si cambiás la cantidad de rondas, publicá también una nueva versión del script con el `MAX_PUNTOS` correspondiente.

**Reglas del puntaje**

- Cada lugar da 100 puntos si la marca queda a 1 km o menos. Baja a 50 cerca de los 25 km y a casi 0 pasados los 100 km.
- En los distritos, la marca da 100 puntos si cae dentro del polígono. Si cae fuera, se mide la distancia al límite del distrito.
- Se registra un solo puntaje por jugador y por día.
- La tabla del mes suma los retos diarios jugados. El modo Práctica no se registra.

**Limitaciones conocidas**

- No hay inicio de sesión. Las personas se identifican por el nombre que escriben, así que conviene acordar usar nombre y apellido.
- Alguien con conocimientos técnicos podría enviar un puntaje inventado (hasta el máximo permitido). Para uso interno suele bastar. Si hace falta más control, se puede pasar a un esquema con inicio de sesión institucional.
- El juego usa Google Fonts para las tipografías. Si una red las bloquea, se muestran tipografías del sistema y todo sigue funcionando.
