import { StyleSheet } from "react-native"

const gastosGeraisStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title:{
        position: 'absolute',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        bottom: "90%"
    },
    cardsConatiner: {
        top: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '73%',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        width: 150,
        height: 50,
    },
    result: {
        marginTop: 20,
        fontSize: 10,
    },
})

export default gastosGeraisStyles;