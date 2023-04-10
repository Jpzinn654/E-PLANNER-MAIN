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
import moment from 'moment';
import 'moment/locale/pt-br';
import CardAgendado from "../../components/cardAgendado/cardAgendado";

export default function GastoAgendado() {

    moment.locale('pt-br');
    const currentMonth = moment().format('MMMM');
    const currentYear = moment().format('YYYY');

    return (
        <View style={gastoAgendadoStyle.container}>
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

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
                    <Text
                        style={gastoAgendadoStyle.dateTxt}>
                        {currentMonth}, {currentYear}</Text>
                </View>
            </View>


            <View
                style={gastoAgendadoStyle.container2}
            >
                <Text
                    style={gastoAgendadoStyle.gastoText}>Gastos Agendados</Text>

                <View
                    style={gastoAgendadoStyle.cards}>
                    <ScrollView>
                        <CardAgendado />
                        <CardAgendado />
                        <CardAgendado />
                        <CardAgendado />
                        <CardAgendado />
                        <CardAgendado />
                    </ScrollView>
                </View>
            </View>

        </View>
    )
}
