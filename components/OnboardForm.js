import React, { useState } from "react";
import style from "./OnboardForm.module.css";

import { useRouter } from "next/router";

import { database } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

function OnboardForm(user) {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [uni, setUni] = useState("");
  const [DOB, setDOB] = useState("");

  const router = useRouter();

  const colRef = collection(database, "users");

  const addInfo = async (e) => {
    e.preventDefault();
    if (bio === "" || location === "" || uni === "" || DOB === "") {
      return alert("Please enter all information");
    }
    const q = await query(colRef, where("email", "==", user.user.email));
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
      name: user.user.displayName,
      image: user.user.photoURL,
    });
    const add = document.querySelector("#add");
    add.reset();
    router.push("/home");
  };

  return (
    <div className={style.additionalInfo}>
      <h4>Please Enter Your Details</h4>

      <form id="add">
        <label>Bio</label>

        <input
          type="textarea"
          label="Bio"
          placeholder="Enter Bio"
          required
          onChange={(event) => {
            setBio(event.target.value);
          }}
        />
        <label>Location</label>

        <input
          label="Location"
          placeholder="Enter your Location"
          required
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <label>University</label>

        <input
          label="University"
          placeholder="Enter University"
          required
          onChange={(event) => {
            setUni(event.target.value);
          }}
        />
        <label>DOB</label>
        <input
          label="DOB"
          placeholder="Enter DOB"
          required
          onChange={(event) => {
            setDOB(event.target.value);
          }}
        />
        <button onClick={addInfo}>Submit</button>
      </form>
    </div>
  );
}

export default OnboardForm;
