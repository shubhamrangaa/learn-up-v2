import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import OnboardForm from '../components/OnboardForm';

const colRef = collection(database, 'users');

function onboardUser() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const q = await query(colRef, where('email', '==', user.email));
    const data = await getDocs(q);
    const existingUser = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (existingUser.length == 0) {
      await addDoc(colRef, {
        email: user.email,
      });
      return;
    } else {
      router.push('/home');
    }
  };
  return <OnboardForm user={user} />;
}

export default onboardUser;
