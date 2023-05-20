import { StyleSheet } from "react-native"

const gastosGeraisStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title:{
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cardsConatiner: {
        top: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 360,
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
        fontSize: 16,
    },
})

export default gastosGeraisStyles;