import { Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16 md:pb-0">
      <Header />
      <main>{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </div>
  );
}