import { forwardRef } from "react";

// extend the standard HTML input props so we don't have to manually write 'type', 'id', etc.
interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

// We wrap the component in forwardRef
const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, id, ...rest }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-zinc-100 font-medium text-base">
        {label}
      </label>
      <input
        id={id}
        ref={ref}     // <--- THIS IS THE KEY: Connecting the Ref
        {...rest}    // <--- THIS IS THE KEY: Passing down register() props
        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
      />
    </div>
  )
);

InputGroup.displayName = "InputGroup"; // Good practice for debugging

export default InputGroup;