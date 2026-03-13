import { useEffect, useState } from 'react'
import { Link } from 'react-router';

// This tells TypeScript what the Java "Map" looks like
interface BackendData {
  text: string;
}

const Home = () => {
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
      <div className="bg-purple-600 text-white font-bold    text-3xl   p-10 rounded-2xl shadow-xl text-center mt-10">
        IT FINALLY WORKS!!!!!!! 🎉
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        {/* The link that actually takes you to the signup page */}
        <Link 
          to="/signup" 
          className="text-blue-500 hover:text-blue-400 text-2xl font-bold underline"
        >
          Go to Sign Up Page →
        </Link>
        <Link 
          to="/login" 
          className="text-blue-500 hover:text-blue-400 text-2xl font-bold underline"
        >
          Go to Log In Page →
        </Link>
      </div>
    </div>
  );
};
export default Home;
