export default function CareerAnalysisCard({ result }) {
  if (!result) return <div>No Data</div>;

  return (
    <div className="bg-gray-800 p-4">
      <p>Score: {result.score}</p>
      <p>Risk: {result.risk}</p>
      <p>ROI: {result.roi}</p>
      <p>{result.suggestion}</p>
    </div>
  );
}
