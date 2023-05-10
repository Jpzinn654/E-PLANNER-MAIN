import React from "react";

import { TextInputMask } from 'react-native-masked-text'

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
    BackHandler
} from "react-native";

import { useState, useEffect } from "react";

import config from '../../../config/config.json'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import moment from "moment";
import { Picker } from '@react-native-picker/picker';

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

    const [categoriaId, setCategoriaId] = useState(null);
    const [categoriaNome, setCategoriaNome] = useState(null);

    const [usuarioId, setUsuarioId] = useState(null)
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    const [display, setDisplay] = useState([])
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [categorias, setCategorias] = useState([]);
    const [valortext, setValorText] = useState(null);

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
            setCategorias(json)

            if (json.length > 0) {
                setCategoriaId(json[0].id);
                setCategoriaNome(json[0].nome)
            }
        }
    }

    //função que envia dados do formuário para a api
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/gastoAgendado/adicionar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mes: moment().format('M'),
                ano: moment().format('YYYY'),
                categoriaId: categoriaId,
                valor: valor,
                descricao: descricao,
                dataGasto: date,
                categoriaNome: categoriaNome
            }),
        })
        let json = await response.json()
        if (json === 'success') {
            showToast()
            setValorText('')
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

    const handleValorChange = (value) => {
        const valorDecimal = parseFloat(value.replace(',', '.').replace('R$', '').trim());
        setValor(valorDecimal);
        setValorText(value)
    }

    const List = () => {
        const handleCategoriaChange = (value) => {
          setCategoriaId(value);
          const categoriaSelecionada = categorias.find((categoria) => categoria.id === value);
          setCategoriaNome(categoriaSelecionada.nome);
        };
      
        if (categorias.length > 0) {
          return (
            <View>
              <Picker
                style={agdGastoStyle.picker}
                selectedValue={categoriaId}
                onValueChange={handleCategoriaChange}
              >
                <Picker.Item label="Selecione uma categoria" value={null} />
                {categorias.map((categoria) => (
                  <Picker.Item
                    key={categoria.id}
                    style={agdGastoStyle.pickerItem}
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
                    <Toast/>
                </View>

                <Text
                    style={agdGastoStyle.texto2}>
                    AGENDAR GASTOS
                </Text>

            </View>

            <KeyboardAvoidingView
                behavior="padding"
                style={agdGastoStyle.card}>

                <View>
                    <Text style={agdGastoStyle.gastoMsg}>
                        {display[0]}
                    </Text>
                </View>

                {categorias.length > 0 ? (
                    <View >
                        <Text style={agdGastoStyle.texto4}>
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
                    style={agdGastoStyle.texto4}>
                    Valor:
                </Text>

                <TextInputMask
                    style={agdGastoStyle.input}
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
                    onChangeText={setDescricao}
                    value={descricao}
                />

                <Text
                    style={agdGastoStyle.texto6}
                >Data</Text>
                <View
                    style={agdGastoStyle.cardInput}>

                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                            minimumDate={new Date()}
                        />
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
            </KeyboardAvoidingView>
            <TouchableOpacity
                style={agdGastoStyle.btnContinuar}
                onPress={() => sendForm()}>
                <Text
                    style={agdGastoStyle.btnContinuarTxt}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}