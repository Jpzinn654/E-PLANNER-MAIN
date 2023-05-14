import React from "react";
import { useState, useEffect } from "react";

import { CommonActions } from '@react-navigation/native';

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from "react-native"

import gastoAgendadoStyle from "./gastoAgendadoStyle";
import Card from "../../components/card/card";
import moment from 'moment';
import 'moment/locale/pt-br';
import CardAgendado from "../../components/cardAgendado/cardAgendado";

import { Toast } from "react-native-toast-message/lib/src/Toast";

import { useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

export default function GastoAgendado({navigation, route}) {

    const isFocused = useIsFocused();


    let etiqueta = route.params?.etiqueta ?? ''
    console.log(etiqueta)

    if (etiqueta != '') {
        setTimeout(() => {
            Toast.show({
                type: "success",
                text1: etiqueta,
                autoHide: true,
                visibilityTime: 2000,
                topOffset: 0,
            });

        }, 100);
        
        //limpa os parametros
        setTimeout(() => {
        const resetAction = CommonActions.reset({
            index: 0, 
            routes: [
              { name: 'GastosAgendadosTab' }, 
            ],
          });
          
          navigation.dispatch(resetAction);
        }, 2000);
    }


    const [usuarioId, setUsuarioId] = useState(null)

    //armazena valores que chegam da api
    const [data, setData] = useState([]);

    //requisita id do usuário
    useEffect(() => {
        getUsuario();
    }, []);

    async function getUsuario() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }


    //função responsável por trazer os dados da api
    useEffect(() => {
        fetchData();
    }, [usuarioId, isFocused]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/gastoAgendado/listar`, {

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
            setData(json)
        }
    }


    moment.locale('pt-br');
    const currentMonth = moment().format('MMMM');
    const currentYear = moment().format('YYYY');

    return (
        <View style={gastoAgendadoStyle.container}>
            <StatusBar backgroundColor={'#eeeeef'} barStyle="dark-content" />

            <View style={gastoAgendadoStyle.upContainer}>
                <View
                    style={gastoAgendadoStyle.menuContainer}>
                    <TouchableOpacity>
                        <Image
                            style={gastoAgendadoStyle.menu}
                            source={require('../../assets/menuDark.png')}
                        />
                    </TouchableOpacity>

                    <Text style={gastoAgendadoStyle.texto1}>E-PLANNER</Text>
                </View>

                <View
                    style={gastoAgendadoStyle.dateContainer}
                >
                    <Text
                        style={gastoAgendadoStyle.dateTxt}>
                        {currentMonth}, {currentYear}</Text>
                </View>
            </View>

            <Toast />


            <View
                style={gastoAgendadoStyle.container2}
            >
                <Text
                    style={gastoAgendadoStyle.gastoText}>Gastos Agendados</Text>

                <View
                    style={gastoAgendadoStyle.cards}>
                    <ScrollView>
                        <CardAgendado data={data}
                        navigation={navigation}/>
                    </ScrollView>
                </View>
            </View>

        </View>
    )
}
