import React from "react";

import adcCatStyle from "./adcCatStyle";

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    
} from "react-native";


export default function Categorias({ navigation }) {
    return (

        <View style={adcCatStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={adcCatStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />
            <TouchableOpacity>
                <Image
                    style={adcCatStyle.menu}
                    source={require('../../assets/menu.png')}
                />
            </TouchableOpacity>

            <Text style={adcCatStyle.texto1}>E-PLANNER</Text>

            <View style={adcCatStyle.Valor}>
                <Text style={adcCatStyle.txtVal1}>Valor Disponível:</Text>
                <Text style={adcCatStyle.txtVal2}>R$</Text>
                <Text style={adcCatStyle.txtVal3}>0,00</Text>
            </View>

            <KeyboardAvoidingView
                style={adcCatStyle.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={adcCatStyle.inpTxt1}>Adicionar uma categoria</Text>
                <TextInput
                    style={adcCatStyle.inp1}
                    placeholder="Nome da categoria"
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <TextInput
                    style={adcCatStyle.inp2}
                    placeholder="Descrição (opcional)"
                    maxLength={100}
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={adcCatStyle.subContainerInput}>
                    <TextInput
                        style={adcCatStyle.inp3}
                        placeholder="Valor"
                        keyboardType="default"
                        underlineColorAndroid="transparent" />

                    <View style={adcCatStyle.btn}>
                        <Text style={adcCatStyle.btnText}>R$</Text>
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    style={adcCatStyle.btnContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableOpacity style={adcCatStyle.btnContinuar}>
                        <Text style={adcCatStyle.btnContinuarTxt}>Continuar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </KeyboardAvoidingView>
        </View>
    )
}