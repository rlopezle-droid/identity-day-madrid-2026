// ============================================
// WEBHOOK SAILPOINT EVENT - GOOGLE APPS SCRIPT
// CORREGIDO - Versión 2.2
// ============================================

// ⚠️ IMPORTANTE: REEMPLAZA ESTO CON TU ID REAL DE LA HOJA
const CONFIG = {
  SHEET_ID: '1bp0O4uvjlv4_f9V3X_IBSIeOLHLlm8Vw01VOMtiBr_c', // <-- REEMPLAZA CON TU ID DE HOJA
  SHEET_NAME: 'IdentityDay2026',
  EMAIL_NOTIFICACION: 'rodrigo.lopez@SailPoint.com',
  PRIVACY_EMAIL: 'privacy@sailpoint.com'
};

// ============================================
// FUNCIÓN PRINCIPAL - Recibe datos POST
// ============================================
function doPost(e) {
  try {
    // Verificar que hay datos POST
    if (!e || !e.postData || !e.postData.contents) {
      console.error('Error: No se recibieron datos POST');
      return createJsonResponse({
        success: false,
        message: 'No se recibieron datos'
      });
    }
    
    // Parsear los datos recibidos del formulario
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('Error parseando JSON:', parseError);
      return createJsonResponse({
        success: false,
        message: 'Error al parsear los datos'
      });
    }
    
    // Validar que data es un objeto
    if (!data || typeof data !== 'object') {
      return createJsonResponse({
        success: false,
        message: 'Datos inválidos'
      });
    }
    
    // Validar datos mínimos
    if (!data.nombre || !data.email || !data.empresa) {
      return createJsonResponse({
        success: false,
        message: 'Faltan datos obligatorios (nombre, email, empresa)'
      });
    }
    
    // Verificar que SHEET_ID está configurado
    if (CONFIG.SHEET_ID === '1ABC123xyz...' || !CONFIG.SHEET_ID) {
      console.error('Error: SHEET_ID no configurado');
      return createJsonResponse({
        success: false,
        message: 'Error de configuración: SHEET_ID no configurado'
      });
    }
    
    // Abrir la hoja de cálculo
    let sheet;
    try {
      const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
      sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
      if (!sheet) {
        throw new Error('No se encontró la hoja: ' + CONFIG.SHEET_NAME);
      }
    } catch (sheetError) {
      console.error('Error abriendo hoja:', sheetError);
      return createJsonResponse({
        success: false,
        message: 'Error al acceder a la hoja: ' + sheetError.toString()
      });
    }
    
    // Preparar la fila de datos
    const row = [
      new Date(),                              // Fecha
      data.tipo || 'info',                     // Tipo
      data.nombre,                             // Nombre
      data.email,                              // Email
      data.empresa,                            // Empresa
      data.consulta || data.cargo || '',       // Consulta
      'Pendiente'                              // Estado
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(row);
    console.log('Fila agregada correctamente');
    
    // Enviar notificación por email
    try {
      enviarNotificacion(data);
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
    }
    
    // Responder éxito
    return createJsonResponse({
      success: true,
      message: 'Solicitud registrada correctamente'
    });
    
  } catch (error) {
    console.error('Error general:', error);
    return createJsonResponse({
      success: false,
      message: 'Error: ' + error.toString()
    });
  }
}

// ============================================
// FUNCIÓN AUXILIAR - Crear respuesta JSON con CORS
// ============================================
function createJsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ============================================
// FUNCIÓN GET - Para verificar que está activo
// ============================================
function doGet(e) {
  return createJsonResponse({
    status: 'Webhook SailPoint Event - Activo',
    timestamp: new Date().toISOString(),
    version: '2.2'
  });
}

// ============================================
// FUNCIÓN DE NOTIFICACIÓN POR EMAIL
// ============================================
function enviarNotificacion(data) {
  if (!data || typeof data !== 'object') {
    console.error('Error: datos inválidos');
    return;
  }
  
  const tipoSolicitud = data.tipo === 'demo' ? 'Agendar Sesión' : 'Solicitud de Información';
  
  const asunto = 'Nueva ' + tipoSolicitud + ' - SailPoint Event Madrid';
  
  const cuerpo = 'NUEVA SOLICITUD RECIBIDA - SAILPOINT EVENT\n\n' +
    'TIPO: ' + tipoSolicitud + '\n' +
    'NOMBRE: ' + (data.nombre || 'No especificado') + '\n' +
    'EMAIL: ' + (data.email || 'No especificado') + '\n' +
    'EMPRESA: ' + (data.empresa || 'No especificado') + '\n\n' +
    'DETALLES:\n' + (data.consulta || data.cargo || 'No especificado') + '\n\n' +
    'Fecha: ' + new Date().toLocaleString('es-ES') + '\n\n' +
    'Ver en Google Sheets:\n' +
    'https://docs.google.com/spreadsheets/d/' + CONFIG.SHEET_ID;
  
  try {
    MailApp.sendEmail({
      to: CONFIG.EMAIL_NOTIFICACION,
      subject: asunto,
      body: cuerpo,
      name: 'SailPoint Event'
    });
    console.log('Email enviado a: ' + CONFIG.EMAIL_NOTIFICACION);
  } catch (e) {
    console.error('Error email:', e);
    throw e;
  }
}

// ============================================
// FUNCIÓN DE PRUEBA
// ============================================
function testWebhook() {
  // ⚠️ PRIMERO CONFIGURA TU SHEET_ID ARRIBA
  
  const datosPrueba = {
    tipo: 'info',
    nombre: 'Usuario de Prueba',
    email: 'test@ejemplo.com',
    empresa: 'Empresa Test',
    consulta: 'Esta es una prueba'
  };
  
  console.log('Test con datos:', datosPrueba);
  console.log('SHEET_ID configurado:', CONFIG.SHEET_ID);
  
  const e = {
    postData: {
      contents: JSON.stringify(datosPrueba)
    }
  };
  
  const resultado = doPost(e);
  console.log('Resultado:', resultado.getContent());
}
