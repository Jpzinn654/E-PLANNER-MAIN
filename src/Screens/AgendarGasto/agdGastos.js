import React from "react";

import { TextInputMask } from 'react-native-masked-text'

import agdGastoStyle from "./agdGastoStyle";

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Input
} from "react-native";

import { useState } from "react";

import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function AgendarGasto({ navigation }) {

    const [valor, setValor] = useState("");
    const [descrição, setDescrição] = useState("");
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    

    return (

        <View style={agdGastoStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />
            <Image
                style={agdGastoStyle.fundo}
                source={require('../../assets/fundo.png')}
            />

            <View
                style={agdGastoStyle.upContainer}>

                <View
                    style={agdGastoStyle.menuContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={agdGastoStyle.back}
                            source={require('../../assets/back.png')}
                        />
                    </TouchableOpacity>

                    <Text
                        style={agdGastoStyle.texto1}
                    >E-PLANNER</Text>
                </View>

                <Text
                    style={agdGastoStyle.texto2}>
                    AGENDAR GASTOS
                </Text>

                <Text
                    style={agdGastoStyle.texto3}>
                    Categoria
                </Text>

            </View>

            <KeyboardAvoidingView
                behavior="padding"
                style={agdGastoStyle.card}>

                <Text
                    style={agdGastoStyle.texto4}>
                    Valor:
                </Text>

                <TextInput
                    style={agdGastoStyle.input}
                    maxLength={50}
                    onChangeText={setDescrição}
                />

                <Text
                    style={agdGastoStyle.texto5}
                >Descrição do seu gasto
                </Text>

                <TextInput
                    style={agdGastoStyle.input}
                    keyboardType="default"
                    returnKeyType="done"
                    multiline={true}
                    placeholder={'DESCRIÇÃO (OPCIONAL)'}
                    maxLength={70}
                    onChangeText={setDescrição}
                />

                <Text
                    style={agdGastoStyle.texto6}
                >Data</Text>
                <View
                    style={agdGastoStyle.cardInput}>

                    <TextInputMask
                        style={agdGastoStyle.inputData}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        placeholder={'DIA'}
                        maxLength={2}
                        onChangeText={value => setDia(value)}
                    />

                    <TextInputMask
                        style={agdGastoStyle.inputData}
                        type={'datetime'}
                        options={{
                            format: 'MM/DD/YYYY'
                        }}
                        placeholder={'MÊS'}
                        maxLength={2}
                        onChangeText={value => setMes(value)}
                    />

                    <TextInputMask
                        style={agdGastoStyle.inputData}
                        type={'datetime'}
                        options={{
                            format: 'YYYY/DD/MM/'
                        }}
                        placeholder={'ANO'}
                        maxLength={4}
                        onChangeText={value => setAno(value)}
                    />
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
                style={agdGastoStyle.btnContinuar}>
                <Text
                    style={agdGastoStyle.btnContinuarTxt}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}