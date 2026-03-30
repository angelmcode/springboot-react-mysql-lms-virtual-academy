import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const UserMenu = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = currentUser?.username?.charAt(0).toUpperCase() || '?';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      
      {/* 1. THE AVATAR BUTTON: Light blue in light mode, dark blue in dark mode */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50 dark:text-blue-400 dark:hover:bg-blue-800/40 flex items-center justify-center font-bold text-sm md:text-base shadow-[0_0_10px_rgba(37,99,235,0.15)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        title="Account Menu"
      >
        {initial}
      </button>

      {/* 2. THE DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white/95 border border-zinc-200 dark:bg-zinc-900/95 dark:border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header showing the logged-in username */}
          <div className="px-4 py-2 mb-1 border-b border-zinc-200 dark:border-zinc-800/60">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Signed in as</p>
            <p className="text-sm text-black dark:text-zinc-200 font-bold truncate">{currentUser?.username}</p>
          </div>

          {/* Menu Items */}
          <div className="px-2 mt-2 flex flex-col gap-1">
            <button 
              onClick={() => {
                setIsOpen(false);
                // You can add a navigate('/profile') here later!
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-black hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer"
            >
              <FiUser size={16} />
              Profile
            </button>

            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
            >
              <FiLogOut size={16} />
              Log out
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default UserMenu;