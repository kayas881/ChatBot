import React from "react";
import "./../index.css";

const ChatMessage = ({ type, message, profilePicture, botName, isTyping }) => {
  const renderMessage = () => {
    if (isTyping) {
      return (
        <div className="mt-5 typing-animation">
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
        </div>
      );
    }

    // Render HTML content with dangerouslySetInnerHTML
    return (
      <p
        className="mt-5"
        style={{ maxWidth: "500px", whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    );
  };

  return (
    <div
      className={`chat ${
        type === "user" ? "outgoing" : "incoming"
      } p-3 my-2 rounded ${type === "incoming" ? "fadeIn" : ""}`}
    >
      <div className="chat-details">
        {type === "incoming" && (
          <div className="bot-info flex">
            <img
              src={profilePicture}
              alt={`${botName}'s Avatar`}
              className="avatar w-10"
            />
            <p className="bot-name pl-3 mt-2 font-extrabold text-pink-300">
              {botName}
            </p>
          </div>
        )}
        {renderMessage()}
      </div>
    </div>
  );
};

export default ChatMessage;
