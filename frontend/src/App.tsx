import { useEffect, useState } from 'react'

// This tells TypeScript what the Java "Map" looks like
interface BackendData {
  text: string;
}

export default function App() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then(res => res.json())
      .then((data: BackendData) => setMessage(data.text))
      .catch(() => setMessage("Backend is offline ❌"));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Virtual Academy</h1>
      <p>Status: <strong>{message}</strong></p>
    </div>
  );
}
