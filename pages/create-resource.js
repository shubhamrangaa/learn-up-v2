import React, { useState, useContext } from "react";

import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";

const categories = [
  {
    name: "grade_10",
    displayName: "10th Grade",
    topics: ["Mathematics", "English", "Hindi"],
  },
  {
    name: "grade_12",
    displayName: "12th Grade",
    topics: ["Mathematics", "English", "Hindi"],
  },
  {
    name: "comp_sci",
    displayName: "Computer Science",
    topics: ["OS", "RDBMS", "Networks"],
  },
  {
    name: "marketing",
    displayName: "Marketing",
    topics: ["Digital", "Sale", "Growth"],
  },
];

function Post() {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState({});
  const [topics, setTopics] = useState([]);

  const colRef = collection(database, "resources");

  const handleChange = (event) => {
    setFormState((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
    if (
      event.target.name === "category" &&
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
      formState.title === "" ||
      formState.description === "" ||
      formState.link === "" ||
      formState.category === "" ||
      formState.topic === ""
    ) {
      return alert("Please enter all information");
    }
    await addDoc(colRef, {
      ...formState,
      upvote: 0,
      downvote: 0,
      username: user.displayName,
      email: user.email,
      date: new Date(),
    });
    alert("Resource added successfully");
    const add = document.querySelector(".Add");
    add.reset();
  };

  if (user?.email != null) {
    return (
      <div>
        <div>
          <div align="center">
            <h2>Add Resource</h2>
          </div>
          <form className="Add">
            <label>Title</label>
            <input
              name="title"
              placeholder="Enter Title"
              required
              onChange={handleChange}
            />

            <label>Description</label>
            <input
              name="description"
              placeholder="Enter Description"
              required
              onChange={handleChange}
            />

            <label>Link</label>
            <input
              name="link"
              label="Resource"
              placeholder="Enter resource link"
              required
              onChange={handleChange}
            />

            <label>Category</label>
            <select label="Category" name="category" onChange={handleChange}>
              {categories.map((category, i) => {
                return (
                  <option key={i} value={category.name}>
                    {category.displayName}
                  </option>
                );
              })}
            </select>

            <label>Topic</label>
            <select name="topic" label="topic" onChange={handleChange}>
              {topics?.map((topic, i) => {
                return (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                );
              })}
            </select>

            <button color="primary" variant="contained" onClick={addResource}>
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
