import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  return (
    <div>
      <nav>
        <Link href="/examples/dashboard">Dashboard</Link> |
        <Link href="/examples/aboutus">Aboutus</Link> 
      </nav>
      {children}
    </div>
  );
}
