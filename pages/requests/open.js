import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import style from "../../components/ResourceCard.module.css";
import Image from "next/image";

const requestColRef = collection(database, "requests");

function Create() {
  const [requests, setRequests] = useState([]);

  // GETTING ALL REQUESTS
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    const q = await query(requestColRef, where("status", "==", "open"));

    const data = await getDocs(q);
    setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      <h1>Open Requests</h1>
      <p>
        All open requests are listed below, give back to the community by
        uploading your replies
      </p>

      {requests.map((request, i) => {
        return (
          <div key={i} className={style.card}>
            <div className={style.content}>
              <h2 className={style.text}>{request.title}</h2>
              <div className={style.meta}>
                <p className={style.text}>{request.username}</p>
                <p className={style.text}>
                  {JSON.stringify(new Date(request.date.seconds * 1000)).slice(
                    1,
                    11
                  )}
                </p>
                <p className={`${style.text} ${style.bubble}`}>
                  {request.displayCategory}
                </p>
                <p className={`${style.text} ${style.bubble}`}>
                  {request.topic}
                </p>
              </div>
              <p className={style.text}>{request.description}</p>
              <div className={style.cta}>
                <a
                  target="_blank"
                  className={style.link}
                  href={`./${request.id}`}
                  rel={"noreferrer"}
                >
                  Resolve
                </a>
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
      })}
    </div>
  );
}

export default Create;
