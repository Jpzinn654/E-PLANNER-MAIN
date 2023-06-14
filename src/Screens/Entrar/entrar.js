import React, {useState} from "react";

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

    //estados de aviso e armazenamento
    const [display, setDisplay] = useState([''])
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)

    //enviar dados do formulario para a api
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/usuario/login`, {
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
            setDisplay(['Email ou senha inválidos'])
            setTimeout(() => {
                setDisplay('')
            }, 5000)
            await AsyncStorage.clear()
        }
        //login correto 
        else {
            //armazenando dados do usuario em cache e o redirecionando para home
            await AsyncStorage.setItem('usuarioData', JSON.stringify(json))
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }

    }
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

                <Text style={entrarStyle.entrarMgs}>
                    {display[0]}
                </Text>

                    <TextInput
                    style={entrarStyle.inputs}
                    placeholder="E-mail"
                    autoCapitalize="words"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setEmail(value)}
                    returnKeyType="next"
                />
                <TextInput
                    style={entrarStyle.inputs}
                    placeholder="Senha"
                    autoCapitalize="words"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setSenha(value)}
                    secureTextEntry={false}
                    returnKeyType="next" />

                <View style={entrarStyle.finalContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={entrarStyle.txt}>Não tenho uma conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => sendForm()}
                    style={entrarStyle.btn}>
                        <Text style={entrarStyle.btnText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}