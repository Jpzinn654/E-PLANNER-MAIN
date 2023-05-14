import React, { useState, useEffect } from 'react';

import homeStyle from "../../Screens/Home/homeStyle";

import accounting from 'accounting';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert

} from 'react-native';

import config from '../../../config/config.json'

import { useIsFocused } from '@react-navigation/native';

import { FlatList } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import moment from 'moment';

export default function Card({ usuario, navigation, onChildData  }) {

    const isFocused = useIsFocused();

    //estado de gerenciamento de card
    const [activeIndex, setActiveIndex] = useState(null);

    //estados de gerenciamento de status
    const [carregando, setCarregando] = useState(true)
    const [display, setDisplay] = useState(false)

    //estado que armazena os dados a serem listados
    const [data, setData] = useState([]);

    moment.locale('pt-br');
    

    //função de gerenciamento de exclusão de registro
    const leftSwipe = (item) => {

        

        //função que deleta registro e trata resposta
        const handleExcluir = async () => {
            let response = await fetch(`${config.urlRoot}/categoria/deletar/${item.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            let json = await response.json()

            if (json === 'success') {


                navigation.navigate('HomeDrawer', {
                    etiqueta: 'Categoria excluída com sucesso!'
                  }
            )

            } else {
                console.log('error')
            }
        }

        //alerta de exclusão
        const showAlert = async () => {
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

        //parte visual da exclusão
        return (

            <View style={styles.leftView}>

                <TouchableOpacity style={styles.left}
                    onPress={() => showAlert()}>

                    <Ionicons name="ios-trash-outline" size={24} color="white" />

                </TouchableOpacity>

            </View>

        )

    }

    //função que gerencia a edição de registro
    const rightSwipe = (item) => {

        //encaminha para a tela de edição
        const editar = async () => {
            navigation.navigate('EditarCategorias', { id: item.id })
        }

        //parte visual da edição
        return (
            <View style={styles.rightView}>

                <TouchableOpacity style={styles.right}
                    onPress={() => editar()}>

                    <MaterialIcons name="edit" size={24} color="white" />

                </TouchableOpacity>
            </View>
        )
    }


    //função responsável pela requisição de registros
    const usuarioId = usuario || ''
    useEffect(() => {
        fetchData();
    }, [usuarioId, isFocused]);


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


    //gerencia eventos no card de listagem
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
                        <Text style={styles.value}>{accounting.formatMoney(item.valor - (Number(item.valorTotalGastos) + Number(item.valorTotalGastosAgendados)), 'R$', 2, '.', ',')}</Text>
                    </View>
                </Swipeable>
                {isActive && (
                    <View style={styles.cardContent}>
                        <Text style={styles.text}>
                            Valor Total:  {accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}
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