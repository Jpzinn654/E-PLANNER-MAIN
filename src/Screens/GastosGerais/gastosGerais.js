import React from "react";

import {
    View,
    Text,
    ScrollView,
    StatusBar,
    StyleSheet,
    SafeAreaView
} from "react-native"

import gastosGeraisStyles from "./gastosGeraisStyles";
import CardGasto from "../../components/cardGasto/cardGsto";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker'

import config from '../../../config/config.json'

import { FlatList } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native';


export default function GastosGerais({ gastosGerais }) {

    const isFocused = useIsFocused();

    // const etiqueta = route.params?.etiqueta ?? ''

    // console.log(etiqueta)

    //gerencia os valores de data na lista suspensa
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    //estados que gerenciam dados a serem enviados para retorno de gastos
    const [usuarioId, setUsuarioId] = useState(null)
    const mes = selectedDate.split('/')[0];
    const ano = selectedDate.split('/')[1];

    //armazena valores que chegam da api
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data !== ['']) {
            gastosGerais(data);
        }
    }, [data]);

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
    }, [selectedDate, usuarioId, isFocused]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/gastoRealizado/listar`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    usuarioId: usuarioId,
                    mes: mes,
                    ano: ano
                }),
            })
            let json = await response.json()
            setData(json)
            // console.log(json)
        }
    }


    // obtém o ano e mês atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // cria as opções da lista suspensa das datas, 
    //filtrando apenas os meses e anos que já passaram ou são iguais ao atual
    const items = [];
    for (let year = 2023; year <= currentYear; year++) {
        for (let month = 1; month <= 12; month++) {
            if (year < currentYear || (year === currentYear && month <= currentMonth)) {
                const monthString = ("0" + month).slice(-2); // formata o número do mês com dois dígitos
                const label = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
                const value = `${monthString}/${year}`;
                items.push(<Picker.Item key={value} label={label} value={value} />);
            }
        }
    }

    function getCurrentDate() {
        const date = new Date();
        const monthString = ("0" + (date.getMonth() + 1)).slice(-2); // formata o número do mês com dois dígitos
        const yearString = date.getFullYear().toString();
        return `${monthString}/${yearString}`;
    }

    function handleChange(value) {
        setSelectedDate(value);
        fetchData()
    }


    return (
        <View style={gastosGeraisStyles.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />
            <View
                style={gastosGeraisStyles.finalContainer}>

                <View style={styles.container}>

                    <Text style={styles.label}>Histórico de gastos:</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedDate}
                            onValueChange={handleChange}
                        >
                            {items}
                        </Picker>
                    </View>
                </View>

                <View
                    style={gastosGeraisStyles.cardsConatiner}>


                    <CardGasto data={data}
                    />
                </View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 8,
    },
    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        width: 320,
        height: 61,
      },
      
    picker: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        height: 40,
        backgroundColor: '#D9D9D9'
    }
}); 
