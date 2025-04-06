import React, { useRef } from "react";
import { useState } from "react";
import Header from "./Header";
import { checkFormValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG, USER_ICON } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleFormSubmit = () => {
    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passRef?.current?.value;
    const message = checkFormValidation(email, password);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:USER_ICON
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              errorMessage(errorCode + ":" + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          errorMessage(errorCode + ":" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_BG} alt="netflix-bg" />
      </div>
      <form
        className=" bg-black 0 absolute p-12 my-36 mx-auto right-0 left-0 w-3/12 text-white rounded-lg opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4 mx-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-2 my-4 w-full border-1 border-gray-500"
            type="text"
            placeholder="Full Name"
            ref={nameRef}
          />
        )}
        <input
          className="p-2 my-4 w-full border-1 border-gray-500"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          className="p-2 my-4 w-full border-1 border-gray-500"
          type="password"
          placeholder="Password"
          ref={passRef}
        />
        {errorMessage && (
          <p className="font-bold text-md text-red-600">{errorMessage}</p>
        )}
        <button
          className="p-2 my-6 w-full bg-red-600 rounded-md cursor-pointer"
          onClick={handleFormSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-2 w-full cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix?Sign up now."
            : "Already registered?Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
