import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-bold text-muted-foreground/20 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8">This page doesn&apos;t exist or has been moved.</p>
      <Button render={<Link href="/" />} size="lg" className="rounded-2xl">
        Back to home
      </Button>
    </div>
  );
}
