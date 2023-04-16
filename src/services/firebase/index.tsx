import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyC_d-GKpKfirQe132fg6-WroKng7-zo8_w',
    authDomain: 'ducky-ai-201.firebaseapp.com',
    projectId: 'ducky-ai-201',
    storageBucket: 'ducky-ai-201.appspot.com',
    messagingSenderId: '24191860908',
    appId: '1:24191860908:web:41f879928f5b69a8771f09',
    measurementId: 'G-15JGYDP1R6',
}

const firebaseApp = initializeApp(firebaseConfig)
const fbAuth = getAuth(firebaseApp)
const fbFS = getFirestore(firebaseApp)

export { fbAuth, fbFS }
