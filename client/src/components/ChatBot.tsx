import { useState, useEffect, useRef, useCallback } from "react";
import TypingIndicator from "@/components/chatbot/components/TypingIndicator";
import TripPlanMessage from "@/components/chatbot/components/TripPlanMessage";
import { marked } from "marked";

const API_KEY = "AIzaSyCwk1tay6gpqlVy7SHuA5Iv3lzRb9ENsvY";
const PEXELS_API_KEY =
  "P2dLrk5TWTRGCbNvBizKynGkuHNP68q4a4gC6PXuIEmGtlxzHSivyUPw";

const ChatBot = ({
  isOpen = true,
  onClose,
  onStartPlanning,
  initialInput = "",
}) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm here to help you plan your perfect trip. To get started, please tell me your destination or your travel dates.",
      suggestions: [
        "I want to travel to Paris",
        "My trip is from Aug 1 to Aug 7",
        "Looking for adventure ideas",
        "Help me find flights",
      ],
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const chatRef = useRef(null);

  const chatIdRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (initialInput && initialInput.trim() !== "") {
      handleInputSubmit(initialInput);
    }
  }, [initialInput]);

  useEffect(() => {
    if (isOpen && !chatIdRef.current) {
      chatIdRef.current = `chat-${Date.now()}`;
      localStorage.setItem("currentChatId", chatIdRef.current);
    }

    if (!isOpen) {
      chatIdRef.current = null; // Optional: clear when modal closes
      localStorage.removeItem("currentChatId");
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Text-to-Speech function
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.name === "Google US English");
      if (preferredVoice) {
        speech.voice = preferredVoice;
      }
      window.speechSynthesis.speak(speech);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  // Renamed to callTono
  const callTono = async (userMessage, messages) => {
    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const conversationHistory = messages
        .map((msg) => {
          const senderLabel = msg.sender === "user" ? "User" : "AI";
          const text =
            msg.type === "tripPlan" ? JSON.stringify(msg.detailedPlan) : msg.text;
          return `${senderLabel}: ${text}`;
        })
        .join("\n");

      const prompt = `You are Tono, an AI travel planner.
If the user is casually chatting or hasn't provided all necessary trip info, you can talk normally — but always guide the conversation back by kindly asking how you can help them with their travel plans.

If the user hasn't provided all key trip details, ask ONLY the missing ones — very briefly and directly, in 1 short sentence per question. DO NOT explain anything or add extra text.

- Destination city or place they want to visit
- Travel dates or duration of the trip
- Number of travelers
- Budget
- Interests or preferred activities (optional: only ask if the user seems interested or if it would improve the plan)

Only once the user has provided all required details, generate a concise full trip itinerary with the following info:

this is what the user said previously: ${conversationHistory}

✈️ Flight details: departure city, destination, airline, flight time, price, and duration.
🏨 Hotel details: name, location, price per night, rating, and key amenities.
📅 Daily plan: 
  - Generate for the number of days requested (default 7 if none specified).
  - Each day should have a day number, a descriptive and engaging title, and 6-8 detailed activities (each 30-40 words) that include tips, local highlights, and unique experiences.
🌤️ Weather info: temperature range, general condition, and packing tips.
🔍 4-5 brief travel suggestions for the destination.

Return ONLY a valid JSON object matching this exact structure (no explanations, no markdown, no extra text):

{
  "content": "string with a sweet message about the trip and destination",
  "detailedPlan": {
    "destination": "string"(required),
    "description": "string (required, a sweet description for the place)",
    "thumbnail": "string with a famous landmark or place name",
    "duration": "string"(required),
    "travelers": number(required),
    "budget": "string"(required),
    "interest": "string"(optional),
    "totalCost": "string",
    "flights": {
      "departure": "string",
      "price": "string",
      "airline": "string",
      "duration": "string"
    },
    "hotel": {
      "name": "string",
      "location": "string",
      "price": "string",
      "rating": number,
      "amenities": ["string"]
    },
    "dailyPlan": [
      {
        "day": number,
        "title": "string",
        "description": "string",
        "activities": ["string", "string", "..."],
        "activitiesDescription": ["string", "string", "..."],
        "travelTips": ["string", "string", "..."],
        "meals": {
          "breakfast": "string",
          "lunch": "string",
          "dinner": "string"
        },
        "notes": "string",
        "image": "string",
        "weather": "string",
        "transport": "string"
      }
    ],
    "weather": {
      "temp": "string",
      "condition": "string",
      "recommendation": "string"
    }
  },
  "suggestions": ["string", "string", "..."]
}

User input:
${userMessage}
      `.trim();

      // Set a timeout for fetch (15 seconds)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 15000)
      );

      const fetchPromise = fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
          signal: controller.signal,
        }
      ).then((response) => response.json());

      const data = await Promise.race([fetchPromise, timeoutPromise]);
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        return { error: "No response from Tono." };
      }

      try {
        let cleanText = textResponse.trim();

        if (cleanText.startsWith("```json") || cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\n?/, "").replace(/```$/, "");
        }

        let parsed = JSON.parse(cleanText);

        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }

        if (parsed && parsed.content && parsed.detailedPlan) {
          return parsed;
        } else {
          return {
            error: "Parsed JSON does not have expected keys.",
            raw: textResponse,
          };
        }
      } catch (e) {
        return {
          error: "Failed to parse Tono response as JSON.",
          raw: textResponse,
        };
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return { error: "Request was cancelled." };
      }
      return { error: error.message || "Could not connect to Tono." };
    }
  };

  // useCallback to avoid stale closure in useEffect
  const handleInputSubmit = useCallback(async (inputValue) => {
    const userText = (inputValue ?? input).trim();
    if (!userText || loading) return;

    if (!inputValue) setInput("");

    // Add user message immediately
    const userMessage = { sender: "user", text: userText, type: "text" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    // Call Tono with the full updated message history
    const botResponse = await callTono(userText, [...messages, userMessage]);

    setLoading(false);

    // Prepare bot message
    const uniqueId = Date.now().toString();
    const planId = `plan-${uniqueId}`;
    const chatId = chatIdRef.current || "default-chat";

    const botMessage = {
      sender: "bot",
      id: uniqueId,
      plan_id: planId,
      ...botResponse,
      type: "tripPlan", // Assuming a tripPlan is always the response
      // Fallback if tripPlan isn't generated
      text: botResponse?.error || botResponse?.content,
    };

    // Update messages with bot response
    setMessages((prev) => [...prev, botMessage]);

    // Save chat history to localStorage
    const historyKey = `chatHistory-${chatId}`; // Use chatId for history
    const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
    const newEntry = {
      id: uniqueId,
      plan_id: planId,
      timestamp: new Date().toISOString(),
      userPrompt: userText,
      tonoResponse: botResponse,
    };
    localStorage.setItem(historyKey, JSON.stringify([...existing, newEntry]));

    // Speak the bot's response if it has a text property
    if (botMessage.text) {
      speak(botMessage.text);
    }
  }, [input, loading, messages]);

  // Speech-to-Text function
  const handleMicClick = () => {
    // Support both standard and webkit SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " : "") + transcript);
      setRecording(false);
    };
    recognition.onerror = () => {
      setRecording(false);
    };
    recognition.onend = () => {
      setRecording(false);
    };
    recognition.start();
  };

  useEffect(() => {
    if (initialInput && initialInput.trim() !== "") {
      handleInputSubmit(initialInput);
    }
  }, [initialInput, handleInputSubmit]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg sm:max-w-3xl max-h-[95vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shadow-lg">
              {/* Example chat icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 8h10M7 12h8m-8 4h6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow">Chat with Tono</h2>
              <p className="text-white/90 text-xs sm:text-sm">Your AI Travel Planning Expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-white hover:text-gray-200 transition rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4 text-gray-900 bg-gradient-to-b from-gray-50 via-white to-gray-100"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg, i) => {
            if (msg.type === "tripPlan") {
              return (
                <TripPlanMessage
                  key={msg.id || i}
                  data={msg}
                  setInput={setInput}
                  handleInputSubmit={handleInputSubmit}
                />
              );
            }
            return (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-base max-w-[80vw] sm:max-w-[70%] whitespace-pre-wrap border relative transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white border-blue-700 rounded-br-none shadow-lg"
                      : "bg-white border-gray-300 text-gray-800 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(msg.text || ""),
                        }}
                      />
                      {/* TTS button */}
                      {msg.text && (
                        <button
                          onClick={() => speak(msg.text)}
                          className="absolute -top-2 -right-2 bg-gray-200 text-gray-700 p-1 rounded-full shadow-md hover:bg-gray-300 transition-colors"
                          aria-label="Read message aloud"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.018a1.5 1.5 0 011.66 0l4.5 2.25A1.5 1.5 0 0116 6.643v6.714a1.5 1.5 0 01-1.457.76l-4.5-2.25a1.5 1.5 0 01-.826-1.34V4.358a1.5 1.5 0 01.826-1.34zM11 11.25V5.5L7 7.5v6l4-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            );
          })}

          {loading && <TypingIndicator />}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white rounded-b-3xl">
          <div className="px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
              placeholder="Type your travel request..."
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm transition"
              disabled={loading}
            />
            <button
              onClick={() => handleInputSubmit()}
              className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition shadow"
              disabled={loading || !input.trim()}
              type="button"
            >
              <span className="hidden sm:inline">Send</span>
              <svg className="sm:hidden h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={handleMicClick}
              className={`bg-gray-200 text-gray-700 rounded-full p-2 shadow hover:bg-gray-300 active:bg-gray-400 transition ${recording ? "animate-pulse ring-2 ring-blue-400" : ""}`}
              aria-label="Speak your request"
              type="button"
              disabled={loading || recording}
            >
              {/* Improved mic SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm5 10a1 1 0 1 1 2 0c0 4.418-3.582 8-8 8s-8-3.582-8-8a1 1 0 1 1 2 0c0 3.314 2.686 6 6 6s6-2.686 6-6zm-7 8h2v2a1 1 0 1 1-2 0v-2z"/>
              </svg>
            </button>
          </div>

          <div className="px-3 sm:px-4 pb-4">
            <button
              onClick={() => {
                if (onStartPlanning) onStartPlanning();
                if (onClose) onClose();
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow"
            >
              Use Planning Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
