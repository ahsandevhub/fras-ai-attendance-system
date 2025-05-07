import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";

export const metadata = {
  title: "Facial Recognation Attendence System (FRAS)",
  description: "Developed by: Ahsan DevHub",
  other: {
    "preload-css": "false", // Disable automatic CSS preloading
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
