import { StyleSheet, Text, View, TextInput, TouchableOpacity, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../utils/colors'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment';
import LottieView from 'lottie-react-native';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




const db = firebase.firestore(firebase);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);


export default function AddNewDate(props) {
  const { user, setshowList, setReloadData } = props;



  //definicion de los hooks
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [FormData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
    datetxt: ''
  });
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
    } else if (FormData.Nombre.length > 8) {
      alert('Maximo 8 caracteres Nombre')
      error.Nombre = true;
      if (FormData.Descripcion.length > 8) {
        error.Descripcion = true;
        alert('Maximo 8 caracteres Descripcion')
      }

    } else {

      const date = FormData;
      date.datetxt.setYear(0);
      db.collection(user.uid).
        add(date).then(() => {
          setReloadData(true)
          setshowList(true);
        }).catch(() => {
          setFormError({ Nombre: true, Descripcion: true, datetxt: true });
          alert('ALgo salio mal..... Intentelo de nuevo')
        })

    }

    setFormError(error);

  }




  // Visual
  return (
    <KeyboardAwareScrollView style={{ width: '100%', height: '100%' , zIndex: 0 }} getTextInputRefs={() => { return [this._textInputRef]; }}>
      <Animatable.View animation={'fadeInUpBig'} style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <View style={styles.container}>

          <LottieView style={styles.LottieView}
            source={require('../assets/lotties/calendar2.json')}
            autoPlay={true}
            loop={true} />

          <TextInput
            placeholder='Nombre'
            placeholderTextColor={'#969696'}
            style={[styles.input, formError.Nombre && styles.error]}
            onChange={(e) => onChange(e, 'Nombre')
            } />

          <TextInput
            placeholder='Descripci??n'
            placeholderTextColor={'#969696'}
            style={[styles.input, formError.Descripcion && styles.error]}
            onChange={(e) => onChange(e, 'Descripcion')

            } />

          <Text style={[styles.TextInput,
          { color: FormData.datetxt ? 'white' : '#969696' },
          formError.datetxt && styles.error]}
            onPress={showDatePicker}>
            {FormData.datetxt ? moment(FormData.datetxt).format('LL') : 'Fecha'}
          </Text>

          <TouchableOpacity style={[styles.viewAdd]} onPress={onSubmit}>
            <Text style={{ color: 'white' }}>Guardar</Text>
          </TouchableOpacity>


          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="Fecha"
            onConfirm={handlerData}
            onCancel={onCancel} />

        </View>
      </Animatable.View>
    </KeyboardAwareScrollView>

  )

}


//estilos
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20%',
  
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
    marginBottom: 5,
    zIndex: 1


  },
  error: {
    borderColor: 'red',
    borderWidth: 1

  }

})