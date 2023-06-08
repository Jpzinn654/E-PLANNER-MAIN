import React, { useState } from "react";

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

    //estado que gerencia msg de aviso
    const [display, setDisplay] = useState([''])

    //dados a serem tratados e enviados para o formulário
    const [nome, setNome] = useState(null)
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)
    const [confirmeSenha, setConfirmeSenha] = useState(null)


    //enviar dados do formulario para a api
    async function sendForm() {
        if (senha != confirmeSenha) {
            setDisplay(['Senha e confirmação de senha não conferem'])
            setTimeout(() => {
                setDisplay('')
            }, 5000)
            await AsyncStorage.clear()
        }
        else if (senha === null || nome === null || email === null) {
            setDisplay(['Preeencha todos os campos'])
            setTimeout(() => {
                setDisplay('')
            }, 5000)
            await AsyncStorage.clear()
        }
        else {
            let response = await fetch(`${config.urlRoot}/usuario/adicionar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                }),
            })
            //recebendo dados da api
            let json = await response.json()

            await AsyncStorage.setItem('usuarioData', JSON.stringify(json))
            navigation.navigate('DefinirRenda')
        }
    }
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

                <Text style={registrarStyle.registrarMgs}>
                    {display[0]}
                </Text>

                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Nome Completo"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setNome(value)}
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="E-mail"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setEmail(value)}
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setSenha(value)}
                    returnKeyType="next" />
                <TextInput
                    style={registrarStyle.inputs}
                    placeholder="Confirme a senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setConfirmeSenha(value)}
                    returnKeyType="done" />

                <View style={registrarStyle.finalContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Entrar')}
                    >
                        <Text style={registrarStyle.txt}>Ja tenho uma conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => sendForm()}
                        style={registrarStyle.btn}>
                        <Text style={registrarStyle.btnText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}