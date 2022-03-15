import { StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native'
import React from 'react'
import firebase from '../utils/firebase'
import colors from '../utils/colors'

LogBox.ignoreLogs(['AsyncStorage has been extracted']);
export default function ActionBar(props) {
 
    const { showList, setshowList } = props;

    return (
        <View style={styles.viewFooter}>
            <View>
                <TouchableOpacity style={styles.viewClose} onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.text} > Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={[showList ? styles.viewAdd : styles.cancelar]} onPress={() => setshowList(!showList)}>
                    <Text style={[styles.text]}>
                        {showList ? 'Nueva fecha' : 'Cancelar fecha'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,

    },

    viewClose: {

        backgroundColor: '#a10000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 5

    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    viewAdd: {
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 5

    },
    cancelar: {
        backgroundColor: '#a10000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 5

    }
})