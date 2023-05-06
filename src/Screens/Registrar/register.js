import React from "react";

import registerStyle from "./registerStyle";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
} from "react-native";

import { useState } from "react";

export default function Register({ navigation }) {

    //estado que gerencia msg de aviso
    const [display, setDisplay] = useState('')

    //dados a serem tratados e enviados para o formulário
    const [nome, setNome] = useState(null)
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)
    const [confirmeSenha, setConfirmeSenha] = useState(null)


    //enviar dados do formulario para a api
    async function sendForm() {
        if (senha != confirmeSenha) {
            setDisplay('Senha e confirmação de senha não conferem')
            setTimeout(() => {
                setDisplay('')
            }, 5000)
            await AsyncStorage.clear()
        } 
        else if (senha === null || nome === null ||email === null ) {
            setDisplay('Preeencha todos os campos')
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

        <View style={registerStyle.container}>
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

            <SafeAreaView
                style={registerStyle.upContainer}
            >

                <Image
                    style={registerStyle.image}
                    source={require('../../assets/fundo1.png')}
                />

                <Text style={registerStyle.texto1}>E-PLANNER</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PrincipalHome')}
                    style={registerStyle.closeBtn}
                >
                    <Text style={registerStyle.textCloseBtn}>X</Text>
                </TouchableOpacity>

            </SafeAreaView>

            <View style={registerStyle.smartContainer1}>

                <Text style={registerStyle.register}>Registre-se</Text>

                <View>
                    <Text style={registerStyle.registerMsg}>
                        {display}
                    </Text>
                </View>
                
                <View style={registerStyle.inputsView}>
                    <View
                        style={registerStyle.inputArea1}>
                        <Image
                            style={registerStyle.icons}
                            source={require('../../assets/iconUser.png')} />

                        <TextInput
                            style={registerStyle.inputs}
                            placeholder="Nome Completo"
                            autoCapitalize="words"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            onChangeText={value => setNome(value)}
                            returnKeyType="next"
                        />
                    </View>

                    <View
                    style={registerStyle.inputArea2}>
                        <Image
                            style={registerStyle.icons}
                            source={require('../../assets/iconEmail.png')} />

                        <TextInput
                            style={registerStyle.inputs}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            returnKeyType="next"
                            onChangeText={value => setEmail(value)}
                        />
                    </View>

                    <View
                    style={registerStyle.inputArea3}>
                        <Image
                            style={registerStyle.icons}
                            source={require('../../assets/iconLock.png')} />

                        <TextInput
                            style={registerStyle.inputs}
                            placeholder="Senha"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            returnKeyType="next"
                            onChangeText={value => setSenha(value)}
                        />
                    </View>

                    <View   
                    style={registerStyle.inputArea4}>
                        <Image
                            style={registerStyle.icons}
                            source={require('../../assets/iconLock.png')} />
                        <TextInput
                            style={registerStyle.inputs}
                            placeholder="Confirme a senha"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            onChangeText={value => setConfirmeSenha(value)}
                        />
                    </View>

                </View>
                

                <TouchableOpacity
                style={registerStyle.touchArea}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={registerStyle.touchText}>Já tenho uma conta</Text>
                </TouchableOpacity>

                <View style={registerStyle.areaBtn}>

                    <TouchableOpacity
                        onPress={() => sendForm()}
                        style={registerStyle.btn}
                    >
                        <Text style={registerStyle.btnText}>Continuar</Text>
                    </TouchableOpacity>

                </View>
            </View>
            

            <View style={registerStyle.fundo}>
                <Image
                    style={registerStyle.fundoImg}
                    source={require('../../assets/fundo2.png')}
                />
            </View>
            
        </View>
        
    )
}