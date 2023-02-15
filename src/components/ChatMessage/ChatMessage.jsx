import "./ChatMessage.css";

function ChatMessage(props) {
  const { message, messageClass } = props;
  const { text, photoURL, messageType } = message;
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} className="pfp" alt="User Pic" />
      {messageType == "text" ? (
        <p>{text}</p>
      ) : (
        <a href={text} target="_blank">
          <img className="attach" src={text} width="300" height="300" />
        </a>
      )}
    </div>
  );
}

export default ChatMessage;
