import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "./components/Signin/SignIn";
import ChatRoom from "./components/Chatroom/Chatroom";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBS8W7F3r4kcU6IFpfmfAzRksZkpBPHfag",
  authDomain: "chatapp-84809.firebaseapp.com",
  projectId: "chatapp-84809",
  storageBucket: "chatapp-84809.appspot.com",
  messagingSenderId: "195381523122",
  appId: "1:195381523122:web:062bd66b3b4ca8ec608fab",
  measurementId: "G-XVQ0S6RH64",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = getStorage(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {user ? (
          <ChatRoom
            firebase={firebase}
            firestore={firestore}
            auth={auth}
            storage={storage}
          />
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
      </section>
    </div>
  );
}

export default App;
