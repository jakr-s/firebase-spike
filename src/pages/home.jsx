import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export const Home = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  if (user) {
    return <Navigate to="/private"></Navigate>;
  }

  return (
    <>
      <h2>Homepage</h2>
      <section>
        <form>
          <legend>{isSignUpActive ? "Sign Up" : "Sign In"}</legend>
          <fieldset>
            <ul>
              <li>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={handleEmailChange} />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </li>
            </ul>
            <button
              type="button"
              onClick={isSignUpActive ? handleSignUp : handleSignIn}
            >
              {isSignUpActive ? "Sign Up" : "Sign In"}
            </button>
          </fieldset>
          <a onClick={handleMethodChange}>
            {isSignUpActive ? "Login" : "Create an Account"}
          </a>
        </form>
      </section>
    </>
  );
};
