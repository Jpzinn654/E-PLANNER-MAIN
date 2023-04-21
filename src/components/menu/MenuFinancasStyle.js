import { StyleSheet } from "react-native"

const menuFinancasStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeef',
    },
    upContainer:{
        flex: 1,
    },
    menuContainer:{
        flexDirection: 'row',
        top: 20,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
        marginLeft: '8%'
    },
    menu: {
        marginRight: 200,
        left: '10%'
    },
    midContainer:{
        width: 180,
        height: 180,
        borderRadius: 800,
        backgroundColor: '#02CB7F',
        top: 80,
        left: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midText1:{
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    midText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    finalContainer: {
        flex: 2,
        // backgroundColor: 'green',
        top: 60,
    },
    buttonContainer:{
        top: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttons:{
        borderWidth: 1,
        width: 100,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText1: {
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonTexts:{
        fontWeight: 'bold'
    },
    monthContainer:{
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    cardsConatiner:{
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'red',
    },
    fundo: {
        top: 0,
        position: 'absolute',
    }
})

export default menuFinancasStyle;