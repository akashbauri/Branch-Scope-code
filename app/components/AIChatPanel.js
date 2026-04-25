export default function ProgramSelector({ program, setProgram }) {
  return (
    <select
      value={program}
      onChange={(e) => setProgram(e.target.value)}
      className="p-2 bg-gray-700 text-white"
    >
      <option value="cse">CSE</option>
      <option value="mba">MBA</option>
      <option value="law">Law</option>
    </select>
  );
}
