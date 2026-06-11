import { supabase } from './supabase.js';
import './style.css';

// ===== LOGO EN BASE64 =====
var LOGO = 'data:image/jpeg;base64,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';

// ===== INICIALIZACIÓN DE FECHAS Y TICKER =====
function runInit() {
  ['logoLogin','logoPost','logoAdmin'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.src = LOGO;
  });
  initApp();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  runInit();
} else {
  window.addEventListener('DOMContentLoaded', runInit);
}

async function initApp() {
  // Configurar Fecha local
  var d = new Date();
  var dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var db = document.getElementById('dateBox');
  if (db) {
    db.innerHTML = '📅 <b>' + d.getDate() + ' de ' + meses[d.getMonth()] + ' de ' + d.getFullYear() + '</b><br><span style="color:#5a7068">' + dias[d.getDay()] + '</span>';
  }
  
  setInterval(tickTime, 30000);
  tickTime();

  // === EVENTOS LOGIN ===
  document.getElementById('loginType').addEventListener('change', onTypeChange);
  document.getElementById('btnLogin').addEventListener('click', doLogin);
  document.getElementById('btnSwitchAdm').addEventListener('click', function() {
    document.getElementById('loginType').value = 'adm';
    onTypeChange();
  });
  document.getElementById('cedula').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
  });

  // === EVENTOS POSTULANTE ===
  document.getElementById('btnCerrar').addEventListener('click', cerrarSesion);
  document.getElementById('btnEnviar').addEventListener('click', enviarPostulacion);
  document.getElementById('btnLimpiar').addEventListener('click', limpiarForm);

  // === EVENTOS POSTULANTE WIZARD ===
  document.getElementById('btnNextStep_1').addEventListener('click', function() { handlePostStepNext(1); });
  document.getElementById('btnPrevStep_2').addEventListener('click', function() { goToPostStep(1); });
  document.getElementById('btnNextStep_2').addEventListener('click', function() { handlePostStepNext(2); });
  document.getElementById('btnPrevStep_3').addEventListener('click', function() { goToPostStep(2); });
  document.getElementById('btnNextStep_3').addEventListener('click', function() { handlePostStepNext(3); });
  document.getElementById('btnPrevStep_4').addEventListener('click', function() { goToPostStep(3); });

  // === EVENTOS ADMIN - CONVOCATORIAS ===
  document.getElementById('btnNuevaConv').addEventListener('click', abrirModal);
  document.getElementById('btnCloseModal').addEventListener('click', cerrarModal);
  document.getElementById('btnBorrador').addEventListener('click', function() { guardarConv('Borrador'); });
  document.getElementById('btnPublicar').addEventListener('click', function() { guardarConv('Publicada'); });
  document.getElementById('modalConv').addEventListener('click', function(e) {
    if (e.target === this) cerrarModal();
  });

  // === FILTROS TRAZABILIDAD ===
  document.querySelectorAll('.tfbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Remover clase en el grupo correspondiente
      var parent = this.parentNode;
      parent.querySelectorAll('.tfbtn').forEach(function(b) { b.classList.remove('on'); });
      this.classList.add('on');
      
      var filterVal = this.getAttribute('data-filter');
      var cfilterVal = this.getAttribute('data-cfilter');
      
      if (filterVal) {
        currentFilter = filterVal;
        renderCandidatos();
      } else if (cfilterVal) {
        currentCFilter = cfilterVal;
        renderConvFull();
      }
    });
  });

  document.getElementById('searchBox').addEventListener('input', function() {
    currentSearch = this.value.toLowerCase();
    renderCandidatos();
  });

  document.getElementById('searchConv').addEventListener('input', function() {
    currentCSearch = this.value.toLowerCase();
    renderConvFull();
  });

  // Logout Admin
  document.getElementById('btnLogoutAdmin').addEventListener('click', async function() {
    if (await showConfirm('¿Deseas cerrar la sesión de administrador?', 'Cerrar sesión', 'question')) {
      localStorage.removeItem('ises_last_sec');
      await supabase.auth.signOut();
      show('pgLogin');
      goSection('navDash');
      limpiarLogin();
    }
  });

  // === NAVEGACIÓN ADMIN ===
  var navBtns = {
    navDash: 'secDash', navConv: 'secConv', navPost: 'secPost',
    navEval: 'secEval', navRep: 'secRep', navUsr: 'secUsr', navCfg: 'secCfg'
  };
  Object.keys(navBtns).forEach(function(btnId) {
    var el = document.getElementById(btnId);
    if (el) {
      el.addEventListener('click', function() { goSection(btnId); });
    }
  });

  // Accesos rápidos desde las tarjetas de métricas del Dashboard
  document.getElementById('lkConv').addEventListener('click', function() { goSection('navConv'); });
  document.getElementById('lkPost').addEventListener('click', function() { goSection('navPost'); });
  document.getElementById('lkEval').addEventListener('click', function() { goSection('navEval'); });
  document.getElementById('lkRep').addEventListener('click', function() { goSection('navRep'); });

  // === SECCIÓN ADMINISTRACIÓN DE USUARIOS ===
  document.getElementById('btnNuevoUsr').addEventListener('click', function() {
    document.getElementById('formNuevoUsr').classList.remove('hidden');
  });
  document.getElementById('btnCancelarUsr').addEventListener('click', function() {
    document.getElementById('formNuevoUsr').classList.add('hidden');
  });
  document.getElementById('btnGuardarUsr').addEventListener('click', guardarUsuario);

  // Configuración
  document.getElementById('btnGuardarCfg').addEventListener('click', function() {
    showToast('💾 Configuración guardada en la base de datos'); 
  });

  // Botón nueva conv en barra de Convocatorias
  document.getElementById('btnNuevaConv2').addEventListener('click', abrirModal);

  // === EVENTOS MODALES NUEVOS ===
  document.getElementById('btnCloseEstado').addEventListener('click', cerrarModalEstado);
  document.getElementById('btnCancelarEstado').addEventListener('click', cerrarModalEstado);
  document.getElementById('btnGuardarEstado').addEventListener('click', guardarEstadoPendiente);
  document.getElementById('btnCloseDet').addEventListener('click', cerrarDetalle);

  // === EVENTOS COLLAPSIBLE SIDEBAR ===
  var togglePostBtn = document.getElementById('btnTogglePost');
  if (togglePostBtn) {
    togglePostBtn.addEventListener('click', toggleSidebar);
  }
  var toggleAdminBtn = document.getElementById('btnToggleAdmin');
  if (toggleAdminBtn) {
    toggleAdminBtn.addEventListener('click', toggleSidebar);
  }

  // Render inicial de convocatorias en el formulario del postulante
  await renderVacantesPost();

  // === RESTAURACIÓN DE SESIÓN (PERSISTENCIA AL RECARGAR) ===
  try {
    // 1. Verificar si hay sesión de Administrador activa en Supabase Auth
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Obtener el perfil del usuario activo
      let { data: profileData, error: profileErr } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.user.id)
        .eq('estado', 'Activo')
        .limit(1);

      if (!profileErr && profileData && profileData.length > 0) {
        var adminUsr = profileData[0];
        show('pgAdmin');
        
        // Cargar datos del administrador en el sidebar/topbar
        var unameEl = document.querySelector('#pgAdmin .uname');
        if (unameEl) unameEl.textContent = adminUsr.nombre || adminUsr.usuario;
        
        var avaEl = document.querySelector('#pgAdmin .ava');
        if (avaEl) avaEl.textContent = (adminUsr.nombre || adminUsr.usuario).substring(0, 2).toUpperCase();
        
        var sbnameEl = document.querySelector('#pgAdmin .sbuname');
        if (sbnameEl) sbnameEl.textContent = adminUsr.nombre || adminUsr.usuario;
        
        var sbroleEl = document.querySelector('#pgAdmin .sbrole');
        if (sbroleEl) sbroleEl.textContent = adminUsr.rol || 'Administrador';

        // Restaurar la última sección visitada o abrir Dashboard por defecto
        var lastSec = localStorage.getItem('ises_last_sec') || 'navDash';
        await goSection(lastSec);
        return;
      }
    }

    // 2. Si no hay admin, verificar si hay postulante activo guardado en sessionStorage
    var savedCed = sessionStorage.getItem('ises_post_ced');
    if (savedCed) {
      show('pgPost');
      document.getElementById('cedDisplay').textContent = savedCed;
      document.getElementById('fDoc').value = savedCed;
      
      // Importar datos de postulaciones previas
      try {
        let { data } = await supabase
          .from('postulaciones')
          .select('*')
          .eq('documento', savedCed)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (data && data.length > 0) {
          var pre = data[0];
          document.getElementById('fNombre').value = pre.nombre || '';
          document.getElementById('fCiudad').value = pre.ciudad || '';
          document.getElementById('fTel').value = pre.telefono || '';
          document.getElementById('fEmail').value = pre.correo || '';
          document.getElementById('fPerfil').value = pre.perfil || 'Bachiller';
          document.getElementById('fProf').value = pre.profesion || '';
          document.getElementById('fExp').value = pre.experiencia || '';
          document.getElementById('fArea').value = pre.area || 'Administrativa';
          document.getElementById('fCert').value = pre.certificado || 'No';
          document.getElementById('fAjustes').value = pre.ajustes || '';
        }
      } catch (e) {
        console.warn('Error al restaurar perfil del postulante:', e);
      }
      
      goToPostStep(1);
    }
  } catch (err) {
    console.error('Error al restaurar sesión activa:', err);
  }
}

