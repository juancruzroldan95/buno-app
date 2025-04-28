import { Skeleton } from "@/components/ui/skeleton";

export default function CaseDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Case Information */}
      <div className="mb-6">
        <div className="p-6 rounded-lg border space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col-reverse md:flex-row items-start md:justify-between md:items-center">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border hover:ring-1 ring-primary transition"
            >
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
