import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../utils/colors';
import { validateEmail } from '../utils/validation';
import firebase from '../utils/firebase';
import { Keyboard } from 'react-native-web';

LogBox.ignoreLogs(['AsyncStorage has been extracted']);
export default function RegisterForm(props) {


    const [formData, setformData] = useState(defaultValue);
    const [forError, setforError] = useState({});
    const { changeform } = props;




    const register = () => {
        let error = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            if (!formData.repeatPassword) error.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            error.email = true;
            alert("Correo invalido");
        } else if (formData.password !== formData.repeatPassword) {
            error.password = true;
            error.repeatPassword = true;
            alert("La contraseña no coincide");
        } else if (formData.password.length < 6) {
            error.password = true;
            error.repeatPassword = true;
            alert("La contraseña debe tener minimo 6 caracteres")
        } else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    alert("Registro realizado con exito")
                }).catch(() => {
                    setforError({
                        email: true,
                        password: true,
                        repeatPassword: true
                    })
                })
        }
        setforError(error);
        console.log(error);


    }
    return (
        <>
            <TextInput style={[styles.input, forError.email && styles.error]}
                placeholder='Correo'
                placeholderTextColor={'#969696'}
                onChange={(e) => setformData({ ...formData, email: e.nativeEvent.text })
               } />

            <TextInput style={[styles.input, forError.password && styles.error]}
                placeholder='Contraseña'
                placeholderTextColor={'#969696'}
                secureTextEntry={true}
                onChange={(e) => setformData({ ...formData, password: e.nativeEvent.text })} />

            <TextInput style={[styles.input, forError.repeatPassword && styles.error]}
                placeholder='Repetir contraseña'
                placeholderTextColor={'#969696'}
                secureTextEntry={true}
                onChange={(e) => setformData({ ...formData, repeatPassword: e.nativeEvent.text })} />

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
        color: '#566fdd',
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
    },
    error: {
        borderColor: 'red',
        borderWidth: 1

    }
})