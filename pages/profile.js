import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFilteredResources } from "../services/resources";

import { database } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import UserInfo from "../components/UserInfo";
import ResourceList from "../components/ResourceList";

const userColRef = collection(database, "users");
const resourceColRef = collection(database, "resources");

const Profile = () => {
  let [userUploads, setUserUploads] = useState([]);
  let [existingUser, setExistingUser] = useState([]);
  let [userBookmarks, setUserBookmarks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.email) {
      fetchUser();
      fetchUserUploads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUser = async () => {
    // getting user object
    const q = query(userColRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const tempUser = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setExistingUser(tempUser[0]);

    const resourceIds = tempUser[0].bookmarks;
    if (resourceIds?.length > 0) {
      const newBookmarks = [];
      for (let i = 0; i < resourceIds.length; i++) {
        // repition problem
        const resourceDocRef = doc(resourceColRef, resourceIds[i]);
        const docSnap = await getDoc(resourceDocRef);
        if (docSnap.data()) {
          newBookmarks = [...newBookmarks, docSnap.data()];
        }
      }
      setUserBookmarks(newBookmarks);
    }
  };

  const fetchUserUploads = async () => {
    if (user.email) {
      const data = await getFilteredResources("email", user.email);
      const tempResources = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserUploads(tempResources);
    }
  };
  return (
    <div>
      <UserInfo existingUser={existingUser} />
      <ResourceList heading="My Posts" resources={userUploads} />
      {/* {userUploads ? (
        <ResourceList heading="My Posts" resources={userUploads} />
      ) : (
        ""
      )} */}
      {userBookmarks ? (
        <ResourceList heading="My Bookmarks" resources={userBookmarks} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
