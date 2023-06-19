import { StyleSheet } from "react-native"


const adcGastoSyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
        color: '#2C3C51',
    },
    menuContainer: {
        flexDirection: 'row',
        top: -55,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
    },
    back: {
        marginRight: 200,
    },
    upContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto2: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    texto3: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        right: 110,
        marginTop: 20,
    },
    card: {
        flex: 2,
        backgroundColor: '#EEEEEF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // alignItems: 'center'
    },
    texto4: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: '600',
        marginTop: '5%'
    },
    texto5: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: '600',
    },
    input: {
        borderBottomWidth: 2,
        borderRadius: 2,
        width: '90%',
        margin: 10,
        height: 40,
        paddingLeft: 10,
    },
    btnContinuar: {
        width: 320,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#02CB7F',
        justifyContent: 'center',
        alignItems: 'center',
        top: '90%',
        left: '10%',
        position: "absolute",
    },
    btnContinuarTxt: {
        color: '#fff',
        fontSize: 18,
    },
    fundo: {
        position: 'absolute',
    },
    picker: {
        backgroundColor: '#d9d9d9',
        width: 280,
        borderBottomStartRadius: 30,
    },
    pickerItem: {
        color: '#red',
    },
    item:{
        fontSize: 18,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',  
    },
    gastoMsg: {
        fontSize: 16,
        color: 'red',
        marginTop: 5,
        marginBottom: 5,
        textAlign: "center",
        paddingVertical: 7,
        paddingHorizontal: 20,
    },

})

export default adcGastoSyle