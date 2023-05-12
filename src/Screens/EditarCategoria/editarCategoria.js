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
    BackHandler,
    Alert,

} from "react-native";
import EditarcAtegoriaStyle from "./editarCategoriaStyle";

import { useRoute } from '@react-navigation/native';

export default function EditarCategorias({ navigation }) {

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

    //tratamento de id da categoria que vem do parâmentro
    const route = useRoute();
    const id = route.params.id;

    // console.log(id)

    //estado que gerencia eventos
    const [display, setDisplay] = useState([])

    //responsáveis pelas listagens de valores
    const [usuarioId, setUsuarioId] = useState()
    const [data, setData] = useState([]);
    const [valorInicial, setValorInicial] = useState(null)

    //estados que capturam valores e os encaminha para a api
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

    //função responsável por encamiinhar as atualizações para a api
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
            navigation.navigate('HomeDrawer', {
                    etiqueta: 'Categoria editada com sucesso!'
                  }
            )
              
        } else {
            setDisplay(json.erros)
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        }

    }


    return (

        <View style={EditarcAtegoriaStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={EditarcAtegoriaStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />
            <TouchableOpacity>
                <Image
                    style={EditarcAtegoriaStyle.menu}
                    source={require('../../assets/menu.png')}
                />
            </TouchableOpacity>

            <Text style={EditarcAtegoriaStyle.texto1}>E-PLANNER</Text>

            <View style={EditarcAtegoriaStyle.Valor}>
                <Text style={EditarcAtegoriaStyle.txtVal1}>Valor Disponível:</Text>
                <Text style={EditarcAtegoriaStyle.txtVal2}>R$</Text>
                <Text style={EditarcAtegoriaStyle.txtVal3}>{Number(data) + Number(valorInicial)}</Text>
            </View>

            <KeyboardAvoidingView
                style={EditarcAtegoriaStyle.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style={EditarcAtegoriaStyle.inpTxt1}>Edite sua categoria:</Text>

                <View>
                    <Text style={EditarcAtegoriaStyle.categoriaMsg}>
                        {display[0]}
                    </Text>
                </View>

                <TextInput
                    style={EditarcAtegoriaStyle.inp1}
                    onChangeText={text => setNome(text)}
                    value={nome}
                    placeholder="Nome da categoria"
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <TextInput
                    onChangeText={text => setDescricao(text)}
                    value={descricao}
                    style={EditarcAtegoriaStyle.inp2}
                    placeholder="Descrição (opcional)"
                    maxLength={100}
                    keyboardType="default"
                    underlineColorAndroid="transparent" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={EditarcAtegoriaStyle.subContainerInput}>
                    <TextInput
                        onChangeText={text => setValor(text)}
                        value={valor}
                        style={EditarcAtegoriaStyle.inp3}
                        placeholder="Valor"
                        keyboardType="default"
                        underlineColorAndroid="transparent" />

                    <View style={EditarcAtegoriaStyle.btn}>
                        <Text style={EditarcAtegoriaStyle.btnText}>R$</Text>
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    style={EditarcAtegoriaStyle.btnContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableOpacity style={EditarcAtegoriaStyle.btnContinuar}
                        onPress={() => sendForm()}>
                        <Text style={EditarcAtegoriaStyle.btnContinuarTxt}>Continuar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </KeyboardAvoidingView>
        </View>
    )
}