import React, { useState, useRef } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const WEBHOOK_URL = "https://amineeeeeeee.app.n8n.cloud/webhook-test/n8n";

const VoiceInput = ({ onVoiceCapture, isListening, setIsListening }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startListening = async () => {
    console.log("🎤 Starting audio recording...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("✅ Microphone access granted");

      mediaRecorderRef.current = new MediaRecorder(stream);
      console.log(
        "📼 MediaRecorder initialized:",
        mediaRecorderRef.current.state
      );

      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("📊 Received audio chunk, size:", event.data.size, "bytes");
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log("⏹️ Recording stopped, processing audio...");
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("📦 Audio blob created, size:", audioBlob.size, "bytes");
        await processAudio(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      console.log("▶️ Recording started");
      setIsListening(true);
    } catch (error) {
      console.error("❌ Microphone access denied:", error);
      toast.error("Unable to access microphone");
    }
  };

  const stopListening = () => {
    console.log("🛑 Stopping recording...");
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);

      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        track.stop();
        console.log("🎵 Audio track stopped:", track.id);
      });
    }
  };

  const processAudio = async (audioBlob) => {
    console.log("🔄 Processing audio and sending to webhook...");
    try {
      // Create form data with the audio blob
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      console.log("📝 FormData created with audio file");

      // Log request details
      console.log("📡 Sending request to:", WEBHOOK_URL);
      console.log("📦 Request payload size:", audioBlob.size, "bytes");

      // Send the audio to the webhook
      const response = await axios.post(WEBHOOK_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`📤 Upload progress: ${percentCompleted}%`);
        },
      });

      // Log response
      console.log("✅ Webhook response received:", response.data);

      // Handle the response
      if (response.data) {
        onVoiceCapture(response.data);
        console.log("💬 Message added to chat");
      } else {
        throw new Error("No response from webhook");
      }
    } catch (error) {
      console.error("❌ Error processing audio:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error("Error processing audio");
    } finally {
      setIsProcessing(false);
      console.log("✨ Audio processing completed");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"></div>
  );
};

export default VoiceInput;
