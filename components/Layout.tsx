import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Header />
      <div className="container">{children}</div>
    </div>
  );
}
