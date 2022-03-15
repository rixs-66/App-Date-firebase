import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import ActionBar from './ActionBar'
import AddNewDate from './AddNewDate'

export default function ListDate() {

  const [showList, setshowList] = useState(true);
  


  return (
    <View style={styles.container}>

      {showList ? (
        <>
          <Text style={{ color: 'white' }}>hola mudno</Text>
          <Text style={{ color: 'white' }}>hola mudno</Text>
        </>

      ) : (<AddNewDate />)
      }

      <ActionBar showList={showList} setshowList={setshowList} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    
  }

})