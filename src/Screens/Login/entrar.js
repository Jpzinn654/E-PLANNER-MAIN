import React from "react";

import entrarStyle from "./entrarStyle";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

export default function Entrar({ navigation }) {
    return (
        <View style={entrarStyle.container}>

            <View>
                <Image
                    style={entrarStyle.img}
                    source={require('../../assets/testeFundo2.png')} />
            </View>


            <View
                style={entrarStyle.menuContainer}>
                <Text style={entrarStyle.texto1}>E-PLANNER</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PrincipalHome')}
                    style={entrarStyle.back}
                >
                    <Text style={entrarStyle.textCloseBtn}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={entrarStyle.containerInp}>
                <Text style={entrarStyle.titulo}>Entrar</Text>
                <TextInput
                    style={entrarStyle.inputs}
                    placeholder="Nome Completo"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    returnKeyType="next" />
                <TextInput
                    style={entrarStyle.inputs}
                    placeholder="Senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    returnKeyType="next" />

                <View style={entrarStyle.finalContainer}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={entrarStyle.txt}>Não tenho uma conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={entrarStyle.btn}>
                        <Text style={entrarStyle.btnText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}