import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../../config/config.json'

import {
    View,
    Text,
    TouchableOpacity
} from "react-native"

import Graph from "../../components/grafico/GraficoGasto";

import gastoCategoriaStyle from "./gastoCategoriaStyle";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { SelectList } from "react-native-dropdown-select-list"

import moment from 'moment';

import { useIsFocused } from '@react-navigation/native';

export default function GastoCategorias({ gastosCat }) {

    const isFocused = useIsFocused();

    

    //enviados para a api
    const [selected, setSelected] = useState("")

    //operações adicionais
    const [usuarioId, setUsuarioId] = useState(null)
    const [categorias, setCategorias] = useState([]);

    //armazena valores que chegam da api
    const [data, setData] = useState([]);
    // console.log(data)

    useEffect(() => {
        if (data !== ['']) {
            gastosCat(data);
        }
    }, [data]);

    moment.locale('pt-br');

    // console.log(categoriaNome)

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
    }, [usuarioId, isFocused]);

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
                let newArray = json.map((item) => {
                    return { key: item.id, value: item.nome }
                })

                setCategorias(newArray)
            }
        }
    }

    //função responsável por trazer os dados da api
    useEffect(() => {
            fetchData();
    }, [selected, usuarioId, isFocused]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/categoria/gastosMeses`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: selected,
                    mes: moment().format('M'),
                    ano: moment().format('YYYY')
                }),
            })
            let json = await response.json()
            if (json != "error") {
                setData(json)
            } 


        }
    }





    return (
        <View style={gastoCategoriaStyle.container}>
            <Toast />

            <View style={{ width: 280, marginTop: 10, marginBottom: 0 }}>
                <SelectList data={categorias}
                    setSelected={setSelected}
                    placeholder="Selecione uma categoria"
                    searchPlaceholder="Pesquise"
                    notFoundText="Nenhuma categoria encontrada!"
                    dropdownShown={false}
                    maxHeight={135}
                />
            </View>

            <Graph data={data} />
        </View>
    )
}
