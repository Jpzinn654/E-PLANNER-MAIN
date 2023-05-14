import { StyleSheet } from "react-native"

const gastoAgendadoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
    },
    upContainer:{
        flex: 1,
        backgroundColor: '#eeeeef',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    menuContainer:{
        flexDirection: 'row',
        top: 20,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#000',
        marginLeft: '8%'
    },
    menu: {
        marginRight: 200,
        left: '10%'
    },
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    dateTxt:{
        fontWeight: 'bold',
        fontSize: 20,
        top: 65,
        textTransform: 'uppercase',
    },
    container2: {
        flex: 3,
        backgroundColor: '#2C3C51',
    },
    gastoText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        top: 15,
        left: 40,
    },
    cards:{
        top: 15,
        justifyContent:'center',
        alignItems: 'center',
    },
})

export default gastoAgendadoStyle;