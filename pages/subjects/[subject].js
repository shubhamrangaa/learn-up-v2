import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredResources } from '../../services/resources';
import ResourceList from '../../components/ResourceList';

const validSubjects = ['class10', 'class12', 'cse', 'it', 'cce'];

function Subject() {
  const router = useRouter();
  const { subject } = router.query;

  let [resources, setResources] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, [subject]);

  const fetchSubject = async () => {
    const data = await getFilteredResources('standard', subject || '');
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log(subject);

  return (
    <>
      {validSubjects.includes(subject) ? (
        <div>
          {' '}
          {resources.length > 0 ? (
            <ResourceList
              heading={'Resources for ' + subject.toUpperCase()}
              resources={resources}
            />
          ) : (
            <h5>Please wait...</h5>
          )}{' '}
        </div>
      ) : (
        <h5> Not a valid Subject</h5>
      )}
    </>
  );
}

export default Subject;
