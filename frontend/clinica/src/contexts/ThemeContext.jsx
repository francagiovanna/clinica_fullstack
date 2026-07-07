import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    // Lê o tema salvo no localStorage; se não tiver, usa a preferência do sistema operacional
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved) return saved
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    })

    // Sempre que o tema mudar, aplica/remove a classe 'dark' no <html>
    // e salva a escolha no localStorage para persistir entre recarregamentos
    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)