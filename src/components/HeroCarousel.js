import { useEffect, useState } from "react";
import { fetchFromCMS } from "@/lib/strapi";
import { useLanguage } from "./LanguageProvider";

export default function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();              

  // Only render on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    async function loadHero() {
      try {
        const heroes = await fetchFromCMS("heroes", {
          query: {
            locale: language,
          },
        });

        const allImages = heroes.flatMap((hero) =>
          (hero.image || []).map((img) => img.url)
        );

        setImages(allImages);
      } catch (err) {
        console.error("Failed to load hero images from CMS", err);
      }
    }

    loadHero();
  }, [language]);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!isClient || !images.length) return null;

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {images.map((src, index) => {
        const fullUrl = src.startsWith("http")
          ? src
          : `${process.env.NEXT_PUBLIC_CMS_URL}${src}`;

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