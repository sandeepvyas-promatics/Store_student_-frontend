"use client";
import { useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export default function Field({ id, label, error, hint, type = "text", className = "", ...rest }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`input ${isPassword ? "pr-16" : ""} ${error ? "!border-bad focus:!ring-bad/15" : ""}`}
          {...rest}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-ink">
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-bad">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="hint">{hint}</p>
      ) : null}
    </div>
  );
}