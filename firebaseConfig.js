import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { collection, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfli3_3x_p4GtS2GwIUy-NsbIQNskg7gg",
  authDomain: "learnupv2.firebaseapp.com",
  projectId: "learnupv2",
  storageBucket: "learnupv2.appspot.com",
  messagingSenderId: "500682409799",
  appId: "1:500682409799:web:bb3dd00cc1fd7a34132e62",
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
