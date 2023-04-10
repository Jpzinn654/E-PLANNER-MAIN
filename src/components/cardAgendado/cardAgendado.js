import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

export default function CardAgendado() {
    const [isActive, setIsActive] = useState(false);

    const toggleCard = () => {
        setIsActive(!isActive);
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

    const leftSwipe = () => {
        return (
            <View style={styles.leftView}>
                <TouchableOpacity style={styles.check}>
                    <FontAwesome5 name="check" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }


    return (

        <TouchableOpacity style={styles.card} onPress={toggleCard}>
            <Swipeable renderRightActions={rightSwipe} renderLeftActions={leftSwipe}>
                <View style={styles.upContainer}>
                    <View style={styles.task}>
                        <FontAwesome5 name="tasks" size={24} color="white" />
                    </View>
                    <Text style={styles.title}>Título do Card</Text>
                    <Text style={styles.value}>R$ 0,00</Text>
                </View>
            </Swipeable>
            {isActive && (
                <View style={styles.cardContent}>
                    <Text style={styles.text}>
                        Texto do card que será exibido após o clique.
                    </Text>
                </View>
            )}
        </TouchableOpacity>

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
    task: {
        width: 30,
        backgroundColor: 'red',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
    check: {
        backgroundColor: 'green',
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