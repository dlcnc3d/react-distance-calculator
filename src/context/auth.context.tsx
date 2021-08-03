import React, { useEffect } from "react";
import { useContext } from "react";
import { auth } from "../core/firebase/firebase";

import firebase from "firebase/app";

type State = {
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;

  logOut: () => void;
  currentUser: firebase.User;
  setCurrentUser: React.Dispatch<firebase.User>;
};

const AuthContext = React.createContext<State | null>(null);

export const AuthProvider: React.FC = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [fetched, setFetched] = React.useState<boolean>(false);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email: string) => {
    if (email !== null) return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email: string) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password: string) => {
    return currentUser.updatePassword(password);
  };

  const logOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setFetched(true);
    });
    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {fetched && children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthContext);
