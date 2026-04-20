export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="bg-gray-800 p-4 rounded">
      <p>Score: {result.score}</p>
      <p>Risk: {result.risk}</p>
      <p>ROI: {result.roi}</p>
      <p>Source: {result.source}</p>

      <p className="mt-2 text-green-400">{result.suggestion}</p>
    </div>
  );
}
