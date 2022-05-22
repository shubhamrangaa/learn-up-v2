const validSubjects = ["class10", "class12", "cse", "it", "cce"];

const Subjects = () => {
  return (
    <div>
      <h1>Choose a Category</h1>
      {validSubjects.map((subject, i) => {
        return (
          <a href={`/subjects/${subject}`} key={i}>
            {subject}
          </a>
        );
      })}
    </div>
  );
};

export default Subjects;
