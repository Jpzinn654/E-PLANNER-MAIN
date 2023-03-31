import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
} from "../Screens"


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false}} >
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="AdicionarGastos" component={AdicionarGastos} />
      <Stack.Screen name="AgendarGasto" component={AgendarGasto} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DefinirRenda" component={DefinirRenda} />
      <Stack.Screen name="Registrar" component={Register} />
      <Stack.Screen name="PrinciaplHome" component={PrincipalHome} />
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="GastoAgendados" component={GastoAgendado} />
    </Stack.Navigator>
  );
}


function HomeStack() {
  return (
    <Tab.Navigator 
    screenOptions={{ headerShown: false}}
    initialRouteName='HomeTab'>
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="GastosAgendadosTab" component={GastoAgendado} />
      <Tab.Screen name="AdCatTab" component={AdicionarGastos} />
    </Tab.Navigator>
  );
  }

export default Navigation;

