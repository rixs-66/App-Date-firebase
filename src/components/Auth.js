import React, { useState, useEffect } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LottieView from 'lottie-react-native';



function Auth() {

    const [isLogin, setisLogin] = useState(true);

    const changeform = () => {
        setisLogin(!isLogin)
    }

    return (
        <View style={styles.view}>
            <LottieView style={styles.logo}
                source={require('../assets/lotties/calendar.json' )}
                autoPlay={true}
                loop={true} />
            {isLogin ? <LoginForm changeform={changeform} /> : <RegisterForm changeform={changeform} />}
        </View>
    );
}

export default Auth;



const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    logo: {
        marginTop: 50,
        width: '100%',
        height: 250,
        marginBottom: 50,
        
    }
})