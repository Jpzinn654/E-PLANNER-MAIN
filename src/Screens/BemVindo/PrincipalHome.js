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
                <Text style={stylesPrincipal.texto3}>Aqui você pode gerenciar suas finanças com completa facilidade, se tornando o mais intuitivo possível Aqui você pode gerenciar suas finanças com completa facilidade, se tornando o mais intuitivo possível </Text>
            </View>
            
            <View style={stylesPrincipal.containerForm}>

                <TouchableOpacity 
                style={stylesPrincipal.btn}
                onPress={ () => navigation.navigate('Registrar')}
                >
                <Text style={stylesPrincipal.btnText}>Começar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

