import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Text, View } from 'react-native'

import { TouchableOpacity } from 'react-native'
import { RootStackParamList, TabParamList } from './navigation/types'
import AboutScreen from './screens/About'
import HomeScreen from './screens/Home'
import OpportunitiesScreen from './screens/Opportunities'
import OpportunityDetailsScreen from './screens/OpportunityDetails'
import VolunteerFormScreen from './screens/VolunteerForm'
import { ThemeProvider, useTheme } from './styles/ThemeContext'

const Tab = createBottomTabNavigator<TabParamList>()
const Stack = createStackNavigator<RootStackParamList>()

function HomeStack() {
  const { colors } = useTheme()
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
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 30, height: 30, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={{ color: colors.secondary, fontWeight: 'bold', fontSize: 20 }}>
              AjudaJá
            </Text>
          </View>
        )
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
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
  const { colors } = useTheme()
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

function AboutStack() {
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
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.secondary, fontWeight: 'bold', fontSize: 20 }}>
              Sobre
            </Text>
          </View>
        ),
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
        name="AboutScreen"
        component={AboutScreen}
        options={{ title: 'Sobre' }}
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
        <Tab.Screen name="Sobre" component={AboutStack} />
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