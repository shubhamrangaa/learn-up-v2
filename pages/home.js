import { useState, useEffect, useContext } from "react";

import { auth, googleProvider } from "../firebaseConfig";
import { signOut, signInWithPopup } from "firebase/auth";

import { AuthContext } from "../context/AuthContext";
import { getResources } from "../services/resources";

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
      <button onClick={logout}>Logout</button>
      <button onClick={signInWithGoogle}>Login</button>
      <div>{JSON.stringify(user)}</div>
      {resources.length > 0 ? (
        resources.map((resource, i) => {
          return (
            <div key={i}>
              <div className="card">
                <h4 className="title">{resource.title}</h4>
                <p className="description">{resource.description}</p>
                <a className="resource" href={resource.link}>
                  {resource.link}
                </a>
                <div className="info">
                  <p className="email">Uploaded by: {resource.email}</p>
                  <p className="standard">Stream: {resource.standard}</p>
                  <p className="subject">Subject: {resource.subject}</p>
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
