import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyByNaoe_G7yx2xH-sVsirQC7UwsYwI5UOg",
    authDomain: "trace-project-serv.firebaseapp.com",
    databaseURL: "https://trace-project-serv.firebaseio.com",
    projectId: "trace-project-serv",
    storageBucket: "trace-project-serv.appspot.com",
    messagingSenderId: "22750610451",
    appId: "1:22750610451:web:96fc70f82fda4418"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.firestore().settings({ timestampsInSnapshots: true });
//smth that needed, updates firabase prop 
export default firebase 