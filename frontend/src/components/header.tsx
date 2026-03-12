import { Outlet } from 'react-router';

export default function Header() {

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">SWE Academy</h1>
        <hr className="border-zinc-800 mt-4" />
      </header>
      <Outlet />
    </div>
  );
}