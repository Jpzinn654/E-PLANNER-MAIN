import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Card() {
    const [isActive, setIsActive] = useState(false);

    const toggleCard = () => {
        setIsActive(!isActive);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={toggleCard}>
            <View style={styles.upContainer}>
                <Text style={styles.title}>Título do Card</Text>
                <Text style={styles.value}>R$ 0,00</Text>
            </View>
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
    upContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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