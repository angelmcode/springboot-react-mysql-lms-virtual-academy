import { Outlet, Link } from 'react-router';
import { FiSun, FiMoon, FiShoppingCart } from "react-icons/fi";
import HasPermission from './HasPermission';
import toast from 'react-hot-toast'; 
import { useAuth } from '../context/AuthContext'; 
import UserMenu from './UserMenu';
import { useTheme } from '../context/ThemeProvider';

const Header = () => {
  const { currentUser } = useAuth(); 
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col font-sans antialiased">
      
      <header className="sticky top-0 z-50 h-14 md:h-16 border-b border-zinc-200 bg-white/80 dark:border-zinc-800/60 dark:bg-black/80 backdrop-blur-md px-4 md:px-8 flex flex-wrap gap-y-2 justify-between items-center">
        
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          SWE Academy
        </Link>

        <div className="flex items-center gap-3 md:gap-5">

          <button 
            onClick={toggleTheme} 
            className="p-2 text-yellow-500 hover:text-yellow-400 dark:hover:text-yellow-200 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Divider updated for light/dark */}
          <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-800 mx-1 hidden sm:block" />

          {currentUser ? (
             <UserMenu /> 
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[14px] font-medium text-zinc-600 hover:text-black hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/50 rounded transition-all">
                Log in
              </Link>
              <Link to="/signup" className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-[13px] font-bold px-4 py-1.5 rounded-full transition-all">
                Sign up
              </Link>
            </div>
          )}

          <Link to="/cart" className="relative p-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 transition-colors group">
            <FiShoppingCart size={24} />
            <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-black group-hover:scale-110 transition-transform">
              0
            </span>
          </Link>
          
        </div>
      </header>

      <main className="flex-grow bg-zinc-50 dark:bg-black">
        <Outlet />
      </main>
      
    </div>
  );
}

export default Header;