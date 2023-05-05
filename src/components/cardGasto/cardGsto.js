import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import config from '../../../config/config.json'

export default function CardGasto({ data, navigation }) {

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
        const handleExcluir   = async () => {
            let response = await fetch(`${config.urlRoot}/gastoRealizado/deletar/${item.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            let json = await response.json()

            if (json === 'success') {
                console.log('categoria deletada')
            } else {
                console.log('error')
            }
            // console.log(item.id)
        }

        //alerta de exclusão
        const showAlert  = async () => {
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
                onPress={() => showAlert ()}>
                    <Ionicons name="ios-trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View>
            {data.map(item => (
                <TouchableOpacity style={styles.card} onPress={() => toggleCard(item.id)} key={item.id}>
                    <Swipeable renderLeftActions={() => rightSwipe(item)}>
                        <View style={styles.upContainer} key={item.id}>
                            <Text style={styles.title}>{item.categoriaNome}</Text>
                            <Text style={styles.value}>{item.valor}</Text>
                        </View>
                    </Swipeable>
                    {cardStates[item.id] && (
                        <View style={styles.cardContent}>
                            <Text style={styles.text}>
                                {item.descricao}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#d9d9d9',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 14,
        textAlign: 'center',
        width: 320,
        marginTop: 10,
    },
    rightView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    right: {
        backgroundColor: 'blue',
        padding: 4,
    },
    upContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    cardContent: {
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
    },
});