// ===== TIEMPO =====
function tickTime() {
  var el = document.getElementById('lastUpd');
  if (el) el.textContent = 'Actualizado: ' + new Date().toLocaleTimeString('es-CO');
}

// ===== PETICIONES API SUPABASE =====
async function getConvs() {
  try {
    let { data, error } = await supabase
      .from('convocatorias')
      .select('*')
      .order('creada_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error al obtener convocatorias:', err);
    showToast('❌ Error al obtener convocatorias');
    return [];
  }
}

async function getCands() {
  try {
    let { data, error } = await supabase
      .from('postulaciones')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error al obtener postulantes:', err);
    showToast('❌ Error al obtener postulantes');
    return [];
  }
}

async function getUsuarios() {
  try {
    let { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('usuario', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    return [];
  }
}

// ===== VACANTES EN POSTULACIONES =====
var vacSeleccionada = null;
var currentPostStep = 1;

function goToPostStep(step) {
  if (step < 1 || step > 4) return;
  currentPostStep = step;
  
  // Mostrar/ocultar los bloques de pasos
  for (var i = 1; i <= 4; i++) {
    var el = document.getElementById('stepContent_' + i);
    if (el) {
      if (i === step) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  }
  
  // Actualizar el indicador de pasos (.step-circle y .step-line)
  document.querySelectorAll('#postStepIndicator [data-poststep]').forEach(function(circle) {
    var s = circle.getAttribute('data-poststep');
    circle.classList.toggle('active', s === String(step));
    circle.classList.toggle('done', parseInt(s) < step);
  });
  
  document.querySelectorAll('#postStepIndicator [data-postline]').forEach(function(line) {
    var l = line.getAttribute('data-postline');
    line.classList.toggle('done', parseInt(l) < step);
  });
  
  // Scroll suave al inicio del formulario
  var container = document.querySelector('#pgPost .fcnt');
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function handlePostStepNext(fromStep) {
  if (fromStep === 1) {
    if (!vacSeleccionada) {
      document.getElementById('vacWarn').classList.remove('hidden');
      document.getElementById('stepContent_1').querySelector('.vac-panel').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById('vacWarn').classList.add('hidden');
    goToPostStep(2);
  } else if (fromStep === 2) {
    var nom = document.getElementById('fNombre').value.trim();
    var doc = document.getElementById('fDoc').value.trim();
    var email = document.getElementById('fEmail').value.trim();
    
    if (!nom || !doc || !email) {
      showToast('Completa los campos obligatorios (*): nombre, documento y correo electrónico.', 'warning');
      return;
    }
    // Validar correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Ingresa un correo electrónico válido.', 'warning');
      return;
    }
    goToPostStep(3);
  } else if (fromStep === 3) {
    goToPostStep(4);
  }
}

async function renderVacantesPost() {
  var allConvs = await getConvs();
  var activeConvs = allConvs.filter(function(c) { return c.estado === 'Publicada'; });
  var grid = document.getElementById('vacGrid');
  var contador = document.getElementById('vacContador');
  if (!grid) return;

  vacSeleccionada = null;
  document.getElementById('fConvId').value = '';
  document.getElementById('fConvNombre').value = '';

  if (contador) {
    contador.textContent = activeConvs.length + ' vacante' + (activeConvs.length !== 1 ? 's' : '') + ' disponible' + (activeConvs.length !== 1 ? 's' : '');
  }

  if (activeConvs.length === 0) {
    grid.innerHTML = '<div class="vac-empty">📭 No hay convocatorias activas en este momento.<br><span style="font-size:12px;margin-top:6px;display:block">Vuelve pronto o contáctanos para más información.</span></div>';
    return;
  }

  var NCLS_TAG = { Bachiller:'', Técnico:'y', Tecnólogo:'b', Profesional:'p', Universitario:'p' };

  grid.innerHTML = activeConvs.map(function(c) {
    var hoy = new Date();
    var cierre = new Date(c.cierre + 'T23:59:59');
    var diff = Math.ceil((cierre - hoy) / (1000*60*60*24));
    var urgente = diff >= 0 && diff <= 3;
    var nTag = NCLS_TAG[c.nivel] || '';
    return '<div class="vac-card" data-id="' + c.id + '" data-cargo="' + c.cargo + '" data-area="' + (c.area||'') + '">'
      + '<div class="vac-cargo">' + c.cargo + '</div>'
      + '<div class="vac-tags">'
      + '<span class="vac-tag ' + nTag + '">' + c.nivel + '</span>'
      + '<span class="vac-tag b">' + c.modalidad + '</span>'
      + (urgente ? '<span class="vac-tag" style="background:#ffecec;color:#c0392b;border-color:#f5a5a5">⚡ Cierra pronto</span>' : '')
      + '</div>'
      + '<div class="vac-meta">'
      + '📍 Área: <span>' + (c.area||'—') + '</span><br>'
      + '👥 Vacantes: <span>' + c.vacantes + '</span><br>'
      + '📅 Cierre: <span>' + fmtDate(c.cierre) + '</span>'
      + (c.desc ? '<br><span style="display:block;margin-top:6px;font-style:italic;font-size:11px;color:#7a9068">' + c.desc.substring(0, 90) + (c.desc.length > 90 ? '…' : '') + '</span>' : '')
      + '</div>'
      + '</div>';
  }).join('');

  grid.querySelectorAll('.vac-card').forEach(function(card) {
    card.addEventListener('click', function() {
      grid.querySelectorAll('.vac-card').forEach(function(c) { c.classList.remove('selected'); });
      this.classList.add('selected');
      vacSeleccionada = parseInt(this.getAttribute('data-id'));
      document.getElementById('fConvId').value = vacSeleccionada;
      document.getElementById('fConvNombre').value = this.getAttribute('data-cargo');
      var area = this.getAttribute('data-area');
      var sel = document.getElementById('fArea');
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text === area) { sel.selectedIndex = i; break; }
      }
      document.getElementById('vacWarn').classList.add('hidden');
    });
  });
}

// ===== LOGIN =====
var currentFilter = 'todos';
var currentSearch = '';

function limpiarLogin() {
  ['cedula', 'admUser', 'admPass'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function onTypeChange() {
  limpiarLogin();
  var t = document.getElementById('loginType').value;
  document.getElementById('postAccess').classList.toggle('hidden', t !== 'post');
  document.getElementById('admAccess').classList.toggle('hidden', t !== 'adm');
  var btn = document.getElementById('btnLogin');
  if (t === 'adm') {
    btn.innerHTML = '<span>INGRESAR COMO<br><b>ADMINISTRADOR</b><small>Acceso seguro para gestión del sistema.</small></span><span style="font-size:24px">→</span>';
    btn.style.background = 'linear-gradient(135deg,#0d4a7a,#1a3a5a)';
  } else {
    btn.innerHTML = '<span>INGRESAR COMO<br><b>POSTULANTE</b><small>Ingresa con tu número de cédula.</small></span><span style="font-size:24px">→</span>';
    btn.style.background = '';
  }
}

async function doLogin() {
  var t = document.getElementById('loginType').value;
  if (t === 'post') {
    var ced = document.getElementById('cedula').value.trim();
    if (!ced) { showToast('Ingrese su número de cédula.', 'warning'); return; }
    sessionStorage.setItem('ises_post_ced', ced);
    show('pgPost');
    limpiarLogin();
    document.getElementById('cedDisplay').textContent = ced;
    document.getElementById('fDoc').value = ced;
    goToPostStep(1);
    
    // Cargar datos del candidato si ya se postuló antes
    try {
      let { data, error } = await supabase
        .from('postulaciones')
        .select('*')
        .eq('documento', ced)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (data && data.length > 0) {
        var pre = data[0];
        document.getElementById('fNombre').value = pre.nombre || '';
        document.getElementById('fCiudad').value = pre.ciudad || '';
        document.getElementById('fTel').value = pre.telefono || '';
        document.getElementById('fEmail').value = pre.correo || '';
        document.getElementById('fPerfil').value = pre.perfil || 'Bachiller';
        document.getElementById('fProf').value = pre.profesion || '';
        document.getElementById('fExp').value = pre.experiencia || '';
        document.getElementById('fArea').value = pre.area || 'Administrativa';
        document.getElementById('fCert').value = pre.certificado || 'No';
        document.getElementById('fAjustes').value = pre.ajustes || '';
        showToast('👤 Datos del perfil importados de tu última postulación');
      }
    } catch (err) {
      console.warn('Error al verificar cédula previa:', err);
    }
    
    await renderVacantesPost();
  } else {
    var u = document.getElementById('admUser').value.trim();
    var p = document.getElementById('admPass').value.trim();
    
    try {
      var emailToAuth = u;
      if (!u.includes('@')) {
        // Buscar el correo a partir del nombre de usuario
        let { data: usrData, error: usrErr } = await supabase
          .from('usuarios')
          .select('correo')
          .eq('usuario', u)
          .limit(1);
        
        if (usrErr) throw usrErr;
        
        if (usrData && usrData.length > 0) {
          emailToAuth = usrData[0].correo;
        } else {
          showToast('Usuario, contraseña incorrectos o cuenta inactiva.', 'error');
          return;
        }
      }
      
      // Autenticar con Supabase Auth
      let { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: emailToAuth,
        password: p
      });
      
      if (authErr) {
        showToast('Usuario, contraseña incorrectos o cuenta inactiva.', 'error');
        return;
      }
      
      // Verificar perfil en tabla usuarios (y su estado)
      let { data: profileData, error: profileErr } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .eq('estado', 'Activo')
        .limit(1);
        
      if (profileErr || !profileData || profileData.length === 0) {
        await supabase.auth.signOut();
        showToast('Usuario, contraseña incorrectos o cuenta inactiva.', 'error');
        return;
      }
      
      show('pgAdmin');
      limpiarLogin();
      
      // Actualizar último acceso del administrador
      await supabase
        .from('usuarios')
        .update({ ultimo_acceso: new Date().toLocaleString('es-CO') })
        .eq('id', authData.user.id);
          
      await renderCandidatos();
      await renderConvocatorias();
    } catch (err) {
      console.error('Error de login admin:', err);
      showToast('Error de conexión al autenticar.', 'error');
    }
  }
}

function cerrarSesion() {
  sessionStorage.removeItem('ises_post_ced');
  show('pgLogin');
  limpiarLogin();
}

function show(id) {
  ['pgLogin','pgPost','pgAdmin'].forEach(function(pg) {
    document.getElementById(pg).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// ===== NAVEGACIÓN =====
var SECCIONES = ['secDash','secConv','secPost','secEval','secRep','secUsr','secCfg'];
var navTitlesMap = { secDash:'Dashboard',secConv:'Convocatorias',secPost:'Postulaciones',secEval:'Evaluaciones',secRep:'Reportes',secUsr:'Usuarios',secCfg:'Configuración' };

async function goSection(navId) {
  var secId = { navDash:'secDash',navConv:'secConv',navPost:'secPost',navEval:'secEval',navRep:'secRep',navUsr:'secUsr',navCfg:'secCfg' }[navId];
  SECCIONES.forEach(function(s) { 
    var el = document.getElementById(s); 
    if(el) el.classList.add('hidden'); 
  });
  
  var sec = document.getElementById(secId);
  if (sec) sec.classList.remove('hidden');
  
  document.querySelectorAll('.nav button').forEach(function(b) { b.classList.remove('on'); });
  var btn = document.getElementById(navId);
  if (btn) btn.classList.add('on');
  
  document.getElementById('topTitle').textContent = navTitlesMap[secId] || '';
  
  // Guardar la pestaña activa en localStorage
  localStorage.setItem('ises_last_sec', navId);

  // Renderizar la sección específica de forma asíncrona
  if (secId === 'secDash') {
    await renderCandidatos();
    await renderConvocatorias();
  }
  if (secId === 'secConv') await renderConvFull();
  if (secId === 'secPost') await renderCandidatos();
  if (secId === 'secEval') await renderEval();
  if (secId === 'secRep') await renderReportes();
  if (secId === 'secUsr') await renderUsuarios();
}

// ===== CONVOCATORIAS FULL =====
var currentCFilter = 'todas';
var currentCSearch = '';

async function renderConvFull() {
  var data = await getConvs();
  var filtered = data.filter(function(c) {
    var mf = currentCFilter === 'todas' || c.estado === currentCFilter;
    var ms = !currentCSearch || c.cargo.toLowerCase().indexOf(currentCSearch) >= 0;
    return mf && ms;
  });
  var tb = document.getElementById('tbConvFull');
  if (!tb) return;
  if (filtered.length === 0) {
    tb.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:28px;color:#aaa;font-size:13px">📭 Sin convocatorias que coincidan con el filtro.</td></tr>';
    return;
  }
  var NCLS_TAG = { Bachiller:'', Técnico:'y', Tecnólogo:'b', Profesional:'p', Universitario:'p' };
  tb.innerHTML = filtered.map(function(c) {
    var e = eInfo(ECONV, c.estado);
    var nc = NCLS_TAG[c.nivel] || '';
    return '<tr>'
      + '<td><b>' + c.cargo + '</b><br><span style="font-size:11px;color:#5a7068">' + (c.desc ? c.desc.substring(0,50)+'…' : '—') + '</span></td>'
      + '<td><span class="badge ' + nc + ' nocursor">' + c.nivel + '</span></td>'
      + '<td>' + (c.area||'—') + '</td>'
      + '<td>' + c.modalidad + '</td>'
      + '<td style="text-align:center;font-weight:700">' + c.vacantes + '</td>'
      + '<td>' + fmtDate(c.cierre) + '</td>'
      + '<td><div class="bw" data-id="' + c.id + '" data-type="conv"><span class="badge ' + e.c + '">' + e.i + ' ' + e.k + '</span></div></td>'
      + '<td><button class="actbtn del" data-del="' + c.id + '">🗑</button></td>'
      + '</tr>';
  }).join('');
  bindConvRows(tb);
}

// ===== EVALUACIONES =====
var ETAPAS_EVAL = ['En revisión', 'Entrevista', 'Prueba técnica'];

async function renderEval() {
  var allCands = await getCands();
  var cands = allCands.filter(function(c) { return ETAPAS_EVAL.indexOf(c.estado) >= 0; });
  
  var r = cands.filter(function(c){return c.estado==='En revisión';}).length;
  var e = cands.filter(function(c){return c.estado==='Entrevista';}).length;
  var p = cands.filter(function(c){return c.estado==='Prueba técnica';}).length;
  
  var er = document.getElementById('eRevision'); if(er) er.textContent=r;
  var ee = document.getElementById('eEntrevista'); if(ee) ee.textContent=e;
  var ep = document.getElementById('ePrueba'); if(ep) ep.textContent=p;
  
  var tb = document.getElementById('tbEval');
  if (!tb) return;
  if (cands.length === 0) {
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;color:#aaa;font-size:13px">📭 No hay candidatos en evaluación actualmente.<br><span style="font-size:11px">Los candidatos aparecerán aquí cuando estén en estado: En revisión, Entrevista o Prueba técnica.</span></td></tr>';
    return;
  }
  
  tb.innerHTML = cands.map(function(c) {
    var e = eInfo(EPOST, c.estado);
    var desde = c.updated_at || c.created_at || '—';
    return '<tr>'
      + '<td><b>' + c.nombre + '</b><br><span style="font-size:11px;color:#5a7068">' + c.correo + '</span></td>'
      + '<td style="font-size:12px">' + (c.convocatoria_nombre||c.area||'—') + '</td>'
      + '<td>' + c.perfil + '</td>'
      + '<td><div class="bw" data-id="' + c.id + '" data-type="cand"><span class="badge ' + e.c + '">' + e.i + ' ' + c.estado + '</span></div></td>'
      + '<td style="font-size:11px;color:#5a7068">' + new Date(desde).toLocaleString('es-CO') + '</td>'
      + '<td><button class="actbtn" data-avanzar="' + c.id + '" style="font-size:11px">▶ Avanzar</button><button class="actbtn del" data-rechazar="' + c.id + '" style="font-size:11px">✕ No sel.</button></td>'
      + '</tr>';
  }).join('');
  
  // Bind dropdowns y botones de acción
  tb.querySelectorAll('.bw[data-type="cand"]').forEach(function(wrap) {
    wrap.addEventListener('click', function(e) {
      e.stopPropagation();
      var id = parseInt(this.getAttribute('data-id'));
      openDropdown(this, EPOST, eInfo(EPOST, cands.find(c => c.id === id).estado).k, async function(nuevoEstado) {
        await cambiarEstadoCand(id, nuevoEstado);
        await renderEval();
      });
    });
  });
  
  tb.querySelectorAll('[data-avanzar]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      var id = parseInt(this.getAttribute('data-avanzar'));
      var cand = cands.find(c => c.id === id);
      if (!cand) return;
      var idx = ETAPAS_EVAL.indexOf(cand.estado);
      var next = idx < ETAPAS_EVAL.length - 1 ? ETAPAS_EVAL[idx + 1] : 'Aprobado';
      await cambiarEstadoCand(id, next); 
      await renderEval(); 
    });
  });
  
  tb.querySelectorAll('[data-rechazar]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      var id = parseInt(this.getAttribute('data-rechazar'));
      await cambiarEstadoCand(id, 'No seleccionado'); 
      await renderEval(); 
    });
  });
}

