import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({
  children,
  layoutStyles,
  height = "inherit"
}: {
  children: ReactNode;
  layoutStyles?: string;
  height?: string;
}) {
  return (
    <div className="app">
      <Header />
      <div
        className={"container " + layoutStyles}
        style={{ height: `${height}` }}
      >
        {children}
      </div>
    </div>
  );
}
