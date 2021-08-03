import { ReactNode } from "react";
import Header from "./Header";

export default function Layout ({
  children,
  height = "inherit"
}: {
  children: ReactNode;
  height?: string;
}) {
  return (
    <div className="app">
      <Header />
      <div
        className="container grid grid-cols-3 grid-rows-2 gap-6"
        style={{ height: `${height}` }}
      >
        {children}
      </div>
    </div>
  );
}
