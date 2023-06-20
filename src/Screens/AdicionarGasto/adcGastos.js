import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SelectList } from "react-native-dropdown-select-list"

import adcGastoSyle from "./adcGastoStyle";

import CurrencyInput from 'react-native-currency-input';

import moment from 'moment';

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    BackHandler,
    Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


export default function AdicionarGastos({ navigation }) {

    //msg ao adicionar gasto
    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Gasto adicionado com sucesso",
            autoHide: true,
            visibilityTime: 2000,
            topOffset: 0,
        })
    }

    //função responsável por voltar a tela home ao pressionar o botão de voltar do dispositivo
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    //enviados para a api
    const [selected, setSelected] = useState("")

    const [valor, setValor] = useState(null);
    const [descricao, setDescricao] = useState(null);

    //operações adicionais
    const [usuarioId, setUsuarioId] = useState(null)
    const [display, setDisplay] = useState([])
    const [categorias, setCategorias] = useState([]);


    moment.locale('pt-br');

    //função que requisita id do usuário
    useEffect(() => {
        getUsuario();
    }, []);

    async function getUsuario() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }

    //função que requisita categorias
    useEffect(() => {
        getCategorias();
    }, [usuarioId]);

    const getCategorias = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/gastoRealizado/listar/categotias`, {

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

            let newArray = json.map((item) => {
                return { key: item.id, value: item.nome }
            })

            setCategorias(newArray)

        }
    }


    //função que envia dados do formuário para a api
    async function sendForm() {
        if (selected === '' || selected == undefined) {
            setDisplay(['Selecione uma categoria!'])
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        } else {
            let response = await fetch(`${config.urlRoot}/gastoRealizado/adicionar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mes: moment().format('M'),
                    ano: moment().format('YYYY'),
                    categoriaId: selected,
                    valor: valor,
                    descricao: descricao,

                }),
            })
            let json = await response.json()
            if (json === 'success') {
                showToast()
                setValor('')
                setDescricao('')
                setSelected('')
            } else {
                setDisplay(json.erros)
                setTimeout(() => {
                    setDisplay('')
                }, 5000)
            }
        }


    }





    return (



        <View style={adcGastoSyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={adcGastoSyle.fundo}
                source={require('../../assets/fundo.png')}
            />

            <Toast />

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


            </View>

            <View
              behavior="padding"
                style={adcGastoSyle.card}>


                <ScrollView style={adcGastoSyle.scrollContainer}>

                    <KeyboardAvoidingView
                        behavior="height"
                        style={adcGastoSyle.card2}>

                        <View>
                            <Text style={adcGastoSyle.gastoMsg}>
                                {display[0]}
                            </Text>
                        </View>

                        <View style={{ width: 280, marginLeft: '15%' }}>
                            <SelectList data={categorias}
                                setSelected={setSelected}
                                placeholder="Selecione uma categoria"
                                searchPlaceholder="Pesquise"
                                notFoundText="Nenhuma categoria encontrada!"
                                dropdownShown={false}
                                maxHeight={100}
                            />
                        </View>

                        <Text
                            style={adcGastoSyle.texto4}>
                            Valor:
                        </Text>

                        <CurrencyInput
                            style={adcGastoSyle.input}
                            value={valor}
                            placeholder="R$0,00"
                            onChangeValue={setValor}
                            prefix="R$"
                            delimiter="."
                            separator=","
                            precision={2}
                            minValue={0}
                            onChangeText={(formattedValue) => {
                                console.log(formattedValue); // R$ +2.310,46
                            }}
                        />

                        <Text
                            style={adcGastoSyle.texto5}
                        >Descrição do seu gasto:
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

                        <TouchableOpacity
                            style={adcGastoSyle.btnContinuar}
                            onPress={() => sendForm()}>
                            <Text
                                style={adcGastoSyle.btnContinuarTxt}>Continuar</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </View>
    )
}