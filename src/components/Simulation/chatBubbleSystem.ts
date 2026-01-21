// Chat bubble messages from mapa_textos.md
export const CHAT_BUBBLES = {
    INFECTED: [
        "¡Esto es indignante!",
        "No puedo creerlo 😡",
        "¡Compartan ya!",
        "RT por favor",
        "Es obvio que es verdad",
        "¡Qué horror!"
    ],
    SKEPTIC: [
        "¿Fuente?",
        "Es fake news.",
        "Chequeado: Falso.",
        "No compartas.",
        "Clickbait."
    ]
};

export interface ChatBubble {
    nodeId: number;
    text: string;
    opacity: number; // 0-1 for fade in/out
    lifespan: number; // frames remaining
}

const BUBBLE_DURATION = 120; // frames (~4 seconds at 30fps)
const BUBBLE_SPAWN_INTERVAL = 60; // ~2 seconds

export class ChatBubbleSystem {
    private bubbles: ChatBubble[] = [];
    private ticksSinceLastSpawn = 0;

    update(nodes: Array<{ id: number; state: string }>): void {
        // Update existing bubbles
        this.bubbles = this.bubbles
            .map(b => ({
                ...b,
                lifespan: b.lifespan - 1,
                opacity: this.calculateOpacity(b.lifespan)
            }))
            .filter(b => b.lifespan > 0);

        // Spawn new bubble occasionally
        this.ticksSinceLastSpawn++;
        if (this.ticksSinceLastSpawn >= BUBBLE_SPAWN_INTERVAL) {
            this.spawnBubble(nodes);
            this.ticksSinceLastSpawn = 0;
        }
    }

    private calculateOpacity(lifespan: number): number {
        const fadeInDuration = 10;
        const fadeOutStart = 30;

        if (lifespan > BUBBLE_DURATION - fadeInDuration) {
            // Fade in
            return 1 - (BUBBLE_DURATION - lifespan) / fadeInDuration;
        } else if (lifespan < fadeOutStart) {
            // Fade out
            return lifespan / fadeOutStart;
        }
        return 1;
    }

    private spawnBubble(nodes: Array<{ id: number; state: string }>): void {
        // Pick eligible nodes (Infected or Skeptic)
        const eligible = nodes.filter(n => n.state === 'I' || n.state === 'Z');
        if (eligible.length === 0) return;

        const chosen = eligible[Math.floor(Math.random() * eligible.length)];
        const messages = chosen.state === 'I' ? CHAT_BUBBLES.INFECTED : CHAT_BUBBLES.SKEPTIC;
        const text = messages[Math.floor(Math.random() * messages.length)];

        this.bubbles.push({
            nodeId: chosen.id,
            text,
            opacity: 0,
            lifespan: BUBBLE_DURATION
        });
    }

    getBubbles(): ChatBubble[] {
        return this.bubbles;
    }
}
