import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from 'firebase/firestore';

function Subject() {
  const router = useRouter();
  const subject = router.query.subject;

  const validSubjects = ['class10', 'class12', 'cse', 'it', 'cce'];

  const db = getFirestore();
  let [resources, setResources] = useState([]);
  const colRef = collection(db, 'resources');
  const q = query(colRef, where('standard', '==', `${subject}`));
  getDocs(q)
    .then((snapshot) => {
      let tempResource = [];
      snapshot.docs.forEach((doc) => {
        tempResource.push({ ...doc.data(), id: doc.id });
      });
      setResources(tempResource);
    })
    .catch((err) => console.log(err.message));

  return (
    <>
      {validSubjects.includes(subject) ? (
        <div>
          {' '}
          {resources.length > 0 ? (
            resources.map(function (resource, i) {
              return (
                <>
                  <div className='card'>
                    <h4 className='title'>{resource.title}</h4>
                    <p className='description'>{resource.description}</p>
                    <a className='resource' href={resource.link}>
                      {resource.link}
                    </a>
                    <div className='info'>
                      <p className='email'>Uploaded by: {resource.email}</p>
                      <p className='standard'>Stream: {resource.standard}</p>
                      <p className='subject'>Subject: {resource.subject}</p>
                    </div>
                  </div>
                </>
              );
            })
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
