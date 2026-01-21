export const TEXT_ASSETS = {
    HEADER: {
        TITLE: "FACTOWAR",
        SUBTITLE: "Simulador de Resistencia Algorítmica",
    },
    CONTROLS: {
        ENGAGEMENT: {
            LABEL: "ENGAGEMENT",
            TOOLTIP: "Velocidad de propagación algorítmica. Controla cuánto promueve el sistema la interacción."
        },
        CONTROVERSY: {
            LABEL: "CONTROVERSIA",
            TOOLTIP: "Viralidad emocional. Probabilidad de que un usuario comparta sin verificar."
        },
        MODERATION: {
            LABEL: "MODERACIÓN",
            TOOLTIP: "Sistema inmune de la red. Probabilidad de que un usuario infectado se cure tras verificación."
        },
        PROPAGATION: {
            LABEL: "PROPAGACIÓN",
            TOOLTIP: "Alcance de voz. Radio de influencia de cada usuario."
        },
        DELAY: {
            LABEL: "DELAY VERIFICACIÓN",
            TOOLTIP: "Días simulados hasta que llega el Fact-Check oficial."
        }
    },
    TACTICAL: {
        TITLE: "ACCIONES TÁCTICAS",
        INOCULATION: {
            TITLE: "INOCULACIÓN DE RED",
            DESC: "Despliega una campaña de prebunking para inmunizar nodos. Requiere tiempo de carga."
        },
        FRICTION: {
            TITLE: "FRICCIÓN ALGORÍTMICA",
            DESC: "Reduce la velocidad de propagación global en un 70% temporalmente."
        },
        EXECUTE: "EJECUTAR PROTOCOLO",
        ABORT: "ABORTAR SIMULACIÓN"
    },
    HUD: {
        HEALTH_LABEL: "INTEGRIDAD DEL SISTEMA",
        DAY_LABEL: "DÍA",
        STATUS: {
            INIT: "SISTEMA ONLINE. ESPERANDO SELECCIÓN DE AMENAZA...",
            RUNNING: "SIMULACIÓN EN PROGRESO...",
            FACT_CHECK: "BOLETÍN: VERIFICACIÓN OFICIAL PUBLICADA.",
            CRITICAL: "ALERTA: INTEGRIDAD CRÍTICA.",
            COLLAPSE: "FALLO CRÍTICO DEL SISTEMA.",
            VICTORY: "AMENAZA NEUTRALIZADA."
        }
    },
    MODALS: {
        VICTORY: {
            TITLE: "🎉 AMENAZA NEUTRALIZADA",
            SUBTITLE: "Has defendido la verdad en un entorno hostil."
        },
        DEFEAT: {
            TITLE: "💀 COLAPSO INFORMATIVO",
            SUBTITLE: "La mentira se ha convertido en la nueva verdad."
        },
        IDENTITY: {
            TITLE: "Identidad de Operador",
            SAVE_BTN: "GUARDAR RANGO",
            WARNING: "GUARDA ESTA LLAVE. FactoWar no guarda contraseñas."
        },
        POST_MORTEM: {
            FACTO_LABEL: "REALIDAD DESBLOQUEADA",
            METRICS_LABEL: "RECUENTO DE DAÑO",
            SCORE_JUGADA_LABEL: "SCORE JUGADA",
            SCORE_PARTIDA_LABEL: "SCORE PARTIDA",
            CONTINUE: "SIGUIENTE NIVEL",
            RETRY: "REINTENTAR",
            MENU: "VOLVER AL MENÚ",
            LESSON_LABEL: "RESUMEN TÁCTICO (LO APRENDIDO)",
            MOTIVATION_SUCCESS: "Tu intervención ha protegido la integridad cognitiva del sector.",
            MOTIVATION_FAILURE: "El caos informativo ha prevalecido. Analiza los patrones y reintenta."
        }
    }
};
