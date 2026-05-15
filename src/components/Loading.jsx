export const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin">
      <div className="border-4 border-slate-200 border-t-blue-600 rounded-full w-8 h-8"></div>
    </div>
  </div>
);

export const LoadingSkeleton = ({ count = 1, height = "h-12" }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`${height} bg-slate-200 rounded-md animate-pulse`}
      ></div>
    ))}
  </div>
);

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="mb-4">
        <div className="animate-spin">
          <div className="border-4 border-slate-200 border-t-blue-600 rounded-full w-12 h-12 mx-auto"></div>
        </div>
      </div>
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);
