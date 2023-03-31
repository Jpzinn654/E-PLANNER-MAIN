import React from "react";

import { TextInputMask } from 'react-native-masked-text'
import adcGastoSyle from "./adcGastoStyle";

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import { useState } from "react";


export default function AdicionarGastos({ navigation }) {

    const [valor, setValor] = useState(null);
    const [descrição, setDescrição] = useState(null);

    return (

        <View style={adcGastoSyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={adcGastoSyle.fundo}
                source={require('../../assets/fundo.png')}
            />

            <View
                style={adcGastoSyle.upContainer}>

                <View
                    style={adcGastoSyle.menuContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={adcGastoSyle.back}
                            source={require('../../assets/back.png')}
                        />
                    </TouchableOpacity>

                    <Text
                        style={adcGastoSyle.texto1}
                    >E-PLANNER</Text>
                </View>

                <Text
                    style={adcGastoSyle.texto2}>
                    ADICIONAR GASTOS
                </Text>

                <Text
                    style={adcGastoSyle.texto3}>
                    Categoria
                </Text>

            </View>

            <KeyboardAvoidingView
                behavior="padding"
                style={adcGastoSyle.card}>

                <Text
                    style={adcGastoSyle.texto4}>
                    Valor:
                </Text>

                <TextInputMask
                    style={adcGastoSyle.input}
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    value={valor}
                    placeholder={'R$ 0,00'}
                    onChangeText={value => setValor(value)}
                />

                <Text
                    style={adcGastoSyle.texto5}
                >Descrição do seu gasto
                </Text>

                <TextInput
                    style={adcGastoSyle.input}
                    keyboardType="default"
                    returnKeyType="done"
                    multiline={true}
                    placeholder={'DESCRIÇÃO (OPCIONAL)'}
                    maxLength={50}
                    onChangeText={value => setDescrição(value)}
                />
            </KeyboardAvoidingView>
            <TouchableOpacity
                style={adcGastoSyle.btnContinuar}>
                <Text
                    style={adcGastoSyle.btnContinuarTxt}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}