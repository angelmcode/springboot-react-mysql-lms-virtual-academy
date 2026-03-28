import { Outlet, Link } from 'react-router';
import { FiSun, FiChevronDown, FiShoppingCart } from "react-icons/fi";
import HasPermission from './HasPermission';
import toast from 'react-hot-toast'; // ✅ Import your toast library

const Header = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans antialiased">
      
      {/* 1. THE TOP NAVBAR - Refined with glassmorphism */}
      <header className="sticky top-0 z-50 h-14 md:h-16 border-b border-zinc-800/60 bg-black/80 backdrop-blur-md px-4 md:px-8 flex justify-between items-center">
        
        {/* Left Side: Logo with better tracking */}
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          SWE Academy
        </Link>

        <HasPermission permission="ACCESS_ADMIN_PANEL">
          <button 
            onClick={() => toast.success('Admin powers activated! 🚀')}
            className="px-4 py-1.5 bg-red-600/20 text-red-500 border border-red-900 hover:bg-red-600 hover:text-white text-[13px] font-bold rounded-full transition-all cursor-pointer"
          >
            Test Admin Action
          </button>
        </HasPermission>

        {/* Right Side: Navigation Group */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Language Selector - Subtle styling */}
          <button className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-all cursor-pointer">
            EN <FiChevronDown className="opacity-50" />
          </button>

          {/* Theme Toggle - Glow effect on hover */}
          <button className="p-2 text-yellow-500 hover:text-yellow-200 transition-all cursor-pointer">
            <FiSun size={20} />
          </button>

          {/* Vertical Divider */}
          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

          {/* Auth Links - Professional Button Weights */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-all">
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-white text-black hover:bg-zinc-200 text-[13px] font-bold px-4 py-1.5 rounded-full transition-all"
            >
              Sign up
            </Link>
          </div>

          {/* Shopping Cart - Clean Badge Design */}
          <Link to="/cart" className="relative p-2 text-blue-500 hover:text-blue-400 transition-colors group">
            <FiShoppingCart size={24} />
            <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-black group-hover:scale-110 transition-transform">
              0
            </span>
          </Link>
          
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow bg-black">
        <Outlet />
      </main>
      
    </div>
  );
}

export default Header;