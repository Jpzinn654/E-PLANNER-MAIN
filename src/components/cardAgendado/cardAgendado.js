import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import { Swipeable } from "react-native-gesture-handler";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import accounting from 'accounting';

import config from '../../../config/config.json'

export default function CardAgendado({ data, navigation }) {
  //responsável por gerenciar eventos do card
  const [cardStates, setCardStates] = useState(data.map(() => false));

  const toggleCard = (item) => {
    const newCardStates = [...cardStates];
    newCardStates[item] = !newCardStates[item];
    setCardStates(newCardStates);
  };

  const rightSwipe = (item) => {
    //função que confirma registro e trata resposta
    const handleExcluir = async () => {
      let response = await fetch(`${config.urlRoot}/gastoAgendado/excluir/${item.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      let json = await response.json()

      if (json === 'success') {
        navigation.navigate('GastosAgendadosTab', {
          etiqueta: 'Gasto excluído com sucesso!'
        })

      } else {
        console.log('error')
      }
    }

    //alerta de confirmação
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
      )
    }

    return (
      <View style={styles.rightView}>
        <TouchableOpacity style={styles.right} onPress={showAlert}>
          <Ionicons name="ios-trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const leftSwipe = (item) => {
    //função que confirma registro e trata resposta
    const handleConfirmar = async () => {
      let response = await fetch(`${config.urlRoot}/gastoAgendado/confirmarGasto/${item.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      let json = await response.json()

      if (json === 'success') {
        navigation.reset({
          routes: [{
            name: 'GastosAgendadosTab',
            params: {
              etiqueta: 'Gasto efetuado com sucesso!'
            }
          }],
        })
      } else {
        console.log('error')
      }
    }

    //alerta de confirmação
    const showAlert = async () => {
      Alert.alert(
        '',
        'Confirma a realização do gasto?',
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Sim',
            onPress: () => handleConfirmar(),
          },
        ]
      )
    }

    return (
      <View style={styles.leftView}>
        <TouchableOpacity style={styles.check} onPress={() => showAlert()}>
          <FontAwesome5 name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      {data.length === 0 ? (
        <Text style={styles.message}>Você ainda não agendou um gasto!</Text>
      ) : (
        data.map((item) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => toggleCard(item.id)}
            key={item.id}
          >
            <Swipeable
              renderRightActions={() => leftSwipe(item)}
              renderLeftActions={() => rightSwipe(item)}
            >
              <View>
                <View style={styles.upContainer} key={item.id}>

                  <View style={styles.imgContainer}>
                  {new Date(item.dataGasto) <= new Date() ? (
                    <View style={styles.taskDanger}>
                      <FontAwesome5 name="tasks" size={20} color="white" />
                    </View>
                  ) : new Date(item.dataGasto) <= new Date(new Date().setDate(new Date().getDate() + 3)) ? (
                    <View style={styles.taskCritical}>
                      <FontAwesome5 name="tasks" size={20} color="white" />
                    </View>
                  ) : (
                    <View style={styles.taskOk}>
                      <FontAwesome5 name="tasks" size={20} color="white" />
                    </View>
                  )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.categoria.nome}</Text>
                    <View style={[styles.infoContainer, { marginBottom: 0 }]}>
                      <Text style={styles.infoText}>Data de pagamento:</Text>
                      <Text style={styles.valueText}>
                        {new Date(item.dataGasto).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoText}>Valor:</Text>
                      <Text style={styles.value}> {accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}</Text>
                    </View>
                  </View>
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
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    padding: 5,
    marginBottom: 10,
    width: 340,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    marginTop: 2,
    paddingHorizontal: 17
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginRight: 8,
    color: '#333333',
  },
  infoTextDisp: {
    fontSize: 16,
    marginRight: 8,
    paddingHorizontal: 10,
    color: '#333333',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  valueText2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'red',
  },
  leftView: {
    backgroundColor: '#3CB371',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    height: 50,
    top: '2%',
    margin: 4
  },
  left: {
    padding: 5,
  },
  rightView: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 50,
    height: 50,
    top: '2%',
    margin: 4
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
  upContainer: {
    flexDirection: 'row',
    // marginTop: 2,
    paddingHorizontal: 10
  },
  taskDanger: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCritical: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#cd8d00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskOk: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
  },
  message: {
    fontSize: 15,
    color: '#fff',
    top: '40%',
    paddingVertical: 90
}
});
