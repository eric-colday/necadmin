import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tableau de bord-NecAdmin",
  description:
    "Le tableau de bord NecAdmin permet de gérer la boutique NecStore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <ThemeContextProvider>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ThemeContextProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
