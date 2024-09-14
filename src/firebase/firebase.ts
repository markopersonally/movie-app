import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyCCkqvc3DP0BCtJG4vn6Mh3ypxLRJPqQ5c",
  authDomain: "movie-app-fd456.firebaseapp.com",
  projectId: "movie-app-fd456",
  storageBucket: "movie-app-fd456.appspot.com",
  messagingSenderId: "668506654206",
  appId: "1:668506654206:web:0affdfeabfd75f7f92acaf",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { app, auth };
