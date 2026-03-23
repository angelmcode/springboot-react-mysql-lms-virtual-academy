import { useEffect, useState } from 'react';
import api from '../api/AxiosConfig';

const StudentHome = () => {
  const [message, setMessage] = useState("Knocking on the backend vault...");

  useEffect(() => {
    // The interceptor automatically attaches the token!
    api.get("/api/test/student")
      .then(response => setMessage(response.data))
      .catch(error => setMessage("Access Denied by Backend ❌"));
  }, []);

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <div>
      This is the Student Home!
      </div>
      <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
        <p className="text-green-400 font-mono">{message}</p>
      </div>
    </div>
  );
}

export default StudentHome;