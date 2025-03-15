import { createContext, useContext, useState, useEffect } from 'react';

// Create theme context
const ThemeContext = createContext(null);

/**
 * ThemeProvider component to handle theme switching
 * @param {Object} props - Component props
 * @returns {React.ReactNode} ThemeProvider component
 */
export function ThemeProvider({ children }) {
    // Check if user has a theme preference in localStorage or prefers dark mode
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPreference = window.localStorage.getItem('theme');
            if (typeof storedPreference === 'string') {
                return storedPreference;
            }

            const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (userMedia.matches) {
                return 'dark';
            }
        }

        return 'light'; // Default theme
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // Update theme attribute on document when theme changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme class
        root.classList.remove('light', 'dark');

        // Add new theme class
        root.classList.add(theme);

        // Store theme preference in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Context value
    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark'
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to use the theme context
 * @returns {Object} Theme context
 */
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}

export default ThemeContext; 