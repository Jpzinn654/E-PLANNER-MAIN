import React, { useEffect, useState } from "react";
import adcCatStyle from "./adcCatStyle";

import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config/config.json'
import { Toast } from "react-native-toast-message/lib/src/Toast";

import accounting from 'accounting';

import CurrencyInput from 'react-native-currency-input';

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    BackHandler,
    Platform

} from "react-native";


export default function Categorias({ navigation }) {

    //estado que gerencia eventos
    const [display, setDisplay] = useState([])

    //responsáveis pelas listagens de valores
    const [usuarioId, setUsuarioId] = useState()
    const [data, setData] = useState([]);

    //estados que capturam valores e os encaminha para a api
    const [nome, setNome] = useState(null)
    const [descricao, setDescricao] = useState(null)
    const [valor, setValor] = useState(null)

    console.log(valor)

    //função responsável por atualizar a tela home ao pressionar o botão de voltar do dispositivo
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

    //msg ao criar categoria
    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Categoria criada com sucesso",
            autoHide: true,
            visibilityTime: 2000,
            topOffset: 0,
        })
    }


    //função que requisita id do usuário
    useEffect(() => {
        getUsuarioId();
    }, []);

    async function getUsuarioId() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }

    //função que requisita renda / orçamento do usuário
    useEffect(() => {
        fetchData();
    }, [usuarioId]);

    const fetchData = async () => {
        let response = await fetch(`${config.urlRoot}/categoria/disponivelCat`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuarioId: usuarioId
            }),
        })
        let json = await response.json()
        setData(json)
    }


    // const dispinivel = Number(data).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    //função responsável por encaminhar os dados para a api
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/categoria/adicionar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rendaDisponivel: data,
                usuarioId: usuarioId,
                nome: nome,
                descricao: descricao,
                valor: Number(valor)
            }),
        })
        let json = await response.json()
        if (json === 'success') {
            showToast()
            setNome('')
            setDescricao('')
            setValor('')
            fetchData()
        } else {
            setDisplay(json.erros)
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        }

    }


    return (

        <View style={adcCatStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />



            <Image
                style={adcCatStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />

            <Toast />

            <TouchableOpacity
                style={adcCatStyle.back}
                onPress={() => navigation.navigate('Home')}>
                <Image
                    source={require('../../assets/back.png')}
                />
            </TouchableOpacity>



            <Text style={adcCatStyle.texto1}>E-PLANNER</Text>


            <View style={adcCatStyle.Valor}>
                <Text style={adcCatStyle.txtVal1}>Valor Disponível:</Text>
                <Text style={adcCatStyle.txtVal3}> {accounting.formatMoney(data, 'R$', 2, '.', ',')}</Text>
            </View>

            <KeyboardAvoidingView
                style={adcCatStyle.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={adcCatStyle.inpTxt1}>Adicionar uma categoria</Text>

                <View>
                    <Text style={adcCatStyle.categoriaMsg}>
                        {display[0]}
                    </Text>
                </View>

                <TextInput
                    style={adcCatStyle.inp1}
                    onChangeText={text => setNome(text)}
                    value={nome}
                    placeholder="Nome da categoria"
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <TextInput
                    onChangeText={text => setDescricao(text)}
                    value={descricao}
                    style={adcCatStyle.inp2}
                    placeholder="Descrição (opcional)"
                    maxLength={100}
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={adcCatStyle.subContainerInput}>

                    <CurrencyInput
                    style={adcCatStyle.inp3}
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

                    <View style={adcCatStyle.btn}>
                        <Text style={adcCatStyle.btnText}>R$</Text>
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    style={adcCatStyle.btnContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableOpacity style={adcCatStyle.btnContinuar}
                        onPress={() => sendForm()}
                    // onPress={showToast}
                    // onPress={showToastError}
                    >

                        <Text style={adcCatStyle.btnContinuarTxt}>Continuar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </KeyboardAvoidingView>
        </View>
    )
}