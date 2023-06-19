import React from "react";

import CurrencyInput from 'react-native-currency-input';

import AsyncStorage from '@react-native-async-storage/async-storage';

import agdGastoStyle from "./agdGastoStyle";

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Input,
    Pressable,
    BackHandler,
    ScrollView
} from "react-native";

import { useState, useEffect } from "react";

import config from '../../../config/config.json'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list"

import DateTimePicker from '@react-native-community/datetimepicker';

export default function AgendarGasto({ navigation }) {

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

    const [selected, setSelected] = useState("")

    const [usuarioId, setUsuarioId] = useState(null)
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    const [display, setDisplay] = useState([])
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [categorias, setCategorias] = useState([]);

    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Gasto agendado com sucesso",
            autoHide: true,
            visibilityTime: 2000,
            topOffset: 0,
        })
    }

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
            let response = await fetch(`${config.urlRoot}/gastoAgendado/adicionar`, {
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
                    dataGasto: date,
                }),
            })
            let json = await response.json()
            if (json === 'success') {
                showToast()
                setValor('')
                setDescricao('')
                setDate(new Date())
                setDateOfBirth()
            } else {
                setDisplay(json.erros)
                setTimeout(() => {
                    setDisplay('')
                }, 5000)

            }
        }

    }


    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)

            toggleDatepicker()
            setDateOfBirth(formateDate(currentDate))
        } else {
            toggleDatepicker()
        }
    }

    const formateDate = (rawDate) => {
        let date = new Date(rawDate)

        let ano = date.getFullYear()
        let mes = date.getMonth() + 1
        let dia = date.getDate()

        dia = dia < 10 ? `0${dia}` : dia
        mes = mes < 10 ? `0${mes}` : mes

        return `${dia}/${mes}/${ano}`

    }

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
                    <Toast />
                </View>

                <Text
                    style={agdGastoStyle.texto2}>
                    AGENDAR GASTOS
                </Text>

            </View>

            <View behavior="padding"
                style={agdGastoStyle.card}>

                <ScrollView style={agdGastoStyle.scrollContainer}>

                    <KeyboardAvoidingView
                        behavior="padding"
                        style={agdGastoStyle.card2}>



                        <View>
                            <Text style={agdGastoStyle.gastoMsg}>
                                {display[0]}
                            </Text>
                        </View>

                        <View style={{ width: 280, marginLeft:'15%'}}>
                            <SelectList data={categorias}
                                setSelected={setSelected}
                                placeholder="Selecione uma categori a"
                                searchPlaceholder="Pesquise"
                                notFoundText="Nenhuma categoria encontrada!"
                                dropdownShown={false}
                                maxHeight={100}
                            />

                        </View>

                        <Text
                            style={agdGastoStyle.texto4}>
                            Valor:
                        </Text>

                        <CurrencyInput
                            style={agdGastoStyle.input}
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
                            style={agdGastoStyle.texto5}
                        >Descrição do seu gasto:
                        </Text>

                        <TextInput
                            style={agdGastoStyle.input}
                            keyboardType="default"
                            returnKeyType="done"
                            multiline={true}
                            placeholder={'DESCRIÇÃO'}
                            maxLength={70}
                            onChangeText={setDescricao}
                            value={descricao}
                        />

                        <Text
                            style={agdGastoStyle.texto6}
                        >Data:</Text>
                        <View
                            style={agdGastoStyle.cardInput}>

                            {showPicker && (
                                // <DateTimePicker
                                //     mode="date"
                                //     display="spinner"
                                //     value={date}
                                //     onChange={onChange}
                                //     minimumDate={new Date()}
                                // />

                                <Pressable
                                    onPress={toggleDatepicker}
                                >
                                    <DateTimePicker
                                        mode="date"
                                        display="spinner"
                                        value={date}
                                        onChange={onChange}
                                        minimumDate={new Date()}
                                    />
                                    <TextInput
                                        style={agdGastoStyle.input}
                                        value={dateOfBirth}
                                        onChangeText={setDateOfBirth}
                                        placeholder={"00/00/0000"}
                                        color='#000000'
                                        editable={false}
                                    />
                                </Pressable>

                            )}

                            {!showPicker && (
                                <Pressable
                                    onPress={toggleDatepicker}
                                >
                                    <TextInput
                                        style={agdGastoStyle.input}
                                        value={dateOfBirth}
                                        onChangeText={setDateOfBirth}
                                        placeholder={"00/00/0000"}
                                        color='#000000'
                                        editable={false}
                                    />
                                </Pressable>
                            )}



                        </View>
                        <TouchableOpacity
                style={agdGastoStyle.btnContinuar}
                onPress={() => sendForm()}>
                <Text
                    style={agdGastoStyle.btnContinuarTxt}>Continuar</Text>
            </TouchableOpacity>
                    </KeyboardAvoidingView></ScrollView></View>
            
        </View>
    )
}