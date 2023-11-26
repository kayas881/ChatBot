// components/Question.js
import React from "react";

const Question = ({ question, onClick }) => (
  <div
    className="question p-3 my-2 rounded cursor-pointer text-white bg-slate-500 transition duration-300 ease-in-out transform hover:bg-pink-300"
    onClick={() => onClick(question)}
  >
    {question}
  </div>
);

export default Question;
