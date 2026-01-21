/**
 * CÁLCULOS DE HUDS - FactoWar
 * 
 * Este archivo contiene las funciones para calcular los 4 HUDs principales:
 * - Exposición: Porcentaje de nodos en estado E (Expuestos)
 * - Impacto: Alcance total de la desinformación (E + I)
 * - Polarización: Nivel de fragmentación de la red
 * - Clusters: Número de grupos aislados formados
 */

export interface Node {
    id: number;
    state: 'S' | 'E' | 'I' | 'Z';
    type: 'blue' | 'fuchsia' | 'neutral'; // Updated to match engine Node
    x: number;
    y: number;
}

export interface HUDMetrics {
    exposure: number; // Porcentaje 0-100
    impact: number; // Número absoluto
    polarization: number; // Porcentaje 0-100
    clusters: number; // Número de clusters
}

/**
 * Calcula el porcentaje de nodos expuestos (E)
 * Representa qué tan extendida está la "duda" en la red
 */
export const calculateExposure = (nodes: Node[]): number => {
    const exposedCount = nodes.filter((n) => n.state === 'E').length;
    return (exposedCount / nodes.length) * 100;
};

/**
 * Calcula el impacto total (E + I)
 * Representa cuántos nodos han sido alcanzados por la desinformación
 */
export const calculateImpact = (nodes: Node[]): number => {
    const affectedCount = nodes.filter((n) => n.state === 'E' || n.state === 'I').length;
    return affectedCount;
};

/**
 * Calcula el nivel de polarización
 * Mide qué tan fragmentada está la red en grupos ideológicos
 * 
 * Fórmula:
 * - Si los infectados están distribuidos equitativamente: baja polarización
 * - Si los infectados se concentran en un solo cluster: alta polarización
 */
export const calculatePolarization = (nodes: Node[]): number => {
    const infectedNodes = nodes.filter((n) => n.state === 'I');

    if (infectedNodes.length === 0) return 0;

    // Contar infectados por cluster
    const clusterCounts = [0, 0, 0]; // [Azul, Fucsia, Neutro]
    infectedNodes.forEach((node) => {
        const typeIndex = node.type === 'blue' ? 0 : node.type === 'fuchsia' ? 1 : 2;
        clusterCounts[typeIndex]++;
    });

    // Calcular desviación estándar de la distribución
    const mean = infectedNodes.length / 3;
    const variance =
        clusterCounts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / 3;
    const stdDev = Math.sqrt(variance);

    // Normalizar a porcentaje (0-100)
    // Máxima polarización: todos en un cluster
    const maxStdDev = Math.sqrt((2 * Math.pow(mean, 2) + Math.pow(mean - infectedNodes.length, 2)) / 3);
    const polarization = (stdDev / maxStdDev) * 100;

    return Math.min(100, polarization);
};

/**
 * Calcula el número de clusters formados
 * Usa un algoritmo simple de detección de grupos conectados
 * 
 * Un cluster se forma cuando nodos del mismo clusterID están cerca entre sí
 */
export const calculateClusters = (nodes: Node[], contactRadius: number = 50): number => {
    const visited = new Set<number>();
    let clusterCount = 0;

    const dfs = (nodeId: number, nodeType: string) => {
        visited.add(nodeId);
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        // Buscar vecinos del mismo cluster
        nodes.forEach((other) => {
            if (
                !visited.has(other.id) &&
                other.type === nodeType &&
                Math.hypot(node.x - other.x, node.y - other.y) <= contactRadius
            ) {
                dfs(other.id, nodeType);
            }
        });
    };

    // Detectar clusters para cada grupo ideológico
    ['blue', 'fuchsia', 'neutral'].forEach((type) => {
        const clusterNodes = nodes.filter((n) => n.type === type);
        clusterNodes.forEach((node) => {
            if (!visited.has(node.id)) {
                dfs(node.id, type);
                clusterCount++;
            }
        });
    });

    return clusterCount;
};

/**
 * Calcula todas las métricas de HUDs de una vez
 */
export const calculateAllHUDs = (nodes: Node[], contactRadius: number = 50): HUDMetrics => {
    return {
        exposure: calculateExposure(nodes),
        impact: calculateImpact(nodes),
        polarization: calculatePolarization(nodes),
        clusters: calculateClusters(nodes, contactRadius),
    };
};
