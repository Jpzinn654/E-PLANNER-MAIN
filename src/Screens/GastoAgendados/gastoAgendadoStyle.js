import { StyleSheet } from "react-native"

const gastoAgendadoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
    },
    upContainer: {
        flex: 1,
        backgroundColor: '#eeeeef',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    menuContainer: {
        // justifyContent: 'center',
        alignItems: 'center',
        top: 20,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#000',
    },
    menu: {
        marginRight: 200,
        // left: '10%'
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    dateTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        top: 65,
        textTransform: 'uppercase',
    },
    container2: {
        flex: 3,
        backgroundColor: '#2C3C51',
        // paddingVertical: 90
    },
    gastoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        top: 15,
        right: '20%',
        marginBottom: 5
    },
    cards: {
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%'
    },
    cards2: {
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%'
    },
    aviso: {
        backgroundColor: "transparent", // Define o fundo como transparente
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        padding: 14,
        width: 320,
        marginTop: 20,
        alignSelf: "center", // Centraliza horizontalmente o componente
        justifyContent: "center", // Centraliza verticalmente o componente
        borderWidth: 2, // Define a largura da borda
        borderColor: "red", // Define a cor da borda como vermelho
    },
    
    avisoTexto: {
        color: "#FFF", // Define a cor do texto como branca
        fontWeight: "bold", // Define o texto como negrito
        textAlign: "center", // Centraliza o texto horizontalmente
    },
    
    
    
})

export default gastoAgendadoStyle;