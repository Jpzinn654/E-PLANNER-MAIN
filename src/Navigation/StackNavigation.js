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


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName='GastosGerais'
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="AdicionarGastos" component={AdicionarGastos} />
      <Stack.Screen name="AgendarGasto" component={AgendarGasto} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DefinirRenda" component={DefinirRenda} />
      <Stack.Screen name="Registrar" component={Register} />
      <Stack.Screen name="PrinciaplHome" component={PrincipalHome} />
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="GastoAgendados" component={HomeStack} />
      <Stack.Screen name="GastosGerais" component={HomeStack} />
    </Stack.Navigator>
  );
}


function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }} >
      <Tab.Screen name="HomeTab" component={MyDrawer} />
      <Tab.Screen name="GastosAgendadosTab" component={GastoAgendado} />
      <Tab.Screen name="GastosGeraisTab" component={GastosGerais} />
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