// ===== REPORTES =====
async function renderReportes() {
  var cands = await getCands();
  var convs = await getConvs();
  
  var rc = document.getElementById('rConv'); if(rc) rc.textContent=convs.length;
  var rt = document.getElementById('rTotal'); if(rt) rt.textContent=cands.length;
  var rp = document.getElementById('rProc'); if(rp) rp.textContent=cands.filter(function(c){return ETAPAS_EVAL.indexOf(c.estado)>=0;}).length;
  var ra = document.getElementById('rAprobados'); if(ra) ra.textContent=cands.filter(function(c){return c.estado==='Aprobado';}).length;

  // Por estado
  var tbE = document.getElementById('tbRepEstados');
  if (tbE) {
    var estadosCnt = {};
    EPOST.forEach(function(e) { estadosCnt[e.k] = 0; });
    cands.forEach(function(c) { if(estadosCnt[c.estado]!==undefined) estadosCnt[c.estado]++; });
    var total = cands.length || 1;
    tbE.innerHTML = EPOST.map(function(e) {
      var n = estadosCnt[e.k]||0;
      return n > 0 ? '<tr><td><span class="badge ' + e.c + ' nocursor">' + e.i + ' ' + e.k + '</span></td><td style="font-weight:700">' + n + '</td><td>' + Math.round(n/total*100) + '%</td></tr>' : '';
    }).join('') || '<tr><td colspan="3" style="color:#aaa;padding:16px;text-align:center">Sin datos</td></tr>';
  }

  // Por convocatoria
  var tbC = document.getElementById('tbRepConvs');
  if (tbC) {
    if (convs.length === 0) {
      tbC.innerHTML = '<tr><td colspan="3" style="color:#aaa;padding:16px;text-align:center">Sin convocatorias</td></tr>';
    } else {
      tbC.innerHTML = convs.map(function(cv) {
        var postulantes = cands.filter(function(c){return c.convocatoria_id===cv.id;}).length;
        var aprobados = cands.filter(function(c){return c.convocatoria_id===cv.id && c.estado==='Aprobado';}).length;
        return '<tr><td><b>' + cv.cargo + '</b></td><td style="font-weight:700;text-align:center">' + postulantes + '</td><td style="text-align:center"><span class="badge green nocursor">' + aprobados + '</span></td></tr>';
      }).join('');
    }
  }

  // Donut reporte
  renderDonutGen('donutRep','donutRepN','donutRepLeg', cands);
}

