import { StyleSheet } from "react-native"

const gastoCategoriaStyle = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
    },
    texto4: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: '5%'
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
    
})

export default gastoCategoriaStyle;