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

export default function Graph() {
    return (
        <View>
            <BarChart
                data={{
                    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
                    datasets: [
                        {
                            data: [
                                34,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="R$"
                yAxisSuffix="k"
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
                        r: "10",
                        strokeWidth: "5",
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