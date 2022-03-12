import React, { useEffect, useState } from 'react';
import colors from './src/utils/colors';
import { StyleSheet, Text, View, SafeAreaView, StatusBar,Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from './src/utils/firebase';
import 'firebase/auth'
import Auth from './src/components/Auth';



export default function App() {

  console.disableYellowBox = true;

  const [user, setuser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setuser(response);
    }
    )
  }, []);


  if (user === undefined) return null;


  return (

    <>

      <StatusBar barStyle='light-content' backgroundColor={colors.SECONDARY_COLOR_GRADIANT} />

      <SafeAreaView >
        <LinearGradient style={styles.fondo} colors={[colors.SECONDARY_COLOR_GRADIANT, colors.SECONDARY_COLOR_GRADIANT_DARK]}>
          {user ? <LogOut /> : <Auth />}
        </LinearGradient>

      </SafeAreaView>


    </>
  );
}

function LogOut() {

const logout = () =>{
 firebase.auth().signOut();
}

  return (
    <View>
      <Text style={{color: 'white', fontSize: 20}}>Estas Logeado</Text>
      <Button title="LogOut" onPress={logout}/>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    height: '100%',

  }
});


