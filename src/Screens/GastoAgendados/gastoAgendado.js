import React from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from "react-native"

import gastoAgendadoStyle from "./gastoAgendadoStyle";
import Card from "../../components/card/card";

export default function GastoAgendado() {
    return (
        <View style={gastoAgendadoStyle.container}>
            <StatusBar backgroundColor={'#2C3C51'} barStyle="light-content" />

            <View style={gastoAgendadoStyle.upContainer}>
                <View
                    style={gastoAgendadoStyle.menuContainer}>
                    <TouchableOpacity>
                        <Image
                            style={gastoAgendadoStyle.menu}
                            source={require('../../assets/menuDark.png')}
                        />
                    </TouchableOpacity>

                    <Text style={gastoAgendadoStyle.texto1}>E-PLANNER</Text>
                </View>

                <View 
                style={gastoAgendadoStyle.dateContainer}
                >
                    <Text>a</Text>
                </View>

            </View>


            <View 
            style={gastoAgendadoStyle.container2}
            >

            </View>

        </View>
    )
}
