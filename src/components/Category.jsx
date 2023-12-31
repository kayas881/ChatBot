// components/Category.js
import React from "react";
import "./category.css";
const Category = ({ category, onClick }) => (
  <div
    className="category p-3 my-2 rounded cursor-pointer transition duration-300 ease-in-out transform hover:bg-pink-300 font-extraBolddd "
    onClick={() => onClick(category)}
  >
    {category}
  </div>
);

export default Category;
