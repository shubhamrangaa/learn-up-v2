import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import {
  FaBookmark,
  FaRegBookmark,
  FaArrowCircleUp,
  FaRegArrowAltCircleUp,
  FaArrowCircleDown,
  FaRegArrowAltCircleDown,
} from 'react-icons/fa';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';

import style from './ResourceCard.module.css';
import { AuthContext } from '../context/AuthContext';
import Image from 'next/image';

const userColRef = collection(database, 'users');

function ResourceCard({ resource }) {
  // console.log(JSON.stringify(new Date(resource.resource.date.seconds * 1000)));
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [currentUserData, setCurrentUser] = useState();

  useEffect(() => {
    setUpvoteCount(resource.upvote);
    setDownvoteCount(resource.downvote);
  }, [resource]);

  useEffect(() => {
    setUser();
  }, [currentUserData]);

  const { user } = useContext(AuthContext);

  const setUser = async () => {
    console.log(user);
    if (user) {
      const q = await query(userColRef, where('email', '==', user.email));
      const data = await getDocs(q);
      const userData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCurrentUser(userData);
    }
  };

  const bookmarkItem = async (e) => {
    e.preventDefault();
    const q = await query(userColRef, where('email', '==', user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(currentUserData[0].bookmarks.includes(resource.id));
    if (currentUserData[0].bookmarks.includes(resource.id)) {
      const newBookmarks = [...currentUserData[0].bookmarks];
      const index = newBookmarks.indexOf(resource.id);
      newBookmarks.splice(index, 1);
      const docRef = doc(userColRef, currentUserData[0].id);
      await updateDoc(docRef, {
        bookmarks: newBookmarks,
      });
    } else {
      const newBookmarks = [...currentUserData[0].bookmarks, resource.id];

      const docRef = doc(userColRef, currentUserData[0].id);

      await updateDoc(docRef, {
        bookmarks: newBookmarks,
      });
    }
  };

  const upvoteItem = async () => {
    const q = await query(userColRef, where('email', '==', user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userDocRef = doc(userColRef, currentUserData[0].id);
    const resourceColRef = collection(database, 'resources');
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
    const q = await query(userColRef, where('email', '==', user.email));
    const data = await getDocs(q);
    const currentUserData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userDocRef = doc(userColRef, currentUserData[0].id);
    const resourceColRef = collection(database, 'resources');
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
        <h2 className={style.head}>{resource.title}</h2>
        <div className={style.meta}>
          <p className={style.text}>{resource.email}</p>
          <p className={style.text}>
            {JSON.stringify(new Date(resource.date.seconds * 1000)).slice(
              1,
              11
            )}
          </p>
          <p className={`${style.text} ${style.bubble}`}>
            {resource.displayCategory}
          </p>
          <p className={`${style.text} ${style.bubble}`}>{resource.topic}</p>
        </div>
        <p className={style.desc}>{resource.description}</p>
        <div className={style.cta}>
          <a
            target='_blank'
            className={style.link}
            href={`https://` + resource.link}
            rel={'noreferrer'}
          >
            Go to resource
          </a>
          {user?.email ? (
            <>
              <a onClick={bookmarkItem} className={style.bookmark}>
                {currentUserData ? (
                  currentUserData[0].bookmarks.includes(resource.id) ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )
                ) : (
                  <FaBookmark />
                )}
              </a>
              <a onClick={upvoteItem} className={style.bookmark}>
                {currentUserData ? (
                  currentUserData[0].upvotes.includes(resource.id) ? (
                    <FaArrowCircleUp />
                  ) : (
                    <FaRegArrowAltCircleUp />
                  )
                ) : (
                  <FaArrowCircleUp />
                )}
                {'  ' + upvoteCount}
              </a>
              <a onClick={downvoteItem} className={style.bookmark}>
                {currentUserData ? (
                  currentUserData[0].downvotes.includes(resource.id) ? (
                    <FaArrowCircleDown />
                  ) : (
                    <FaRegArrowAltCircleDown />
                  )
                ) : (
                  <FaArrowCircleDown />
                )}
                {'  ' + downvoteCount}
              </a>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={style.image}>
        <Image
          src='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073'
          alt=''
          height='175px'
          width='300px'
        />
      </div>
    </div>
  );
}

export default ResourceCard;
