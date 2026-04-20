export default function Sidebar({ program, setProgram }) {
  return (
    <div className="w-60 bg-gray-900 p-5">
      <h2 className="text-xl font-bold mb-4">BranchScope</h2>

      {["cse", "me", "civil"].map((p) => (
        <button
          key={p}
          onClick={() => setProgram(p)}
          className={`block w-full mb-2 p-2 rounded ${
            program === p ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
