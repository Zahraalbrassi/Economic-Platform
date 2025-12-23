import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted on client
  if (!mounted) {
    return null; // or a loading spinner / placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full transition"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-white" />
      )}
    </button>
  );
}
