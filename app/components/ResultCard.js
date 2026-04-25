export default function ResultCard({ result }) {
  if (!result) return <div className="bg-gray-800 p-4 rounded">No data</div>;

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-xl mb-2">Analysis</h2>
      <p>Score: {result.score}</p>
      <p>Risk: {result.risk}</p>
      <p>ROI: {result.roi}</p>
    </div>
  );
}
