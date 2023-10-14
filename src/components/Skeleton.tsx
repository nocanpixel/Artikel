interface SkeletonProps {
  className: string;
}

export const Skeleton = ({className}:SkeletonProps) => {
  return (
    <div
      role="status"
      className={`w-full animate-pulse flex justify-center gap-1`}
    >
      <div className={`h-5 bg-slate-700 rounded-full dark:bg-slate-700 ${className}`}></div>
    </div>
  );
};
