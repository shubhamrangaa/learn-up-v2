import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Test() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <div>hello {user.email} </div>;
}

export default Test;
