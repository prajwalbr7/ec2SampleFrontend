import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error("Submit failed:", err);
      setResponse(`Error: ${err.message}`);
    }
  };

  const isValid = name.trim().length > 0;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Form Data</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} aria-label="name-input" />
        <button type="submit" disabled={!isValid}>Submit</button>
        {!isValid && <p style={{ color: "red" }}>Please enter a name</p>}
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;
