import { StyleSheet, Alert, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import ActionBar from './ActionBar';
import AddNewDate from './AddNewDate';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import moment from 'moment';
import RenderDate from './RenderDate';
import * as Animatable from 'react-native-animatable';

const db = firebase.firestore(firebase);

export default function ListDate(props) {

  const { user } = props;

  const [showList, setshowList] = useState(true);
  const [Dates, setDates] = useState([]);
  const [pasatDates, setPasatDates] = useState([]);
  const [reloadData, setReloadData] = useState(false);


  useEffect(() => {
    setDates([]);
    setPasatDates([]);

    db.collection(user.uid)
      .orderBy('datetxt', 'asc')
      .get()
      .then((response) => {
        const itemArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemArray.push(data);

        });
        filterDate(itemArray);
      });
    setReloadData(false);
  }, [reloadData]);


  //funciones

  const filterDate = (item) => {

    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      seconds: 0,
      millisecond: 0


    });

    const temporalDatesArray = [];
    const temporalPasatDatesArray = [];

    item.forEach((item) => {
      const year = new Date(item.datetxt.seconds * 1000);
      const datetxt = moment(year);
      const currentYear = moment().get('year');
      datetxt.set({ year: currentYear })

      const diffDate = currentDate.diff(datetxt, 'days');
      const itemTemp = item;
      itemTemp.year = datetxt;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        temporalDatesArray.push(itemTemp);
      } else {
        temporalPasatDatesArray.push(itemTemp);
      }



    });
    setDates(temporalDatesArray);
    setPasatDates(temporalPasatDatesArray);

  };

  const deleteDate = (Dates) => {
    Alert.alert(
      'Eliminar cumpleaños',
      `¿Estas seguro de eliminar ${Dates.Nombre} ${Dates.Descripcion} ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar Fecha',
          onPress: () => {
            db.collection(user.uid)
              .doc(Dates.id)
              .delete().then(() => {
                setReloadData();
              })
          },
        },
      ],
      {
        cancelable: false
      }
    );
  };



  return (
    <Animatable.View animation={'bounceInDown'} style={styles.container}>

      {showList ? (

        <ScrollView style={styles.scrollView}>
          {Dates.map((item, index) => (

            <RenderDate
              key={index}
              date={item}
              deleteDate={deleteDate} />

          ))}

          {pasatDates.map((item, index) => (

            <RenderDate
              key={index}
              date={item}
              deleteDate={deleteDate} />

          ))}
        </ScrollView>

      ) : (<AddNewDate user={user}
        setshowList={setshowList}
        setReloadData={setReloadData} />)
      }

<ActionBar  showList={showList} setshowList={setshowList} />
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',


  },
  scrollView: {
    marginBottom: 50,
    width: '100%',


  }

})