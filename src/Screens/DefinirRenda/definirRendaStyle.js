import { StyleSheet } from "react-native";

const definifirRendaStyle = StyleSheet.create({
    fundo: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto1: {
        fontWeight: "bold",
        fontSize: 22,
        color: '#fff',
    },
    texto2: {
        marginTop: '8%',
        fontWeight: "300",
        fontSize: 32,
        color: '#fff',
    },
    areaRenda: {
        flex: 2,
        backgroundColor: '#EEEEEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn:{
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        width: 320,
        borderRadius: 26,
        backgroundColor: '#D9D9D9'
    },
    btnText:{
        fontSize: 18,
    },
    currentValue: {
        fontSize: 32,
    },
    fundoImg: {
        position: 'absolute',
        height: 280,
        width: '100%'
    },
})

export default definifirRendaStyle;