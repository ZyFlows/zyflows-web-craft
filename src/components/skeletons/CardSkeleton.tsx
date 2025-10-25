import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
    <Skeleton className="h-48 w-full rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-64 w-full rounded-lg" />
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </div>
);

export const ServiceCardSkeleton = () => (
  <div className="space-y-4 p-8 rounded-xl border border-border bg-card">
    <Skeleton className="h-12 w-12 rounded-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);
