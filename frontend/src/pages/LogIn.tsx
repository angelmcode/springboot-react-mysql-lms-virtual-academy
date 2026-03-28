import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import InputGroup from "../components/InputGroup";
import { Link, useLocation, useNavigate } from "react-router"; 
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import api from "../api/AxiosConfig";
import axios from "axios";
import toast from "react-hot-toast";

// Interface mapping your payload for the Spring Boot backend
interface LoginFormData {
  identifier: string;
  password: string;
}

// Reusable component for displaying validation errors
const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-500 text-sm font-medium mt-1.5 px-0.5">
      {message}
    </p>
  );
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasToasted = useRef(false);
  const { login } = useAuth();

  // Initialize react-hook-form
  const { 
    register, 
    handleSubmit,
    setError,
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>();

  /// The function that talks to Spring Boot using Axios
  const onSubmit = async (data: LoginFormData) => {
    const loginId = toast.loading("Logging in...");

    try {
      const response = await api.post("/api/auth/login", data);
      
      toast.dismiss(loginId);
      toast.success(response.data.message); 
      console.log("Success Data:", response.data);
      
      // 1. ✅ NEW: Destructure ALL the data from the backend response
      const { username, roles, permissions, token } = response.data;
      
      // 2. ✅ NEW: Pass the permissions into the context
      login(
        { username, roles, permissions }, 
        token
      );

      // 3. ✅ NEW: Route based on permissions instead of roles
      if (permissions?.includes("ACCESS_TEACHER_PANEL")) {
        navigate("/teacher"); 
      } else if (permissions?.includes("ACCESS_ADMIN_PANEL")) {
        // You can add your admin route here later!
        navigate("/admin"); 
      } else {
        navigate("/"); 
      }

    } catch (error) {
      // ... (keep all your existing catch logic exactly the same)
      toast.dismiss(loginId);
      
      if (axios.isAxiosError(error) && error.response?.data) {
        const backendError = error.response.data;
        
        if (backendError.field && backendError.message) {
          setError(backendError.field as keyof LoginFormData, {
            type: "server",
            message: backendError.message
          });
          return;
        }
        
        toast.error(backendError.message || "Invalid credentials");
      } else {
        toast.error("Server connection failed.");
      }
    }
  };

  useEffect(() => {
    const msg = location.state?.message;

    if (msg && !hasToasted.current) {
      toast.success(msg, { duration: 5000 });
      hasToasted.current = true;
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-[100dvh] bg-black flex flex-col font-sans p-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      
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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div>
              <InputGroup 
                label="Username or email" 
                type="text" 
                id="identifier" 
                error={!!errors.identifier}
                {...register("identifier", { required: "Username or email is required" })} 
              />
              <ErrorText message={errors.identifier?.message} />
            </div>
            
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
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-zinc-950 border rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-colors ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                    : "border-zinc-700 focus:ring-blue-600 focus:border-blue-600"
                }`}
              />
              <ErrorText message={errors.password?.message} />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-6 py-3 text-zinc-100 text-lg font-medium transition-colors mt-2 
                ${isSubmitting ? "bg-blue-800 border-blue-800 cursor-not-allowed" : "bg-blue-700 border-blue-600 hover:bg-blue-600"}`}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
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