// import { app } from "../firebaseConfig";
// import { createContext } from "react";
import { createContext, useState, useEffect, useReducer } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import nookies from "nookies";
import AppReducer from "./AppReducer";

const initialState = {
  user: {},
  setUser: async () => null,
  logout: async () => null,
};

// export const AuthContext = createContext(null);
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // handle auth logic here...

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      console.log("token changed");
      if (!user) {
        dispatch({ type: "DELETE_USER" });
        nookies.set(undefined, "token", "", { path: "/" });
        console.log("user deleted");
      } else {
        console.log("updating user");
        const token = await user.getIdToken();
        dispatch({ type: "UPDATE_USER", payload: user });
        console.log("user updated");
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
