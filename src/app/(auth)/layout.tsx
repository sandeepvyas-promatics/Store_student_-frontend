import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { store } from "@/lib/config";

const perks = [
  ["heart", "Save pieces you love before they are gone"],
  ["box", "Track every order from payment to delivery"],
  ["bag", "Check out faster with saved addresses"],
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-ink via-[#1c2a5e] to-brand p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-tag/25 blur-3xl" />
        <Link href="/" className="display relative text-2xl font-bold">{store.name}</Link>
        <div className="relative">
          <h2 className="display text-4xl font-bold leading-tight">Rare finds.<br />One of a kind.</h2>
          <ul className="mt-8 space-y-4">
            {perks.map(([icon, text]) => (
              <li key={text} className="flex items-center gap-3 text-white/85">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Icon name={icon} className="h-4 w-4" /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-white/60">Hand-picked in {store.city}. Delivered to your door.</p>
      </aside>
      <main className="flex flex-col bg-white px-5 py-8 sm:px-10">
        <Link href="/" className="display text-xl font-bold lg:hidden">{store.name}</Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">{children}</div>
      </main>
    </div>
  );
}