import React, { useEffect, useState } from 'react';
import colors from './src/utils/colors';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, LogBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from './src/utils/firebase';
import 'firebase/auth'
import Auth from './src/components/Auth';
import ListDate from './src/components/ListDate';

LogBox.ignoreLogs(['AsyncStorage has been extracted']);

export default function App() {



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
          {user ? <ListDate user={user} /> : <Auth />}
        </LinearGradient>

      </SafeAreaView>


    </>
  );
}



const styles = StyleSheet.create({
  fondo: {
    height: '100%',

  }
});


