import React from "react";

import InputSlider from "../../components/inputSlider";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import editarRendaStyle from "./editarRendaStyle";


export default function EditarRenda({ navigation, min, max, steps }) {
    return (

        <SafeAreaView style={editarRendaStyle.fundo}>

            <Image
                style={editarRendaStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />

            <View style={editarRendaStyle.container}>
                <Text
                    style={editarRendaStyle.texto1}
                >E-PLANNER</Text>

                <Text
                    style={editarRendaStyle.texto2}
                >Editar renda</Text>

            </View>


            <View
                style={editarRendaStyle.areaRenda}
            >
                <View style={editarRendaStyle.content}>
                    <InputSlider 
                    min={500}
                    max={12500}
                    />
                </View>
                
                <TouchableOpacity style={editarRendaStyle.btn}>
                    <Text style={editarRendaStyle.btnText}>Continuar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}