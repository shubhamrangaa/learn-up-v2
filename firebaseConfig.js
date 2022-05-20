import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { collection, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjEura62egk3GKR7YEcWFGDPwZCwy9FCE",
  authDomain: "learnup-cac21.firebaseapp.com",
  projectId: "learnup-cac21",
  storageBucket: "learnup-cac21.appspot.com",
  messagingSenderId: "945396279584",
  appId: "1:945396279584:web:eae811dee015ed3af84f45",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);

// todo: create getResources function to use everywhere else

// export async function getResources() {
//   return getDoc(database).then((data) => {
//     console.log(data);
//   });
// }

export const resources = collection(database, "resources");
