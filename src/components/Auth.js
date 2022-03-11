import React, { useState, useEffect } from 'react';
import { View,Image,StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';



function Auth() {

const [isLogin, setisLogin] = useState(true);

const changeform = () =>{
    setisLogin(!isLogin)
}

    return ( 
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/timetable.png')}/>
           {isLogin ? <LoginForm changeform={changeform}/> : <RegisterForm changeform={changeform}/>}
        </View>
     );
}

export default Auth;

console.disableYellowBox = true;

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
    },
    text:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    logo:{
        marginTop: 50,
        width: '80%',
        height: 200,
        marginBottom: 50,
        resizeMode: 'contain',
        

    }
})