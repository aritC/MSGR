import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ChatMessage from "../ChatMessage/ChatMessage";
import SignOut from "../SignOut/SIgnOut";
import "./Chatroom.css";

function ChatRoom(props) {
  const dummy = useRef();
  const fileInput = useRef();
  const { firebase, firestore, auth, storage } = props;
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [image, setImage] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    if (formValue !== "") {
      await messageRef.add({
        text: formValue,
        messageType: "text",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });

      setFormValue("");
    }
    if (image !== null) await uploadImage();
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpload = (event) => {
    fileInput.current.click();
  };

  const uploadImage = async () => {
    if (image == null) return;
    const { uid, photoURL } = auth.currentUser;
    const imageRef = ref(storage, `MSGR/${image.name + Date.now()}`);
    uploadBytes(imageRef, image)
      .then(() => {
        setImage(null);
      })
      .then(() => {
        let imgUrl = "";
        getDownloadURL(imageRef)
          .then((url) => {
            imgUrl = url;
          })
          .then(() => {
            messageRef.add({
              text: imgUrl,
              messageType: "image",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid,
              photoURL,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SignOut auth={auth} />
      <main>
        <div>
          {messages &&
            messages.map((msg) => {
              let messageClass =
                msg.uid === auth.currentUser.uid ? "sent" : "received";
              return (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  messageClass={messageClass}
                />
              );
            })}
        </div>
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          ref={fileInput}
          hidden
        />
        <button type="button" onClick={handleUpload}>
          {image === null ? "Upload Image" : "Image Added"}
        </button>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default ChatRoom;
