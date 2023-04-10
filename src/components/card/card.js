import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

export default function Card() {
    const [isActive, setIsActive] = useState(false);

    const toggleCard = () => {
        setIsActive(!isActive);
    };

    const leftSwipe = () => {
        return (
            <View style={styles.leftView}>
                <TouchableOpacity style={styles.left}>
                    <Ionicons name="ios-trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

    const rightSwipe = () => {
        return (
            <View style={styles.rightView}>
                <TouchableOpacity style={styles.right}>
                    <MaterialIcons name="edit" size={24} color="white" />
                </TouchableOpacity>

            </View>
        )
    }


    return (

        <TouchableOpacity style={styles.card} onPress={toggleCard}>
            <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
                <View style={styles.upContainer}>
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
    leftView: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    left: {
        padding: 5,
    },
    rightView: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    right: {
        padding: 5,
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