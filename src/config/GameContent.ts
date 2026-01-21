import type { NewsStory, TickerMessage } from '../engine/types';

export const FAKE_NEWS_POOL: NewsStory[] = [
    {
        "id": "arg_031",
        "theme": "LGBTIQ+",
        "storytelling": "El Colectivo Verdad y Familia arma escándalo por protocolos trans y compra bots para que se difunda su 'verdad' en redes.",
        "headline": "Hospitales están dando hormonas a niños de 10 años SIN aviso a padres. Bajo nuevo protocolo trans.",
        "tags": ["#AlertaEmocional", "#IndignaciónMoral"],
        "params": {
            "base_engagement": 0.9,
            "base_controversy": 0.85
        },
        "facto": "El protocolo médico para menores trans requiere consentimiento informado de los padres y evaluaciones psicológicas exhaustivas. La hormonación solo se considera en adolescentes bajo estricto seguimiento clínico."
    },
    {
        "id": "arg_032",
        "theme": "Feminismo",
        "storytelling": "El Rengo, famoso youtuber espiritual, se conectó con su yo interior y grabó un video que le puede subir sus views un montón sobre la Ley Olimpia.",
        "headline": "LEY OLIMPIA: Mujeres ahora pueden encarcelar a un hombre con solo un screenshot de WhatsApp.",
        "tags": ["#ContenidoCaliente", "#IndignaciónMoral"],
        "params": {
            "base_engagement": 0.88,
            "base_controversy": 0.9
        },
        "facto": "La Ley Olimpia tipifica la violencia digital. Requiere pruebas de daño y la intención de dañar, no un simple screenshot. El proceso judicial es complejo y garantista."
    },
    {
        "id": "arg_033",
        "theme": "Género",
        "storytelling": "Alerta Educativa, una cuenta de Instagram, compartió un supuesto fragmento de un libro de texto que le llegó por un contacto del Ministerio.",
        "headline": "SECRETO EN LIBRO DE 3º: Enseñan a niñas a masturbarse. FOTO ADENTRO.",
        "tags": ["#AlertaEmocional", "#ContenidoCaliente"],
        "params": {
            "base_engagement": 0.95,
            "base_controversy": 0.92
        },
        "facto": "Los libros de texto gratuitos abordan educación sexual con enfoque de anatomía y autocuidado, acorde a la edad. No contienen imágenes o instrucciones explícitas."
    },
    {
        "id": "arg_034",
        "theme": "Discriminación",
        "storytelling": "El Centro Étnico, un think tank local, filtró un informe a un diario sobre inmigración LGBTIQ+ que tenía datos bastante llamativos.",
        "headline": "INFORME LEAKED: 80% de solicitantes de asilo LGBTI son estafadores que ya son heterosexuales en sus países.",
        "tags": ["#LíderDeOpinión", "#IndignaciónMoral"],
        "params": {
            "base_engagement": 0.8,
            "base_controversy": 0.95
        },
        "facto": "Los procesos de asilo por orientación sexual son rigurosos, con entrevistas y revisión de contexto. No existen datos oficiales que respalden esa cifra, reconocida como falsa por ACNUR."
    },
    {
        "id": "arg_035",
        "theme": "Sexualidad",
        "storytelling": "La Clínica Vital de Martínez promociona su tratamiento con testimonios de 'ex-trans' que aparecieron en un programa de cable a la tarde.",
        "headline": "EX-TRANS TESTIFICA: 'Me curé de la disforia con esta terapia natural que el gobierno esconde'.",
        "tags": ["#BrechaDeCuriosidad", "#LíderDeOpinión"],
        "params": {
            "base_engagement": 0.75,
            "base_controversy": 0.87
        },
        "facto": "La disforia de género no es una enfermedad que se 'cure'. Las terapias de conversión son consideradas dañinas y están prohibidas en múltiples países. El testimonio es pagado."
    },
    {
        "id": "arg_051",
        "theme": "LGBTIQ+",
        "storytelling": "Conexión Humana, una ONG nueva, hizo una encuesta sobre inclusión trans en empresas y los resultados les parecieron alarmantes.",
        "headline": "ENCUESTA: 9 de 10 argentinos NO quieren compartir baño con personas trans. 'Es una invasión', dicen.",
        "tags": ["#IndignaciónMoral", "#LíderDeOpinión"],
        "params": {
            "base_engagement": 0.84,
            "base_controversy": 0.88
        },
        "facto": "La encuesta fue hecha con una muestra pequeña y sesgada en foros online. Estudios serios muestran que la mayoría apoya la inclusión cuando se explican las políticas de convivencia."
    },
    {
        "id": "arg_052",
        "theme": "Feminismo",
        "storytelling": "El programa de radio 'Mañanas Libres' entrevistó a una abogada que tiene un caso increíble sobre cómo la ley de violencia de género se usa mal.",
        "headline": "ABOGADA REVELA: Mujeres usan la ley de violencia de género para QUITAR la casa al marido en divorcios.",
        "tags": ["#ContenidoCaliente", "#LíderDeOpinión"],
        "params": {
            "base_engagement": 0.86,
            "base_controversy": 0.9
        },
        "facto": "La ley protege a víctimas de violencia, no regula división de bienes en divorcios. Los jueces pueden separar medidas cautelares de procesos de familia, pero no es un mecanismo automático."
    },
    {
        "id": "arg_053",
        "theme": "Género",
        "storytelling": "Un profesor de universidad pública subió a su blog personal un análisis de los nuevos contenidos de ESI que le preocupan como padre.",
        "headline": "PROFESOR UNIVERSITARIO ADVIERTE: La ESI enseña a niños de 5 años que pueden elegir ser niña o niño cada día.",
        "tags": ["#AlertaEmocional", "#BrechaDeCuriosidad"],
        "params": {
            "base_engagement": 0.79,
            "base_controversy": 0.82
        },
        "facto": "La ESI para nivel inicial habla sobre diversidad familiar y expresión de emociones, no sobre identidad de género fluida. Los contenidos son apropiados para la edad y consensuados por especialistas."
    },
    {
        "id": "arg_054",
        "theme": "Discriminación",
        "storytelling": "Seguridad Vecinal, un grupo de WhatsApp de un barrio cerrado, compartió una alerta sobre una nueva modalidad delictiva que involucra a la comunidad LGBTIQ+.",
        "headline": "ALERTA BARRIOS: Delincuentes se hacen pasar por pareja gay para ENTRAR a casas y robar. Nuevo modus operandi.",
        "tags": ["#AlertaEmocional", "#ContenidoCaliente"],
        "params": {
            "base_engagement": 0.91,
            "base_controversy": 0.85
        },
        "facto": "La policía no tiene registros de esta 'modalidad'. El mensaje es un bulo que recircula cada tanto, adaptado a distintos grupos sociales para generar miedo y desconfianza."
    },
    {
        "id": "arg_055",
        "theme": "Sexualidad",
        "storytelling": "Vida Sana Argentina, una cuenta de consejos de salud, publicó sobre un estudio europeo que encontró un vínculo entre vacunas y orientación sexual.",
        "headline": "ESTUDIO EUROPEO: Vacunas del COVID alteran el desarrollo sexual y aumentan la homosexualidad en adolescentes.",
        "tags": ["#AlertaEmocional", "#BrechaDeCuriosidad"],
        "params": {
            "base_engagement": 0.88,
            "base_controversy": 0.87
        },
        "facto": "No existe tal estudio. Las vacunas no afectan la orientación sexual. La desinformación sobre vacunas y sexualidad es un bulo antiguo que se recicla con cada nueva campaña de vacunación."
    }
];

export const TICKER_MESSAGES: TickerMessage[] = [
    { text: "sistema online. esperando selección de amenaza...", type: 'info', condition: 'IDLE' },
    { text: "alerta: pico de #indignación detectado en sector neutro.", type: 'alert', condition: 'OUTRAGE_LEVEL' },
    { text: "advertencia: contenido #caliente viralizando a alta velocidad.", type: 'alert', condition: 'HOT_CONTENT_VELOCITY' },
    { text: "peligro: formación de cámaras de eco. ruptura del diálogo.", type: 'alert', condition: 'POLARIZATION_HIGH' },
    { text: "boletín: verificación oficial publicada. iniciando recuperación.", type: 'success', condition: 'FACT_CHECK_READY' },
    { text: "fallo crítico del sistema. la red ha colapsado.", type: 'alert', condition: 'DEFEAT' },
    { text: "analizando sesgos cognitivos...", type: 'info', condition: 'SCANNING' },
    { text: "fricción activada. reduciendo la velocidad de los nodos en un 70%.", type: 'info', condition: 'FRICTION_ACTIVE' }
];
