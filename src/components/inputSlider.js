import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, } from "react-native";
import Slider from '@react-native-community/slider';

const WIDTH = Dimensions.get('window').width - 125;



const InputSlider = ({ min, max }) => {

    const [sliderValue, setSliderValue] = useState(500);

    return (
        <View style={styles.container}>
            <Text
                style={styles.texto}
            >R$ {sliderValue}</Text>
            <View style={styles.labelsContainer}>
                <Text style={styles.label}>{min}</Text>
                <Text style={styles.label}>{max}</Text>
            </View>
            <Slider
                style={{ width: 300, height: 60 }}
                minimumValue={500}
                maximumValue={12500}
                onValueChange={(value) => setSliderValue(value)}
                value={sliderValue}
                step={100}
                thumbTintColor="#02CB7F"
                minimumTrackTintColor="#02CB7F"
                maximumTrackTintColor="#000" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 26,
    },
    labelsContainer: {
        width: WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#777',
    },
})

export default InputSlider