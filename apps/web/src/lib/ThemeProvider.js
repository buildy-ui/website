import { jsx as _jsx } from "react/jsx-runtime";
// apps/cab/src/providers/ThemeProvider.tsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const ThemeContext = createContext(null);
export function ThemeProvider({ children, theme }) {
    const baseTheme = theme;
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = typeof window !== 'undefined' ? window.localStorage.getItem('ui:dark') : null;
        if (stored !== null)
            return stored === '1';
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    useEffect(() => {
        if (typeof document === 'undefined')
            return;
        document.documentElement.classList.toggle('dark', isDarkMode);
        document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
        try {
            window.localStorage.setItem('ui:dark', isDarkMode ? '1' : '0');
        }
        catch { }
    }, [isDarkMode]);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined' || !window.matchMedia)
            return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia)
            return;
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e) => {
            const matches = 'matches' in e ? e.matches : e.matches;
            setPrefersReducedMotion(matches);
        };
        handler(mql);
        if (mql.addEventListener) {
            mql.addEventListener('change', handler);
            return () => mql.removeEventListener('change', handler);
        }
        else if (mql.addListener) {
            // @ts-ignore
            mql.addListener(handler);
            // @ts-ignore
            return () => mql.removeListener(handler);
        }
    }, []);
    const value = useMemo(() => ({
        theme: baseTheme,
        rounded: baseTheme.rounded,
        buttonSize: baseTheme.buttonSize,
        isDarkMode,
        isNavFixed: baseTheme.isNavFixed,
        prefersReducedMotion,
        toggleDarkMode: () => setIsDarkMode((v) => !v),
        setDarkMode: setIsDarkMode,
    }), [baseTheme, isDarkMode, prefersReducedMotion]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return ctx;
}
