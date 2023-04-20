import React from "react";

import {
    View,
    Text,
    ScrollView,
    StatusBar,
    StyleSheet
} from "react-native"

import gastosGeraisStyles from "./gastosGeraisStyles";
import CardGasto from "../../components/cardGasto/cardGsto";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker'


export default function GastosGerais({ navigation }) {

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    const mes = selectedDate.split('/')[0];
    const ano = selectedDate.split('/')[1];

    console.log(mes, ano)


    // obtém o ano e mês atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // cria as opções da lista suspensa, filtrando apenas os meses e anos que já passaram ou são iguais ao atual
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
    }


    return (
        <View style={gastosGeraisStyles.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />
            <View
                style={gastosGeraisStyles.finalContainer}>

                <View style={styles.container}>

                    <Text style={styles.label}>Selecione a data:</Text>

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
                    <ScrollView>
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                        <CardGasto />
                    </ScrollView>
                </View>
            </View>
        </View>
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
        marginBottom: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        width: 180,
        height: 30,
    }
}); 
