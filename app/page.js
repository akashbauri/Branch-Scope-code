const sendMessage = async () => {
  if (!question) return;

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ program, question }),
  });

  const data = await res.json();

  if (data.success) {
    setResult(data.data);
  }
};
