import React from "react";
import style from "./UserInfo.module.css";

function UserInfo({ existingUser }) {
  return (
    <div className={style.main}>
      {existingUser ? (
        <>
          <img src={existingUser.image} alt="" />
          <h1>Hello, {existingUser.name}</h1>
          <p className={style.bio}>{existingUser.bio}</p>
          <div className={style.meta}>
            <p>{existingUser.location}</p>
            <p>{existingUser.uni}</p>
            <p>{existingUser.DOB}</p>
          </div>{" "}
        </>
      ) : (
        <h2>Please Wait</h2>
      )}
    </div>
  );
}

export default UserInfo;
