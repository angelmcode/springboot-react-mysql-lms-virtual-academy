import { FcGoogle } from "react-icons/fc";
import InputGroup from "../components/inputgroup";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";                

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  username: string;
}

const Helper = ({ children }: { children: string }) => (
  <p className="text-zinc-500 text-sm leading-relaxed mt-1.5 px-0.5">
    {children}
  </p>
);

const SignUpPage = () => {

  const { register, handleSubmit } = useForm<SignUpFormValues>();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", data);
      console.log("Success!", response.data);
      alert("Account Created!");
    } catch (error) {
      console.error("Error sending to Spring Boot", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans p-4 md:p-8">
      
      {/* Changed to <main> for better semantic HTML and accessibility */}
      <main className="flex-grow flex flex-col items-center justify-center">
        
        <div className="text-zinc-200 text-base md:text-lg mb-6 text-center">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-blue-500 hover:text-blue-400 transition-colors font-medium underline"
          > Log in →
          </Link>

        </div>

        {/* 1. Removed 'space-y-4' to stop fighting with margins.
          2. Adjusted 'pt-8' (padding-top) so the h1 naturally sits closer to the top edge. 
        */}
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl px-8 pt-8 pb-10 md:px-12 flex flex-col shadow-xl">
          
          {/* Controlled solely by mb-5, no negative margins needed. */}
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 text-center mb-5">
            Sign up for SWE Academy
          </h1>

          <hr className="border-dashed border-zinc-700/60 mb-5" />

          <button 
            type="button"
            className="w-full flex items-center justify-center bg-purple-900/20 border border-purple-500/30 rounded-xl px-6 py-3.5 text-zinc-100 hover:bg-purple-900/40 transition-colors mb-5"
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            <span className="font-medium text-lg">Continue with Google</span>
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-dashed border-zinc-700/60"></div>
            <span className="flex-shrink mx-5 text-zinc-500 font-medium text-sm uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-dashed border-zinc-700/60"></div>
          </div>

          {/* Using flex 'gap-6' instead of 'space-y'. It's cleaner and more predictable for form layouts. */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup 
              label="Name*" 
              id="name"
              {...register("name", { required: true })} 
            />

            <InputGroup 
              label="Email*" 
              id="email"
              type="email" 
              {...register("email", { required: true })} 
            />

            <div>
              <InputGroup 
                label="Password*" 
                id="password"
                type="password" 
                {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/ })} 
              />
              <Helper>
                Password should be at least 8 characters 
                including a number and a lowercase letter.
              </Helper>
            </div>

            <div>
              <InputGroup 
                label="Username*" 
                id="username"
                {...register("username", { required: true })} 
              />
              <Helper>
                Username may only contain alphanumeric characters or single hyphens, 
                and cannot begin or end with a hyphen.
              </Helper>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-700 border border-blue-600 rounded-xl px-6 py-4 text-white text-xl font-semibold hover:bg-blue-600 transition-colors mt-2"
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