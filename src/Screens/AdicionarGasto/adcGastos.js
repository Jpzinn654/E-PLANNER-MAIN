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
    KeyboardAvoidingView,
    Alert
} from "react-native";


export default function AdicionarGastos({ navigation }) {

    const [valortext, setValorText] = useState(null);
    const [valor, setValor] = useState(null);
    const [descricao, setDescricao] = useState(null);

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


    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/gastoRealizado/adicionar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoriaId: categoriaId,
                valor: valor,
                descricao: descricao
            }),
        })
        let json = await response.json()
        if (json === 'success') {
            Alert.alert(
                '',
                'Gasto adicionado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('AdicionarGastos'),
                    },
                ]
            );
            setValorText('')
            setDescricao('')
        }
    }

    const handleValorChange = (value) => {
        const valorDecimal = parseFloat(value.replace(',', '.').replace('R$', '').trim());
        setValor(valorDecimal);
        setValorText(value)
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
                    value={valortext}
                    placeholder={'R$ 0,00'}
                    onChangeText={handleValorChange}
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
                    onChangeText={value => setDescricao(value)}
                    value={descricao}
                />
            </KeyboardAvoidingView>
            <TouchableOpacity
                style={adcGastoSyle.btnContinuar}
                onPress={() => sendForm()}>
                <Text
                    style={adcGastoSyle.btnContinuarTxt}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}