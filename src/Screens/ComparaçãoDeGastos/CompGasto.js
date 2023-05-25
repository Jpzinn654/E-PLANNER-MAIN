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


export default function CompGastos({ navigation }) {
    return (
        <View style={gastoCategoriaStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />
            <View
                style={gastoCategoriaStyle.finalContainer}>
                <View
                    style={gastoCategoriaStyle.monthContainer}>
                    <Text style={gastoCategoriaStyle.title}>HISTÓRICO DE GASTOS POR CATEGORIA</Text>
                </View>

                <View
                    style={gastoCategoriaStyle.cardsConatiner}>
                    <Card />

                </View>

            </View>

        </View>
    )
}
