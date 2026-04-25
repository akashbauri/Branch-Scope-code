export default function AIChatPanel({
  chat,
  question,
  setQuestion,
  ask,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-800 p-3">
        {chat.map((msg, i) => (
          <p key={i}>{msg.text}</p>
        ))}
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="p-2 bg-gray-700"
      />

      <button onClick={ask} className="bg-blue-600">
        Ask
      </button>
    </div>
  );
}
