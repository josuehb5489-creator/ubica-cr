/**
 * Ubicá Costa Rica · tabla de posiciones en Google Sheets
 *
 * Este script recibe los puntajes del juego y devuelve la tabla de posiciones.
 * Se pega en la hoja de cálculo desde Extensiones → Apps Script y se publica
 * como aplicación web (ver LEEME.md).
 *
 * Hoja "Puntajes": Registrado | Fecha reto | N.º reto | Jugador | Puntos | Detalle
 */

const HOJA = 'Puntajes';
const ENCABEZADOS = ['Registrado', 'Fecha reto', 'N.º reto', 'Jugador', 'Puntos', 'Detalle'];
const MAX_PUNTOS = 2000;   // 20 lugares × 100 puntos
const ZONA = 'America/Costa_Rica';

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) sh = ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) {
    sh.appendRow(ENCABEZADOS);
    sh.setFrozenRows(1);
    sh.getRange('B:B').setNumberFormat('@'); // la fecha del reto se guarda como texto AAAA-MM-DD
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Normaliza la fecha leída de la hoja a texto AAAA-MM-DD
function fecha_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, ZONA, 'yyyy-MM-dd');
  return String(v).trim();
}

// Limpia el nombre: sin espacios dobles, máximo 40 caracteres y sin símbolos que Sheets trate como fórmula
function nombre_(v) {
  return String(v || '').replace(/\s+/g, ' ').trim().replace(/^[=+\-@]+/, '').slice(0, 40);
}

function filas_() {
  const sh = hoja_();
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, 6).getValues().map(r => ({
    fecha: fecha_(r[1]), jugador: String(r[3]), puntos: Number(r[4]) || 0
  }));
}

/** Registro de un puntaje (lo llama el juego al terminar el reto diario). */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    const jugador = nombre_(d.jugador);
    const fecha = String(d.fecha || '');
    const puntos = Math.round(Number(d.puntos));
    if (!jugador) return json_({ ok: false, error: 'datos', mensaje: 'falta el nombre del jugador' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return json_({ ok: false, error: 'datos', mensaje: 'fecha inválida' });
    if (!(puntos >= 0 && puntos <= MAX_PUNTOS)) return json_({ ok: false, error: 'datos', mensaje: 'puntaje fuera de rango' });

    // Un solo registro por jugador y por día
    const ya = filas_().some(f => f.fecha === fecha && f.jugador.toLowerCase() === jugador.toLowerCase());
    if (ya) return json_({ ok: false, error: 'duplicado' });

    hoja_().appendRow([new Date(), fecha, Number(d.reto) || '', jugador, puntos, String(d.detalle || '').slice(0, 2000)]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'servidor', mensaje: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Tabla de posiciones: ?accion=tabla&fecha=AAAA-MM-DD */
function doGet(e) {
  try {
    const fecha = String((e.parameter && e.parameter.fecha) || Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd'));
    const mes = fecha.slice(0, 7);
    const filas = filas_();

    const hoy = filas.filter(f => f.fecha === fecha)
      .map(f => ({ jugador: f.jugador, puntos: f.puntos }))
      .sort((a, b) => b.puntos - a.puntos);

    const acum = {};
    filas.filter(f => f.fecha.slice(0, 7) === mes).forEach(f => {
      const k = f.jugador.toLowerCase();
      if (!acum[k]) acum[k] = { jugador: f.jugador, total: 0, dias: 0 };
      acum[k].total += f.puntos;
      acum[k].dias += 1;
    });
    const mesTabla = Object.values(acum).sort((a, b) => b.total - a.total);

    return json_({ ok: true, fecha, hoy, mes: mesTabla });
  } catch (err) {
    return json_({ ok: false, error: 'servidor', mensaje: String(err) });
  }
}
