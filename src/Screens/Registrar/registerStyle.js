import { StyleSheet } from "react-native"

const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    upContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        top: -40,
        right: 80,
    },
    texto1: {
        position: 'absolute',
        top: 33,
        left: -40,
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
    },
    closeBtn: {
        position: 'absolute',
        top: 33,
        left: 280,
        color: '#000',
    },
    textCloseBtn: {
        fontWeight: "400",
        fontSize: 18,
        color: '#000',
    },
    smartContainer1: {
        flex: 2,
        bottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    register: {
        
        fontWeight: "600",
        fontSize: 24,
        color: '#000',
    },
    inputArea1: {
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: 2,
    },
    inputsView:{
        bottom: 10,
    },
    inputs: {
        paddingLeft: 10,
        width: 230,
        height: 50,
    },
    icons: {
        top: 10,
        left: 0,
    },
    inputArea2: {
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10,
    },
    inputArea3: {
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: 18,
    },
    inputArea4: {
        width: 280,
        height: 50,
        borderColor: '#000',
        borderWidth: 1.2,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        top: 28,
    },
    areaBtn:{
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    touchText: {
        fontWeight: "500",
        fontSize: 16,
        color: '#000',
        top: 40,
    },
    touchArea: {
        width: 150,
    },
    btn: {
        top: 10,
        width: 180,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#354458',
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
    },
    fundo: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    registerMsg: {
        fontSize: 16,
        color: 'red',
        marginTop: 5,
        marginBottom: 5,
    },
    
})

export default registerStyle