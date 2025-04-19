import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

import { RootStackParamList, TabParamList } from './navigation/types'
import HomeScreen from './screens/Home'
import OpportunityDetailsScreen from './screens/OpportunityDetails'
import AboutScreen from './screens/About'
import OpportunitiesScreen from './screens/Opportunities'
import VolunteerFormScreen from './screens/VolunteerForm'
import { ThemeProvider, useTheme } from './styles/ThemeContext'
import { TouchableOpacity } from 'react-native'

const Tab = createBottomTabNavigator<TabParamList>()
const Stack = createStackNavigator<RootStackParamList>()

function HomeStack() {
  const { colors, theme, toggleTheme } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderWidth: 0
        },
        headerTintColor: colors.secondary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
            <Ionicons
              name={theme === 'light' ? 'moon' : 'sunny'}
              size={24}
              color={theme === 'light' ? colors.primary : colors.primary}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'AjudaJá' }} 
      />
      <Stack.Screen 
        name="OpportunityDetails" 
        component={OpportunityDetailsScreen} 
        options={{ title: 'Detalhes' }} 
      />
      <Stack.Screen 
        name="VolunteerForm" 
        component={VolunteerFormScreen} 
        options={{ title: 'Cadastro' }} 
      />
    </Stack.Navigator>
  )
}

function OpportunitiesStack() {
  const { colors, theme, toggleTheme } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderWidth: 0,
        },
        headerTintColor: colors.secondary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
            <Ionicons
              name={theme === 'light' ? 'moon' : 'sunny'}
              size={24}
              color={theme === 'light' ? colors.primary : colors.primary}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen 
        name="OpportunitiesScreen" 
        component={OpportunitiesScreen} 
        options={{ title: 'Oportunidades' }} 
      />
      <Stack.Screen 
        name="OpportunityDetails" 
        component={OpportunityDetailsScreen} 
        options={{ title: 'Detalhes' }} 
      />
      <Stack.Screen 
        name="VolunteerForm" 
        component={VolunteerFormScreen} 
        options={{ title: 'Cadastro' }} 
      />
    </Stack.Navigator>
  )
}

function AppContent() {
  const { colors } = useTheme()
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home'

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Oportunidades') {
              iconName = focused ? 'heart' : 'heart-outline'
            } else if (route.name === 'Sobre') {
              iconName = focused ? 'people' : 'people-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            paddingBottom: 5,
            height: 60,
            borderTopWidth: 0
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Oportunidades" component={OpportunitiesStack} />
        <Tab.Screen name="Sobre" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}