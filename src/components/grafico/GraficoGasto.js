import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import accounting from 'accounting';
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryBar } from "victory-native"

export default function Graph({ data }) {
    if (!data) {
        // Caso o array de dados esteja vazio, exiba uma mensagem ou um indicador de carregamento
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const currentDate = new Date(); // Get the current date
    const currentMonth = currentDate.getMonth(); // Get the current month (0-11)
    const currentYear = currentDate.getFullYear(); // Get the current year

    const chartData = [
        { quarter: getQuarterLabel(currentMonth, currentYear, 5), earnings: parseFloat(data.mes6) || 0 },
        { quarter: getQuarterLabel(currentMonth, currentYear, 4), earnings: parseFloat(data.mes5) || 0 },
        { quarter: getQuarterLabel(currentMonth, currentYear, 3), earnings: parseFloat(data.mes4) || 0 },
        { quarter: getQuarterLabel(currentMonth, currentYear, 2), earnings: parseFloat(data.mes3) || 0 },
        { quarter: getQuarterLabel(currentMonth, currentYear, 1), earnings: parseFloat(data.mes2) || 0 },
        { quarter: getQuarterLabel(currentMonth, currentYear, 0), earnings: parseFloat(data.mes1) || 0 },
    ];

    function getQuarterLabel(currentMonth, currentYear, offset) {
        const monthNames = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Otu", "Nov", "Dez"
        ];

        const previousMonthIndex = (currentMonth - offset + 12) % 12;
        const previousYear = currentYear - Math.floor((currentMonth - offset + 12) / 12);

        return `${monthNames[previousMonthIndex]}`;
    }

    return (
        <View style={styles.container}>
          <VictoryChart domainPadding={10}>
            <VictoryAxis tickFormat={(tick) => tick} />
    
            <VictoryLabel
              x={Dimensions.get('window').width / 2}
              y={30}
              textAnchor="middle"
              style={styles.chartLabel}
            />
    
            <VictoryBar
              data={chartData}
              x="quarter"
              y="earnings"
              style={{
                data: {
                  fill: 'green',
                },
              }}
              labels={({ datum }) =>
                `${accounting.formatMoney(datum.earnings, 'R$', 2, '.', ',')}`
              }
              labelComponent={
                <VictoryLabel dy={-10} style={styles.barLabel} />
              }
            />
          </VictoryChart>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    chartLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Arial',
    },
    barLabel: {
      fontSize: 13,
      fontFamily: 'Arial',
    },
  });
