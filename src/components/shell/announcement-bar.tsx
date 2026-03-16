"use client";

import { useEffect, useState } from "react";

export function AnnouncementBar({ message }: { message: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`bg-foreground text-background text-center text-[11px] font-medium px-4 tracking-[0.08em] overflow-hidden transition-all duration-300 ${
        scrolled ? "max-h-0 py-0" : "max-h-10 py-2.5"
      }`}
    >
      {message}
    </div>
  );
}
