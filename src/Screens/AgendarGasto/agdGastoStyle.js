import { StyleSheet } from "react-native"

const agdGastoStyle = StyleSheet.create({
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
    texto2:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    texto3:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        right: 110,
        marginTop: 20,
    },
    card:{
        flex: 2,
        backgroundColor: '#EEEEEF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems:'center',
        overflow: 'hidden',
        
    },
    card2:{
        flex: 1,
        backgroundColor: '#EEEEEF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems:'center',
        overflow: 'hidden',
        paddingVertical: 25,
        paddingHorizontal: 45,
    },
    texto4:{
        fontSize: 22,
        fontWeight: '600',
        marginTop: '10%'
    },
    texto5:{
        fontSize: 22,
        fontWeight: '600',
    },
    texto6:{
        fontSize: 18,
        fontWeight: '600',
    },
    input:{
        borderWidth: 1,
        borderBottomColor: '#000',
        borderRadius: 2,
        width: 280,
        margin: 10,
        height: 40,
        paddingLeft: 10,
    },
    cardInput:{
        flexDirection: 'row',
        marginBottom: 60
    },
    inputData:{
        width: 40,
        margin: 10,
        height: 40,
        paddingLeft: 5,
        backgroundColor: '#d9d9d9'
    },
    inputAno:{
        width: 120,
        margin: 10,
        height: 40,
        paddingLeft: 5,
        backgroundColor: '#d9d9d9'
    },
    inputMes:{
        width: 120,
        margin: 10,
        height: 40,
        paddingLeft: 5,
        backgroundColor: '#d9d9d9'
    },
    btnContinuar:{
        width: 290,
        height: 45,
        // marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
        top: '95%',
        // left: '10%',
        position: "absolute",
    }, 
    btnContinuarTxt: {
        color: '#000',
        fontSize: 18,
    },
    fundo:{
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
    },
    scrollContainer: {
        flex: 1,
      },
   
})

export default agdGastoStyle