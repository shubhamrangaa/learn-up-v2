import React, { useContext, useEffect, useState } from "react";
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
import Image from "next/image";

const userColRef = collection(database, "users");

function ResourceCard({ resource }) {
  // console.log(JSON.stringify(new Date(resource.resource.date.seconds * 1000)));
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);

  useEffect(() => {
    setUpvoteCount(resource.upvote);
    setDownvoteCount(resource.downvote);
  }, [resource]);

  const { user } = useContext(AuthContext);

  const bookmarkItem = async (e) => {
    e.preventDefault();
    const q = await query(userColRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const newBookmarks = [...currentUserData[0].bookmarks, resource.id];

    const docRef = doc(userColRef, currentUserData[0].id);

    await updateDoc(docRef, {
      bookmarks: newBookmarks,
    });
  };

  const upvoteItem = async () => {
    const q = await query(userColRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userDocRef = doc(userColRef, currentUserData[0].id);
    const resourceColRef = collection(database, "resources");
    const resourceDocRef = doc(resourceColRef, resource.id);

    const hasUpvoted = currentUserData[0].upvotes?.filter(
      (item) => item === resource.id
    );
    if (!hasUpvoted || !hasUpvoted.length) {
      await updateDoc(resourceDocRef, {
        upvote: upvoteCount + 1,
      });

      const upvoteList = [...currentUserData[0].upvotes, resource.id];

      await updateDoc(userDocRef, {
        upvotes: upvoteList,
      });

      setUpvoteCount(upvoteCount + 1);
    } else {
      await updateDoc(resourceDocRef, {
        upvote: upvoteCount - 1,
      });

      const upvoteList = currentUserData[0].upvotes.filter(
        (item) => item !== resource.id
      );

      await updateDoc(userDocRef, {
        upvotes: upvoteList,
      });

      setUpvoteCount(upvoteCount - 1);
    }
  };

  const downvoteItem = async () => {
    const q = await query(userColRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userDocRef = doc(userColRef, currentUserData[0].id);
    const resourceColRef = collection(database, "resources");
    const resourceDocRef = doc(resourceColRef, resource.id);

    const hasDownvoted = currentUserData[0].downvotes?.filter(
      (item) => item === resource.id
    );
    if (!hasDownvoted || !hasDownvoted.length) {
      await updateDoc(resourceDocRef, {
        downvote: downvoteCount + 1,
      });

      const downvoteList = [...currentUserData[0].downvotes, resource.id];

      await updateDoc(userDocRef, {
        downvotes: downvoteList,
      });

      setDownvoteCount(downvoteCount + 1);
    } else {
      await updateDoc(resourceDocRef, {
        downvote: downvoteCount - 1,
      });

      const downvoteList = currentUserData[0].downvotes.filter(
        (item) => item !== resource.id
      );

      await updateDoc(userDocRef, {
        downvotes: downvoteList,
      });

      setDownvoteCount(downvoteCount - 1);
    }
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
            {resource.standard?.toUpperCase()}
          </p>
          <p className={`${style.text} ${style.bubble}`}>{resource.subject}</p>
        </div>
        <p className={style.text}>{resource.description}</p>
        <div className={style.cta}>
          <a
            target="_blank"
            className={style.link}
            href={`https://` + resource.link}
            rel={"noreferrer"}
          >
            Learn More
          </a>
          {user?.email ? (
            <div>
              <button onClick={bookmarkItem} className={style.bookmark}>
                Bookmark
              </button>
              <button onClick={upvoteItem} className={style.bookmark}>
                Upvote {upvoteCount}
              </button>
              <button onClick={downvoteItem} className={style.bookmark}>
                Downvote {downvoteCount}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.image}>
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073"
          alt=""
          height="175px"
          width="300px"
        />
      </div>
    </div>
  );
}

export default ResourceCard;
