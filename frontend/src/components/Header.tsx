import { Outlet, Link } from 'react-router';
import { FiSun, FiChevronDown, FiShoppingCart } from "react-icons/fi";
import HasPermission from './HasPermission';
import toast from 'react-hot-toast'; 
import { useAuth } from '../context/AuthContext'; 
import UserMenu from './UserMenu'; // ✅ 1. Import your new component

const Header = () => {
  const { currentUser } = useAuth(); // We only need currentUser here now, not logout

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans antialiased">
      
      <header className="sticky top-0 z-50 h-14 md:h-16 border-b border-zinc-800/60 bg-black/80 backdrop-blur-md px-4 md:px-8 flex flex-wrap gap-y-2 justify-between items-center">
        
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          SWE Academy
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          
          <button className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-all cursor-pointer">
            EN <FiChevronDown className="opacity-50" />
          </button>

          <button className="p-2 text-yellow-500 hover:text-yellow-200 transition-all cursor-pointer">
            <FiSun size={20} />
          </button>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

          {/* ✅ 2. THE CLEAN AUTHENTICATION SWITCH */}
          {currentUser ? (
             <UserMenu /> 
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-all">
                Log in
              </Link>
              <Link to="/signup" className="bg-white text-black hover:bg-zinc-200 text-[13px] font-bold px-4 py-1.5 rounded-full transition-all">
                Sign up
              </Link>
            </div>
          )}

          <Link to="/cart" className="relative p-2 text-blue-500 hover:text-blue-400 transition-colors group">
            <FiShoppingCart size={24} />
            <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-black group-hover:scale-110 transition-transform">
              0
            </span>
          </Link>
          
        </div>
      </header>

      <main className="flex-grow bg-black">
        <Outlet />
      </main>
      
    </div>
  );
}

export default Header;