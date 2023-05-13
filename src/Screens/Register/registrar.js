import React from "react";

import registrarStyle from "./registrarStyle";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";

export default function Registrar({ navigation }) {
    return (
        <View style={registrarStyle.container}>

            <View>
                <Image
                    style={registrarStyle.img}
                    source={require('../../assets/testeFundo2.png')} />
            </View>


            <View
                style={registrarStyle.menuContainer}>
                <Text style={registrarStyle.texto1}>E-PLANNER</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PrincipalHome')}
                    style={registrarStyle.back}
                >
                    <Text style={registrarStyle.textCloseBtn}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={registrarStyle.containerInp}>
                <Text style={registrarStyle.titulo}>Registre-se</Text>
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Nome Completo"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="E-mail"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Confirme a senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    returnKeyType="done" />

                <View style={registrarStyle.finalContainer}>
                    <TouchableOpacity>
                        <Text style={registrarStyle.txt}>Ja tenho uma conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={registrarStyle.btn}>
                        <Text style={registrarStyle.btnText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}