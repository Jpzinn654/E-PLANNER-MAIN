import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Alert,

} from "react-native";
import EditarcAtegoriaSyle from "./editarCategoriaStyle";

import { useRoute } from '@react-navigation/native';
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function EditarCategorias({ navigation }) {

    const route = useRoute();
    const id = route.params.id;

    // console.log(id)

    const [display, setDisplay] = useState([])
    const [usuarioId, setUsuarioId] = useState()
    const [data, setData] = useState([]);
    const [valorInicial, setValorInicial] = useState(null)

    const [nome, setNome] = useState(null)
    const [descricao, setDescricao] = useState(null)
    const [valor, setValor] = useState(null)


    //função que requisita id do usuário
    useEffect(() => {
        getUsuarioId();
    }, []);

    async function getUsuarioId() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }


    useEffect(() => {
        fetchData();
    }, [usuarioId]);

    //função que requisita renda / orçamento do usuário
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

    //função que lista a categoria

    useEffect(() => {
        getCategoria();
    }, [data]);

    async function getCategoria() {
        let response = await fetch(`${config.urlRoot}/categoria/editar/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let json = await response.json()

        console.log(json)

        setNome(json.nome)
        setDescricao(json.descricao)
        setValor(json.valor)
        setValorInicial(json.valor)

    }


    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/categoria/editar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rendaDisponivel: Number(data) + Number(valorInicial),
                categoriaId: id,
                nome: nome,
                descricao: descricao,
                valor: Number(valor)
            }),
        })
        let json = await response.json()
        if (json === 'success') {
            navigation.navigate('Home', {edit: true})
        } else {
            setDisplay(json.erros)
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        }

    }


    return (

        <View style={EditarcAtegoriaSyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={EditarcAtegoriaSyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />
            <TouchableOpacity>
                <Image
                    style={EditarcAtegoriaSyle.menu}
                    source={require('../../assets/menu.png')}
                />
            </TouchableOpacity>

            <Text style={EditarcAtegoriaSyle.texto1}>E-PLANNER</Text>

            <View style={EditarcAtegoriaSyle.Valor}>
                <Text style={EditarcAtegoriaSyle.txtVal1}>Valor Disponível:</Text>
                <Text style={EditarcAtegoriaSyle.txtVal2}>R$</Text>
                <Text style={EditarcAtegoriaSyle.txtVal3}>{Number(data) + Number(valorInicial)}</Text>
            </View>

            <KeyboardAvoidingView
                style={EditarcAtegoriaSyle.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={EditarcAtegoriaSyle.inpTxt1}>Edite sua categoria:</Text>

                <View>
                    <Text style={EditarcAtegoriaSyle.categoriaMsg}>
                        {display[0]}
                    </Text>
                </View>

                <TextInput
                    style={EditarcAtegoriaSyle.inp1}
                    onChangeText={text => setNome(text)}
                    value={nome}
                    placeholder="Nome da categoria"
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <TextInput
                    onChangeText={text => setDescricao(text)}
                    value={descricao}
                    style={EditarcAtegoriaSyle.inp2}
                    placeholder="Descrição (opcional)"
                    maxLength={100}
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={EditarcAtegoriaSyle.subContainerInput}>
                    <TextInput
                        onChangeText={text => setValor(text)}
                        value={valor}
                        style={EditarcAtegoriaSyle.inp3}
                        placeholder="Valor"
                        keyboardType="default"
                        underlineColorAndroid="transparent" />

                    <View style={EditarcAtegoriaSyle.btn}>
                        <Text style={EditarcAtegoriaSyle.btnText}>R$</Text>
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    style={EditarcAtegoriaSyle.btnContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableOpacity style={EditarcAtegoriaSyle.btnContinuar}
                        onPress={() => sendForm()}>
                        <Text style={EditarcAtegoriaSyle.btnContinuarTxt}>Continuar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </KeyboardAvoidingView>
        </View>
    )
}