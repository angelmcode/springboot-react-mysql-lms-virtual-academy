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
    <div className="p-8 text-zinc-900 dark:text-white">
      
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      
      <div className="mb-6">
        This is the Student Home!
      </div>
      
      {/* 2. Made the box light gray by default, and dark zinc in dark mode */}
      <div className="p-4 bg-zinc-100 border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 rounded-xl">
        {/* 3. Tweaked the green text so it's readable on both backgrounds! */}
        <p className="text-green-600 dark:text-green-400 font-mono">{message}</p>
      </div>

    </div>
  );
}

export default StudentHome;