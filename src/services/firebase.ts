import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAEms-_C9eRX8-eyolapBAYeQ4hJzc7zZM",
  authDomain: "globalsolution-1fd32.firebaseapp.com",
  projectId: "globalsolution-1fd32",
  storageBucket: "globalsolution-1fd32.appspot.com",
  messagingSenderId: "716760372325",
  appId: "1:716760372325:web:6de119aa33d05b36ab228c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