function renderDonutGen(svgId, numId, legId, data) {
  var dn = document.getElementById(numId); if (dn) dn.textContent = data.length;
  var leg = document.getElementById(legId);
  var svg = document.getElementById(svgId);
  if (!leg||!svg) return;
  svg.querySelectorAll('.darc').forEach(function(el){el.remove();});
  if (data.length===0){leg.innerHTML='<div style="font-size:12px;color:#aaa">Sin datos</div>';return;}
  
  var COLS=['#3aaa5b','#1a6fb5','#e8b500','#a77ade','#e87000'];
  var NIVS=['Bachiller','Técnico','Tecnólogo','Profesional','Universitario'];
  
  var cnt={}; NIVS.forEach(function(n){cnt[n]=0;});
  data.forEach(function(c){if(cnt[c.perfil]!==undefined)cnt[c.perfil]++;});
  var total=data.length, circ=2*Math.PI*50, off=0, lh='';
  var ref=svg.querySelector('circle');
  
  NIVS.forEach(function(niv,i){
    var n=cnt[niv]; if(!n)return;
    var pct=n/total;
    var arc=document.createElementNS('http://www.w3.org/2000/svg','circle');
    arc.setAttribute('cx','60');arc.setAttribute('cy','60');arc.setAttribute('r','50');
    arc.setAttribute('fill','none');arc.setAttribute('stroke',COLS[i]);arc.setAttribute('stroke-width','20');
    arc.setAttribute('stroke-dasharray',(pct*circ)+' '+(circ-pct*circ));
    arc.setAttribute('stroke-dashoffset',-(off*circ)+'');
    arc.setAttribute('transform','rotate(-90 60 60)');
    arc.classList.add('darc');
    svg.insertBefore(arc,ref.nextSibling);
    lh+='<div class="legitem"><div class="legdot" style="background:'+COLS[i]+'"></div>'+niv+'<span class="legpct">'+Math.round(pct*100)+'% ('+n+')</span></div>';
    off+=pct;
  });
  leg.innerHTML=lh||'<div style="font-size:12px;color:#aaa">Sin datos</div>';
}

// ===== GESTIÓN DE USUARIOS =====
async function renderUsuarios() {
  var data = await getUsuarios();
  var tb = document.getElementById('tbUsuarios');
  if (!tb) return;
  tb.innerHTML = data.map(function(u, i) {
    var cls = u.estado==='Activo' ? 'green' : 'gray';
    return '<tr>'
      + '<td><b>' + u.usuario + '</b><br><span style="font-size:11px;color:#5a7068">✉️ ' + (u.correo||'—') + '</span></td>'
      + '<td>' + u.nombre + '</td>'
      + '<td><span class="badge blue nocursor">' + u.rol + '</span></td>'
      + '<td style="font-size:12px;color:#5a7068">' + (u.ultimo_acceso||'—') + '</td>'
      + '<td><span class="badge ' + cls + ' nocursor">' + u.estado + '</span></td>'
      + '<td>' + (u.usuario !== 'admin' 
        ? '<button class="actbtn sec" data-toggleusr="' + u.usuario + '">' + (u.estado === 'Activo' ? '⏸ Desact.' : '▶ Activar') + '</button> <button class="actbtn del" data-delusr="' + u.usuario + '">🗑</button>' 
        : '<span style="font-size:11px;color:#aaa">Sistema</span>') + '</td>'
      + '</tr>';
  }).join('');
  
  tb.querySelectorAll('[data-delusr]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      if (await showConfirm('¿Eliminar este usuario?', 'Eliminar usuario', 'danger')) {
        var user = this.getAttribute('data-delusr');
        try {
          let { error } = await supabase.rpc('eliminar_usuario_admin', { user_name: user });
          if (error) throw error;
          showToast('👤 Usuario eliminado');
          await renderUsuarios();
        } catch (err) {
          showToast('No se pudo eliminar el usuario.', 'error');
        }
      }
    });
  });

  tb.querySelectorAll('[data-toggleusr]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      var user = this.getAttribute('data-toggleusr');
      var currentUsr = data.find(u => u.usuario === user);
      if (!currentUsr) return;
      var nextEst = currentUsr.estado === 'Activo' ? 'Inactivo' : 'Activo';
      try {
        let { error } = await supabase.from('usuarios').update({ estado: nextEst }).eq('usuario', user);
        if (error) throw error;
        showToast('👤 Estado de usuario actualizado');
        await renderUsuarios();
      } catch (err) {
        showToast('No se pudo cambiar el estado del usuario.', 'error');
      }
    });
  });
}

async function guardarUsuario() {
  var u = document.getElementById('uUser').value.trim();
  var n = document.getElementById('uNombre').value.trim();
  var email = document.getElementById('uEmail').value.trim();
  var p = document.getElementById('uPass').value.trim();
  var r = document.getElementById('uRol').value;
  if (!u||!n||!p||!email){showToast('Complete todos los campos.', 'warning');return;}
  
  if (!email.toLowerCase().endsWith('@ises.com.co')) {
    showToast('El correo electrónico debe pertenecer al dominio corporativo @ises.com.co', 'warning');
    return;
  }
  
  try {
    let { error } = await supabase.rpc('crear_usuario_admin', {
      email_val: email,
      pass_val: p,
      user_name: u,
      full_name: n,
      user_rol: r
    });
    
    if (error) throw error;
    
    ['uUser','uNombre','uEmail','uPass'].forEach(function(id){document.getElementById(id).value='';});
    document.getElementById('formNuevoUsr').classList.add('hidden');
    await renderUsuarios();
    showToast('👤 Usuario creado correctamente');
  } catch (err) {
    showToast('Error al registrar usuario (puede que el nombre de usuario ya exista o el correo ya esté registrado).', 'error');
  }
}

// ===== ESTADOS CONFIG =====
var EPOST = [
  { k:'Pendiente', c:'gray', i:'⏳' },
  { k:'Recibida', c:'blue', i:'📥' },
  { k:'En revisión', c:'yellow', i:'🔍' },
  { k:'Entrevista', c:'orange', i:'🗣' },
  { k:'Prueba técnica', c:'purple', i:'📝' },
  { k:'Aprobado', c:'green', i:'✅' },
  { k:'No seleccionado', c:'red', i:'❌' },
  { k:'En espera', c:'teal', i:'⏸' }
];
var ECONV = [
  { k:'Publicada', c:'green', i:'🟢' },
  { k:'Borrador', c:'gray', i:'📝' },
  { k:'Pausada', c:'yellow', i:'⏸' },
  { k:'Cerrada', c:'red', i:'🔴' },
  { k:'Finalizada', c:'blue', i:'✅' }
];
var NCLS = { Bachiller:'green', Técnico:'yellow', Tecnólogo:'blue', Profesional:'purple', Universitario:'purple' };
var TL_STEPS = ['Recibida','En revisión','Entrevista','Prueba técnica','Aprobado'];
var DOT_COLORS = { green:'#3aaa5b', blue:'#1a6fb5', yellow:'#e8b500', orange:'#e87000', purple:'#a77ade', gray:'#999', red:'#e84040', teal:'#2aaa90' };

