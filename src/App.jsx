import { useState } from "react";
import { Toaster } from "react-hot-toast";
import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";
import VoiceInput from "./components/VoiceInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = async (text) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      // Add Jarvis response
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Error processing voice input:", error);
    }
  };

  return (
    <div className="min-h-screen bg-chat-bg text-text flex flex-col">
      <Toaster position="top-center" />
      <ChatHeader />
      <MessageContainer messages={messages} />
      <VoiceInput
        onVoiceCapture={handleVoiceInput}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
}

export default App;
