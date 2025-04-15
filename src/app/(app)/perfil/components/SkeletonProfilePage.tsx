import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="flex items-center justify-between">
        <div className="w-full p-6 space-y-6">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-12 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
