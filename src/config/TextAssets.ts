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
        }
    }
};
