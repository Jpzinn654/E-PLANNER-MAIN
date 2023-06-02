import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import config from '../../../config/config.json'

import accounting from 'accounting';

import { useNavigation } from '@react-navigation/native';


export default function CardGasto({ data }) {
    const navigation = useNavigation();

    //responsável por gerenciar eventos do card
    const [cardStates, setCardStates] = useState(data.map(() => false));

    const toggleCard = (item) => {
        const newCardStates = [...cardStates];
        newCardStates[item] = !newCardStates[item];
        setCardStates(newCardStates);
    };

    //função que gerencia exclusão do registro
    const rightSwipe = (item) => {

        //função que deleta registro e trata resposta
        const handleExcluir = async () => {
            let response = await fetch(`${config.urlRoot}/gastoRealizado/deletar/${item.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            let json = await response.json()

            if (json === 'success') {
                navigation.navigate('MenuFinancasTab', { etiqueta: 'Gasto excluído com sucesso!' })
            } else {
                console.log('error')
            }
        }

        //alerta de exclusão
        const showAlert = async () => {
            Alert.alert(
                '',
                'Deseja excluir o gasto?',
                [
                    {
                        text: 'Cancelar',
                    },
                    {
                        text: 'Sim',
                        onPress: () => handleExcluir(),
                    },
                ]
            );

        }

        //parte visual da exclusão
        return (
            <View style={styles.rightView}>
                <TouchableOpacity style={styles.right}
                    onPress={() => showAlert()}>
                    <Ionicons name="ios-trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {data.length === 0 ? (
                <Text style={styles.message}>Não gastos disponíveis no período selecionado</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => toggleCard(item.id)}>
                            <Swipeable renderLeftActions={() => rightSwipe(item)}>
                                <View style={styles.upContainer}>
                                    <Text style={styles.title}>{item.categoria.nome}</Text>
                                    <Text style={styles.value}> -{accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}</Text>
                                </View>
                            </Swipeable>

                            {cardStates[item.id] && (
                                <View>
                                    <View style={styles.separatorDesc} />
                                    <View style={styles.cardContent}>

                                        <Text style={styles.text}>
                                            {item.descricao}
                                        </Text>
                                        <Text style={styles.infoData}>
                                            {new Date(item.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                        </Text>
                                    </View>

                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
        height: '30%',
    },
    card: {
        padding: 10,
        marginBottom: 10,
        width: 340,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        elevation: 3,
        // height: 0,
    },
    rightView: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 40,
        height: 40,
        top: "2%",

    },
    right: {
        padding: 4,
    },
    upContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        paddingVertical: 12

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        paddingHorizontal: 20,
        color: '#333333',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingHorizontal: 20,
        color: 'red'
    },
    cardContent: {
        marginTop: 2,

    },
    text: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 4,
        paddingHorizontal: 20,
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333',
    },
    separatorDesc: {
        height: 1,
        backgroundColor: '#cccccc',
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    infoData: {
        fontSize: 16,
        marginRight: 8,
        paddingHorizontal: 20,
        color: '#333333',
    }
});