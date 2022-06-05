import React, { useContext } from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import style from "./ResourceCard.module.css";
import { AuthContext } from "../context/AuthContext";

const userColRef = collection(database, "users");

function ResourceCard({ resource }) {
  // console.log(JSON.stringify(new Date(resource.resource.date.seconds * 1000)));

  const { user } = useContext(AuthContext);

  const bookmarkItem = async (e) => {
    e.preventDefault();
    console.log(user);
    const q = await query(userColRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const bookmarks = [...currentUserData[0].bookmark, currentUserData[0].id];
    console.log(currentUserData);
    console.log(bookmarks);

    const docRef = doc(userColRef, currentUserData[0].id);

    await updateDoc(docRef, {
      bookmark: bookmarks,
    });
    // console.log(resource);
  };
  return (
    <div className={style.card}>
      <div className={style.content}>
        <h2 className={style.text}>{resource.title}</h2>
        <div className={style.meta}>
          <p className={style.text}>{resource.email}</p>
          <p className={style.text}>
            {JSON.stringify(new Date(resource.date.seconds * 1000)).slice(
              1,
              11
            )}
          </p>
          <p className={`${style.text} ${style.bubble}`}>
            {resource.standard.toUpperCase()}
          </p>
          <p className={`${style.text} ${style.bubble}`}>{resource.subject}</p>
        </div>
        <p className={style.text}>{resource.description}</p>
        <div className={style.cta}>
          <a
            target="_blank"
            className={style.link}
            href={resource.link}
            rel={"noreferrer"}
          >
            Learn More
          </a>
          <button onClick={bookmarkItem} href="#" className={style.bookmark}>
            Bookmark
          </button>
        </div>
      </div>
      <div className={style.image}>
        <img
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073"
          alt=""
        />
      </div>
    </div>
  );
}

export default ResourceCard;
