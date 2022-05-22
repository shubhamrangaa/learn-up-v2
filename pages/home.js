import { useState, useEffect, useContext } from 'react';

import { auth, googleProvider } from '../firebaseConfig';
import { signOut, signInWithPopup } from 'firebase/auth';

import { AuthContext } from '../context/AuthContext';
import { getResources } from '../services/resources';

import Layout from '../components/Layout';
import ResourceList from '../components/ResourceList';

function Home() {
  let [resources, setResources] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const data = await getResources();
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      {/* <button onClick={logout}>Logout</button>
      <button onClick={signInWithGoogle}>Login</button> */}
      <ResourceList heading="Today's Feed" resources={resources} />
    </>
  );
}

export default Home;
