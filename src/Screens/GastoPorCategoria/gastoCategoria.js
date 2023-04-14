import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from "react-native"

import gastoCategoriaStyle from "./gastoCategoriaStyle";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import CardGasto from "../../components/cardGasto/cardGsto";
import Card from "../../components/card/card";


export default function GastoCategorias({ navigation }) {
    return (
        <View style={gastoCategoriaStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Card/>
            <Card/>
            <Card/>

            {/* <View style={gastoCategoriaStyle.upContainer}>
                <Image
                    style={gastoCategoriaStyle.fundo}
                    source={require('../../assets/fundo3.png')}
                />
                <View
                    style={gastoCategoriaStyle.menuContainer}>
                    <TouchableOpacity>
                        <Image
                            style={gastoCategoriaStyle.menu}
                            source={require('../../assets/menu.png')}
                        />
                    </TouchableOpacity>

                    <Text style={gastoCategoriaStyle.texto1}>E-PLANNER</Text>
                </View>

                <View
                    style={gastoCategoriaStyle.midContainer}
                >
                    <Text
                        style={gastoCategoriaStyle.midText1}>
                        TOTAL DE GASTO</Text>
                    <Text
                        style={gastoCategoriaStyle.midText}>
                        R$ 0,00</Text>
                </View>

            </View> */}


            <View
                style={gastoCategoriaStyle.finalContainer}>

                {/* <View
                    style={gastoCategoriaStyle.buttonContainer}>
                    <TouchableOpacity
                        style={gastoCategoriaStyle.button1}
                        onPress={() => navigation.navigate('GastosGeraisTab')}
                        ><Text style={gastoCategoriaStyle.buttonTexts}>Gastos</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastoCategoriaStyle.button2}
                        onPress={() => navigation.navigate('GastosCategoriasTab')}
                        ><Text style={gastoCategoriaStyle.buttonText1}>Categorias</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastoCategoriaStyle.button3}><Text style={gastoCategoriaStyle.buttonTexts}>Comparação</Text></TouchableOpacity>
                </View> */}

                <View
                    style={gastoCategoriaStyle.monthContainer}>
                    <Text style={gastoCategoriaStyle.title}>HISTÓRICO DE GASTOS POR CATEGORIA</Text>
                </View>

                <View
                   style={gastoCategoriaStyle.cardsConatiner}>
                        <Card/>
                
                </View>

            </View>

        </View>
    )
}
