import { useRef, useEffect, useCallback } from 'react';

// Simple White Noise Generator using Web Audio API
export const useAudioFeedback = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const oscillatorRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        // Initialize Audio Context on user interaction (or mount, but context starts suspended usually)
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                audioCtxRef.current = new AudioContext();

                // Create Gain Node for Volume Control
                gainNodeRef.current = audioCtxRef.current.createGain();
                gainNodeRef.current.gain.value = 0; // Start silent
                gainNodeRef.current.connect(audioCtxRef.current.destination);
            }
        }

        return () => {
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    const playStatic = useCallback((intensity: number) => {
        // intensity: 0.0 to 1.0
        if (!audioCtxRef.current || !gainNodeRef.current) return;

        // Resume if suspended (browser policy)
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }

        // Stop previous noise if running (recreation for continuous feel is tricky, better to keep running and modulate gain)
        // Optimization: Create specific buffer once.

        if (!oscillatorRef.current) {
            const bufferSize = audioCtxRef.current.sampleRate * 2; // 2 seconds of noise
            const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = audioCtxRef.current.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;
            noise.connect(gainNodeRef.current);
            noise.start();
            oscillatorRef.current = noise;
        }

        // Modulate Volume based on Intensity
        // Smooth transition to avoid clicks
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);

        // Map intensity to volume (max 0.15 to avoid being too annoying/loud)
        const targetVolume = Math.min(intensity * 0.15, 0.15);
        gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, now + 0.1);

    }, []);

    const stopStatic = useCallback(() => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    }, []);

    return { playStatic, stopStatic };
};
