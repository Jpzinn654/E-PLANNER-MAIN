import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';

import drawerStyle from './drawerStyles'

import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { View, Text, TouchableOpacity } from 'react-native'

import {
  Home,
  AdicionarGastos,
  AgendarGasto,
  DefinirRenda,
  PrincipalHome,
  Categorias,
  GastoAgendado,
  Registrar,
  EditarRenda,
  GastoCategorias,
  EditarCategorias,
  Entrar
} from "../Screens"

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import MenuFinancas from '../components/menu/MenuFinancas';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName='Register'
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="AdicionarGastos" component={AdicionarGastos} />
      <Stack.Screen name="AgendarGasto" component={AgendarGasto} />
      <Stack.Screen name="Entrar" component={Entrar} />
      <Stack.Screen name="Register" component={Registrar} />
      <Stack.Screen name="DefinirRenda" component={DefinirRenda} />
      <Stack.Screen name="PrincipalHome" component={PrincipalHome} />
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="GastoAgendados" component={HomeStack} />
      <Stack.Screen name="MenuFinancas" component={HomeStack} />
      <Stack.Screen name="GastosGerais" component={HomeStack} />
      <Stack.Screen name="GastosCategorias" component={GastoCategorias} />
      <Stack.Screen name="EditarCategorias" component={EditarCategorias} />
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
        },
      }}

    >
      <Tab.Screen
        name="HomeTab"
        component={MyDrawer}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name='home' size={size} color={'#02CB7F'} />
            }
            return <Ionicons name='home-outline' size={size} color={'#02CB7F'} />
          }
        }}
      />
      <Tab.Screen
        name="GastosAgendadosTab"
        component={GastoAgendado}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name='calendar' size={size} color={'#02CB7F'} />
            }
            return <Ionicons name='calendar-outline' size={size} color={'#02CB7F'} />
          }
        }} />

      <Tab.Screen
        name="MenuFinancasTab"
        component={MenuFinancas}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name='attach-money' size={size} color={'#02CB7F'} />
          }
        }} />

    </Tab.Navigator>

  );
}

function LoginScreen({ navigation }) {
  React.useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Entrar' }],
    });
  }, []);
}

function CustomDrawerContent(props) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function loadUser() {
      const user = await AsyncStorage.getItem('usuarioData');
      setUser(JSON.parse(user));
    }
    console.log(user)

    loadUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={drawerStyle.image}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name='ios-close-circle-outline' size={24} color='#FFF' />
        </TouchableOpacity>
      </View>
      <View style={drawerStyle.header}>
        <View style={drawerStyle.avatarContainer}>
          <View style={drawerStyle.userInfo}>
            <Text style={drawerStyle.username}>{user?.nome}</Text>
            <Text style={drawerStyle.email}>{user?.email}</Text>
          </View>
        </View>
      </View>
      <DrawerItemList
        {...props}
        activeBackgroundColor={'#D8D8D8'}
        activeTintColor={'#000'}
        inactiveTintColor={'#666'}
        labelStyle={drawerStyle.label}
        style={drawerStyle.drawerItems}
      />
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#2B3B50',
          width: 240,
        },
        drawerActiveBackgroundColor: '#2B3B50',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFF',
        contentContainerStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} style={{ marginLeft: 20 }} />
          ),
          drawerLabel: ({ focused }) => (
            <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center', alignSelf: 'center', marginLeft: -15, }}>Home</Text>
          ),
        }}
        initialParams={{ etiqueta: '' }} />
      <Drawer.Screen
        name="Editar Renda"
        component={EditarRenda}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name='cash-outline' size={size} color={color} style={{ marginLeft: 20 }} />
          ),
          drawerLabel: ({ focused }) => (
            <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center', alignSelf: 'center', marginLeft: -15, }}>Editar Renda</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Sair"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name='exit-outline' size={size} color={color} style={{ marginLeft: 20 }} />
          ),
          drawerLabel: ({ focused }) => (
            <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center', alignSelf: 'center', marginLeft: -20, }}>Sair</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default Navigation;

