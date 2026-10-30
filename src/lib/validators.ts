export type Errors = Record<string, string>;

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const isPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  const n = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 11 && d.startsWith("0") ? d.slice(1) : d;
  return /^[6-9]\d{9}$/.test(n);
};

export const isPincode = (v: string) => /^[1-9]\d{5}$/.test(v.trim());

export const hasErrors = (e: Errors) => Object.keys(e).length > 0;

export function formToObject(form: HTMLFormElement): Record<string, string> {
  return Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]));
}

export function validateLogin(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.email?.trim()) e.email = "Enter your email address.";
  else if (!isEmail(d.email)) e.email = "Enter a valid email, like name@example.com.";
  if (!d.password) e.password = "Enter your password.";
  return e;
}

export function validateSignup(d: Record<string, string>): Errors {
  const e: Errors = validateLogin({ email: d.email, password: "x" });
  if (!d.name?.trim() || d.name.trim().length < 2) e.name = "Enter your full name.";
  else if (!/^[A-Za-z][A-Za-z .'-]+$/.test(d.name.trim())) e.name = "Use letters only in your name.";
  if (!d.phone?.trim()) e.phone = "Enter your phone number.";
  else if (!isPhone(d.phone)) e.phone = "Enter a valid 10-digit mobile number.";
  if (!d.password) e.password = "Create a password.";
  else if (d.password.length < 8) e.password = "Use at least 8 characters.";
  else if (!/[A-Za-z]/.test(d.password) || !/\d/.test(d.password)) e.password = "Use both letters and numbers.";
  if (d.confirm !== d.password) e.confirm = "The two passwords do not match.";
  if (!d.terms) e.terms = "Please tick this box to continue.";
  return e;
}