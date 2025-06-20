const output = document.getElementById("output");

const eventSource = new EventSource("http://localhost:5100/events");

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  output.textContent = `Server time: ${data.time}`;
};

eventSource.onerror = function (err) {
  console.error("SSE error:", err);
};
