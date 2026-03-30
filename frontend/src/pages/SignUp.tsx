import { FcGoogle } from "react-icons/fc";
import InputGroup from "../components/InputGroup";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";              

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  username: string;
}

// 🎨 CSS ONLY: Helper text handles light/dark
const Helper = ({ children }: { children: string }) => (
  <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed mt-1.5 px-0.5">
    {children}
  </p>
);

// 🎨 CSS ONLY: Error text handles light/dark
const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-600 dark:text-red-500 text-sm font-medium mt-1.5 px-0.5">
      {message}
    </p>
  );
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isSubmitted } } = useForm<SignUpFormValues>();

  const onSubmit = async (data: SignUpFormValues) => {
    const registerRequest = axios.post("http://localhost:8080/api/auth/register", data);
    const loadId = toast.loading("Creating your academy account...");

    try {
      await Promise.all([registerRequest, new Promise(res => setTimeout(res, 2000))]);
      toast.dismiss(loadId);
      reset();
      navigate("/login", {
        state: { message: "Account successfully created! Please log in." } 
      });
    } catch (error) {
      toast.dismiss(loadId);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendError = error.response.data;
        
        if (backendError.field && backendError.message) {
          
          setError(backendError.field as keyof SignUpFormValues, {
            type: "server",
            message: backendError.message
          });
          
          return;
        }
      }
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col font-sans p-4 md:p-8">
      <main className="flex-grow flex flex-col items-center justify-center">
        
        {/* 🎨 CSS ONLY: Top text handles light/dark */}
        <div className="text-zinc-700 dark:text-zinc-200 text-base md:text-lg mb-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium underline"> 
            Log in →
          </Link>
        </div>

        {/* 🎨 CSS ONLY: Card background and border handle light/dark */}
        <div className="w-full max-w-lg bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-3xl px-8 pt-8 pb-10 md:px-12 flex flex-col shadow-xl">
          
          {/* 🎨 CSS ONLY: Heading handles light/dark */}
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 text-center mb-5">
            Sign up for SWE Academy
          </h1>

          <hr className="border-dashed border-zinc-300 dark:border-zinc-700/60 mb-5" />

          {/* 🎨 CSS ONLY: Google button colors adjusted for light/dark */}
          <button type="button" className="w-full flex items-center justify-center bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100 dark:bg-purple-900/20 dark:border-purple-500/30 rounded-xl px-6 py-3.5 dark:text-zinc-100 dark:hover:bg-purple-900/40 transition-colors mb-5">
            <FcGoogle className="h-5 w-5 mr-3" />
            <span className="font-medium text-lg">Continue with Google</span>
          </button>

          {/* 🎨 CSS ONLY: Divider lines adjusted for light/dark */}
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-dashed border-zinc-300 dark:border-zinc-700/60"></div>
            <span className="flex-shrink mx-5 text-zinc-500 dark:text-zinc-400 font-medium text-sm uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-dashed border-zinc-300 dark:border-zinc-700/60"></div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* NAME */}
            <div>
              <InputGroup 
                label="Name*" 
                id="name"
                error={!!errors.name}
                {...register("name", { required: "Name is required" })} 
              />
              <ErrorText message={errors.name?.message} />
            </div>

            {/* EMAIL */}
            <div>
              <InputGroup 
                label="Email*" 
                id="email"
                type="email" 
                error={!!errors.email}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address"
                  }
                })} 
              />
              <ErrorText message={errors.email?.message} />
            </div>

            {/* PASSWORD */}
            <div>
              <InputGroup 
                label="Password*" 
                id="password"
                type="password" 
                error={!!errors.password}
                {...register("password", { 
                  required: "Password is required", 
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Must be at least 8 characters with 1 number and 1 lowercase letter."
                  }
                })} 
              />
              {errors.password && <ErrorText message={errors.password.message} />}
              {!errors.password && !isSubmitted && (
                <Helper>Password should be at least 8 characters including a number and a lowercase letter.</Helper>
              )}
            </div>

            {/* USERNAME */}
            <div>
              <InputGroup 
                label="Username*" 
                id="username"
                error={!!errors.username}
                {...register("username", { 
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/,
                    message: "Alphanumeric and single hyphens only. Cannot start or end with a hyphen."
                  }
                })} 
              />
              {errors.username && <ErrorText message={errors.username.message} />}
              {!errors.username && !isSubmitted && (
                <Helper>Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</Helper>
              )}
            </div>

            {/* 🎨 CSS ONLY: Submit button colors adjusted for light/dark */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 border border-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:border-blue-600 rounded-xl px-6 py-4 text-white text-xl font-semibold dark:hover:bg-blue-600 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create an Account
            </button>
          </form>

        </div>
      </main>
    </div>
  );
};

export default SignUpPage;