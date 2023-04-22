import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert

} from 'react-native';

import config from '../../../config/config.json'

import { FlatList } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import moment from 'moment';

export default function Card({ usuario, navigation }) {

    const [activeIndex, setActiveIndex] = useState(null);

    const [carregando, setCarregando] = useState(true)
    const [display, setDisplay] = useState(false)
    const [data, setData] = useState([]);

    moment.locale('pt-br');

    const leftSwipe = (item) => {

        const handleExcluir   = async () => {
            let response = await fetch(`${config.urlRoot}/categoria/deletar/${item.id}`, {
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
        }

        const showAlert  = async () => {
            Alert.alert(
                '',
                'Deseja excluir a categoria?',
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

        return (

            <View style={styles.leftView}>

                <TouchableOpacity style={styles.left}
                    onPress={() => showAlert ()}>

                    <Ionicons name="ios-trash-outline" size={24} color="white" />

                </TouchableOpacity>

            </View>

        )

    }

    const rightSwipe = (item) => {

        const editar = async () => {
            navigation.navigate('EditarCategorias', { id: item.id })
        }

        return (
            <View style={styles.rightView}>

                <TouchableOpacity style={styles.right}
                    onPress={() => editar()}>

                    <MaterialIcons name="edit" size={24} color="white" />

                </TouchableOpacity>
            </View>
        )
    }


    const usuarioId = usuario || ''
    useEffect(() => {
        fetchData();
    }, [usuarioId]);


    const fetchData = async () => {
        if (usuarioId !== null) {
            let response = await fetch(`${config.urlRoot}/categoria/listar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuarioId: usuarioId,
                    mes: moment().format('M'),
                    ano: moment().format('YYYY')
                }),

            })

            let json = await response.json()

            if (json == '') {
                setDisplay('Você não possui nenhuma categoria!')
                setCarregando(false)
            } else {
                setData(json)
                setDisplay(false)
                setCarregando(false)
            }
        }
    }


    const handleCardPress = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };


    const renderCard = ({ item, index }) => {
        const isActive = activeIndex === index;

        return (
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress(index)}>
                <Swipeable renderLeftActions={() => leftSwipe(item)} renderRightActions={() => rightSwipe(item)}>
                    <View style={styles.upContainer}>
                        <Text style={styles.title}>{item.nome}</Text>
                        <Text style={styles.value}>{item.valor - item.valorTotalGastos}</Text>
                    </View>
                </Swipeable>
                {isActive && (
                    <View style={styles.cardContent}>
                        <Text style={styles.text}>
                            Valor Total: R$ {item.valor}
                        </Text>
                        <Text style={styles.text}>
                            {item.descricao}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };




    return (
        <View>

            {carregando ? (
                <Text style={styles.loading}>
                    Carregando...
                </Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderCard}
                />

            )}
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
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});