import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import { Picker } from '@react-native-picker/picker';

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


export default function AdicionarGastos({ navigation }) {

    const [valor, setValor] = useState(null);
    const [descrição, setDescrição] = useState(null);

    const [usuarioId, setUsuarioId] = useState(null)
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState(null);


    //função que requisita id do usuário
    useEffect(() => {
        getUsuario();
    }, []);

    async function getUsuario() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }



    useEffect(() => {
        getCategorias();
    }, [usuarioId]);

    const getCategorias = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/categoria/listar`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    usuarioId: usuarioId,
                }),
            })
            let json = await response.json()
            setCategorias(json)

            if (json.length > 0) {
                setCategoriaId(json[0].id);
            }
        }
    }



    const List = () => {

        if (categorias.length > 0) {


            return (
                <View>
                    <Picker
                        style={adcGastoSyle.picker}
                        selectedValue={categoriaId}
                        onValueChange={(value) => setCategoriaId(value)}
                    >
                        <Picker.Item label="Selecione uma categoria" value={null} />
                        {categorias.map((categoria) => (
                            <Picker.Item
                                key={categoria.id}
                                style={adcGastoSyle.pickerItem}
                                label={categoria.nome}
                                value={categoria.id}
                            />
                        ))}
                    </Picker>
                </View>
            );
        } else {
            return null;
        }
    };


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
                        style={adcGastoSyle.back}
                        onPress={() => navigation.navigate('Home')}>
                        <Image
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

                {/* <View>
                    {categorias.length > 0 ? (
                        <View >
                            <Text style={adcGastoSyle.texto3}>
                                Categoria:
                            </Text>
                            <List />
                        </View>
                    ) : (
                        <Text>
                            Nenhuma categoria adicionada
                        </Text>

                    )}
                </View> */}


            </View>



            <KeyboardAvoidingView



                behavior="padding"
                style={adcGastoSyle.card}>

                {categorias.length > 0 ? (
                    <View >
                        <Text style={adcGastoSyle.texto4}>
                            Categoria:
                        </Text>
                        <List />
                    </View>
                ) : (
                    <Text>
                        Nenhuma categoria adicionada
                    </Text>

                )}

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
                    placeholder={'DESCRIÇÃO'}
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