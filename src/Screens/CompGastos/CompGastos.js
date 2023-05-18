import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    TextInput
} from "react-native"

import compGastoStyles from "./CompGastoStyle";

export default function CompGastos({ navigation }) {
    return (
        <View style={compGastoStyles.container}>
            <View style={compGastoStyles.upContainer}>
                <View style={compGastoStyles.inputs}>
                    <TextInput style={compGastoStyles.inp1}>
                        <Text>a</Text>
                    </TextInput>
                    <TextInput style={compGastoStyles.inp2}>
                        <Text>a</Text>
                    </TextInput>
                </View>
                <View style={compGastoStyles.textInputs}>
                    <Text style={compGastoStyles.textInp1}> Selecione um mês</Text>
                    <Text style={compGastoStyles.textInp2}> Mês de Comparação</Text>
                </View>
            </View>

            <View style={compGastoStyles.midContainer}>
                <Text>Categorias</Text>
            </View>

            <View style={compGastoStyles.finalContainer}>
                <View style={compGastoStyles.meses}>
                    <Text style={compGastoStyles.mes1}>Jan</Text>
                    <Text style={compGastoStyles.mes2}>Fev</Text>
                </View>
                <View style={compGastoStyles.valores}>
                    <Text style={compGastoStyles.valor1}>R$ 0</Text>
                    <Text style={compGastoStyles.valor2}>R$ 0</Text>
                </View>
            </View>
        </View>
    )
}
