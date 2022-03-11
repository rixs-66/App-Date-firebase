import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors';


export default function LoginForm(props) {

    const { changeform } = props;
    
    const Login = () =>{
        console.log("iniciando sesion...")
    }

    return (
        <>
            <TextInput style={styles.input}
                placeholder='Correo'
                placeholderTextColor={'#969696'} />

            <TextInput style={styles.input}
                placeholder='Contraseña'
                placeholderTextColor={'#969696'}
                secureTextEntry={true} />

            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.btn} onPress={Login} >
                    <Text style={styles.text} >Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contain}>
                <Text style={styles.text}>¿No tienes cuenta? </Text>
                <TouchableOpacity onPress={changeform}>
                    <Text style={styles.text2}  >Registrate aqui</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,

    },
    text2: {
        color: '#002fff',
        fontSize: 18,
    },
    input: {
        height: 50,
        color: 'white',
        width: '80%',
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: colors.PRIMARY_COLOR
    },
    contain: {

        flexDirection: 'row',
        justifyContent: 'center'

    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.SECONDARY_COLOR_GRADIANT,
        width: '40%',
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        marginBottom: 10,
    }

})