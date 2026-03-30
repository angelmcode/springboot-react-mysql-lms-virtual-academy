import { forwardRef } from "react";

// extend the standard HTML input props so we don't have to manually write 'type', 'id', etc.
interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

// We wrap the component in forwardRef
const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, id, error, ...rest }, ref) => (
    <div className="space-y-1.5">
      {/* 🎨 CSS ONLY: Label color handles light/dark */}
      <label htmlFor={id} className="block text-zinc-900 dark:text-zinc-100 font-medium text-base">
        {label}
      </label>
      
      {/* 🎨 CSS ONLY: Input background, text, borders, and placeholder handle light/dark */}
      <input
        id={id}
        ref={ref}     // Connecting the Ref
        {...rest}    // Passing down register() props
        className={`
          w-full bg-white dark:bg-zinc-950 border rounded-lg px-4 py-2.5 
          text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 
          focus:outline-none focus:ring-2 transition-colors
          ${
            error 
              ? "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500 focus:border-red-500 dark:focus:border-red-500" // IF ERROR IS TRUE
              : "border-zinc-300 dark:border-zinc-700 focus:ring-blue-600 dark:focus:ring-blue-600 focus:border-blue-600 dark:focus:border-blue-600" // IF ERROR IS FALSE
          }
        `}
      />
    </div>
  )
);

InputGroup.displayName = "InputGroup"; // Good practice for debugging

export default InputGroup;