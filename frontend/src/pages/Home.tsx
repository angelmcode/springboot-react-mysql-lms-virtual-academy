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
    
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link 
          to="/signup" 
          className="text-blue-500 hover:text-blue-400 text-2xl font-bold underline"
        >
          Sign Up →
        </Link>
       
        <Link 
          to="/login" 
          className="text-blue-500 hover:text-blue-400 text-2xl font-bold underline"
        >
          Log In Page →
        </Link>
      </div>
    </div>
  );
};
export default Home;
