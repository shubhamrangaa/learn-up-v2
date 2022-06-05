import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { getResources, getFilteredResources } from "../services/resources";

import ResourceList from "../components/ResourceList";

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

  const filterTopics = async (subject, topic) => {
    const data = await getFilteredResources(subject, topic);
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <ResourceList
        heading="Today's Feed"
        resources={resources}
        filter={filterTopics}
        getResources={fetchResources}
      />
    </>
  );
}

export default Home;
