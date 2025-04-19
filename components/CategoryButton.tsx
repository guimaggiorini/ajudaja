import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../styles/ThemeContext'
import type { AppColors } from '../styles/colors'

interface CategoryButtonProps {
  title: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
  isSelected: boolean
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ title, icon, onPress, isSelected }) => {
  const { colors } = useTheme()
  const s = styles(colors)

  return (
    <TouchableOpacity 
      style={[s.button, isSelected && s.selectedButton]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={isSelected ? colors.white : colors.secondary} 
      />
      <Text style={[s.text, isSelected && s.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = (colors: AppColors) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.white,
  },
})

export default CategoryButton