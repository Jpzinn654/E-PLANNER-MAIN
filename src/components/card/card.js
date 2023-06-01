import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import accounting from 'accounting';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import homeStyle from '../../Screens/Home/homeStyle';
import config from '../../../config/config.json';

export default function Card({ usuario, navigation, onChildData }) {
  const isFocused = useIsFocused();

  const [activeIndex, setActiveIndex] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);

  moment.locale('pt-br');

  const leftSwipe = (item) => {
    const handleExcluir = async () => {
      let response = await fetch(`${config.urlRoot}/categoria/deletar/${item.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let json = await response.json();

      if (json === 'success') {
        navigation.navigate('HomeDrawer', {
          etiqueta: 'Categoria excluída com sucesso!',
        });
      } else {
        console.log('error');
      }
    };

    const showAlert = async () => {
      Alert.alert('', 'Deseja excluir a categoria?', [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => handleExcluir(),
        },
      ]);
    };

    return (
      <View style={styles.leftView}>
        <TouchableOpacity style={styles.left} onPress={() => showAlert()}>
          <Ionicons name="ios-trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const rightSwipe = (item) => {
    const editar = async () => {
      navigation.navigate('EditarCategorias', { id: item.id });
    };

    return (
      <View style={styles.rightView}>
        <TouchableOpacity style={styles.right} onPress={() => editar()}>
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const usuarioId = usuario || '';
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
          ano: moment().format('YYYY'),
        }),
      });

      let json = await response.json();

      if (json === '') {
        setDisplay('Você não possui nenhuma categoria!');
        setCarregando(false);
      } else {
        setData(json);
        setDisplay(false);
        setCarregando(false);
      }
    }
  };

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
      <View>
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(index)}>
          <Swipeable renderLeftActions={() => leftSwipe(item)} renderRightActions={() => rightSwipe(item)}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.nome}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Valor Disponível:</Text>
                {item.valor == item.valor - (Number(item.valorTotalGastos) + Number(item.valorTotalGastosAgendados)) ? (
                      <Text style={styles.valueText}>
                       {accounting.formatMoney(
                      item.valor - (Number(item.valorTotalGastos) + Number(item.valorTotalGastosAgendados)),
                      'R$',
                      2,
                      '.',
                      ','
                    )}
                      </Text>
                    ) : (
                      <Text style={styles.valueText2}>
                        {accounting.formatMoney(
                      item.valor - (Number(item.valorTotalGastos) + Number(item.valorTotalGastosAgendados) ),
                      'R$',
                      2,
                      '.',
                      ','
                    )}
                      </Text>
                    )}
              </View>
            </View>
          </Swipeable>
          {isActive && (
            <View style={styles.cardContent}>
              <View style={styles.separatorDesc} />
              <Text style={styles.subtitle}>{item.descricao}</Text>
              <Text style={styles.infoTextDisp}>
                Valor Total: {accounting.formatMoney(item.valor, 'R$', 2, '.', ',')}
              </Text>
            </View>
          )}

        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {carregando ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : data.length === 0 ? (
        <Text style={styles.noItems}>Clique no botão para adicionar uma categoria!</Text>
      ) : (
        <FlatList data={data} keyExtractor={({ id }, index) => id} renderItem={renderCard} ListFooterComponent={<View style={styles.blankSpace} />} />
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
    
  },
  card: {
    padding: 10,
    marginBottom: 10,
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 7,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#808080',
  },
  cardContent: {
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
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
  },
  infoTextDisp: {
    fontSize: 16,
    marginRight: 8,
    paddingHorizontal: 10,
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
    color: 'red',
  },
  leftView: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 60,
  },
  left: {
    padding: 5,
  },
  rightView: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 60,
  },
  right: {
    padding: 5,
  },
  loading: {
    fontSize: 15,
    textAlign: 'center',
  },
  noItems: {
    fontSize: 15,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginTop: 10,
  },
  separatorDesc: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  blankSpace: {
    height: 70, // Adjust the height as needed
  },
});
