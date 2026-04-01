import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Two Otters Studio 🦦🦦",
  description:
    "Strategic design, UX/UI, and a working prototype — exactly what you had in mind, only faster.",
};

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
