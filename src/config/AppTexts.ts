/**
 * FACTOWAR - ARCHIVO CENTRALIZADO DE TEXTOS
 * 
 * Este archivo contiene TODOS los textos que se visualizan en la aplicación.
 * Posteriormente será administrado por el Admin vía base de datos.
 * 
 * IMPORTANTE: No hardcodear textos en componentes. Siempre usar este archivo.
 */

export const APP_TEXTS = {
    // === HEADER & NAVIGATION ===
    HEADER: {
        LOGO: 'FactoWar',
        NAV_ITEMS: {
            FACTOS: 'Factos',
            RANKING: 'Ranking',
            MODELO_SEIZ: 'Modelo SEIZ',
            SOBRE_FAKENEWS: 'Sobre Fakenews',
            PROYECTO_POLARIZOR: 'Proyecto Polarizor'
        }
    },

    // === MODAL DE BIENVENIDA ===
    WELCOME_MODAL: {
        TITLE: 'La verdad está bajo ataque.',
        BODY: 'En la era de la posverdad, la indiferencia es complicidad. Tienes 30 días para evitar el colapso de la red.',
        BUTTON: 'INICIAR SISTEMA'
    },

    // === SIDEBAR ===
    SIDEBAR: {
        FAKENEWS_BOX: {
            IDLE_TITLE: 'ESCANEANDO RED...',
            RUNNING_LABEL_PREFIX: 'CONTEXTO: '
        },
        LEVELS: {
            LABEL: 'Resistencia del Sistema',
            RESISTANCE_LABELS: {
                LOW: 'Baja',
                MEDIUM: 'Alta',
                EXTREME: 'EXTREMA'
            },
            LEVEL_NAMES: {
                1: 'Nivel 1: El Ágora',
                2: 'Nivel 2: La Plaza',
                3: 'Nivel 3: El Eco',
                4: 'Nivel 4: El Laberinto',
                5: 'Nivel 5: Zona Zero'
            },
            LEVEL_DESCRIPTIONS: {
                1: 'Espacio de debate abierto. La noticia falsa enfrenta resistencia natural.',
                2: 'Polarización moderada. Las cámaras de eco empiezan a formarse.',
                3: 'Alta resonancia ideológica. El algoritmo amplifica la división.',
                4: 'Fragmentación extrema. La verdad es relativa en cada burbuja.',
                5: 'Caos total. La realidad es indistinguible de la manipulación.'
            }
        },
        SLIDERS: {
            LABELS: {
                ENGAGEMENT: 'ENGAGEMENT',
                CONTROVERSY: 'CONTROVERSIA',
                MODERATION: 'MODERACIÓN',
                PROPAGATION: 'PROPAGACIÓN',
                DELAY: 'DELAY FACT-CHECK'
            }
        },
        POWER_UPS: {
            CAMPAIGN: {
                READY: '🛡️ LANZAR CAMPAÑA',
                COOLDOWN: 'RECARGANDO RECURSOS',
                ACTIVE: 'CAMPAÑA ACTIVA'
            },
            FRICTION: {
                READY: '⏸️ ACTIVAR FRICCIÓN',
                COOLDOWN: 'ENFRIANDO SISTEMAS',
                ACTIVE: 'FRICCIÓN'
            }
        }
    },

    // === HUD (STATS) ===
    HUD: {
        STATS: {
            EXPOSURE: {
                LABEL: 'EXPOSICIÓN',
                TOOLTIP: 'Porcentaje de nodos que han visto la noticia falsa. Mayor exposición indica que el contenido se está difundiendo ampliamente.'
            },
            IMPACT: {
                LABEL: 'IMPACTO',
                TOOLTIP: 'Intensidad del efecto viral. Mide qué tan profundamente la noticia falsa afecta las creencias de los nodos infectados.'
            },
            POLARIZATION: {
                LABEL: 'POLARIZACIÓN',
                TOOLTIP: 'Nivel de división ideológica en la red. Alta polarización dificulta el fact-checking y aumenta la resistencia al cambio.'
            },
            CLUSTERS: {
                LABEL: 'CLUSTERS',
                TOOLTIP: 'Número de grupos aislados formados. Los clusters son cámaras de eco donde la noticia se refuerza constantemente.'
            }
        }
    },

    // === MARQUEE ===
    MARQUEE: {
        IDLE: 'SISTEMA SINCRONIZADO // MONITOREO DE NODOS ACTIVO // SIN AMENAZAS',
        ALERT: '⚠️ ANOMALÍA DETECTADA // INYECCIÓN DE DATOS NO VERIFICADOS // RECOMENDACIÓN: ACTIVAR FILTROS',
        CRITICAL: '⛔ SISTEMA COMPROMETIDO // CONTROLES MANUALES DESHABILITADOS // ERROR DE INTEGRIDAD // EJECUTANDO PROTOCOLOS DE EMERGENCIA',
        LOCK: '🔒 CONTROLADORES BLOQUEADOS // INTERVENCIÓN MANUAL DESACTIVADA // SOLO POWER-UPS DISPONIBLES',
        VICTORY: '✓ AMENAZA CONTENIDA // INTEGRIDAD DE LA RED PRESERVADA // ANÁLISIS FINAL EN PROCESO',
        DEFEAT: '✕ COLAPSO DE LA RED // DESINFORMACIÓN DOMINANTE // REINICIANDO SISTEMAS...'
    },

    // === MODAL DE RESULTADOS ===
    RESULT_MODAL: {
        VICTORY: {
            TITLE: 'AMENAZA CONTENIDA',
            SUBTITLE: 'Has defendido la integridad de la red'
        },
        DEFEAT: {
            TITLE: 'SISTEMA COMPROMETIDO',
            SUBTITLE: 'La desinformación ha colapsado la red'
        },
        LABELS: {
            INTEGRITY_SCORE: 'PUNTAJE DE INTEGRIDAD',
            TIME_SURVIVED: 'Tiempo sobrevivido',
            NODES_SAVED: 'Nodos salvados',
            THREAT_LEVEL: 'Nivel de amenaza'
        },
        BUTTONS: {
            SAVE: 'GUARDAR PROGRESO',
            RETRY: 'REINTENTAR',
            CLOSE: 'CERRAR'
        }
    },

    // === PÁGINAS PLACEHOLDER ===
    PAGES: {
        FACTOS: {
            TITLE: 'Factos',
            CONTENT: 'Aquí se mostrará la base de datos de noticias falsas y verificaciones.'
        },
        RANKING: {
            TITLE: 'Ranking',
            CONTENT: 'Aquí se mostrará el ranking global de jugadores.'
        },
        MODELO_SEIZ: {
            TITLE: 'Modelo SEIZ',
            CONTENT: 'Aquí se explicará el modelo epidemiológico SEIZ adaptado a la desinformación.'
        },
        SOBRE_FAKENEWS: {
            TITLE: 'Sobre Fakenews',
            CONTENT: 'Aquí se mostrará información educativa sobre desinformación y fact-checking.'
        },
        PROYECTO_POLARIZOR: {
            TITLE: 'Proyecto Polarizor',
            CONTENT: 'Aquí se mostrará información sobre el proyecto Polarizor y la Fundación Igualdad.'
        }
    },

    // === TOOLTIPS EDUCATIVOS ===
    TOOLTIPS: {
        ENGAGEMENT: {
            TITLE: 'Engagement (β)',
            DESCRIPTION: 'Velocidad de propagación del contenido. En redes sociales, el engagement representa qué tan rápido se comparte y comenta una publicación. Mayor engagement = mayor velocidad de contagio.'
        },
        CONTROVERSY: {
            TITLE: 'Controversia (p)',
            DESCRIPTION: 'Probabilidad de que un usuario susceptible se infecte directamente. Las noticias polémicas tienen mayor tasa de conversión inmediata, especialmente si activan emociones fuertes.'
        },
        MODERATION: {
            TITLE: 'Moderación (γ)',
            DESCRIPTION: 'Efectividad de las intervenciones correctivas (fact-checking, etiquetas de contexto, reducción de viralidad). Simula la capacidad de "curar" a usuarios infectados.'
        },
        PROPAGATION: {
            TITLE: 'Propagación (Radio)',
            DESCRIPTION: 'Alcance de contacto entre nodos. Representa el efecto de algoritmos de recomendación y la estructura de red (seguidores, grupos, hashtags).'
        },
        DELAY: {
            TITLE: 'Delay Fact-Check',
            DESCRIPTION: 'Tiempo que tarda en activarse la moderación efectiva. Las noticias falsas suelen propagarse más rápido que las verificaciones, creando una ventana crítica.'
        }
    }
};

// === CONFIGURACIÓN DE NIVELES (Datos técnicos) ===
export const LEVEL_COLORS = {
    1: '#10B981', // Verde
    2: '#F59E0B', // Amarillo
    3: '#F97316', // Naranja
    4: '#EF4444', // Rojo
    5: '#A855F7'  // Púrpura
};
