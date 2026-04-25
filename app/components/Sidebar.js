export default function ProgramSelector({ program, setProgram }) {
  return (
    <div className="w-64 bg-gray-900 p-4">
      <h2 className="mb-4 font-bold">Programs</h2>

      {["cse", "me", "civil"].map((p) => (
        <div
          key={p}
          onClick={() => setProgram(p)}
          className={`p-2 cursor-pointer ${
            program === p ? "bg-blue-600" : ""
          }`}
        >
          {p.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
