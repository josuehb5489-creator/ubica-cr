// Funciones compartidas por las tres actividades del taller.
(function(){
  const T = window.TALLER;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ls = {get(k){try{return localStorage.getItem(k);}catch(e){return null;}}, set(k,v){try{localStorage.setItem(k,v);}catch(e){}}};

  // Identificador anónimo de cada participante: permite cambiar la respuesta sin contarla dos veces.
  let pid = ls.get('taller-pid');
  if(!pid){pid = Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4); ls.set('taller-pid', pid);}
  const demo = !T.SCRIPT_URL;

  function header(actividad){
    const vista = location.hash === '#facilitador' ? 'fac' : 'part';
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="inst"><span>INEC</span><span>Unidad de Cartografía</span><span>${esc(T.SUBTITULO)}</span></div>
      <header>
        <div class="brand"><a href="index.html">${esc(T.TITULO)}</a>${actividad?`<small>${esc(actividad)}</small>`:''}</div>
        ${actividad&&vista==='fac'?`<div class="modes" role="group" aria-label="Vista">
          <button id="vPart" aria-pressed="${vista==='part'}">Participante</button>
          <button id="vFac" aria-pressed="${vista==='fac'}">Facilitador</button></div>`:''}
      </header>`);
    const vp=document.getElementById('vPart'),vf=document.getElementById('vFac');
    if(vp){vp.onclick=()=>{location.hash='';location.reload();};vf.onclick=()=>{location.hash='facilitador';location.reload();};}
    return vista;
  }

  // ---------- proceso del participante (opcional) ----------
  const getProceso = () => ls.get('taller-proceso') || '';
  function procesoHTML(){
    const p=getProceso();
    return `<div class="field"><label for="selProc">Tu proceso (opcional)</label>
      <select id="selProc"><option value="">Prefiero no indicarlo</option>${T.PROCESOS.map(x=>`<option ${x===p?'selected':''}>${esc(x)}</option>`).join('')}</select></div>`;
  }
  function bindProceso(){const s=document.getElementById('selProc');if(s)s.onchange=()=>ls.set('taller-proceso',s.value);}

  // ---------- envío y lectura ----------
  // actividad: 'orden' | 'voto' | 'palabra'; campos: lista de valores para las columnas de esa pestaña
  async function enviar(actividad, campos){
    const fila={ts:new Date().toISOString(), sesion:T.SESION, pid, proceso:getProceso(), campos};
    if(demo){const k='taller-demo-'+actividad;let a=[];try{a=JSON.parse(ls.get(k)||'[]');}catch(e){}a.push(fila);ls.set(k,JSON.stringify(a));return {ok:true,demo:true};}
    const res=await fetch(T.SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify({accion:'enviar',actividad,sesion:T.SESION,pid,proceso:getProceso(),campos})});
    return res.json();
  }
  // Devuelve filas {ts, pid, proceso, campos[]}
  async function leer(actividad){
    if(demo){let a=[];try{a=JSON.parse(ls.get('taller-demo-'+actividad)||'[]');}catch(e){}return a;}
    const res=await fetch(`${T.SCRIPT_URL}?accion=resultados&actividad=${actividad}&sesion=${encodeURIComponent(T.SESION)}`);
    const j=await res.json();if(!j.ok)throw new Error(j.mensaje||'Error al leer la hoja');return j.filas;
  }
  // Quedarse con la última respuesta de cada participante (y clave adicional, como el caso o el momento)
  function ultimas(filas, claveExtra){
    const m=new Map();filas.forEach(f=>{const k=f.pid+'|'+(claveExtra?claveExtra(f):'');const prev=m.get(k);if(!prev||prev.ts<=f.ts)m.set(k,f);});
    return [...m.values()];
  }
  // Refresco periódico para la vista del facilitador
  function enVivo(fn, ms){let t=null;const run=async()=>{try{await fn();}catch(e){console.warn(e);}t=setTimeout(run,ms||5000);};run();return ()=>clearTimeout(t);}

  const seeded = s => {let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return ()=>{h=Math.imul(h^(h>>>15),2246822507)>>>0;h=Math.imul(h^(h>>>13),3266489909)>>>0;return ((h^(h>>>16))>>>0)/4294967296;};};

  window.TL = {T, esc, ls, pid, demo, header, procesoHTML, bindProceso, enviar, leer, ultimas, enVivo, seeded};
})();
