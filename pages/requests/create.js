import { collection, addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { database } from "/firebaseConfig";

const requestColRef = collection(database, "requests");

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

function Create() {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState();
  const [topics, setTopics] = useState([]);

  // const allowedTopics =
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

  const createRequest = async (e) => {
    e.preventDefault();
    // if (
    //   title === '' ||
    //   description === '' ||
    //   link === '' ||
    //   subject === '' ||
    //   standard === ''
    // ) {
    //   return alert('Please enter all information');
    // }
    await addDoc(requestColRef, {
      ...formState,
      username: user.displayName,
      status: "open",
      date: new Date(),
    });
  };
  return (
    <div>
      <h1>Request a resource</h1>
      <p>
        Request a resource here and our community of creators will help you out
        asap!
      </p>
      <form>
        <label>Title</label>
        <input type="text" name="title" onChange={handleChange}></input>

        <label>Description</label>
        <input type="text" name="description" onChange={handleChange}></input>

        <select label="Category" name="category" onChange={handleChange}>
          {categories.map((category, i) => {
            return (
              <option key={i} value={category.name}>
                {category.displayName}
              </option>
            );
          })}
        </select>
        <select label="topics" name="topic" onChange={handleChange}>
          {topics?.map((topic, i) => {
            return (
              <option key={i} value={topic}>
                {topic}
              </option>
            );
          })}
        </select>

        <button type="submit" onClick={createRequest}>
          {" "}
          submit
        </button>
      </form>
    </div>
  );
}

export default Create;
