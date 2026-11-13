// =================== CONFIGURACIÓN DEL TALLER ===================
// Todo lo que se ajusta para cada taller está en este archivo.
window.TALLER = {
  // URL de la aplicación web de Apps Script del taller (termina en /exec).
  // Si queda vacía, las páginas funcionan en modo demostración: guardan solo en este navegador
  // y la vista del facilitador muestra datos de ejemplo.
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxUxd_TaQbSDx5G38_7O7VS7p0MSYf9uKunJMWl7MwGTqAhf06CVqwSrTfxI5tfz_B-/exec",

  // Identificador de la sesión. Cambialo para cada taller (o para un ensayo) y los resultados quedan separados.
  SESION: "taller1-2026-11",

  TITULO: "Taller 1 · ACTMGN y AEGEO",
  SUBTITULO: "Hoja de Ruta DGIG 2026–2030",

  // Procesos que cada participante puede elegir al entrar (opcional para quien participa).
  PROCESOS: ["DECO", "GEOP", "PPDG", "PGPG", "AGEC", "CMGN", "Otro"],

  // ---------- Ordená el flujo ----------
  // Etapas en el ORDEN CORRECTO. Las páginas las muestran desordenadas a cada participante.
  // Revisá textos y orden con el diagrama oficial del flujo antes del taller.
  ETAPAS: [
    { id: "ipg",     t: "Cálculo del IPG",                 d: "Índice de prioridad geográfica: discrepancia (0,50), permisos CFIA/RA (0,30) y rezago (0,20)." },
    { id: "matriz",  t: "Matriz de decisión campo/oficina", d: "Define si cada área priorizada se actualiza en campo o en oficina." },
    { id: "proc",    t: "Actualización por procesos",      d: "DICO, PPDG, PAAG, MGP, AGEC y AGD ejecutan la actualización." },
    { id: "muestreo",t: "Muestreo",                         d: "Revisión por muestra de lo actualizado." },
    { id: "cierre",  t: "Cierre del MGN",                   d: "Consolidación de la versión actualizada del marco." },
    { id: "publica", t: "Publicación",                      d: "Entrega del MGN actualizado a sus usuarios." },
    { id: "evalua",  t: "Evaluación",                       d: "Revisión del ciclo para el siguiente período." },
  ],

  // ---------- ¿Campo u oficina? ----------
  // Casos ficticios. En "matriz" escribí lo que indica la matriz de decisión para cada caso
  // ("Campo", "Oficina" o una explicación corta). Si queda vacío, la vista del facilitador lo marca como pendiente.
  CASOS: [
    { id: "c1", t: "Urbanización nueva con permiso CFIA", d: "Permiso de construcción aprobado hace ocho meses; la imagen satelital más reciente ya muestra calles y techos.", matriz: "" },
    { id: "c2", t: "Discrepancia alta en zona rural", d: "El MGN y la imagen no coinciden en varias manzanas, pero la imagen disponible tiene más de dos años.", matriz: "" },
    { id: "c3", t: "Cambio de nombre de un barrio", d: "Un registro administrativo informa el nuevo nombre; no hay cambios físicos en el terreno.", matriz: "" },
    { id: "c4", t: "Viviendas dispersas de difícil acceso", d: "Crecimiento disperso en una zona montañosa con caminos de lastre y nubosidad frecuente en las imágenes.", matriz: "" },
    { id: "c5", t: "Condominio vertical en zona urbana", d: "Permiso CFIA para una torre de 12 pisos en un distrito densamente poblado.", matriz: "" },
    { id: "c6", t: "Distrito con rezago alto", d: "Más de cinco años sin actualizar y sin permisos ni registros administrativos recientes.", matriz: "" },
    { id: "c7", t: "Diferencia de límites con la DTA", d: "En oficina se detecta que un límite del MGN no coincide con la División Territorial Administrativa vigente.", matriz: "" },
    { id: "c8", t: "Zona afectada por un deslizamiento", d: "Un evento natural pudo destruir o desplazar viviendas en un sector del distrito.", matriz: "" },
  ],

  // ---------- Una palabra ----------
  PALABRA: {
    inicio: "En una palabra: ¿con qué expectativa llegás al taller?",
    cierre: "En una palabra: ¿cómo te vas del taller?",
  },
};
