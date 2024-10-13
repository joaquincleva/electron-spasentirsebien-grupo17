//  eslint-disable-next-line
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:"AIzaSyDfFpzW2ZpKFrUviIICGjjB5GNE9Q_tmkI",
  authDomain:"spasentirsebien-b3d7f.firebaseapp.com",
  projectId:"spasentirsebien-b3d7f",
  storageBucket:"spasentirsebien-b3d7f.appspot.com",
  messagingSenderId:"711579031657",
  appId:"1:711579031657:web:b4bfe5036acd7b4c432af8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
