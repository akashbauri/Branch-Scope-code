export default function ChatBox({
  chat,
  question,
  setQuestion,
  ask,
  loading,
}) {
  return (
    <div className="flex flex-col h-full">

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-3">

        {chat.length === 0 && (
          <p className="text-gray-400 text-center">
            Ask anything about your career...
          </p>
        )}

        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 px-4 py-2 rounded-lg text-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}

      </div>

      {/* Input Section */}
      <div className="flex mt-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") ask(); // 🔥 Enter to send
          }}
          placeholder="Ask about your future..."
          className="flex-1 p-3 bg-gray-700 rounded-l-lg outline-none text-sm"
        />

        <button
          onClick={ask}
          disabled={loading}
          className={`px-5 rounded-r-lg text-sm font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "..." : "Ask"}
        </button>

      </div>
    </div>
  );
}
