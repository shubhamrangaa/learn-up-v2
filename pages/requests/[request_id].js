import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { database } from "../../firebaseConfig";
import style from "../../components/ResourceCard.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const requestColRef = collection(database, "requests");

function Request() {
  const router = useRouter();
  const [request, setRequest] = useState({});
  const { request_id } = router.query;
  const [formState, setFormState] = useState();
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormState((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    getRequest();
  }, [request_id]);

  const getRequest = async () => {
    if (request_id) {
      const docRef = doc(requestColRef, request_id);
      const docSnap = await getDoc(docRef);
      setRequest(docSnap.data());
    }
  };

  const resolveRequest = async (e) => {
    e.preventDefault();

    const requestDocRef = doc(requestColRef, request_id);
    await updateDoc(requestDocRef, {
      status: "closed",
      closedOn: new Date(),
    });

    const { title, description, category, displayCategory, topic } = request;
    const resourceColRef = collection(database, "resources");
    await addDoc(resourceColRef, {
      title,
      description,
      link: formState.link,
      category,
      displayCategory,
      topic,
      email: user.displayName,
      requestedBy: request.username,
      date: new Date(),
    });
  };

  return (
    <div>
      <div>
        <h1>Resolve request by: {request.username}</h1>
        <div className={style.card}>
          <div className={style.content}>
            <h2 className={style.text}>{request.title}</h2>
            <div className={style.meta}>
              <p className={style.text}>{request.username}</p>
              <p className={style.text}>
                {JSON.stringify(new Date(request.date?.seconds * 1000)).slice(
                  1,
                  11
                )}
              </p>
              <p className={`${style.text} ${style.bubble}`}>
                {request.displayCategory}
              </p>
              <p className={`${style.text} ${style.bubble}`}>{request.topic}</p>
            </div>
            <p className={style.text}>{request.description}</p>
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
      </div>

      <form>
        <label>Resource Link</label>
        <input type="text" name="link" onChange={handleChange}></input>
        <button type="submit" onClick={resolveRequest}>
          submit response
        </button>
      </form>
    </div>
  );
}

export default Request;
