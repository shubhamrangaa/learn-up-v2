import style from './index.module.css';

const validSubjects = ['class10', 'class12', 'cse', 'it', 'cce'];

const Subjects = () => {
  return (
    <div className={style.parent}>
      <h1>Choose a Category</h1>
      <div className={style.categoryContainer}>
        {validSubjects.map((subject, i) => {
          return (
            <a href={`/subjects/${subject}`} key={i}>
              <div class={style.category}>{subject.toUpperCase()}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Subjects;
