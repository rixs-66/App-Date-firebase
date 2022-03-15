import firebase from 'firebase/app';




const firebaseConfig = {
    apiKey: "AIzaSyCUg460gFgURSoys4GLTpIN1-wZUI8n6G4",
    authDomain: "date-remenber.firebaseapp.com",
    projectId: "date-remenber",
    storageBucket: "date-remenber.appspot.com",
    messagingSenderId: "421604194521",
    appId: "1:421604194521:web:e4483b8323c259044ca6c8"
  };

 export default firebase.initializeApp(firebaseConfig);