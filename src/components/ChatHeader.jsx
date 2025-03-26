import React from "react";

const ChatHeader = () => {
  return (
    <header className="bg-jarvis-bubble border-b border-gray-800">
      <div className="max-w-chat mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-lg font-bold text-white">J</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text">
              Jarvis AI Assistant
            </h1>
            <p className="text-xs text-text-secondary">
              Voice-enabled AI assistant
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-secondary/30 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-text-secondary">Online</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
