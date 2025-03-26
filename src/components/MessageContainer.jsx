import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageContainer = ({ messages = [] }) => {
  const containerRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      if (firstRender) {
        setFirstRender(false);
      } else {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [messages, firstRender]);

  // Add script to head when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-chat mx-auto px-4 py-6">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <h2 className="text-2xl font-semibold text-text mb-4">
                  Welcome to Jarvis AI Assistant
                </h2>
                <p className="text-text-secondary mb-8">
                  I'm your voice-enabled AI assistant. Click the microphone
                  button and start speaking to begin our conversation.
                </p>
                <div className="flex justify-center mt-6">
                  <elevenlabs-convai agent-id="arCNmkDE8BbNJQM6bz6Q"></elevenlabs-convai>
                </div>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start gap-4 mb-6 ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-jarvis-bubble flex items-center justify-center text-text font-semibold flex-shrink-0">
                      J
                    </div>
                  )}
                  <div
                    className={`max-w-[calc(100%-4rem)] ${
                      message.role === "user"
                        ? "bg-user-bubble"
                        : "bg-jarvis-bubble"
                    } rounded-lg px-4 py-3`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-user-bubble flex items-center justify-center text-text font-semibold flex-shrink-0">
                      U
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
