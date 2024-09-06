"use client";

import { useState } from "react";

import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Chatbot } from "./Chatbot";
import "./animate.css";

export const ChatbotUI = () => {
  const [show, setShow] = useState<boolean>(false);

  const showBotHandler = () => {
    setShow(!show);
  };

  return (
    <div className="fixed bottom-20 right-4">
      {show ? (
        <div className="relative">
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-4 text-3xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

          <Chatbot />
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faRobot}
          className="rotate text-5xl cursor-pointer"
          onClick={showBotHandler}
        />
      )}
    </div>
  );
};
