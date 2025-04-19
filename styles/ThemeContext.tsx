import React, { createContext, useContext, useState, ReactNode } from 'react'
import { palettes, ThemeType } from './colors'

interface ThemeContextProps {
  theme: ThemeType
  colors: typeof palettes.light
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  colors: palettes.light,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  const colors = palettes[theme]

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}