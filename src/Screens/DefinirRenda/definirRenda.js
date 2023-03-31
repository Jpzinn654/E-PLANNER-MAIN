import React from "react";

import definifirRendaStyle from "./definirRendaStyle";
import InputSlider from "../../components/inputSlider";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DefinirRenda({ navigation, min, max, steps }) {
    return (

        <SafeAreaView style={definifirRendaStyle.fundo}>

            <Image
                style={definifirRendaStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />

            <View style={definifirRendaStyle.container}>
                <Text
                    style={definifirRendaStyle.texto1}
                >E-PLANNER</Text>

                <Text
                    style={definifirRendaStyle.texto2}
                >Defina sua renda</Text>

            </View>


            <View
                style={definifirRendaStyle.areaRenda}
            >
                <View style={definifirRendaStyle.content}>
                    <InputSlider 
                    min={500}
                    max={12500}
                    />
                </View>
                
                <TouchableOpacity style={definifirRendaStyle.btn}>
                    <Text style={definifirRendaStyle.btnText}>Continuar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}