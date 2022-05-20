import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, database, googleProvider } from '../firebaseConfig';
import Link from 'next/link';

import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { jsonEval } from '@firebase/util';

// import "./home.css";

function Home() {
  let [resources, setResources] = useState([]);
  const [user, setUser] = useState({});

  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const userDetails = await signInWithPopup(auth, googleProvider);
    console.log(userDetails);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const colRef = collection(database, 'resources');
  getDocs(colRef)
    .then((snapshot) => {
      let tempResource = [];
      snapshot.docs.forEach((doc) => {
        tempResource.push({ ...doc.data(), id: doc.id });
      });
      setResources(tempResource);
    })
    .catch((err) => console.log(err.message));

  return (
    <>
      {user != null ? <h1>LoggedIn</h1> : <h1>LoggedOut</h1>}
      <button onClick={logout}>Logout</button>
      <button onClick={signInWithGoogle}>Login</button>
      {user != null ? <h1>LoggedIn</h1> : <h1>LoggedOut</h1>}
      <div>{JSON.stringify(user)}</div>
      {resources.length > 0 ? (
        resources.map((resource, i) => {
          return (
            <div key={i}>
              <div className='card'>
                <h4 className='title'>{resource.title}</h4>
                <p className='description'>{resource.description}</p>
                <a className='resource' href={resource.link}>
                  {resource.link}
                </a>
                <div className='info'>
                  <p className='email'>Uploaded by: {resource.email}</p>
                  <p className='standard'>Stream: {resource.standard}</p>
                  <p className='subject'>Subject: {resource.subject}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h5>Please wait...</h5>
      )}
    </>
  );
}

export default Home;
