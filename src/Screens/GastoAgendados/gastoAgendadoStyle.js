import { StyleSheet } from "react-native"

const gastoAgendadoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
        color: '#2C3C51',
    },
    menuContainer:{
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
    upContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundo:{
        position: 'absolute',
    },
   
})

export default gastoAgendadoStyle