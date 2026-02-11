import { useEffect, useState } from "react";
import { fetchFromCMS } from "@/lib/strapi";
import { useLanguage } from "./LanguageProvider";

export default function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Avoid rendering on the server to prevent hydration mismatches
    setIsClient(true);
  }, []);

  
  useEffect(() => {
    async function loadHero() {
      try {
        const heroes = await fetchFromCMS("heroes", {
          query: { locale: language },
        });

        const sources = heroes.flatMap((hero) => (hero.image || []).map((img) => img.url));
        setImages(sources);
      } catch (error) {
        console.error("Failed to load hero images from CMS", error);
      }
    }

    loadHero();
  }, [language]);

  useEffect(() => {
    if (!images.length) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearTimeout(id);
  }, [images]);

  if (!isClient || !images.length) return null;

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {images.map((src, index) => {
        const fullUrl = src.startsWith("http") ? src : `${process.env.NEXT_PUBLIC_CMS_URL}${src}`;

        return (
          <img
            key={index}
            src={fullUrl}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-100 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
