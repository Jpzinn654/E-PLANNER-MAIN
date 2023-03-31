import React from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native"

import gastoAgendadoStyle from "./gastoAgendadoStyle";
import Card from "../../components/card/card";

export default function GastoAgendado() {
    return (
        <View styles={gastoAgendadoStyle.container}>
            
            <View
                style={gastoAgendadoStyle.menuContainer}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}>
                    <Image
                        style={gastoAgendadoStyle.back}
                        source={require('../../assets/menuDark.png')}
                    />
                </TouchableOpacity>

                <Text
                    style={gastoAgendadoStyle.texto1}
                >E-PLANNER</Text>
            </View>

            
        </View>
    )
}