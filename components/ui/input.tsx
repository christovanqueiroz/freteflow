import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: Props) => (
  <input
    className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`}
    {...props}
  />
);
