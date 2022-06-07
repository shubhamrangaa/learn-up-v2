import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { database } from '../firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';

import style from '../components/form.module.css';

function OnboardForm(user) {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [uni, setUni] = useState('');
  const [DOB, setDOB] = useState('');

  const router = useRouter();

  const colRef = collection(database, 'users');

  const addInfo = async (e) => {
    e.preventDefault();
    if (bio === '' || location === '' || uni === '' || DOB === '') {
      return alert('Please enter all information');
    }
    const q = await query(colRef, where('email', '==', user.user.email));
    const data = await getDocs(q);
    const existingUser = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const docRef = doc(colRef, existingUser[0].id);
    await updateDoc(docRef, {
      bio,
      uni,
      DOB,
      location,
      bookmarks: [],
      downvotes: [],
      upvotes: [],
      name: user.user.displayName,
      image: user.user.photoURL,
    });
    const add = document.querySelector('#add');
    add.reset();
    router.push('/home');
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <form id='add' className='Add' align='center'>
          <div align='center'>
            <h4>Please Enter Your Details</h4>
          </div>
          <label>Bio</label>
          <br />
          <input
            className={style.input}
            type='textarea'
            label='Bio'
            placeholder='Enter Bio'
            required
            onChange={(event) => {
              setBio(event.target.value);
            }}
          />
          <br />
          <br />
          <label>Location</label>
          <br />
          <input
            className={style.input}
            label='Location'
            placeholder='Enter your Location'
            required
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <br />
          <br />
          <label>University</label>
          <br />
          <input
            className={style.input}
            label='University'
            placeholder='Enter University'
            required
            onChange={(event) => {
              setUni(event.target.value);
            }}
          />
          <br />
          <br />
          <label>DOB</label>
          <br />
          <input
            className={style.input}
            label='DOB'
            placeholder='Enter DOB'
            required
            onChange={(event) => {
              setDOB(event.target.value);
            }}
          />
          <br />
          <br />
          <button className={style.btn} onClick={addInfo}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardForm;
