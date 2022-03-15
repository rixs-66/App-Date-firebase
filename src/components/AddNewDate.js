import { StyleSheet, Text, View, TextInput, TouchableOpacity, LogBox} from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../utils/colors'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment';
import LottieView from 'lottie-react-native';
import firebase from '../utils/firebase';
import 'firebase/firestore';



const db = firebase.firestore(firebase);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['console.disableYellowBox']);
LogBox.ignoreLogs(['AsyncStorage has been extracted']);

export default function AddNewDate() {
  //definicion de los hooks
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [FormData, setFormData] = useState({});
  const [formError, setFormError] = useState({});

  //Se definen las funciones
  const onCancel = () => {

    setisDatePickerVisible(false);

  }
  const showDatePicker = () => {
    setisDatePickerVisible(true);
  }

  const handlerData = (date) => {
    const datetxt = date;
    datetxt.setHours(0);
    datetxt.setMinutes(0);
    datetxt.setSeconds(0);
    setFormData({ ...FormData, datetxt })

    onCancel();
  }

  const onChange = (e, type) => {
    setFormData({ ...FormData, [type]: e.nativeEvent.text })
  }

  const onSubmit = () => {
    let error = {};
    if (!FormData.Nombre || !FormData.Descripcion || !FormData.datetxt) {
      if (!FormData.Nombre) error.Nombre = true;
      if (!FormData.Descripcion) error.Descripcion = true;
      if (!FormData.datetxt) error.datetxt = true;
    } else {

      const date = FormData;
      date.datetxt.setYear(0);
      console.log(FormData);
      db.collection('cumple').
        add(date).then(() => {
          alert('OK')
        }).catch(() => {
          setFormError({ Nombre: true, Descripcion: true, datetxt: true });
          alert('ALgo salio mal..... Intentelo de nuevo')
        })

    }

    setFormError(error);

  }
  // Visual
  return (
    <>
      <View style={styles.container}>
        <LottieView style={styles.LottieView}
          source={require('../assets/lotties/calendar2.json')}
          autoPlay={true}
          loop={true} />

        <TextInput
          placeholder='Nombre'
          placeholderTextColor={'#969696'}
          style={[styles.input, formError.Nombre && styles.error]}
          onChange={(e) => onChange(e, 'Nombre')} />

        <TextInput
          placeholder='Descripción'
          placeholderTextColor={'#969696'}
          style={[styles.input, formError.Descripcion && styles.error]}
          onChange={(e) => onChange(e, 'Descripcion')} />

        <Text style={[styles.TextInput,
        { color: FormData.datetxt ? 'white' : '#969696' },
        formError.datetxt && styles.error]}
          onPress={showDatePicker}>
          {FormData.datetxt ? moment(FormData.datetxt).format('LL') : 'Fecha'}
        </Text>
        <TouchableOpacity style={[styles.viewAdd]} onPress={onSubmit}>
          <Text style={{ color: 'white' }}>Guardar</Text>
        </TouchableOpacity>

      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="Fecha"
        onConfirm={handlerData}
        onCancel={onCancel} />


    </>
  )
}
//estilos
const styles = StyleSheet.create({
  container: {

    height: '60%',
    marginTop: '30%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,



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
    borderColor: colors.PRIMARY_COLOR,

  },
  TextInput: {
    textAlignVertical: 'center',
    height: 50,
    width: '80%',
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.PRIMARY_COLOR,
  },

  LottieView: {
    marginTop: 0,
    width: '100%',
    height: 200,

  },
  viewAdd: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 5

  },
  error: {
    borderColor: 'red',
    borderWidth: 1

  }

})