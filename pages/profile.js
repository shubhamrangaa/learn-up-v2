import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFilteredResources } from "../services/resources";

import { database } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserInfo from "../components/UserInfo";
import ResourceList from "../components/ResourceList";

const colRef = collection(database, "users");

const Profile = () => {
  let [userUploads, setUserUploads] = useState([]);
  let [existingUser, setExistingUser] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUserUploads();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUser = async () => {
    const q = await query(colRef, where("email", "==", user.email));
    const data = await getDocs(q);
    const tempUser = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setExistingUser(tempUser);
  };

  const fetchUserUploads = async () => {
    const data = await getFilteredResources("email", user.email);
    setUserUploads(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div>
      <UserInfo existingUser={existingUser} />
      <ResourceList heading="My Posts" resources={userUploads} />
      {/* <h3>Welcome back brother, Your posts </h3>
      <div> {JSON.stringify(userUploads)}</div> */}
    </div>
  );
};

export default Profile;
