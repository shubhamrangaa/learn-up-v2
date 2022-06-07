import React, { useState, useContext } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

import style from '../components/form.module.css';

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

function Post() {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState({});
  const [topics, setTopics] = useState([]);

  const colRef = collection(database, 'resources');

  const handleChange = (event) => {
    setFormState((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
    if (
      event.target.name === 'category' &&
      event.target.value !== formState.category
    ) {
      filterTopics(event.target.value);
    }
  };

  const filterTopics = (newCategory) => {
    const newCategoryData = categories.filter(
      (category) => category.name === newCategory
    );
    setTopics(newCategoryData[0].topics);
    setFormState((previousState) => ({
      ...previousState,
      displayCategory: newCategoryData[0].displayName,
    }));
  };

  const addResource = async (e) => {
    e.preventDefault();
    if (
      formState.title === '' ||
      formState.description === '' ||
      formState.link === '' ||
      formState.category === '' ||
      formState.topic === ''
    ) {
      return alert('Please enter all information');
    }
    await addDoc(colRef, {
      ...formState,
      upvote: 0,
      downvote: 0,
      username: user.displayName,
      email: user.email,
      date: new Date(),
    });
    alert('Resource added successfully');
    const add = document.querySelector('.Add');
    add.reset();
  };

  if (user?.email != null) {
    return (
      <div className={style.container}>
        <div className={style.form}>
          <form className='Add' align='center'>
            <div align='center'>
              <h2>Add Resource</h2>
            </div>
            <label>Title</label>
            <br />
            <input
              className={style.input}
              name='title'
              placeholder='Enter Title'
              required
              onChange={handleChange}
            />
            <br /> <br />
            <label>Description</label>
            <br />
            <input
              className={style.input}
              name='description'
              placeholder='Enter Description'
              required
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Link</label>
            <br />
            <input
              className={style.input}
              name='link'
              label='Resource'
              placeholder='Enter resource link'
              required
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Category</label>
            <br />
            <select
              label='Category'
              name='category'
              onChange={handleChange}
              className={style.input}
            >
              {categories.map((category, i) => {
                return (
                  <option key={i} value={category.name}>
                    {category.displayName}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <label>Topic</label>
            <br />
            <select
              name='topic'
              label='topic'
              onChange={handleChange}
              className={style.input}
            >
              {topics?.map((topic, i) => {
                return (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <button className={style.btn} onClick={addResource}>
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
