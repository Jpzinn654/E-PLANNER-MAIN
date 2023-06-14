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
                <Text style={styles.message}>Você não possui gastos no período selecionado</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => toggleCard(item.id)}>
                            <Swipeable renderLeftActions={() => rightSwipe(item)}>
                                <View style={styles.cardContent}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.title}>{item.categoria.nome}</Text>
                                        <Text style={styles.infoData}>
                                            {new Date(item.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                        </Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>Valor gasto:</Text>
                                        <Text style={styles.valueText2}> -{accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}</Text>
                                    </View>
                                </View>
                            </Swipeable>

                            {cardStates[item.id] && (
                                <View style={styles.cardContent}>
                                    <View style={styles.separatorDesc} />
                                    <Text style={styles.subtitle}>{item.descricao}</Text>
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
        paddingBottom: 40
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

      },
    card: {
        padding: 10,
        marginBottom: 10,
        width: 340,
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        elevation: 3,
        
    },
    cardContent: {
        marginTop: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        paddingHorizontal: 10,
        color: '#333333',
    },
    subtitle: {
        fontSize: 16,
        color: '#222233',
        marginBottom: 2,
        paddingHorizontal: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        paddingHorizontal: 10,
    },
    infoText: {
        fontSize: 16,
        marginRight: 8,
        color: '#444',
    },
    infoTextDisp: {
        fontSize: 16,
        marginRight: 8,
        paddingHorizontal: 10,
        color: '#444',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        color: 'green',
    },
    valueText2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#ed5c53',
    },
    rightView: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 40,
        height: 40,
        top: "2%"
    },
    right: {
        padding: 5,
    },
    loading: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333',
    },
    noItems: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        marginHorizontal: 10,
        marginTop: 10,
    },
    separatorDesc: {
        height: 1,
        backgroundColor: '#cccccc',
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    blankSpace: {
        height: 70,
    },
});