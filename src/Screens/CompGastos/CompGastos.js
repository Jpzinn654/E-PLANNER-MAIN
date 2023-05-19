import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    TextInput,
    StyleSheet
} from "react-native";
import compGastoStyles from "./CompGastoStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { SelectList } from "react-native-dropdown-select-list"

import config from '../../../config/config.json';

export default function CompGastos({ navigation }) {

    const isFocused = useIsFocused();

    // gerencia os valores de data na lista suspensa
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedComparisonDate, setSelectedComparisonDate] = useState(getPreviousMonthDate());

    const [usuarioId, setUsuarioId] = useState(null);
    const [categorias, setCategorias] = useState([]);

    // estados que gerenciam dados a serem enviados para retorno de gastos
    const [mes1, setMes1] = useState(selectedDate.split('/')[0]); // Atualizado
    const [ano1, setAno1] = useState(selectedDate.split('/')[1]); // Atualizado
    const [mes2, setMes2] = useState(selectedComparisonDate.split('/')[0]); // Novo estado
    const [ano2, setAno2] = useState(selectedComparisonDate.split('/')[1]); // Novo estado
    const [selected, setSelected] = useState("")

    console.log(mes1, ano1, mes2, ano2)

    // requisita id do usuário
    useEffect(() => {
        getUsuario();
    }, []);

    async function getUsuario() {
        let response = await AsyncStorage.getItem('usuarioData')
        let json = JSON.parse(response)
        setUsuarioId(json.id)
    }

    // função que requisita categorias
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

    // obtém o ano e mês atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // obtém o mês anterior ao mês atual
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = previousMonth === 11 ? currentYear - 1 : currentYear;

    // cria as opções da lista suspensa das datas, 
    // filtrando apenas os meses e anos que já passaram ou são iguais ao atual
    const items = [];
    for (let year = 2023; year <= currentYear; year++) {
        for (let month = 0; month <= 11; month++) {
            if (
                (year < currentYear || (year === currentYear && month <= currentMonth + 1)) &&
                (year < previousYear || (year === previousYear && month <= previousMonth + 1))
            ) {
                const monthString = ("0" + (month + 1)).slice(-2); // formata o número do mês com dois dígitos
                const label = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
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

    function getPreviousMonthDate() {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        const monthString = ("0" + (date.getMonth() + 1)).slice(-2); // formata o número do mês com dois dígitos
        const yearString = date.getFullYear().toString();
        return `${monthString}/${yearString}`;
    }

    function handleChange(value) {
        setSelectedDate(value);
        setMes1(value.split('/')[0]); // Atualizado
        setAno1(value.split('/')[1]); // Atualizado
        // fetchData();
    }

    function handleComparisonChange(value) {
        setSelectedComparisonDate(value);
        setMes2(value.split('/')[0]); // Novo estado
        setAno2(value.split('/')[1]); // Novo estado
        // fetchData();
    }

    return (
        <View style={compGastoStyles.container}>
            

            <View style={{ width: 280, marginTop: 30, marginBottom: 30 }}>
                <SelectList data={categorias}
                    setSelected={setSelected}
                    placeholder="Selecione uma categoria"
                    searchPlaceholder="Pesquise"
                    notFoundText="Nenhuma categoria encontrada!"
                    dropdownShown={false}
                />
            </View>

            <View style={compGastoStyles.upContainer}>
                <View style={compGastoStyles.inputs}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedDate}
                            onValueChange={handleChange}
                        >
                            {items}
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedComparisonDate}
                            onValueChange={handleComparisonChange} // Novo handler
                        >
                            {items}
                        </Picker>
                    </View>
                </View>
                <View style={compGastoStyles.textInputs}>
                    <Text style={compGastoStyles.textInp1}>Selecione um mês</Text>
                    <Text style={compGastoStyles.textInp2}>Mês de Comparação</Text>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Adicione esta propriedade
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
        width: 160,
        paddingHorizontal: 10, // Adicione esta propriedade
        height: 45,
    },

    picker: {
        width: 180,
        height: 30,
    }
});

