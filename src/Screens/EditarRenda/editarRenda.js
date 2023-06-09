import React, { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';

import definifirRendaStyle from "../../Screens/DefinirRenda/definirRendaStyle";

import config from '../../../config/config.json'


import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    BackHandler
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WIDTH = Dimensions.get('window').width - 125;


import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DefinirRenda({ navigation, min, max, steps }) {

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

    //estados que armazenam os dados
    const [display, setDisplay] = useState([])
    const [usuarioId, setUsuarioId] = useState(null)
    const [sliderValue, setSliderValue] = useState(500);

    //função que requisita id do usuário
    useEffect(() => {
        async function getUsuario() {
            let response = await AsyncStorage.getItem('usuarioData')
            let json = JSON.parse(response)
            setUsuarioId(json.id)
        }
        getUsuario()
    }, [])

    //função que encaminha os dados para a api e trata resposta
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/orcamento/editar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                valor: sliderValue,
                usuarioId: usuarioId
            }),
        })
        let json = await response.json()
        // console.log(json)

        if (json === 'success') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeDrawer', params: {etiqueta: 'Salário editado com sucesso!'}}],
              });
            console.log(json)
        } else {
            setDisplay(json.erros)
            setTimeout(() => {
                setDisplay('')
            }, 5000)
        }

    }
    
    return (

        <SafeAreaView style={definifirRendaStyle.fundo}>

            <Image
                style={definifirRendaStyle.fundoImg}
                source={require('../../assets/fundo.png')}
            />

            <View style={definifirRendaStyle.container}>
                <Text
                    style={definifirRendaStyle.texto1}
                >E-PLANNER</Text>

                <Text
                    style={definifirRendaStyle.texto2}
                >Editar renda</Text>

            </View>


            <View
                style={definifirRendaStyle.areaRenda}
            >

                <View>
                    <Text style={definifirRendaStyle.orcamentoMsg}>
                        {display[0]}
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text
                        style={styles.texto}
                    >R$ {sliderValue}</Text>
                    <View style={styles.labelsContainer}>
                        <Text style={styles.label}>{min}</Text>
                        <Text style={styles.label}>{max}</Text>
                    </View>
                    <Slider
                        style={{ width: 300, height: 60 }}
                        minimumValue={500}
                        maximumValue={12500}
                        onValueChange={(value) => setSliderValue(value)}
                        value={sliderValue}
                        step={100}
                        thumbTintColor="#02CB7F"
                        minimumTrackTintColor="#02CB7F"
                        maximumTrackTintColor="#000" />
                </View>


                <TouchableOpacity
                    style={definifirRendaStyle.btn}
                    onPress={() => sendForm()}
                >
                    <Text style={definifirRendaStyle.btnText}>Continuar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 26,
    },
    labelsContainer: {
        width: WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#777',
    },
})