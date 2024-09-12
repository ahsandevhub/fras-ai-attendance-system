import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Facial Recognation Attendence System (FRAS)",
  description: "Developed by: Ahsan DevHub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <NextTopLoader
          color="#2563eb"
          height={4}
          speed={200}
          showSpinner={false}
        />
      </body>
    </html>
  );
}
