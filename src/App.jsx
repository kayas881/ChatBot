import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./components/ChatMessage";
import { IoMdSend } from "react-icons/io";
import { MdCleaningServices } from "react-icons/md";
import Category from "./components/Category";
import Question from "./components/Question";
import questionsAndResponses from "./components/Data";
import pfp from "./assets/logo.png";
import stringSimilarity from "string-similarity"; // Import the library
import SideBar from "./components/SideBar";
import backgroundImg from "./assets/backround.png";
import mobileBackroundImg from "./assets/backroundmobile.png";

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(true);
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);

  const addUserMessage = (message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", message },
    ]);
  };

  const addChatbotMessage = (message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "incoming",
        message,
        profilePicture: pfp,
        botName: "Xavier's chatBot",
      },
    ]);
  };

  const displayQuestions = (category) => {
    setCategoriesVisible(false);
    setQuestionsVisible(true);
    setSelectedCategory(category);
  };

  const hideQuestions = () => {
    setCategoriesVisible(true);
    setQuestionsVisible(false);
    setSelectedCategory(null);
  };

  const handleUserInput = (question) => {
    let userInput = question || inputMessage.trim();

    if (userInput !== "") {
      addUserMessage(userInput);
      setInputMessage("");

      setIsTyping(true);

      setTimeout(() => {
        const chatbotResponse = getChatbotResponse(userInput);
        addChatbotMessage(chatbotResponse);

        setIsTyping(false);
      }, 1000);

      hideQuestions();
    }
  };

  const getChatbotResponse = (userInput) => {
    const trimmedInput = userInput.toLowerCase().trim();

    // Check for common greetings
    const greetings = ["hello", "hi", "hey", "greetings"];
    if (greetings.includes(trimmedInput)) {
      return "Hello! How can I assist you today?";
    }

    // Find the most similar question
    const matches = stringSimilarity.findBestMatch(
      trimmedInput,
      questionsAndResponses.map((item) => item.question.toLowerCase())
    );
    const bestMatch = matches.bestMatch;

    // Adjust the similarity threshold
    const similarityThreshold = 0.4;

    if (bestMatch.rating > similarityThreshold) {
      // If similarity rating is above the threshold, use the matched question's response
      const matchingQuestion = questionsAndResponses.find(
        (item) => item.question.toLowerCase() === bestMatch.target
      );
      return matchingQuestion
        ? matchingQuestion.response
        : "I did not understand your message.";
    } else {
      // If no close match is found, provide a default response
      return "I did not understand your message.";
    }
  };

  const filteredQuestions =
    selectedCategory &&
    questionsAndResponses.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    // Scroll the chat container to the bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  const uniqueCategories = [
    ...new Set(questionsAndResponses.map((item) => item.category)),
  ];
  return (
    <div className="App min-h-screen bg-slate-100 flex">
      <div className=" max-md:hidden">
        <SideBar />
      </div>
      <div
        className="min-h-screen bg-pink-50 w-full flex flex-col items-center justify-end"
        style={{
          backgroundImage: `url(${
            window.innerWidth > 767 ? backgroundImg : mobileBackroundImg
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="chat-container max-h-[400px] overflow-y-auto bg-pink-50"
          ref={chatContainerRef}
        >
          {chatMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              type={msg.type}
              message={msg.message}
              profilePicture={msg.profilePicture}
              botName={msg.botName}
              isTyping={isTyping && index === chatMessages.length - 1}
            />
          ))}
        </div>

        <div className="categories-container w-[900px] flex flex-wrap justify-evenly mb-4 font-bold text-pink-50 capitalize tracking-wider">
          {/* Render unique categories */}
          {uniqueCategories.map((category, index) => (
            <Category
              key={index}
              category={category}
              onClick={displayQuestions}
            />
          ))}
        </div>

        <div
          className="questions-container max-h-[100%] overflow-y-auto"
          style={{ display: questionsVisible ? "block" : "none" }}
        >
          {filteredQuestions &&
            filteredQuestions.map((item, index) => (
              <Question
                key={index}
                question={item.question}
                onClick={handleUserInput}
              />
            ))}
        </div>

        <div className="typing-container  ">
          <div className="typing-content w-[1200px] flex justify-center">
            <div className="typing-textarea flex justify-center items-center mb-6">
              <textarea
                className="w-[900px] rounded-lg bg-pink-50"
                id="chat-input"
                spellCheck="false"
                placeholder="What can I assist with today?"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{
                  width: window.innerWidth > 767 ? "800px" : "300px", // Set a larger height on smaller screens
                }}
                required
              ></textarea>
              <span
                id="send-btn"
                className="material-symbols-rounded flex justify-start items-center w-[80px]  h-[80px] cursor-pointer "
                onClick={() => handleUserInput()}
              >
                <IoMdSend size={30} />
              </span>
            </div>
            <div className="typing-controls">
              <span
                id="delete-btn"
                className="material-symbols-rounded flex justify-start items-center w-[80px]  h-[80px]  cursor-pointer "
                onClick={() => setChatMessages([])}
              >
                <MdCleaningServices size={30} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
