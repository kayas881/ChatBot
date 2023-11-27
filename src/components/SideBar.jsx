import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./../SlideBar.css"; // Import your CSS file for additional styling

const SideBar = () => {
  const links = [
    {
      text: "Admissions",
      url: "https://xaviertech.ac.in/images/Admission%20NOTICE%20-%20Board.pdf",
    },
    { text: "Courses", url: "https://xaviertech.ac.in/" },
    {
      text: "Calender",
      url: "https://xaviertech.ac.in/index.php/students-info/students-info-11",
    },
    {
      text: "Syllabus",
      url: "https://drive.google.com/drive/folders/1GfQu80_NKDY1Ezbt7ahC0DH26yWCbMv9",
    },
    {
      text: "Modal Answers",
      url: "https://drive.google.com/drive/folders/1VawVGkUixJsDuh_T6ybGINayNdDIf0W-",
    },
    {
      text: "Training and Placements",
      url: "https://xaviertech.ac.in/index.php/placements/training-placement",
    },
    {
      text: "Contact Us",
      url: "https://xaviertech.ac.in/index.php/students-info/admission-procedure-7/contact-us",
    },
    {
      text: "About Us",
      url: "https://xaviertech.ac.in/index.php/about",
    },

    // Add more links as needed
  ];

  return (
    <div className="sidebar-container h-[100vh] bg-black">
      <h1 className="sidebar-title w-full text-3xl font-bold text-[#00df9a] ">
        Helpful Links
      </h1>
      <ul className="sidebar-links font-extraBolddd ">
        {links.map((link, index) => (
          <li key={index} className="sidebar-item">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-link"
            >
              {link.text}
              <IoIosArrowForward className="arrow-icon" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
