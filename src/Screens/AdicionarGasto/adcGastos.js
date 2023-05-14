import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SelectList } from "react-native-dropdown-select-list"

import { TextInputMask } from 'react-native-masked-text'
import adcGastoSyle from "./adcGastoStyle";

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
    const [valortext, setValorText] = useState(null);


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
        if (selected === '' || selected == undefined){
            setDisplay(['Selecione uma categoria!'])
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        } else{
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
                setValorText('')
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

    //função que trata valor da mascara 
    const handleValorChange = (value) => {
        const valorDecimal = parseFloat(value.replace(',', '.').replace('R$', '').trim());
        setValor(valorDecimal);
        setValorText(value)
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



            <KeyboardAvoidingView
                behavior="padding"
                style={adcGastoSyle.card}>

                <View>
                    <Text style={adcGastoSyle.gastoMsg}>
                        {display[0]}
                    </Text>
                </View>

                <View  style={{ width: 280 }}>
                <SelectList data={categorias} 
                setSelected={setSelected}
                placeholder = "Selecione uma categoria" 
                searchPlaceholder = "Pesquise"
                notFoundText = "Nenhuma categoria encontrada!"
                dropdownShown= {false}
               />

            </View>

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