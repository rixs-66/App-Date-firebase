import React, { useEffect, useState } from 'react';
import colors from './src/utils/colors';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from './src/utils/firebase';
import 'firebase/auth'

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

    <LinearGradient style={styles.container} colors={[colors.SECONDARY_COLOR_GRADIANT, colors.SECONDARY_COLOR_GRADIANT_DARK]}>

      <SafeAreaView>
        <StatusBar backgroundColor={colors.SECONDARY_COLOR_GRADIANT} />
        {user ? <Text style={{color: 'white'}}>Logeado</Text> : <Text style={{color: 'white'}}>no logeado</Text>}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
