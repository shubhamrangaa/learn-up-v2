import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getResources, getFilteredResources } from '../../services/resources';
import ResourceList from '../../components/ResourceList';

const validSubjects = ['marketing', 'grade_12', 'grade_10', 'comp_sci'];

const categories = [
  {
    name: 'grade_10',
    displayName: '10th Grade',
    topics: ['Mathematics', 'English', 'Hindi'],
  },
  {
    name: 'grade_12',
    displayName: '12th Grade',
    topics: ['Mathematics', 'English', 'Hindi'],
  },
  {
    name: 'comp_sci',
    displayName: 'Computer Science',
    topics: ['OS', 'RDBMS', 'Networks'],
  },
  {
    name: 'marketing',
    displayName: 'Marketing',
    topics: ['Digital', 'Sale', 'Growth'],
  },
];

function Subject() {
  const router = useRouter();
  const { subject } = router.query;

  let [resources, setResources] = useState([]);

  const topic = categories.find((x) => x.name === subject);
  console.log(topic);

  useEffect(() => {
    fetchSubject();
  }, [subject]);

  const fetchResources = async () => {
    const data = await getResources();
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const filterTopics = async (subject, topic) => {
    const data = await getFilteredResources(subject, topic);
    setResources(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const fetchSubject = async () => {
    const data = await getFilteredResources('category', subject || '');
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
              subject={topic.topics}
              filter={filterTopics}
              getResources={fetchResources}
            />
          ) : (
            <h5>We do not have anything to show</h5>
          )}{' '}
        </div>
      ) : (
        <h5> Not a valid Subject</h5>
      )}
    </>
  );
}

export default Subject;
