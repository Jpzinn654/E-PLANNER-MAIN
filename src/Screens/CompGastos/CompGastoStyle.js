import { StyleSheet } from "react-native";

const compGastoStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    upContainer: {
        // backgroundColor: 'red',
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    titulo:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 0,
    },
    titulo2:{
        marginTop: -20,
        fontSize: 17,
        fontWeight: 'bold',
    },
    valor1:{
        fontSize: 18,
        marginTop: '1%',
    },
    valor2:{
        fontSize: 18,
        marginTop: '1%',
    },
    valorTeste:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    listMonth: {
        marginTop: 20,
        justifyContent: 'space-evenly',
        bottom: '3%'
    },
    listMonth2: {
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
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default compGastoStyles;