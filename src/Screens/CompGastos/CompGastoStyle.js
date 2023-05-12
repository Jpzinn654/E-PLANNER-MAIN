import { StyleSheet } from "react-native";

const compGastoStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    upContainer: {
        // backgroundColor: 'red',
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        bottom: '3%'
    },
    inp1: {
        width: 100,
        right: '100%',
        borderWidth: 2,
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',

    },
    inp2: {
        width: 100,
        left: '100%',
        borderWidth: 2,
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
    },
    textInputs: {
        flexDirection: 'row',
        bottom: '1%'
    },
    textInp1:{
        right: '270%',
    },
    textInp2:{
        left: '250%',
    },
    midContainer:{
        // backgroundColor: 'green',
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    finalContainer:{
        // backgroundColor: 'royalblue',
        width: '100%',
        height: '30%',
    },
    meses: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: '3%'
    },
    valores: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '4%'
    },
    valor1:{
        right: '275%',
    },
    valor2:{
        left: '285%',
    },
})

export default compGastoStyles;