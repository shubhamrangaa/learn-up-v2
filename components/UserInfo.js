import React from 'react';
import style from './UserInfo.module.css';

function UserInfo(existingUser) {
  console.log(existingUser);
  return (
    <div className={style.main}>
      {existingUser.existingUser.length > 0 ? (
        <>
          <img src={existingUser.existingUser[0].image} alt='' />
          <h1>Hello, {existingUser.existingUser[0].name}</h1>
          <p className={style.bio}>{existingUser.existingUser[0].bio}</p>
          <div className={style.meta}>
            <p>{existingUser.existingUser[0].location}</p>
            <p>{existingUser.existingUser[0].uni}</p>
            <p>{existingUser.existingUser[0].DOB}</p>
          </div>{' '}
        </>
      ) : (
        <h2>Please Wait</h2>
      )}
    </div>
  );
}

export default UserInfo;
