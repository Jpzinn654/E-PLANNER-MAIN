import React from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { View, Text, Dimensions } from "react-native";

import accounting from 'accounting';
import { Line } from "react-native-svg";

export default function Graph({data}) {



    // Cria um novo objeto Date para obter o mês atual
    var currentDate = new Date();

    // Cria um array para armazenar os meses
    var meses = [];

    // Loop pelos últimos 5 meses, incluindo o mês atual
    for (var i = 0; i < 6; i++) {
        // Adiciona o mês atual menos o índice de meses para obter os meses anteriores
        var mesAnterior = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);

        // Adiciona o mês ao array de meses
        meses.push(mesAnterior.toLocaleString('pt-BR', { month: 'long' }));
    }

    meses.reverse();

    

    return (
        <View>
            <LineChart
                data={{
                    labels: meses,
                    datasets: [
                        {
                            data: [
                                data.mes6 || 0,
                                data.mes5 || 0,
                                data.mes4 || 0,
                                data.mes3 || 0,
                                data.mes2 || 0,
                                data.mes1 || 0
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="R$"
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#eeeeef",
                    backgroundGradientFrom: "#eeeeef",
                    backgroundGradientTo: "#eeeeef",
                    decimalPlaces: 2, // optional, defaults to 2dp
                   
                    color: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "#2C3C51"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 8
                }}
            />
        </View>
    )
}