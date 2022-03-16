import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../utils/colors';
import { validateEmail } from '../utils/validation';
import firebase from '../utils/firebase';
import * as Animatable from 'react-native-animatable';



LogBox.ignoreLogs(['AsyncStorage has been extracted']);

export default function LoginForm(props) {

    const [logear, setlogear] = useState();
    const [formData, setformData] = useState(defaultValue);
    const [formError, setformError] = useState({});



    const { changeform, isLogin } = props;

    const Login = () => {
        let error = {};

        if (!formData.email || !formData.password) {
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
        } else if (!validateEmail(formData.email)) {
            error.email = true
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).
                then(() => {

                }).catch(() => {
                    alert("Correos o contraseñas incorrectos")
                    email: true;
                    password: true;
                })
        }
        setformError(error)
    }

    const onChange = (e, type) => {
        setformData()
        setformData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (

        
            <Animatable.View animation={isLogin ? 'fadeInLeft' : 'fadeOutLeft'} style={{ width: '100%', alignItems: 'center' }} >
                <TextInput style={[styles.input, formError.email && styles.error]}
                    placeholder='Correo'
                    placeholderTextColor={'#969696'}
                    onChange={(e) => onChange(e, 'email')} />

                <TextInput style={[styles.input, formError.password && styles.error]}
                    placeholder='Contraseña'
                    placeholderTextColor={'#969696'}
                    secureTextEntry={true}
                    onChange={(e) => onChange(e, 'password')} />

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={Login} >
                        <Text style={styles.text} >Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contain}>
                    <Text style={styles.text}>¿No tienes cuenta? </Text>
                    <TouchableOpacity onPress={changeform}>
                        <Text style={styles.text2}  >Regístrate aquí</Text>
                    </TouchableOpacity>
                </View>
            </ Animatable.View>
      

    )
}

function defaultValue() {
    return {
        email: "",
        password: ""
    }


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