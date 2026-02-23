import { Skeleton } from "@/components/ui/skeleton";

export default function ManageInvitationSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 px-4 md:px-0">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 py-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>

      {/* Banner Skeleton */}
      <Skeleton className="h-24 w-full rounded-2xl" />

      {/* Grid Tools Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center space-y-3 p-4 border rounded-2xl"
          >
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        ))}
      </div>

      {/* Status Switch Skeleton */}
      <div className="flex items-center justify-between p-4 border rounded-2xl">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>

      {/* Section List Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between px-1">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-6 rounded-md" />
            <div className="flex-1 flex items-center justify-between p-4 border rounded-2xl">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-14 w-full rounded-2xl" />
    </div>
  );
}
