import React, { useState, useEffect, useContext } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

function Post() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [subject, setSubject] = useState('');
  const [standard, setStandard] = useState('');
  const { user } = useContext(AuthContext);

  const colRef = collection(database, 'resources');
  // console.log(user.currentUser, "user2");
  console.log(user);

  const addResource = async (e) => {
    e.preventDefault();
    if (
      title === '' ||
      description === '' ||
      link === '' ||
      subject === '' ||
      standard === ''
    ) {
      return alert('Please enter all information');
    }
    await addDoc(colRef, {
      title,
      description,
      link,
      subject,
      standard,
      email: user.email,
      date: new Date(),
    });
    const add = document.querySelector('.Add');
    add.reset();
  };

  if (user?.email != null) {
    return (
      <div>
        <div>
          <div align='center'>
            <h2>Add Resource</h2>
          </div>
          <form className='Add'>
            <label>Title</label>

            <input
              label='Title'
              placeholder='Enter Title'
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <label>Description</label>

            <input
              label='Description'
              placeholder='Enter Description'
              required
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <label>Link</label>

            <input
              label='Resource'
              placeholder='Enter resource link'
              required
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
            {/* <FormControl required fullWidth> */}
            <label>Standard</label>
            <select
              value={standard}
              label='Standard'
              onChange={(event) => {
                setStandard(event.target.value);
              }}
            >
              <option value={'class10'}>ClassX</option>
              <option value={'class12'}>ClassXII</option>
              <option value={'cse'}>CSE</option>
              <option value={'it'}>IT</option>
              <option value={'cce'}>CCE</option>
            </select>
            {/* </FormControl> */}
            {/* <FormControl required fullWidth> */}
            <label>Subject</label>
            <select
              value={subject}
              label='Subject'
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            >
              <option value={'Science'}>Science</option>
              <option value={'English'}>English</option>
              <option value={'OS'}>OS</option>
              <option value={'RDBMS'}>RDBMS</option>
              <option value={'CN'}>CN</option>
              <option value={'DSML'}>DSML</option>
              <option value={'ISS'}>ISS</option>
              <option value={'DSA'}>DSA</option>
              <option value={'OOPS'}>OOPS</option>
              <option value={'DAA'}>DAA</option>
              <option value={'WEB'}>WEB</option>
            </select>
            {/* </FormControl> */}
            <button color='primary' variant='contained' onClick={addResource}>
              Add Resource
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>NO user</h1>;
  }
}

export default Post;
