import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageProvider } from "./LanguageProvider";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300 dark:text-white">
      <LanguageProvider />
      <Navbar  />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