function eInfo(arr, k) {
  for (var i = 0; i < arr.length; i++) { if (arr[i].k === k) return arr[i]; }
  return arr[0];
}

// ===== DROPDOWN DINÁMICO =====
var openDD = null;
document.addEventListener('click', function(e) {
  if (!e.target.closest('.bw')) closeDD();
});
function closeDD() {
  document.querySelectorAll('.sdd').forEach(function(d) { d.remove(); });
  openDD = null;
}

function openDropdown(wrap, arr, current, onSelect) {
  closeDD();
  var dd = document.createElement('div');
  dd.className = 'sdd';
  arr.forEach(function(est) {
    var opt = document.createElement('div');
    opt.className = 'sdopt';
    opt.innerHTML = '<div class="sdot" style="background:' + (DOT_COLORS[est.c] || '#999') + '"></div>' + est.i + ' ' + est.k;
    if (est.k === current) opt.style.background = '#f0f6ff';
    opt.addEventListener('click', function(e) {
      e.stopPropagation();
      onSelect(est.k);
      closeDD();
    });
    dd.appendChild(opt);
  });
  wrap.appendChild(dd);
  openDD = dd;
}

// ===== DESCARGA DE ARCHIVOS DESDE SUPABASE STORAGE =====
function descargarPDF(pdfUrl) {
  if (!pdfUrl) {
    showToast('El archivo no está disponible.', 'warning');
    return;
  }
  // Abre el PDF en una pestaña nueva para lectura o descarga
  window.open(pdfUrl, '_blank');
}

