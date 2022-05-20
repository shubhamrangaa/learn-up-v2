import { createContext, useState, useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import nookies from "nookies";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(app.User || null);

  console.log(app);
  console.log(auth);

  // handle auth logic here...

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
