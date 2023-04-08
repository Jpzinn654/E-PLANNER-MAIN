import { StyleSheet } from "react-native"

const gastoAgendadoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
    },
    upContainer:{
        flex: 1,
        backgroundColor: '#d9d9d9'
    },
    menuContainer:{
        flexDirection: 'row',
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#000',
        marginLeft: '8%'
    },
    back: {
        marginRight: 200,
        left: '10%'
    },
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    container2: {
        flex: 2,
        backgroundColor: '#2C3C51',
    },
})

export default gastoAgendadoStyle;