import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFilteredResources } from "../services/resources";

const Profile = () => {
  let [userUploads, setUserUploads] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUserUploads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUserUploads = async () => {
    const filterOptions = {
      field: "email",
      value: user?.email || "shubh@gmail.com",
    };
    const data = await getFilteredResources({ filterOptions });
    setUserUploads(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div>
      <h1>Hello, {user.displayName}</h1>
      <h3>Welcome back brother, Your posts </h3>
      <div> {JSON.stringify(userUploads)}</div>
    </div>
  );
};

export default Profile;
