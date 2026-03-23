import { useEffect, useState } from 'react';
import api from '../api/AxiosConfig';

const PortalSelection = () => {
  const [message, setMessage] = useState("Knocking on the backend vault...");

  useEffect(() => {
    api.get("/api/test/teacher")
      .then(response => setMessage(response.data))
      .catch(error => setMessage("Access Denied by Backend ❌"));
  }, []);

  return (
    <div className="text-white p-8">
      <h1 className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl mb-4">Portal Selection</h1>
      <p className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl mb-4">Do you want to enter as a student or as a teacher?</p>
      
      <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
        <p className="text-purple-400 font-mono">{message}</p>
      </div>
    </div>
  );
}

export default PortalSelection;