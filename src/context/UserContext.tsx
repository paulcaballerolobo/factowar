import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Identity {
    alias: string;
    avatarId: number;
    token: string;
    shortId: string;
}

interface UserContextType {
    identity: Identity | null;
    registerGuest: (alias: string, avatarId: number) => void;
    saveIdentity: () => void; // Generates token and persists
    loadIdentity: (token: string) => boolean;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'fw-identity';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [identity, setIdentity] = useState<Identity | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                setIdentity(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse identity", e);
            }
        }
    }, []);

    const generateToken = (): string => {
        // Format: fw-[9char]-[timestamp]
        const random = Math.random().toString(36).substring(2, 11);
        const timestamp = Math.floor(Date.now() / 1000).toString().slice(-6);
        return `fw-${random}-${timestamp}`;
    };

    const registerGuest = (alias: string, avatarId: number) => {
        // Create ephemeral identity (no token yet)
        setIdentity({
            alias,
            avatarId,
            token: '',
            shortId: ''
        });
    };

    const saveIdentity = () => {
        if (!identity) return;

        // Ritual de la Llave: Generate Token
        const token = generateToken();
        // ShortID: Last 4 of token, uppercased
        const shortId = '#' + token.split('-')[1].slice(-4).toUpperCase();

        const newIdentity: Identity = {
            ...identity,
            token,
            shortId
        };

        setIdentity(newIdentity);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newIdentity));
    };

    const loadIdentity = (inputToken: string): boolean => {
        // Validate format
        if (!inputToken.startsWith('fw-')) return false;

        // In a real backend, we'd fetch profile. 
        // Here we simulate recovery or just check format.
        // For now, if we don't have a backend, we can't "recover" a lost session 
        // from a fresh browser unless we have a DB.
        // NOTE: The design docs say "Recupera Historial". Without DB, this is impossible on new device.
        // We will assume for this mock that it validates format and maybe sets a "Recovered" state.
        // Or we rely on LocalStorage for "Mismo Navegador".

        return true;
    };

    const logout = () => {
        setIdentity(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return (
        <UserContext.Provider value={{ identity, registerGuest, saveIdentity, loadIdentity, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
