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




function MenuFinancas({ navigation }) {


    const [clicou, setClicou] = useState(1);
    const [telaAtual, setTelaAtual] = useState(1);

    const item = [
        { id: 1, tela: 'GastosGerais' },
        { id: 2, tela: 'GastosCategorias' },
        { id: 3, tela: 'CompGastos' },
    ]

    useEffect(() => {
        if (clicou == true) {
            (telaAtual == 1) ? setTelaAtual(1) : setTelaAtual(2)
        }
        else if (clicou == true) {
            (telaAtual == 2) ? setTelaAtual(2) : setTelaAtual(3)
        }
        else () => {
            setClicou(false)
        }
    }, [clicou])

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
                    <TouchableOpacity>
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
                    <Text
                        style={gastosGeraisStyles.midText1}>
                        {(telaAtual === 1) ?
                            <Text>TOTAL DE GASTO ECONOMIZADO</Text> :
                            (telaAtual === 2) ?
                                <Text>TOTAL GASTO</Text> :
                                <Text>COMPARAÇÃO DE GASTOS</Text>
                        }</Text>
                    <Text
                        style={gastosGeraisStyles.midText}>
                        R$ 0,00</Text>
                </View>

            </View>

            <View
                style={gastosGeraisStyles.finalContainer}>

                <View
                    style={gastosGeraisStyles.buttonContainer}>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => { setClicou(true); setTelaAtual(1); }}
                    ><Text style={gastosGeraisStyles.buttonTexts}>Gastos</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => { setClicou(true); setTelaAtual(2); }}
                    ><Text style={gastosGeraisStyles.buttonTexts}>Categorias</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={gastosGeraisStyles.buttons}
                        onPress={() => { setClicou(true); setTelaAtual(3); }}>
                        <Text style={gastosGeraisStyles.buttonTexts}>Comparação</Text></TouchableOpacity>
                </View>

                <View
                    style={gastosGeraisStyles.monthContainer}>
                    {(telaAtual === 1) ? (
                        <Text
                            style={gastosGeraisStyles.title}>HISTÓRICO DE GASTOS</Text>) :
                        (telaAtual === 2) ? (
                            <Text
                                style={gastosGeraisStyles.title}>HISTÓRICO DE GASTOS POR CATEGORIA</Text>) :
                            <Text
                                style={gastosGeraisStyles.title}>COMPARAÇÃO DE GASTOS POR CATEGORIA</Text>
                    }

                </View>

                <View>
                    {
                        (telaAtual === 1)
                            ? (<GastosGerais />) :
                            (telaAtual === 2) ?
                                <GastoCategorias /> :
                                <CompGastos />
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