// ===== REGISTRO POSTULANTE =====
async function enviarPostulacion() {
  if (!vacSeleccionada) {
    document.getElementById('vacWarn').classList.remove('hidden');
    document.getElementById('vacGrid').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  if (!document.getElementById('fDatos').checked) {
    showToast('Debe aceptar la autorización de tratamiento de datos.', 'warning');
    return;
  }
  
  var nom = document.getElementById('fNombre').value.trim();
  var doc = document.getElementById('fDoc').value.trim();
  var email = document.getElementById('fEmail').value.trim();
  if (!nom || !doc || !email) {
    showToast('Complete los campos obligatorios: nombre, documento y correo electrónico.', 'warning');
    return;
  }

  // Validar si el candidato ya se postuló a esta misma convocatoria
  try {
    let { data: duplicados, error: dupError } = await supabase
      .from('postulaciones')
      .select('estado')
      .eq('documento', doc)
      .eq('convocatoria_id', vacSeleccionada)
      .limit(1);
    
    if (dupError) throw dupError;
    
    if (duplicados && duplicados.length > 0) {
      showToast('Ya te has postulado a esta vacante. Estado actual: ' + duplicados[0].estado, 'warning');
      return;
    }
  } catch (err) {
    console.error('Error al validar postulación duplicada:', err);
  }

  var f = document.getElementById('fPDF').files[0];
  var candId = Date.now();
  var pdfName = 'No adjunto';
  var pdfUrl = null;

  // Subir archivo PDF a Supabase Storage
  if (f) {
    pdfName = f.name;
    const fileExt = f.name.split('.').pop();
    const fileName = `${doc}_${candId}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      showToast('📤 Subiendo hoja de vida a la nube...');
      let { error: uploadError } = await supabase.storage
        .from('cv_files')
        .upload(filePath, f, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      // Obtener URL pública del archivo subido
      const { data } = supabase.storage
        .from('cv_files')
        .getPublicUrl(filePath);
      
      pdfUrl = data.publicUrl;
    } catch (err) {
      console.error('Error al subir PDF:', err);
      showToast('Error al guardar el archivo PDF. Intenta enviarlo nuevamente.', 'error');
      return;
    }
  }

  var c = {
    id: candId,
    nombre: nom,
    documento: doc,
    ciudad: document.getElementById('fCiudad').value,
    telefono: document.getElementById('fTel').value,
    correo: email,
    perfil: document.getElementById('fPerfil').value,
    profesion: document.getElementById('fProf').value,
    experiencia: document.getElementById('fExp').value,
    area: document.getElementById('fArea').value,
    certificado: document.getElementById('fCert').value,
    ajustes: document.getElementById('fAjustes').value,
    pdf: pdfName,
    pdf_url: pdfUrl,
    tiene_pdf: !!pdfUrl,
    convocatoria_id: vacSeleccionada,
    convocatoria_nombre: document.getElementById('fConvNombre').value,
    estado: 'Pendiente',
    history: [],
    created_at: new Date().toISOString()
  };

  try {
    let { error } = await supabase.from('postulaciones').insert([c]);
    if (error) throw error;
    
    var ban = document.getElementById('okBanner');
    ban.classList.remove('hidden');
    ban.scrollIntoView({ behavior: 'smooth' });
    limpiarForm();
    vacSeleccionada = null;
    
    // Deseleccionar vacantes visualmente
    document.querySelectorAll('.vac-card').forEach(function(c) { c.classList.remove('selected'); });
    
    setTimeout(function() { ban.classList.add('hidden'); }, 6000);
  } catch (err) {
    console.error('Error al insertar postulante:', err);
    showToast('Error de red. Intenta enviar el formulario de nuevo.', 'error');
  }
}

function limpiarForm() {
  ['fNombre','fDoc','fCiudad','fTel','fEmail','fProf','fExp','fAjustes','fConvId','fConvNombre'].forEach(function(id) {
    var el = document.getElementById(id); 
    if (el) el.value = '';
  });
  
  // Reset selects to first option
  ['fPerfil', 'fArea', 'fCert'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });

  // Reset checkbox and file inputs
  var dat = document.getElementById('fDatos');
  if (dat) dat.checked = false;
  
  var pdf = document.getElementById('fPDF');
  if (pdf) pdf.value = '';
  
  var sop = document.getElementById('fSop');
  if (sop) sop.value = '';

  goToPostStep(1);
}

async function cambiarEstadoCand(id, nuevoEstado, obs) {
  var obsStr = obs || '';
  try {
    // Buscar postulante actual para obtener su historial
    let { data: curr, error: fetchErr } = await supabase
      .from('postulaciones')
      .select('estado, history')
      .eq('id', id)
      .limit(1);
    
    if (fetchErr) throw fetchErr;
    
    var history = curr[0].history || [];
    history.push({
      estadoAnterior: curr[0].estado,
      estado: nuevoEstado,
      fecha: new Date().toLocaleString('es-CO'),
      observacion: obsStr,
      usuario: 'Administrador'
    });

    let { error } = await supabase
      .from('postulaciones')
      .update({
        estado: nuevoEstado,
        history: history,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    await renderCandidatos();
    tickTime();
  } catch (err) {
    console.error('Error al actualizar estado candidato:', err);
    showToast('❌ Error al actualizar estado');
  }
}

async function eliminarCand(id) {
  if (await showConfirm('¿Eliminar este registro permanentemente?', 'Eliminar candidato', 'danger')) {
    try {
      // Eliminar el archivo de Supabase Storage primero
      let { data: cand } = await supabase.from('postulaciones').select('pdf_url').eq('id', id).limit(1);
      if (cand && cand.length > 0 && cand[0].pdf_url) {
        // Extraer nombre del archivo del url
        var parts = cand[0].pdf_url.split('/');
        var filename = parts[parts.length - 1];
        await supabase.storage.from('cv_files').remove([filename]);
      }
      
      let { error } = await supabase.from('postulaciones').delete().eq('id', id);
      if (error) throw error;
      showToast('🗑 Registro eliminado');
      await renderCandidatos();
    } catch (err) {
      console.error('Error al eliminar candidato:', err);
      showToast('No se pudo eliminar el candidato.', 'error');
    }
  }
}

function buildTL(cand) {
  var idx = TL_STEPS.indexOf(cand.estado);
  var html = '<div class="tl">';
  TL_STEPS.forEach(function(step, i) {
    var cls = i < idx ? 'done' : i === idx ? 'active' : 'pend';
    html += '<div class="tls"><div class="tldw"><div class="tld ' + cls + '">' + (i < idx ? '✓' : i === idx ? '●' : '○') + '</div><div class="tllbl">' + step.replace(' ', '<br>') + '</div></div>';
    if (i < TL_STEPS.length - 1) html += '<div class="tlln ' + (i < idx ? 'done' : '') + '"></div>';
    html += '</div>';
  });
  return html + '</div>';
}

async function renderCandidatos() {
  var data = await getCands();
  
  // Actualizar métricas del Dashboard
  var me = document.getElementById('mTotal'); if (me) me.textContent = data.length;
  var rev = data.filter(function(c) { return c.estado === 'En revisión' || c.estado === 'Entrevista' || c.estado === 'Prueba técnica'; }).length;
  var done = data.filter(function(c) { return c.estado === 'Aprobado'; }).length;
  var me2 = document.getElementById('mEval'); if (me2) me2.textContent = rev;
  var me3 = document.getElementById('mDone'); if (me3) me3.textContent = done;
  
  // Notificaciones Admin
  var nb = document.getElementById('nBadge'); 
  if (nb) {
    var pends = data.filter(function(c) { return c.estado === 'Pendiente'; }).length;
    nb.textContent = pends > 0 ? pends : '0';
  }

  // Postulaciones Recientes en Dashboard (tabla de la izquierda)
  var tr = document.getElementById('tbRecientes');
  if (tr) {
    if (data.length === 0) {
      tr.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:20px;font-size:13px">Sin postulaciones registradas aún.</td></tr>';
    } else {
      tr.innerHTML = data.slice(0, 4).map(function(c) {
        var e = eInfo(EPOST, c.estado);
        var fStr = c.created_at ? new Date(c.created_at).toLocaleDateString('es-CO') : '—';
        return '<tr><td><b>' + c.nombre + '</b></td><td>' + (c.area || '—') + '</td><td>' + fStr + '</td><td><span class="badge ' + e.c + ' nocursor">' + e.i + ' ' + c.estado + '</span></td></tr>';
      }).join('');
    }
  }

  // Tabla completa de Trazabilidad
  var filtered = data.filter(function(c) {
    var mf = currentFilter === 'todos' || c.estado === currentFilter;
    var ms = !currentSearch || (c.nombre && c.nombre.toLowerCase().indexOf(currentSearch) >= 0) || (c.documento && c.documento.toLowerCase().indexOf(currentSearch) >= 0);
    return mf && ms;
  });

  var tb = document.getElementById('tbCandidatos');
  if (!tb) return;
  if (data.length === 0) {
    tb.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:32px"><div style="font-size:28px;margin-bottom:8px">📭</div><div style="font-weight:700;color:#5a7068;font-size:14px">No hay postulaciones registradas aún</div><div style="font-size:12px;color:#aaa;margin-top:4px">Los candidatos aparecerán aquí una vez que completen el formulario.</div></td></tr>';
    return;
  }
  if (filtered.length === 0) {
    tb.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#aaa;padding:24px;font-size:13px">🔍 Sin resultados para el filtro seleccionado.</td></tr>';
    return;
  }
  
  var rows = '';
  filtered.forEach(function(c) {
    var e = eInfo(EPOST, c.estado);
    var mainId = 'row-' + c.id;
    var tlId = 'tl-' + c.id;
    var fStr = c.created_at ? new Date(c.created_at).toLocaleDateString('es-CO') : '—';
    var uStr = c.updated_at ? new Date(c.updated_at).toLocaleDateString('es-CO') : null;
    var nc = NCLS[c.perfil] || 'gray';
    
    rows += '<tr id="' + mainId + '">';
    rows += '<td><div style="display:flex;align-items:center;gap:9px"><div style="width:32px;height:32px;border-radius:50%;background:var(--grad);color:#fff;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0">' + ini(c.nombre) + '</div><div><b style="font-size:13px">' + c.nombre + '</b><br><span style="font-size:11px;color:#5a7068">' + c.correo + '</span></div></div></td>';
    rows += '<td><b>' + c.documento + '</b>' + (c.ciudad ? '<br><span style="font-size:11px;color:#5a7068">📍 ' + c.ciudad + '</span>' : '') + '</td>';
    rows += '<td><span class="badge ' + nc + ' nocursor">' + c.perfil + '</span>' + (c.profesion ? '<br><span style="font-size:11px;color:#5a7068">' + c.profesion + '</span>' : '') + '</td>';
    rows += '<td><b style="font-size:12px">' + (c.convocatoria_nombre || '—') + '</b><br><span style="font-size:11px;color:#5a7068">' + c.area + '</span></td>';
    rows += '<td style="font-size:12px">' + (c.ciudad || '—') + '</td>';
    rows += '<td style="text-align:center">' + (c.certificado === 'Sí' ? '✅' : '—') + '</td>';
    rows += '<td>' + (c.tiene_pdf && c.pdf_url
      ? '<button class="actbtn sec pdf-dl" data-url="' + c.pdf_url + '" title="Descargar ' + (c.pdf || 'PDF') + '" style="display:flex;align-items:center;gap:4px;font-size:11px;padding:5px 10px">📄 Descargar ⬇</button>'
      : '<span style="font-size:11px;color:#aaa">Sin archivo</span>') + '</td>';
    rows += '<td><div class="bw" data-id="' + c.id + '" data-type="cand"><span class="badge ' + e.c + '">' + e.i + ' ' + c.estado + '</span></div>' + (uStr ? '<div style="font-size:10px;color:#aaa;margin-top:2px">' + uStr + '</div>' : '') + '</td>';
    rows += '<td><button class="actbtn sec" data-tl="' + c.id + '">🔄 Ruta</button></td>';
    rows += '<td><button class="actbtn sec" data-ver="' + c.id + '">👁 Ver</button><button class="actbtn del" data-del="' + c.id + '">🗑</button></td>';
    rows += '</tr>';
    rows += '<tr class="tlrow" id="' + tlId + '" style="display:none"><td colspan="10">' + buildTL(c) + '</td></tr>';
  });
  
  tb.innerHTML = rows;

  // Bind eventos en tabla
  tb.querySelectorAll('.bw[data-type="cand"]').forEach(function(wrap) {
    wrap.addEventListener('click', function(e) {
      e.stopPropagation();
      var id = parseInt(this.getAttribute('data-id'));
      var cand = filtered.find(c => c.id === id);
      if (!cand) return;
      abrirModalEstado(id, cand.estado);
    });
  });
  
  tb.querySelectorAll('[data-tl]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-tl');
      var row = document.getElementById('tl-' + id);
      if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
    });
  });
  
  tb.querySelectorAll('[data-ver]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = parseInt(this.getAttribute('data-ver'));
      abrirDetalle(id);
    });
  });
  
  tb.querySelectorAll('[data-del]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      await eliminarCand(parseInt(this.getAttribute('data-del')));
    });
  });
  
  tb.querySelectorAll('.pdf-dl[data-url]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      descargarPDF(this.getAttribute('data-url'));
    });
  });

  // Donut chart y feed de actividad en Dashboard
  renderDonut(data);
  renderDashPost(data);
}

function renderDonut(data) {
  renderDonutGen('donutSvg', 'donutN', 'donutLeg', data);
}

function renderDashPost(data) {
  var tb = document.getElementById('tbDashPost');
  if (!tb) return;
  if (data.length === 0) {
    tb.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px;font-size:13px">Sin postulaciones aún.</td></tr>';
    return;
  }
  
  tb.innerHTML = data.slice(0, 5).map(function(c) {
    var e = eInfo(EPOST, c.estado);
    var fStr = c.created_at ? new Date(c.created_at).toLocaleString('es-CO') : '—';
    return '<tr><td><b>' + c.nombre + '</b></td><td style="font-size:12px">' + (c.convocatoria_nombre||'—') + '</td><td>' + c.perfil + '</td><td style="font-size:11px;color:#5a7068">' + fStr + '</td><td><span class="badge ' + e.c + ' nocursor">' + e.i + ' ' + c.estado + '</span></td></tr>';
  }).join('');
}

// ===== MODAL NUEVA CONVOCATORIA =====
function abrirModal() {
  ['cvCargo','cvVac','cvDesc'].forEach(function(id) { 
    var el = document.getElementById(id); 
    if (el) el.value = ''; 
  });
  ['cvNivel','cvMod'].forEach(function(id) { 
    var el = document.getElementById(id); 
    if (el) el.value = ''; 
  });
  document.getElementById('cvCierre').value = '';
  document.getElementById('modalConv').classList.add('show');
}

function cerrarModal() {
  document.getElementById('modalConv').classList.remove('show');
}

async function guardarConv(estado) {
  var cargo = document.getElementById('cvCargo').value.trim();
  var nivel = document.getElementById('cvNivel').value;
  var mod = document.getElementById('cvMod').value;
  var vac = document.getElementById('cvVac').value;
  var cierre = document.getElementById('cvCierre').value;
  if (!cargo || !nivel || !mod || !vac || !cierre) { showToast('Complete todos los campos obligatorios (*).', 'warning'); return; }
  
  var conv = {
    id: Date.now(), 
    cargo: cargo, 
    nivel: nivel, 
    modalidad: mod,
    vacantes: parseInt(vac), 
    cierre: cierre,
    area: document.getElementById('cvArea').value,
    desc: document.getElementById('cvDesc').value,
    estado: estado, 
    creada_at: new Date().toISOString()
  };

  try {
    let { error } = await supabase.from('convocatorias').insert([conv]);
    if (error) throw error;
    cerrarModal();
    await renderConvocatorias();
    tickTime();
    if (estado === 'Publicada') showToast('🚀 Convocatoria publicada exitosamente');
  } catch (err) {
    console.error('Error al guardar convocatoria:', err);
    showToast('Error al registrar convocatoria.', 'error');
  }
}

async function cambiarEstadoConv(id, nuevoEstado) {
  try {
    let { error } = await supabase
      .from('convocatorias')
      .update({
        estado: nuevoEstado,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    if (error) throw error;
    await renderConvocatorias(); 
    tickTime();
  } catch (err) {
    console.error('Error al actualizar convocatoria:', err);
  }
}

async function eliminarConv(id) {
  if (await showConfirm('¿Eliminar esta convocatoria?', 'Eliminar convocatoria', 'danger')) {
    try {
      let { error } = await supabase.from('convocatorias').delete().eq('id', id);
      if (error) throw error;
      showToast('🗑 Convocatoria eliminada');
      await renderConvocatorias();
    } catch (err) {
      console.error('Error al eliminar convocatoria:', err);
      showToast('No se pudo eliminar la convocatoria.', 'error');
    }
  }
}

function fmtDate(iso) {
  if (!iso) return '—';
  var p = iso.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

async function renderConvocatorias() {
  var data = await getConvs();
  var activas = data.filter(function(c) { return c.estado === 'Publicada'; });
  var mc = document.getElementById('mConv'); if (mc) mc.textContent = activas.length;
  var cr = document.getElementById('convResumen'); 
  if (cr) {
    cr.textContent = data.length + ' registradas · ' + activas.length + ' publicadas';
  }

  // Tabla Convocatorias Activas (Dashboard)
  var ta = document.getElementById('tbConvActivas');
  if (ta) {
    if (activas.length === 0) {
      ta.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px"><div style="font-size:22px;margin-bottom:6px">📭</div><div style="font-weight:700;color:#5a7068;font-size:13px">Sin convocatorias publicadas</div><div style="font-size:11px;color:#aaa;margin-top:2px">Haz clic en <b>Nueva</b> para comenzar.</div></td></tr>';
    } else {
      ta.innerHTML = activas.map(function(c) {
        var e = eInfo(ECONV, c.estado);
        return '<tr><td><b>' + c.cargo + '</b><br><span style="font-size:11px;color:#5a7068">' + c.area + '</span></td><td>' + fmtDate(c.cierre) + '</td><td style="text-align:center;font-weight:700">' + c.vacantes + '</td>'
          + '<td><div class="bw" data-id="' + c.id + '" data-type="conv"><span class="badge ' + e.c + '">' + e.i + ' ' + e.k + '</span></div></td>'
          + '<td><button class="actbtn del" data-del="' + c.id + '">🗑</button></td></tr>';
      }).join('');
      bindConvRows(ta, activas);
    }
  }

  // Tabla Convocatorias por nivel (Dashboard inferior)
  var tn = document.getElementById('tbConvNivel');
  if (tn) {
    if (data.length === 0) {
      tn.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px"><div style="font-size:22px;margin-bottom:6px">📭</div><div style="font-weight:700;color:#5a7068;font-size:13px">Sin convocatorias registradas aún</div></td></tr>';
    } else {
      tn.innerHTML = data.map(function(c) {
        var e = eInfo(ECONV, c.estado);
        var nc = NCLS[c.nivel] || 'gray';
        return '<tr><td><b>' + c.cargo + '</b></td><td><span class="badge ' + nc + ' nocursor">' + c.nivel + '</span></td><td>' + c.modalidad + '</td><td style="text-align:center">' + c.vacantes + '</td>'
          + '<td><div class="bw" data-id="' + c.id + '" data-type="conv"><span class="badge ' + e.c + '">' + e.i + ' ' + e.k + '</span></div></td>'
          + '<td><button class="actbtn del" data-del="' + c.id + '">🗑</button></td></tr>';
      }).join('');
      bindConvRows(tn, data);
    }
  }
}

function bindConvRows(container, list) {
  container.querySelectorAll('.bw[data-type="conv"]').forEach(function(wrap) {
    wrap.addEventListener('click', function(e) {
      e.stopPropagation();
      var id = parseInt(this.getAttribute('data-id'));
      var conv = list.find(c => c.id === id);
      if (!conv) return;
      openDropdown(this, ECONV, eInfo(ECONV, conv.estado).k, async function(nuevoEstado) {
        await cambiarEstadoConv(id, nuevoEstado);
      });
    });
  });
  
  container.querySelectorAll('[data-del]').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      await eliminarConv(parseInt(this.getAttribute('data-del')));
    });
  });
}

function showToast(msg, type = 'success') {
  var t = document.getElementById('toast');
  if (!t) return;
  t.className = 'toast show ' + type;
  
  var icon = '✅';
  if (type === 'error') icon = '❌';
  else if (type === 'warning') icon = '⚠️';
  else if (type === 'info') icon = 'ℹ️';
  
  t.innerHTML = '<span class="toast-icon">' + icon + '</span><span class="toast-msg">' + msg + '</span>';
  
  if (t.timeoutId) clearTimeout(t.timeoutId);
  t.timeoutId = setTimeout(function() {
    t.classList.remove('show');
  }, 3500);
}

function showConfirm(message, title = 'Confirmar acción', type = 'warning') {
  return new Promise((resolve) => {
    var modal = document.getElementById('modalConfirm');
    var titleEl = document.getElementById('confirmTitle');
    var msgEl = document.getElementById('confirmMessage');
    var iconEl = document.getElementById('confirmIcon');
    var btnOk = document.getElementById('btnConfirmOk');
    var btnCancel = document.getElementById('btnConfirmCancel');
    
    if (!modal) return resolve(false);
    
    titleEl.textContent = title;
    msgEl.textContent = message;
    
    var icon = '❓';
    var okColor = 'var(--grad)';
    if (type === 'danger') {
      icon = '⚠️';
      okColor = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else if (type === 'question') {
      icon = '❓';
      okColor = 'var(--grad)';
    } else if (type === 'info') {
      icon = 'ℹ️';
      okColor = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    }
    
    iconEl.textContent = icon;
    btnOk.style.background = okColor;
    btnOk.textContent = 'Confirmar';
    btnCancel.style.display = 'block';
    
    modal.classList.add('show');
    
    var cleanup = function(value) {
      modal.classList.remove('show');
      btnOk.removeEventListener('click', onOk);
      btnCancel.removeEventListener('click', onCancel);
      resolve(value);
    };
    
    function onOk() { cleanup(true); }
    function onCancel() { cleanup(false); }
    
    btnOk.addEventListener('click', onOk);
    btnCancel.addEventListener('click', onCancel);
  });
}

function showAlert(message, title = 'Atención', type = 'warning') {
  return new Promise((resolve) => {
    var modal = document.getElementById('modalConfirm');
    var titleEl = document.getElementById('confirmTitle');
    var msgEl = document.getElementById('confirmMessage');
    var iconEl = document.getElementById('confirmIcon');
    var btnOk = document.getElementById('btnConfirmOk');
    var btnCancel = document.getElementById('btnConfirmCancel');
    
    if (!modal) return resolve();
    
    titleEl.textContent = title;
    msgEl.textContent = message;
    
    var icon = '⚠️';
    var okColor = 'var(--grad)';
    if (type === 'error') {
      icon = '❌';
      okColor = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else if (type === 'success') {
      icon = '✅';
      okColor = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (type === 'info') {
      icon = 'ℹ️';
      okColor = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    }
    
    iconEl.textContent = icon;
    btnOk.style.background = okColor;
    btnOk.textContent = 'Aceptar';
    btnCancel.style.display = 'none';
    
    modal.classList.add('show');
    
    var cleanup = function() {
      modal.classList.remove('show');
      btnOk.removeEventListener('click', onOk);
      btnCancel.style.display = 'block';
      resolve();
    };
    
    function onOk() { cleanup(); }
    
    btnOk.addEventListener('click', onOk);
  });
}

// === LÓGICA DE ESTADOS CON OBSERVACIÓN ===
var _estadoPendId = null;
var _estadoPendNs = null;

function abrirModalEstado(id, estadoActual) {
  _estadoPendId = id;
  _estadoPendNs = estadoActual;
  document.getElementById('obsTexto').value = '';
  
  var optCont = document.getElementById('estadoOpciones');
  if (optCont) {
    optCont.innerHTML = EPOST.map(function(est) {
      var activo = est.k === estadoActual;
      return '<div class="estado-opt' + (activo ? ' active' : '') + '" data-est="' + est.k + '">'
        + '<div class="eo-dot" style="background:' + (DOT_COLORS[est.c] || '#999') + '"></div>'
        + est.i + ' ' + est.k
        + '</div>';
    }).join('');
    
    optCont.querySelectorAll('.estado-opt').forEach(function(opt) {
      opt.addEventListener('click', function() {
        optCont.querySelectorAll('.estado-opt').forEach(function(o) { o.classList.remove('active'); });
        this.classList.add('active');
        _estadoPendNs = this.getAttribute('data-est');
      });
    });
  }
  
  document.getElementById('modalEstado').classList.add('show');
}

function cerrarModalEstado() {
  document.getElementById('modalEstado').classList.remove('show');
  _estadoPendId = null;
  _estadoPendNs = null;
}

async function guardarEstadoPendiente() {
  if (!_estadoPendId || !_estadoPendNs) return;
  var obs = document.getElementById('obsTexto').value.trim();
  await cambiarEstadoCand(_estadoPendId, _estadoPendNs, obs);
  cerrarModalEstado();
  
  var detModal = document.getElementById('modalDet');
  if (detModal && detModal.classList.contains('show')) {
    abrirDetalle(_estadoPendId);
  }
}

// === LÓGICA DE DETALLE DEL CANDIDATO ===
function ini(nombre) {
  return (nombre || '?').split(' ').slice(0, 2).map(function(w) { return w[0] || ''; }).join('').toUpperCase();
}

async function abrirDetalle(id) {
  try {
    let { data: currList, error } = await supabase
      .from('postulaciones')
      .select('*')
      .eq('id', id)
      .limit(1);
    if (error || !currList || currList.length === 0) {
      showToast('No se pudo cargar la información del candidato.', 'error');
      return;
    }
    var c = currList[0];
    var e = eInfo(EPOST, c.estado);
    var nc = NCLS[c.perfil] || 'gray';
    var hist = c.history && c.history.length ? c.history.map(function(h) {
      var eH = eInfo(EPOST, h.estado || h.estadoAnterior || 'Pendiente');
      return '<li>'
        + '<div class="hl-row" style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">'
          + '<div class="hl-badge">'
            + (h.estadoAnterior ? '<span class="badge ' + eInfo(EPOST, h.estadoAnterior).c + ' nocursor" style="font-size:10px;">' + eInfo(EPOST, h.estadoAnterior).i + ' ' + h.estadoAnterior + '</span>'
              + '<span style="font-size:12px;margin:0 5px;color:#aaa">→</span>'
              + '<span class="badge ' + eInfo(EPOST, h.estado).c + ' nocursor" style="font-size:10px;">' + eInfo(EPOST, h.estado).i + ' ' + h.estado + '</span>'
             : '<span class="badge ' + eH.c + ' nocursor" style="font-size:10px;">' + eH.i + ' ' + eH.k + '</span>')
          + '</div>'
          + '<div style="text-align:right;">'
            + '<div class="hl-fecha" style="font-size:10px;color:#aaa;">📅 ' + h.fecha + '</div>'
            + (h.usuario ? '<div class="hl-fecha" style="font-size:10px;color:#aaa;">👤 ' + h.usuario + '</div>' : '')
          + '</div>'
        + '</div>'
        + (h.observacion ? '<div class="hl-obs" style="font-size:11.5px;color:#2a4060;background:#f0f6ff;border-left:3px solid var(--azul);padding:5px 10px;border-radius:0 6px 6px 0;margin-top:6px;font-style:italic;">💬 ' + h.observacion + '</div>' : '')
      + '</li>';
    }).join('') : '<li style="text-align:center;color:#aaa;padding:12px;font-size:13px;">Sin historial de cambios aún</li>';

    document.getElementById('detContenido').innerHTML =
      '<div class="dth" style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid var(--borde);">'
      + '<div class="dtava" style="width:56px;height:56px;border-radius:50%;background:var(--grad);color:#fff;font-family:\'Nunito\',sans-serif;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + ini(c.nombre) + '</div>'
      + '<div>'
        + '<div class="dttit" style="font-family:\'Nunito\',sans-serif;font-size:20px;font-weight:800;color:var(--azul-dark);margin-bottom:3px;">' + c.nombre + '</div>'
        + '<div class="dtsub" style="font-size:13px;color:#5a7068;">' + c.correo + (c.telefono ? ' &nbsp;·&nbsp; 📞 ' + c.telefono : '') + '</div>'
        + '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;"><span class="badge ' + e.c + ' nocursor">' + e.i + ' ' + c.estado + '</span>' + (c.tiene_pdf ? '<span class="badge blue nocursor">📄 ' + c.pdf + '</span>' : '<span class="badge gray nocursor">Sin PDF</span>') + '</div>'
      + '</div>'
      + '</div>'
      + '<div class="dtsec" style="font-family:\'Nunito\',sans-serif;font-size:13px;font-weight:800;color:var(--azul-dark);margin:14px 0 8px;padding-bottom:5px;border-bottom:2px solid var(--azul-l);">📋 Información Personal</div>'
      + '<div class="dtg" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Tipo / Nº Documento</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + c.documento + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Ciudad de residencia</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + (c.ciudad || '—') + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Correo electrónico</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + c.correo + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Teléfono</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + (c.telefono || '—') + '</span></div>'
      + '</div>'
      + '<div class="dtsec" style="font-family:\'Nunito\',sans-serif;font-size:13px;font-weight:800;color:var(--azul-dark);margin:14px 0 8px;padding-bottom:5px;border-bottom:2px solid var(--azul-l);">💼 Información Profesional</div>'
      + '<div class="dtg" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Nivel de formación</label><span class="badge ' + nc + ' nocursor" style="display:inline-flex;">' + c.perfil + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Profesión / Carrera</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + (c.profesion || '—') + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Área de interés</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + c.area + '</span></div>'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Convocatoria aplicada</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + (c.convocatoria_nombre || '—') + '</span></div>'
      + '</div>'
      + (c.experiencia ? '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;margin-bottom:14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Experiencia laboral</label><span style="white-space:pre-wrap;display:block;margin-top:4px;font-size:13px;color:var(--texto);">' + c.experiencia + '</span></div>' : '')
      + '<div class="dtsec" style="font-family:\'Nunito\',sans-serif;font-size:13px;font-weight:800;color:var(--azul-dark);margin:14px 0 8px;padding-bottom:5px;border-bottom:2px solid var(--azul-l);">♿ Inclusión Laboral</div>'
      + '<div class="dtg" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
        + '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Certificado de discapacidad</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + (c.certificado === 'Sí' ? '✅ Sí, tiene certificado' : 'No aplica') + '</span></div>'
        + (c.ajustes ? '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Ajustes requeridos</label><span style="font-size:13px;font-weight:600;color:var(--texto);display:block;">' + c.ajustes + '</span></div>' : '<div class="dtf" style="background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;padding:11px 14px;"><label style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7068;display:block;margin-bottom:3px;">Ajustes requeridos</label><span style="color:#aaa;font-size:13px;display:block;">Ninguno</span></div>')
      + '</div>'
      + '<div class="dtsec" style="font-family:\'Nunito\',sans-serif;font-size:13px;font-weight:800;color:var(--azul-dark);margin:14px 0 8px;padding-bottom:5px;border-bottom:2px solid var(--azul-l);">📎 Documentos</div>'
      + '<div style="display:flex;align-items:center;gap:12px;padding:14px;background:#f8fbfa;border:1px solid var(--borde);border-radius:10px;margin-bottom:14px;">'
        + (c.tiene_pdf && c.pdf_url ? '<span style="font-size:26px;">📄</span><div style="flex:1;"><div style="font-size:13px;font-weight:600;">' + c.pdf + '</div><div style="font-size:11px;color:#5a7068;">Hoja de vida adjunta</div></div><button class="actbtn sec pdf-dl-modal" data-url="' + c.pdf_url + '" style="padding:8px 18px;font-size:12px;cursor:pointer;">Descargar PDF ⬇</button>' : '<span style="font-size:26px;">📭</span><div style="font-size:13px;color:#aaa;">No se adjuntó archivo PDF</div>')
      + '</div>'
      + '<div class="dtsec" style="font-family:\'Nunito\',sans-serif;font-size:13px;font-weight:800;color:var(--azul-dark);margin:14px 0 8px;padding-bottom:5px;border-bottom:2px solid var(--azul-l);">🕓 Historial de estados</div>'
      + '<div class="dthl" style="background:#f8fbfe;border:1px solid var(--borde);border-radius:10px;padding:12px;"><ul style="list-style:none;padding:0;margin:0;">' + hist + '</ul></div>'
      + '<div style="display:flex;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--borde);">'
        + '<button class="sbtn" id="btnAbrirEstado" data-cid="' + c.id + '" data-cest="' + c.estado + '" style="flex:1;padding:12px;cursor:pointer;">🔄 Cambiar estado + Observación</button>'
        + '<button class="actbtn del" id="btnEliminarDet" data-cid="' + c.id + '" style="padding:12px 18px;font-size:13px;cursor:pointer;">Eliminar 🗑</button>'
      + '</div>';

    document.getElementById('modalDet').classList.add('show');

    // Binds de eventos en el modal
    var btnDlModal = document.querySelector('.pdf-dl-modal');
    if (btnDlModal) {
      btnDlModal.addEventListener('click', function() {
        descargarPDF(this.getAttribute('data-url'));
      });
    }

    document.getElementById('btnAbrirEstado').addEventListener('click', function() {
      var cid = parseInt(this.getAttribute('data-cid'));
      var cest = this.getAttribute('data-cest');
      cerrarDetalle();
      abrirModalEstado(cid, cest);
    });

    document.getElementById('btnEliminarDet').addEventListener('click', async function() {
      var cid = parseInt(this.getAttribute('data-cid'));
      cerrarDetalle();
      await eliminarCand(cid);
    });
  } catch (err) {
    console.error('Error al abrir detalle:', err);
    showToast('Error de conexión.', 'error');
  }
}

function cerrarDetalle() {
  document.getElementById('modalDet').classList.remove('show');
}

function toggleSidebar() {
  document.body.classList.toggle('sb-collapsed');
  var isCollapsed = document.body.classList.contains('sb-collapsed');
  var icon = isCollapsed ? '›' : '‹';
  var btnP = document.getElementById('btnTogglePost');
  var btnA = document.getElementById('btnToggleAdmin');
  if (btnP) btnP.textContent = icon;
  if (btnA) btnA.textContent = icon;
}

