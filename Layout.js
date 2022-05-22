import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setLoginStatus] = useState(false);

  useEffect(() => {
    if (user?.email != null) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [user]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </>
  );
};

export default Layout;
