import { StyleSheet } from "react-native"

const adcCatStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
        color: '#2C3C51',
    },
    texto1: {
        position: 'absolute',
        top: '4%',
        left: '70%',
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
    },
    menu: {
        position: 'absolute',
        top: 30,
        left: '8%',
    },
    fundoImg: {
        position: 'absolute',
    },
    Valor: {
        flexDirection: 'row',
        flex: 1,
        top: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    txtVal1: {
        color: '#fff',
        paddingRight: '10%',
        fontSize: 22,
    },
    txtVal2: {
        color: '#fff',
        top: '1%',
        paddingRight: '2%',
        fontSize: 14,
    },
    txtVal3: {
        color: '#fff',
        fontSize: 22,
    },
    inputContainer: {
        flex: 2,
        backgroundColor: '#EEEEEF',
        alignItems: 'center',
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
    },
    inpTxt1: {
        padding: '10%',
        color: '#000',
        fontSize: 22,
        fontWeight: '600',
    },
    inp1: {
        paddingLeft: 10,
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: '2%',
    },
    inp2: {
        paddingLeft: 10,
        marginTop: '5%',
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: '2%',
    },
    inp3: {
        paddingLeft: 10,
        width: 200,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: '2%',
    },
    subContainerInput: {
        marginTop: '7%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 60,
        height: 45,
        marginLeft: '5%',
        borderRadius: 10,
        top: '0.5%',
        backgroundColor: '#02CB7F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff'
    },
    btnContainer:{
        top: '15%'
    },
    btnContinuar:{
        width: 280,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#02CB7F',
        justifyContent: 'center',
        alignItems: 'center',
        top: '10%'
    },
    btnConinuarTxt: {
        color: '#000',
        fontSize: 189,
    }
    
})

export default adcCatStyle