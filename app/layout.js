// import {} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


export const metadata = {
  title: "WearIT",
  description: "This is a online clothing store made in next js with strapi",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
