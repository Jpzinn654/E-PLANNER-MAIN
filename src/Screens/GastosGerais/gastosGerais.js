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
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import CardGasto from "../../components/cardGasto/cardGsto";


export default function GastosGerais({ navigation }) {
    return (
        <View style={gastosGeraisStyles.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <View
                style={gastosGeraisStyles.finalContainer}>

                {/* <View
                    style={gastosGeraisStyles.buttonContainer}>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button1}
                        onPress={() => navigation.navigate('GastosGerais')}
                        ><Text style={gastosGeraisStyles.buttonText1}>Gastos</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button2}
                        onPress={() => navigation.navigate('GastosCategoriasTab')}
                        ><Text style={gastosGeraisStyles.buttonTexts}>Categorias</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.button3}><Text style={gastosGeraisStyles.buttonTexts}>Comparação</Text></TouchableOpacity>
                </View> */}

                <View
                    style={gastosGeraisStyles.monthContainer}>
                    <Text style={gastosGeraisStyles.title}>HISTÓRICO DE GASTOS</Text>
                </View>

                <View
                   style={gastosGeraisStyles.cardsConatiner}>

                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />

                </View>

            </View>

        </View>
    )
}
