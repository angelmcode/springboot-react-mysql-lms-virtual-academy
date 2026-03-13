import { FcGoogle } from "react-icons/fc";
import InputGroup from "../components/inputgroup";
import { Link } from "react-router"; 

const LoginPage = () => {
  return (
    <div className="min-h-[100dvh] bg-black flex flex-col font-sans p-4">
      
      <main className="flex-grow flex flex-col items-center justify-center">
        
        {/* Tightened mb-6 to mb-4 */}
        <h2 className="text-zinc-100 text-xl md:text-2xl font-bold mb-4 text-center tracking-wide">
          SWE Academy
        </h2>

        {/* Tightened padding from py-10 to py-8 */}
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-8 flex flex-col shadow-xl">
          
          {/* Tightened mb-8 to mb-6 */}
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 text-center mb-6">
            Log In
          </h1>

          {/* Tightened gap-6 to gap-5 to pull the inputs slightly closer together */}
          <form className="flex flex-col gap-5">
            
            <InputGroup label="Username or email" type="text" id="usernameOrEmail" required />
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-zinc-100 font-medium text-base">
                  Password
                </label>
                <a href="/forgot-password" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-700 border border-blue-600 rounded-xl px-6 py-3 text-zinc-100 text-lg font-medium hover:bg-blue-600 transition-colors mt-2"
            >
              Log In
            </button>
          </form>

          {/* Tightened margins on the divider */}
          <div className="relative flex items-center my-5">
            <div className="flex-grow border-t border-dashed border-zinc-700/60"></div>
            <span className="flex-shrink mx-4 text-zinc-500 font-medium text-sm uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-dashed border-zinc-700/60"></div>
          </div>

          <button 
            type="button"
            className="w-full flex items-center justify-center bg-purple-900/20 border border-purple-500/30 rounded-xl px-6 py-3 text-zinc-100 hover:bg-purple-900/40 transition-colors"
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            <span className="font-medium text-lg">Continue with Google</span>
          </button>

        </div>

        {/* Tightened mt-8 to mt-6 */}
        <div className="text-zinc-400 text-sm md:text-base mt-6 text-center">
          New to SWE Academy?{' '}
          <Link 
            to="/signup" 
            className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
          >
            Create an Account
          </Link>
        </div>

      </main>
    </div>
  );
};

export default LoginPage;