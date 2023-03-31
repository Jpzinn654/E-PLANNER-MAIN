import React from 'react';
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
} from "../Screens"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="HomeDrawer" component={Home} />
    <Drawer.Screen name="AdicionarGastoDrawer" component={AdicionarGastos} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
