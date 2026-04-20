export default function ChatBox({ chat, question, setQuestion, ask }) {
  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto bg-gray-800 p-3 rounded">
        {chat.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : ""}>
            <span className="bg-gray-700 px-3 py-2 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 bg-gray-700 rounded-l"
        />
        <button onClick={ask} className="bg-blue-600 px-4 rounded-r">
          Ask
        </button>
      </div>
    </div>
  );
}
