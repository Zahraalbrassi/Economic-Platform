import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <LanguageProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}


