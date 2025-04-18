import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonClientCases() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-48 rounded-md mt-4 md:mt-0" />
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <div className="rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 rounded-lg"
            >
              <div>
                <Skeleton className="h-5 w-48 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
