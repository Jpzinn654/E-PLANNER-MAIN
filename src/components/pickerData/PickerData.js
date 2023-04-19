import React from "react";

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from "react-native"


import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import 'moment/locale/pt-br';


export default function PickerMes({ navigation }) {

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    // obtém o ano e mês atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    moment.locale('pt-br');

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

    const selectedMonth = selectedDate.split('/')[0];
    const selectedYear = selectedDate.split('/')[1];

    return (
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
