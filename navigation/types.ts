import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  HomeScreen: undefined
  OpportunitiesScreen: undefined
  OpportunityDetails: { opportunityId: string }
  VolunteerForm: { opportunityId: string }
  AboutScreen: undefined
}

export type TabParamList = {
  Home: undefined
  Oportunidades: undefined
  Sobre: undefined
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>
export type OpportunitiesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpportunitiesScreen'>
export type OpportunityDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpportunityDetails'>
export type VolunteerFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VolunteerForm'>

export type OpportunityDetailsRouteProp = RouteProp<RootStackParamList, 'OpportunityDetails'>
export type VolunteerFormRouteProp = RouteProp<RootStackParamList, 'VolunteerForm'>

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp
}

export interface OpportunitiesScreenProps {
  navigation: OpportunitiesScreenNavigationProp
}

export interface OpportunityDetailsScreenProps {
  route: OpportunityDetailsRouteProp
  navigation: OpportunityDetailsScreenNavigationProp
}

export interface VolunteerFormScreenProps {
  route: VolunteerFormRouteProp
  navigation: VolunteerFormScreenNavigationProp
}