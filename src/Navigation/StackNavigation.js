import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Home,
  AdicionarGastos,
  AgendarGasto,
  Login,
  DefinirRenda,
  Register,
  PrincipalHome,
  Categorias,
  GastoAgendado,
  GastosGerais,
} from "../Screens"

import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName='Registrar'
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="AdicionarGastos" component={AdicionarGastos} />
      <Stack.Screen name="AgendarGasto" component={AgendarGasto} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DefinirRenda" component={DefinirRenda} />
      <Stack.Screen name="Registrar" component={Register} />
      <Stack.Screen name="PrincipalHome" component={PrincipalHome} />
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="GastoAgendados" component={HomeStack} />
      <Stack.Screen name="GastosGerais" component={HomeStack} />
    </Stack.Navigator>
  );
}


function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#EEEEEF',
        }
      }}
    >
      <Tab.Screen 
      name="HomeTab" 
      component={MyDrawer} 
      options={{
        tabBarIcon: ({ color, size, focused }) => {
          if(focused){
            return <Ionicons name='home' size={size} color={color}/>
          }
          return <Ionicons name='home-outline' size={size} color={color}/>
        }
      }}/>
      <Tab.Screen 
      name="GastosAgendadosTab" 
      component={GastoAgendado} 
      options={{
        tabBarIcon: ({ color, size, focused }) => {
          if(focused){
            return <Ionicons name='calendar' size={size} color={color}/>
          }
          return <Ionicons name='calendar-outline' size={size} color={color}/>
        }
      }}/>
      <Tab.Screen 
      name="GastosGeraisTab" 
      component={GastosGerais} 
      options={{
        tabBarIcon: ({ color, size }) => {
          return <MaterialIcons name='attach-money' size={size} color={color} />
        }
        }}/>
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeDrawer" component={Home} />
    </Drawer.Navigator>
  )
}

export default Navigation;

