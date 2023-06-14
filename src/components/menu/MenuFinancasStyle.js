import { StyleSheet } from "react-native"

const menuFinancasStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeef',
    },
    upContainer: {
        flex: 1,
    },
    menuContainer: {
        alignItems: 'center',
        top: 20,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#fff',
    },
    menu: {
        marginRight: 200,
    },
    midContainer: {
        width: 180,
        height: 180,
        borderRadius: 800,
        backgroundColor: '#02CB7F',
        top: 60,
        left: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midText1: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 10
    },
    midText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    finalContainer: {
        flex: 2,
        overflow: 'hidden',
        top: 40,
        paddingTop: 20,
        backgroundColor: '#eeeeef',
        marginTop: 10,
        borderRadius: 15,
        elevation: 30
    },
    buttonContainer: {
        top: 5,
        paddingBottom: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttons: {
        borderWidth: 1,
        width: 100,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText1: {
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonTexts: {
        fontWeight: 'bold'
    },
    monthContainer: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    cardsConatiner: {
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'red',
    },
    fundo: {
        top: -10,
        position: 'absolute',
    }
})

export default menuFinancasStyle;