"use client";

import { useState } from "react";

import { Button } from "../Button";
import { Input } from "../Input";

export const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    setMessage("");

    setChatHistory([...chatHistory, { role: "user", content: message }]);

    const response = await fetch("http://localhost:3001/api/ai/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    setChatHistory([
      ...chatHistory,
      { role: "user", content: message },
      {
        role: "assistant",
        content: data.output.response.choices[0].message.content,
      },
    ]);
  };

  return (
    <div className="flex flex-col w-78 h-96 max-w-[350px] border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      {/* History */}
      <div className="flex-1 overflow-y-auto border-b border-gray-300 p-2">
        {chatHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            <strong className="font-semibold">
              {entry.role === "user" ? "You: " : "AI: "}
            </strong>
            <span className="ml-1">{entry.content}</span>
          </div>
        ))}
      </div>

      {/* Send message input */}
      <div className="flex">
        <Input
          label="chat"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className=" border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-300 mt-1"
        />
        <Button onClick={sendMessage} label={"Send"} />
      </div>
    </div>
  );
};
