import React from 'react';
import { FcGoogle } from "react-icons/fc";

// Interface for reusable input fields
interface InputGroupProps {
  label: string;
  type: string;
  id: string;
  required?: boolean;
}

// Reusable component for input fields
const InputGroup: React.FC<InputGroupProps> = ({ label, type, id, required }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-zinc-100 font-medium text-base">
      {label}{required && <span className="text-zinc-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      id={id}
      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
      required={required}
    />
  </div>
);

// Reusable component for the specific horizontal rule groups seen in the mockup
const DividerGroup = () => (
  <div className="space-y-1.5 py-1">
    <hr className="border-zinc-700/70" />
    <hr className="border-zinc-700/70" />
  </div>
);

const SignUpPage: React.FC = () => {
  return (
    // 1. Keep the main background black
    <div className="min-h-screen bg-black flex flex-col font-sans p-4 md:p-8">
      
      {/* 2. Content Area directly on the black background */}
      <div className="flex-grow flex flex-col items-center justify-center">
        
        {/* Login CTA text at top */}
        <div className="text-zinc-200 text-base md:text-lg mb-8 text-center">
          Already have an account?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors font-medium underline">
            Log in →
          </a>
        </div>

        {/* The Single Form Card */}
        {/* I kept bg-zinc-900 so it pops slightly against the black background */}
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-12 flex flex-col space-y-10 shadow-xl">
          
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 text-center pt-1">
            Sign up for SWE Academy
          </h1>

          <hr className="border-dashed border-zinc-700" />

          {/* Continue with Google Button */}
          <button 
            type="button"
            className="w-full flex items-center justify-center bg-zinc-950 border border-zinc-700 rounded-xl px-6 py-4 text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            <span className="font-medium text-lg pt-0.5">Continue with Google</span>
          </button>

          {/* 'Or' Separator */}
          <div className="relative flex items-center pt-2">
            <div className="flex-grow border-t border-dashed border-zinc-700"></div>
            <span className="flex-shrink mx-5 text-zinc-500 font-medium text-lg pt-0.5">or</span>
            <div className="flex-grow border-t border-dashed border-zinc-700"></div>
          </div>

          <form className="space-y-8 pt-2">
            <InputGroup label="Name" type="text" id="name" required />
            <InputGroup label="Email" type="email" id="email" required />
            <InputGroup label="Password" type="password" id="password" required />
            
            <DividerGroup />
            
            <InputGroup label="Username" type="text" id="username" required />
            
            <DividerGroup />

            <button 
              type="submit"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-6 py-5 text-zinc-100 text-xl font-semibold hover:bg-zinc-800 transition-colors"
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;