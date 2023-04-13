import { StyleSheet } from "react-native"

const gastoCategoriaStyle = StyleSheet.create({
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
        textAlign: 'justify',
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
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button1:{
        borderWidth: 1,
        width: 100,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2:{
        backgroundColor: '#000',
        width: 100,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button3:{
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
    },
    cardsConatiner:{
        top: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fundo: {
        top: 0,
        position: 'absolute',
    }
})

export default gastoCategoriaStyle;