import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../utils/colors';


export default function RegisterForm(pros) {


    const [formData, setformData] = useState(defaultValue);

    const { changeform } = pros;
    const register = () => {
        console.log("registrando...")
        console.log(formData)
    }
    return (
        <>
            <TextInput style={styles.input}
                placeholder='Correo'
                placeholderTextColor={'#969696'}
                onChange={(e) => setformData({...formData, email: e.nativeEvent.text})} />

            <TextInput style={styles.input}
                placeholder='Contraseña'
                placeholderTextColor={'#969696'}
                secureTextEntry={true} 
                onChange={(e) => setformData({ ...formData,password: e.nativeEvent.text})}/>

            <TextInput style={styles.input}
                placeholder='Repetir contraseña'
                placeholderTextColor={'#969696'}
                secureTextEntry={true}
                onChange={(e) => setformData({...formData,repeatPassword: e.nativeEvent.text})} />

            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.btn} onPress={register}>
                    <Text style={styles.text} >Registrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contain}>
                <Text style={styles.text}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={changeform}>
                    <Text style={styles.text2}  >Inicia sesion</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue() {
    return ({
        email: '',
        password: '',
        repeatPassword: ''
    }

    );
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