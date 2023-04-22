import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'


export default function CardGasto({ data, navigation }) {
    const [cardStates, setCardStates] = useState(data.map(() => false));

    const toggleCard = (index) => {
        const newCardStates = [...cardStates];
        newCardStates[index] = !newCardStates[index];
        setCardStates(newCardStates);
    };

    const rightSwipe = () => {
        return (
            <View style={styles.rightView}>
                <TouchableOpacity style={styles.right}>
                    <Ionicons name="ios-trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View>
            {data.map((item, index) => (
                <TouchableOpacity style={styles.card} onPress={() => toggleCard(index)}>
                    <Swipeable renderRightActions={rightSwipe}>
                        <View style={styles.upContainer} key={index}>
                            <Text style={styles.title}>{item.categoria.nome}</Text>
                            <Text style={styles.value}>{item.valor}</Text>
                        </View>
                    </Swipeable>
                    {cardStates[index] && (
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