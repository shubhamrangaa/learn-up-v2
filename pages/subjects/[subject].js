import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredResources } from "../../services/resources";

const validSubjects = ["class10", "class12", "cse", "it", "cce"];

function Subject() {
  const router = useRouter();
  const { subject } = router.query;

  let [resources, setResources] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, [subject]);

  const fetchSubject = async () => {
    const filterOptions = { field: "standard", value: subject || "" };
    const data = await getFilteredResources({ filterOptions });
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      {validSubjects.includes(subject) ? (
        <div>
          {" "}
          {resources.length > 0 ? (
            resources.map(function (resource, i) {
              return (
                <div key={i}>
                  <div className="card">
                    <h4 className="title">{resource.title}</h4>
                    <p className="description">{resource.description}</p>
                    <a className="resource" href={resource.link}>
                      {resource.link}
                    </a>
                    <div className="info">
                      <p className="email">Uploaded by: {resource.email}</p>
                      <p className="standard">Stream: {resource.standard}</p>
                      <p className="subject">Subject: {resource.subject}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h5>Please wait...</h5>
          )}{" "}
        </div>
      ) : (
        <h5> Not a valid Subject</h5>
      )}
    </>
  );
}

export default Subject;
