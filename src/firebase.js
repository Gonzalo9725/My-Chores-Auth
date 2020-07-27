import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyATNR-faqRAgoKT2PKuY77I3eILsdB60fc",
    authDomain: "crud-react-61cf7.firebaseapp.com",
    databaseURL: "https://crud-react-61cf7.firebaseio.com",
    projectId: "crud-react-61cf7",
    storageBucket: "crud-react-61cf7.appspot.com",
    messagingSenderId: "153381477991",
    appId: "1:153381477991:web:947ffa5a31cc1504b23ec2"
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db, auth}