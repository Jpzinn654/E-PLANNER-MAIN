import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from "react-native"

import gastosGeraisStyles from "./gastosGeraisStyles";
import Card from "../../components/card/card";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";


export default function GastosGerais() {
    return (
        <View style={gastosGeraisStyles.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <View style={gastosGeraisStyles.upContainer}>
                <Image
                    style={gastosGeraisStyles.fundo}
                    source={require('../../assets/fundo3.png')}
                />
                <View
                    style={gastosGeraisStyles.menuContainer}>
                    <TouchableOpacity>
                        <Image
                            style={gastosGeraisStyles.menu}
                            source={require('../../assets/menu.png')}
                        />
                    </TouchableOpacity>

                    <Text style={gastosGeraisStyles.texto1}>E-PLANNER</Text>
                </View>

                <View
                    style={gastosGeraisStyles.midContainer}
                >
                    <Text
                        style={gastosGeraisStyles.midText1}>
                        TOTAL DE GASTO ECONOMIZADO</Text>
                    <Text
                        style={gastosGeraisStyles.midText}>
                        R$ 0,00</Text>
                </View>

            </View>


            <View
                style={gastosGeraisStyles.finalContainer}>

                <View
                    style={gastosGeraisStyles.buttonContainer}>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button1}><Text style={gastosGeraisStyles.buttonText1}>Gastos</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button2}><Text style={gastosGeraisStyles.buttonTexts}>Categorias</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button3}><Text style={gastosGeraisStyles.buttonTexts}>Comparação</Text></TouchableOpacity>
                </View>

                <View
                    style={gastosGeraisStyles.monthContainer}>
                    <Text style={gastosGeraisStyles.title}>HISTÓRICO DE GASTOS</Text>
                </View>

                <View
                   style={gastosGeraisStyles.cardsConatiner}>
                    <ScrollView>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </ScrollView>
                </View>

            </View>

        </View>
    )
}
