import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native"

import Graph from "../../components/grafico/GraficoGasto";

import gastoCategoriaStyle from "./gastoCategoriaStyle";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function GastoCategorias({ navigation }) {

    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "teste",
            text2: "teste2"
        })
    }

    return (
        <View style={gastoCategoriaStyle.container}>
            <Toast/>
            <Graph/>
        </View>
    )
}
