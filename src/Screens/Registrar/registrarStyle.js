import { StyleSheet } from "react-native"

const registrarStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuContainer: {
        flexDirection: 'row',
        top: 40,
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#fff',
        marginLeft: '8%',
        marginRight: 200,
    },
    back: {
        left: '10%',
        zIndex: 20,
    },
    containerInp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontWeight: "600",
        fontSize: 24,
        color: '#000',
        marginBottom: 3,
    },
    inputs: {
        borderWidth: 1,
        marginBottom: 10,
        width: 250,
        height: 50,
        borderRadius: 15,
        paddingLeft: 30,
    },
    finalContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt:{
        fontSize: 16
    },
    btn:{
        width: 200,
        height: 40,
        backgroundColor: '#354458',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },
    btnText:{
        color: 'white'
    },
    img: {
        position: 'absolute'
    },
    registrarMgs: {
        fontSize: 16,
        color: 'red',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    }

})

export default registrarStyle;