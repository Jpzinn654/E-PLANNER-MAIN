import React from "react";

import { 
View, 
Text, 
TouchableOpacity,
Image,
StatusBar,
 } from "react-native";

import stylesPrincipal from "./principalStyle";

export default function PrincipalHome({navigation}) {
    return(
        <View style={stylesPrincipal.container}>
            
             <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
             <Image style={stylesPrincipal.logoImage} source={ require('../../assets/eplannerLogo.png') }></Image>

            <Text style={stylesPrincipal.texto1}>E-PLANNER</Text>

            <View style={stylesPrincipal.logoContainer}>
                <Image style={stylesPrincipal.image} source={ require('../../assets/carrosel3.png') }></Image>
                <Text style={stylesPrincipal.texto2}>Bem Vindo</Text>
                <Text style={stylesPrincipal.texto3}>Aqui, oferecemos uma solução simples para o seu gerenciamento financeiro, permitindo que você administre suas despesas com facilidade e evite o acúmulo de dívidas! </Text>
            </View>
            
            <View style={stylesPrincipal.containerForm}>

                <TouchableOpacity 
                style={stylesPrincipal.btn}
                onPress={ () => navigation.navigate('Register')}
                >
                <Text style={stylesPrincipal.btnText}>Começar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

