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

import { Picker } from '@react-native-picker/picker';

import moment from 'moment';

export default function GastoCategorias({ navigation }) {

    // const showToast = () => {
    //     Toast.show({
    //         type: "success",
    //         text1: "teste",
    //         text2: "teste2"
    //     })
    // }

    //enviados para a api
    const [categoriaId, setCategoriaId] = useState(null);
    const [categoriaNome, setCategoriaNome] = useState(null);

    //operações adicionais
    const [usuarioId, setUsuarioId] = useState(null)
    const [categorias, setCategorias] = useState([]);

      //armazena valores que chegam da api
      const [data, setData] = useState([]);
      

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

    //função responsável por trazer os dados da api
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          fetchData();
        }, 1000); // 1000ms = 1 segundo
      
        return () => {
          clearTimeout(timeoutId);
        };
      }, [categoriaId, usuarioId]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/categoria/gastosMeses`, {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    id: categoriaId,
                    mes: moment().format('M'),
                    ano: moment().format('YYYY')
                }),
            })
            let json = await response.json()
            if (json == '') {
                // setDisplay('Você não possui nenhuma categoria!')
                // setCarregando(false)
                console.log('erro')
            } else {
                setData(json)
                // setDisplay(false)
                // setCarregando(false)
                // console.log(json)
            }
            
            
        }
    }


    //lista suspensa com categorias
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
                        style={gastoCategoriaStyle.picker}
                        selectedValue={categoriaId}
                        onValueChange={handleCategoriaChange}
                    >
                        <Picker.Item label="Selecione uma categoria" value={null} />
                        {categorias.map((categoria) => (
                            <Picker.Item
                                key={categoria.id}
                                style={gastoCategoriaStyle.pickerItem}
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



    return (
        <View style={gastoCategoriaStyle.container}>
            <Toast />
            {categorias.length > 0 ? (
                <View >
                    <Text style={gastoCategoriaStyle.texto4}>
                        Categoria:
                    </Text>
                    <List />
                </View>
            ) : (
                <Text>
                    Nenhuma categoria adicionada
                </Text>

            )}

            <Graph  data={data}/>
        </View>
    )
}
