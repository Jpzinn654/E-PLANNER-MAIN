import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    StyleSheet
} from "react-native"

import gastosGeraisStyles from "./MenuFinancasStyle";
import { GastoCategorias, GastosGerais, CompGastos } from "../../Screens";

import { CommonActions } from '@react-navigation/native';

import { DrawerActions } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';

import { Toast } from "react-native-toast-message/lib/src/Toast";



import accounting from 'accounting';


function MenuFinancas({ navigation, route }) {

    const etiqueta = route.params?.etiqueta ?? ''


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
                    { name: 'MenuFinancasTab' },
                ],
            });

            navigation.dispatch(resetAction);
        }, 1500);
    }

    //gastos totais a serem exibidos no histórico geral
    const [gastosGerais, setGastosGerais] = useState('');

    const getGastosGerais = (gastosGerais) => {
        setGastosGerais(gastosGerais);
    };


    //gastos totais a serem exibidos no histórico por categoria
    const [gastosCat, setGastosCat] = useState('');

    console.log(gastosCat)

    const getGastosCat = (gastosCat) => {
        setGastosCat(gastosCat);
    };


    let soma = 0;

    for (let i = 1; i <= 6; i++) {
        const mes = gastosCat[`mes${i}`];

        if (mes) {
            soma += parseFloat(mes);
        }
    }

    //valores de comparação a serem exibidos
    const [gastosComp, setGastosComp] = useState('');

    console.log(gastosComp)

    const getGastosComp = (gastosComp) => {
        setGastosComp(gastosComp);
    };

    //mes de comparação a serem exibidos
    const [mes, setMes] = useState('');

    console.log(gastosComp)

    const getMes = (mes) => {
        setMes(mes);
    };

    var nomesMeses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    var nomeMes = nomesMeses[mes - 1]

    const [telaAtual, setTelaAtual] = useState(1);

    const item = [
        { id: 1, tela: 'GastosGerais', },
        { id: 2, tela: 'GastosCategorias' },
        { id: 3, tela: 'CompGastos' },
    ]


    return (
        <View style={gastosGeraisStyles.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <View style={gastosGeraisStyles.upContainer}>
                <Image
                    style={gastosGeraisStyles.fundo}
                    source={require('../../assets/fundo3.png')}
                />
                <View
                    style={gastosGeraisStyles.menuContainer}>
                    <TouchableOpacity 
                     onPress={() => navigation.dispatch()}>
                        <Image
                            style={gastosGeraisStyles.menu}
                            source={require('../../assets/menu.png')}
                        />
                    </TouchableOpacity>

                    <Text style={gastosGeraisStyles.texto1}>E-PLANNER</Text>
                </View>

                <View
                    style={gastosGeraisStyles.midContainer}
                >
                    <View>
                        {telaAtual === 1 ? (
                            <>
                                <Text style={gastosGeraisStyles.midText1}>TOTAL DE GASTOS</Text>
                                {gastosGerais && (
                                    <Text style={gastosGeraisStyles.midText1}>
                                        {accounting.formatMoney(gastosGerais.reduce((total, gasto) =>
                                            Number(total) + Number(gasto.valor), 0), 'R$', 2, '.', ',')}
                                    </Text>
                                )}{!gastosGerais && (
                                    <Text style={gastosGeraisStyles.midText1}>
                                        "R$0,00"
                                    </Text>
                                )}

                            </>
                        ) : telaAtual === 2 ? (
                            <>
                                <Text style={gastosGeraisStyles.midText1}>TOTAL DE GASTOS</Text>
                                {gastosCat && (
                                    <Text style={gastosGeraisStyles.midText1}>
                                        {accounting.formatMoney(soma, 'R$', 2, '.', ',')}
                                    </Text>
                                )}
                                {!gastosCat && (
                                    <Text style={gastosGeraisStyles.midText1}>
                                        "R$0,00"
                                    </Text>
                                )}
                            </>

                        ) : (
                            <>
                                {gastosComp && (
                                     Number(gastosComp.valorTotalGastos1) < Number(gastosComp.valorTotalGastos2) ? (
                                        <Text style={gastosGeraisStyles.midText1}>
                                            {`Você economizou ${accounting.formatMoney(
                                                gastosComp.valorTotalGastos2 - gastosComp.valorTotalGastos1, 'R$', 2, '.', ','
                                            )} em ${nomeMes}`}
                                        </Text>
                                    ) : Number(gastosComp.valorTotalGastos1) > Number(gastosComp.valorTotalGastos2) ? (
                                        <Text style={gastosGeraisStyles.midText1}>
                                            {`Você gastou ${accounting.formatMoney(
                                                gastosComp.valorTotalGastos1 - gastosComp.valorTotalGastos2, 'R$', 2, '.', ','
                                            )} a mais em ${nomeMes}`}
                                        </Text>
                                    ) :(
                                        <Text style={gastosGeraisStyles.midText1}>
                                            -
                                        </Text>
                                    )
                                )}
                                {!gastosComp && (
                                    <Text style={gastosGeraisStyles.midText1}>
                                        -
                                    </Text>
                                )}

                            </>

                        )}
                    </View>


                </View>

            </View>

            <Toast />

            <View
                style={gastosGeraisStyles.finalContainer}>

                <View
                    style={gastosGeraisStyles.buttonContainer}>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => { setTelaAtual(1); }}
                    ><Text style={gastosGeraisStyles.buttonTexts}>Histórico</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => {
                            setTelaAtual(2);
                        }}
                    ><Text style={gastosGeraisStyles.buttonTexts}>Gráfico</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => {
                            setTelaAtual(3);
                        }}>
                        <Text style={gastosGeraisStyles.buttonTexts}>Comparação</Text></TouchableOpacity>
                </View>

                <View>
                    {
                        (telaAtual === 1)
                            ? (<GastosGerais etiqueta={etiqueta}
                                gastosGerais={getGastosGerais} />) :
                            (telaAtual === 2) ?
                                <GastoCategorias gastosCat={getGastosCat} /> :
                                <CompGastos gastosComp={getGastosComp}
                                    mes={getMes} />
                    }
                </View>
            </View>
        </View>
    )
}


export default MenuFinancas


const gastosGeraisAltStyle = StyleSheet.create({
    testeContainer: {
        top: '10%',
        width: '100%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})


