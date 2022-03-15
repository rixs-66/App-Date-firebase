import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../utils/colors';
import LottieView from 'lottie-react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function RenderDate(props) {

  const { date } = props;
  const pasat = date.days > 0 ? true : false;
  const infoDay = () => {

    if (date.days === 0) {
      return (
        <>
          <LottieView
            source={require('../assets/lotties/confetti.json')}
            autoPlay={true}
            loop={true} />
        </>

      )
    } else {

      const days = -date.days;
      return (
        <>
          
            <LottieView style={{width: 100}}
              source={require('../assets/lotties/esperar.json')}
              autoPlay={true}
              loop={true} />
            <Text style={{ color: 'white' }}>Faltan: {days} dias</Text>
          
        </>
      )
    }
  }

  return (
    <TouchableOpacity style={[styles.card, pasat ? styles.pasat :
      date.days === 0 ? styles.actual : styles.current]}>
      <Text style={styles.username}>{date.Nombre} {date.Descripcion} </Text>
      {pasat ? <LottieView style={{ width: 60 }}
        source={require('../assets/lotties/expire.json')}
        autoPlay={true}
        loop={true} /> : infoDay()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  username: {
    color: 'white',
    fontSize: 16,

  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,



  },
  pasat: {
    backgroundColor: '#850101',
  },
  current: {
    backgroundColor: colors.PRIMARY_COLOR_DARK
  },
  actual: {
    backgroundColor: '#005e00'
  },
  LottieView: {

    width: '50%',


  }



})