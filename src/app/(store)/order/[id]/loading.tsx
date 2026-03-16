import { Skeleton } from "@/components/ui/skeleton";

export default function OrderLoadingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Skeleton className="h-7 w-48 mb-2 rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      <Skeleton className="h-28 w-full rounded-3xl mb-5" />
      <Skeleton className="h-48 w-full rounded-2xl mb-5" />
      <Skeleton className="h-36 w-full rounded-2xl mb-5" />
      <Skeleton className="h-24 w-full rounded-2xl mb-5" />
    </div>
  );
}
