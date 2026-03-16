"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-bold text-muted-foreground/20 mb-4">!</p>
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-8">An unexpected error occurred.</p>
      <Button onClick={reset} size="lg" className="rounded-2xl">Try again</Button>
    </div>
  );
}
