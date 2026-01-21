/**
 * Configuración de textos editables para FactoWar
 * Este archivo centraliza todos los textos que pueden ser editados
 * desde el panel de administración (cuando se implemente)
 */

export const WelcomeConfig = {
    title: 'La verdad está bajo ataque.',
    subtitle: 'En la era de la posverdad, la indiferencia es complicidad.',
    description:
        'Tienes 30 días para evitar el colapso de la red. Controla las variables del algoritmo, activa estrategias y defiende la integridad del discurso democrático.',
    buttonText: 'INICIAR SISTEMA',
};

export const ResultConfig = {
    victory: {
        title: '🎉 AMENAZA NEUTRALIZADA',
        subtitle: 'Has defendido la verdad en un entorno hostil.',
    },
    defeat: {
        title: '💀 COLAPSO INFORMATIVO',
        subtitle: 'La mentira se ha convertido en la nueva verdad.',
    },
    buttons: {
        save: 'GUARDAR PROGRESO',
        retry: 'REINTENTAR',
    },
};

export const MarqueeMessages = {
    idle: 'SISTEMA SINCRONIZADO // MONITOREO ACTIVO // SIN AMENAZAS',
    alert: '⚠️ ANOMALÍA DETECTADA // INYECCIÓN DE DATOS NO VERIFICADOS // ACTIVAR FILTROS',
    critical:
        '⛔ SISTEMA COMPROMETIDO // CONTROLES DESHABILITADOS // PROTOCOLOS DE EMERGENCIA',
};
