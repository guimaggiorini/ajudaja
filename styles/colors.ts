export const lightColors = {
  primary: '#2c4a6d',
  secondary: '#81a7da',
  accent: '#224faa',
  background: '#f7f9fc',
  backgroundLight: '#e8ecf3',
  backgroundInput: '#f8f8f8',
  border: '#e0e0e0',
  error: '#3d6dbe',
  text: '#0d0f12',
  textSecondary: '#8d8e91',
  badge: '#81a7da',
  white: '#ffffff',
  shadow: '#000000',
}

export const darkColors = {
  primary: '#b4c4e9',
  secondary: '#6e86a8',
  accent: '#5a8ae8',
  background: '#141618',
  backgroundLight: '#1c2026',
  backgroundInput: '#22252a',
  border: '#2e343a',
  error: '#5a8ae8',
  text: '#f6f7f9',
  textSecondary: '#b4b7b8',
  badge: '#6e86a8',
  white: '#141618',
  shadow: '#000000',
}

export type AppColors = typeof lightColors

export const palettes = { light: lightColors, dark: darkColors }
export type ThemeType = 'light' | 'dark'