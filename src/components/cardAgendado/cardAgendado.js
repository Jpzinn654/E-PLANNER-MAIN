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
        navigation.reset({
          routes: [{
            name: 'GastosAgendadosTab', params: {
              etiqueta: 'Gasto excluído com sucesso!'
            },

          }],
        });

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
      );

    }

    return (
      <View style={styles.rightView}>
        <TouchableOpacity style={styles.right} onPress={showAlert}>
          <Ionicons name="ios-trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

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
            name: 'GastosAgendadosTab', params: {
              etiqueta: 'Gasto efetuado com sucesso!'
            },

          }],
        });

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
      );

    }

    return (
      <View style={styles.leftView}>
        <TouchableOpacity style={styles.check}
          onPress={() => showAlert()}>
          <FontAwesome5 name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (

    <View>
      {data.map((item) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => toggleCard(item.id)}
          key={item.id}
        >
          <Swipeable
            renderRightActions={() => rightSwipe(item)}
            renderLeftActions={() => leftSwipe(item)}
          >
            <View style={styles.upContainer} key={item.id}>
              {new Date(item.dataGasto) <= new Date() ? (
                <View style={styles.taskDander}>
                  <FontAwesome5 name="tasks" size={24} color="white" />
                </View>
              ) : new Date(item.dataGasto) <= new Date(new Date().setDate(new Date().getDate() + 3)) ? (
                <View style={styles.taskCritical}>
                  <FontAwesome5 name="tasks" size={24} color="white" />
                </View>
              ) : (
                <View style={styles.taskOk}>
                  <FontAwesome5 name="tasks" size={24} color="white" />
                </View>
              )}
              <Text style={styles.title}>{item.categoria.nome}</Text>
              <Text style={styles.value}>
                {new Date(item.dataGasto).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              </Text>
              <Text style={styles.value}> {accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}</Text>
            </View>
          </Swipeable>
          {cardStates[item.id] && (
            <View style={styles.cardContent}>
              <Text style={styles.text}>{item.descricao}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 14,
    textAlign: "center",
    width: 320,
    marginTop: 10,
  },
  taskDander: {
    width: 30,
    backgroundColor: "red",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  taskCritical: {
    width: 30,
    backgroundColor: "#cd8d00",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  taskOk: {
    width: 30,
    backgroundColor: "green",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  rightView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  right: {
    backgroundColor: "blue",
    padding: 4,
  },
  check: {
    backgroundColor: "green",
    padding: 4,
  },
  upContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardContent: {
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
  },
});
