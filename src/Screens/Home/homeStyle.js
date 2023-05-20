import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3C51',
    },
    container2: {
        paddingTop: '10%',
        width: '100%',
        height: '30%',
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
    txt1: {
        top: '40%',
        marginLeft: '16%',
        fontWeight: "bold",
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase'
    },
    txt2: {
        top: '40%',
        marginLeft: '16%',
        fontWeight: "bold",
        fontSize: 26,
        color: '#fff',
    },
    txt3: {
        top: '40%',
        marginLeft: '16%',
        fontWeight: "500",
        fontSize: 26,
        color: '#fff',
    },
    container3: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: '5%',
    },
    renda1: {
        width: '100%',
        height: '4%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rendaTxt1: {
        color: '#fff',
        fontSize: 14,
        marginRight: '2%',
        marginTop: '1%',
        right: '60%',
    },
    rendaTxt2: {
        color: '#fff',
        fontSize: 20,
        right: '60%',
    },
    rendaTxt3: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: '10%',
        marginRight: '2%',
        marginTop: '1%',
        left: '50%',
    },
    rendaTxt4: {
        color: '#fff',
        fontSize: 20,
        left: '50%',
    },
    rendaTxt5: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: '10%',
        marginTop: '1%',
        right: '50%',
    },
    rendaBars: {
        width: '100%',
        height: '2%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barra1: {
        marginRight: '10%',
    },
    container4: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '25%',
    },
    card1: {
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems:'center',
        width: 130,
        height: 150,
        borderRadius: 20,
    },
    circle: {
        backgroundColor: '#02CB7F',
        width: 70,
        height: 70,
        borderRadius: 60,
        marginTop: '10%',
        marginBottom: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card2: {
        left: '10%',
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems:'center',
        width: 130,
        height: 150,
        borderRadius: 20,
    },
    container5: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#EEEEEF',
    },
    txtCat: {
        marginTop: '2%',
        fontWeight: '600',
        fontSize: 22,
        
    },
    subTxt: {
        marginTop: '5%',
        textAlign: 'center',
        width: '85%',
        fontWeight: '400',
        fontSize: 18,
    },
    btnCat: {
        backgroundColor: '#D9D9D9',
        width: 320,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '10%'
    },
    btnTxt: {
        fontSize: 18,
    },
    buttonCategoria:{
        position: 'absolute',
        backgroundColor: '#02CB7F',
        width: 55,
        height: 55,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        top: 180,
    },
    components:{
        width: '80%',
        height: '78%'
    },
    fundoImg: {
        position: 'absolute',
    },
})

export default homeStyle;