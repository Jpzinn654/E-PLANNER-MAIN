import React, { useEffect, useState } from "react";

import homeStyle from "./homeStyle";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import Card from "../../components/card/card";
import moment from 'moment';
import 'moment/locale/pt-br';

import { Toast } from "react-native-toast-message/lib/src/Toast";

import { AntDesign } from '@expo/vector-icons'

import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
} from "react-native";

//função que gerencia a tela, juntamente com seus parâmetros
export default function Home({ navigation, route }) {


    //parâmetros de aviso, para eventuais alertas na tela principal
    const etiqueta = route.params?.etiqueta ?? ''


    if (etiqueta != '') {
        Toast.show({
            type: "success",
            text1: etiqueta,
            autoHide: true,
            visibilityTime: 2000,
            topOffset: 0,
        })

        console.log(etiqueta)
    }

    // if (route.params){




    //estados de listagem e armazenamento
    const [usuario, setUsuario] = useState([])
    const [usuarioId, setUsuarioId] = useState(null)
    const [orcamento, setOrcamento] = useState('');
    const [soma, setSoma] = useState('');

    moment.locale('pt-br');

    //função que requisita id do usuário
    useEffect(() => {
        getUsuario();
    }, []);

    async function getUsuario() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuario(json)
        setUsuarioId(json.id)
    }


    //função que requisita renda / orçamento do usuário
    useEffect(() => {
        fetchData();
    }, [usuarioId]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/orcamento/listar`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    usuarioId: usuarioId,
                    mes: moment().format('M'),
                    ano: moment().format('YYYY')
                }),
            })
            let json = await response.json()
            setOrcamento(json.orcamento.valor)
            setSoma(json.gastos)
        }
    }

    const disponivel = orcamento - soma


    // Esses Consts trás o mes diacordo com as datas em tempo real
    // Já o moment.locale trás o mes traduzido para PT-BR
    moment.locale('pt-br');
    const currentMonth = moment().format('MMMM');
    const currentYear = moment().format('YYYY');

    return (

        <View style={homeStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <Image
                style={homeStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />
            <Toast />
            <TouchableOpacity>
                <Image
                    style={homeStyle.menu}
                    source={require('../../assets/menu.png')}
                    onPress={() => navigation.toggleDrawer()}
                />
            </TouchableOpacity>

            <Text style={homeStyle.texto1}>E-PLANNER</Text>

            <SafeAreaView
                style={homeStyle.container2}
            >
                <Text
                    style={homeStyle.txt1}
                >{currentMonth}, {currentYear}</Text>

                <Text
                    style={homeStyle.txt2}
                >Olá, {usuario.nome}</Text>

                <Text
                    style={homeStyle.txt3}
                >Aqui está sua renda</Text>

            </SafeAreaView>

            <View
                style={homeStyle.renda1} >
                <Text
                    style={homeStyle.rendaTxt1}
                >R$</Text>

                <Text
                    style={homeStyle.rendaTxt2}
                >{orcamento}</Text>
                <Text
                    style={homeStyle.rendaTxt3}
                >R$</Text>

                <Text
                    style={homeStyle.rendaTxt4}
                >{disponivel}</Text>
            </View>

            <View
                style={homeStyle.rendaBars}
            >
                <Image
                    style={homeStyle.barra1}
                    source={require('../../assets/barra2.png')}
                />

                <Image
                    style={homeStyle.barra2}
                    source={require('../../assets/barra2.png')}
                />
            </View>

            <View
                style={homeStyle.renda1} >
                <Text
                    style={homeStyle.rendaTxt5}
                >SUA RENDA</Text>

                <Text
                    style={homeStyle.rendaTxt3}
                >GASTO DISPONÍVEL</Text>
            </View>


            <View
                style={homeStyle.container4}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdicionarGastos')}
                >
                    <View style={homeStyle.card1}>
                        <View style={homeStyle.circle}>
                            <Image
                                source={require('../../assets/dollarIcon.png')}
                            />
                        </View>
                        <View>
                            <Text>ADICIONAR GASTO</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('AgendarGasto')}
                >
                    <View style={homeStyle.card2}>
                        <View style={homeStyle.circle}>
                            <Image
                                source={require('../../assets/calendarIcon.png')}
                            />
                        </View>
                        <View>
                            <Text
                            >AGENDAR GASTO</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View
                style={homeStyle.container5}
            >
                <Text style={
                    homeStyle.txtCat
                }>Categorias</Text>

                {/* <SafeAreaView
                    style={homeStyle.components}>
                    <Card usuario={usuario.id}
                        navigation={navigation} />
                </SafeAreaView> */}

                <View style={homeStyle.buttonCategoria}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Categorias')}
                    >
                        <AntDesign name="plus" size={30} />
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    )
}