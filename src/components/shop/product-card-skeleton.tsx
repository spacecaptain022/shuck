import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] rounded-3xl mb-4" />
      <Skeleton className="h-4 w-3/4 rounded-lg mb-2" />
      <Skeleton className="h-4 w-1/4 rounded-lg" />
    </div>
  );
}
