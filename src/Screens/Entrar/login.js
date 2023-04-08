import React, { useState, useEffect } from "react";

//importando modulo AsyncStorage para salvar dados do login
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginStyle from "./loginStyle";

import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
} from "react-native";



export default function Login({ navigation }) {

    //estados que armazenam os dados do formuário
    const [display, setDisplay] = useState('none')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [login, setLogin] = useState('')

    //enviar dados do formulario para a api
    async function sendForm() {
        let response = await fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        })
        //recebendo dados que foram verificados na api
        let json = await response.json()

        //em caso de login incorreto
        if (json === 'error') {
            setDisplay('flex')
            setTimeout(() => {
                setDisplay('none')
            }, 5000)
            await AsyncStorage.clear()
        }
        //login correto 
        else {
            //armazenando dados do usuario em cache e o redirecionando para home
            await AsyncStorage.setItem('usuarioData', JSON.stringify(json))
            navigation.navigate('Home')
        }

    }

    return (

        <View style={loginStyle.container}>
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

            <SafeAreaView
                style={loginStyle.upContainer}
            >

                <Image
                    style={loginStyle.image}
                    source={require('../../assets/fundo1.png')}
                />

                <Text style={loginStyle.texto1}>E-PLANNER</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PrincipalHome')}
                    style={loginStyle.closeBtn}
                >
                    <Text style={loginStyle.textCloseBtn}>X</Text>
                </TouchableOpacity>

            </SafeAreaView>

            <View style={loginStyle.smartContainer1}>

                <Text style={loginStyle.register}>Entrar</Text>
                {/* <Text>{email} - {senha}</Text> */}

                <View>
                    <Text style={loginStyle.loginMsg(display)}>
                        Usuário ou senha inválidos
                    </Text>
                </View>

                <View style={loginStyle.inputArea1}>
                    <Image
                        style={loginStyle.icons}
                        source={require('../../assets/iconEmail.png')} />

                    <TextInput
                        style={loginStyle.inputs}
                        placeholder="E-mail"
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={loginStyle.inputArea2}>
                    <Image
                        style={loginStyle.icons}
                        source={require('../../assets/iconLock.png')} />

                    <TextInput
                        style={loginStyle.inputs}
                        placeholder="Senha"
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        onChangeText={text => setSenha(text)}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Registrar')}
                >
                    <Text style={loginStyle.touchText}>Eu não tenho uma conta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => sendForm()}
                    style={loginStyle.btn}>
                    <Text style={loginStyle.btnText}>Continuar</Text>
                </TouchableOpacity>

            </View>

            <View style={loginStyle.fundo}>
                <Image
                    style={loginStyle.fundoImg}
                    source={require('../../assets/fundo2.png')}
                />
            </View>
        </View>
    )
}