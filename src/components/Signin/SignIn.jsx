import React from "react";
import "./SignIn.css";

function SignIn(props) {
  const { auth, firebase } = props;
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  return <button onClick={signInWithGoogle}> Sign In with Google</button>;
}

export default SignIn;
