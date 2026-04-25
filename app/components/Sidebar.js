export default function Sidebar({ program, setProgram }) {
  const programs = ["cse", "me", "civil"];

  return (
    <div className="w-64 bg-gray-900 p-4">
      <h2 className="text-xl mb-4">Programs</h2>
      {programs.map((p) => (
        <button
          key={p}
          onClick={() => setProgram(p)}
          className={`block w-full p-2 mb-2 rounded ${
            program === p ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
