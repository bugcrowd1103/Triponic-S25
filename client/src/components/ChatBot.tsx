import { useState, useEffect, useRef } from "react";
import TypingIndicator from "@/components/chatbot/components/TypingIndicator";
import TripPlanMessage from "@/components/chatbot/components/TripPlanMessage";
import { useLocation } from "wouter";
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
  const chatRef = useRef(null);

  const chatIdRef = useRef<string | null>(null);

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

  const callGemini = async (userMessage: string, messages: any[]) => {
    try {
      // Format current chat messages into conversation history string
      const conversationHistory = messages
        .map((msg) => {
          const senderLabel = msg.sender === "user" ? "User" : "AI";
          const text =
            msg.type === "tripPlan" ? msg.content || msg.text : msg.text;
          return `${senderLabel}: ${text}`;
        })
        .join("\n");

      const prompt = `You are an AI travel planner.
      If the user is casually chatting or hasn't provided all necessary trip info, you can talk normally — but always guide the conversation back by kindly asking how you can help them with their travel plans.

If the user hasn't provided all key trip details, ask ONLY the missing ones — very briefly and directly, in 1 short sentence per question. DO NOT explain anything or add extra text.

- Destination city or place they want to visit
- Travel dates or duration of the trip
- Number of travelers
- Budget
- Interests or preferred activities (e.g., adventure, relaxation, food, culture)

Only once the user has provided all required details, generate a concise full trip itinerary with the following info:

this is user what said previusly ${conversationHistory}

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
    "description": "string(required a swwet desiton for the place)",
    "thumbnail": "string with a famous landmark or place name",
    "duration": "string"(required),
    "travelers": number(required),
    "budget": "string"(required),
    "interest": "string"(required),
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
]
,
    "weather": {
      "temp": "string",
      "condition": "string",
      "recommendation": "string"
    }
  },
  "suggestions": ["string", "string", "..."(per suggestion make it short and concise)],
}

User input:
${userMessage}
    `.trim();

      const response = await fetch(
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
        }
      );

      const data = await response.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        return { error: "No response from Gemini." };
      }

      // Try to parse JSON response from Gemini (handle double-stringified JSON)
      try {
        let cleanText = textResponse.trim();

        // Remove Markdown code block (```json\n...\n```)
        if (cleanText.startsWith("```json") || cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\n?/, "").replace(/```$/, "");
        }

        // Try parsing cleaned string
        let parsed = JSON.parse(cleanText);

        // If parsed is a string, parse again (handle double JSON)
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }

        // Confirm parsed is an object with content and detailedPlan keys
        if (parsed && parsed.content && parsed.detailedPlan) {
          return parsed;
        } else {
          // Sometimes the API returns an object wrapped in a 'choices' or another key - adjust if needed
          return {
            error: "Parsed JSON does not have expected keys.",
            raw: textResponse,
          };
        }
      } catch (e) {
        return {
          error: "Failed to parse Gemini response as JSON.",
          raw: textResponse,
        };
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { error: "Could not connect to Gemini." };
    }
  };
  const handleInputSubmit = async (inputValue?: string) => {
    const userText = (inputValue ?? input).trim();
    if (!userText || loading) return;

    // Clear input only if inputValue is undefined (user typing)
    if (!inputValue) setInput("");

    // Add user message first using functional update to get latest messages
    setMessages((prevMessages) => {
      const newMessages = [
        ...prevMessages,
        { sender: "user", text: userText, type: "text" },
      ];

      (async () => {
        setLoading(true);

        const botResponse = await callGemini(userText, newMessages);

        setLoading(false);

        const uniqueId = Date.now().toString(); // message id
        const planId = `plan-${uniqueId}`; // your custom plan ID
        const chatId = chatIdRef.current || "default-chat";

        const botMessage = {
          sender: "bot",
          id: uniqueId,
          plan_id: planId,
          ...botResponse,
          type: "tripPlan",
        };

        // Update messages with bot response
        setMessages((prev) => [...prev, botMessage]);

        // Save chat history to localStorage
        const historyKey = `chatHistory-${planId}`;
        const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");

        const newEntry = {
          id: uniqueId,
          plan_id: planId,
          timestamp: new Date().toISOString(),
          userPrompt: userText,
          geminiResponse: botResponse,
        };

        localStorage.setItem(
          historyKey,
          JSON.stringify([...existing, newEntry])
        );
      })();

      return newMessages;
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-full shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-t-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-white">Chat with Tono</h2>
              <p className="text-white/90">Your AI Travel Planning Expert</p>
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
          className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-900 bg-gray-50"
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
                  className={`rounded-2xl px-4 py-2 text-base max-w-[70%] whitespace-pre-wrap border ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white border-blue-700 rounded-br-none"
                      : "bg-white border-gray-300 text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(msg.text || ""),
                      }}
                    />
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
        {/* Chat input & buttons */}
        <div className="border-t border-gray-300 bg-white rounded-b-3xl">
          {/* Input + Send Button Row */}
          <div className="p-4 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
              placeholder="Type your travel request..."
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              disabled={loading}
            />
            <button
              onClick={handleInputSubmit}
              className="bg-blue-600 text-white rounded-xl px-5 py-2 text-sm hover:bg-blue-700 disabled:opacity-50 transition"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>

          {/* Use Planning Form Button Row */}
          <div className="px-4 pb-4">
            <button
              onClick={() => {
                if (onStartPlanning) onStartPlanning(); // go to planning step
                if (onClose) onClose(); // close modal
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
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
