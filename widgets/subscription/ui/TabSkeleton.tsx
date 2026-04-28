function TabsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-4 border-b pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
        ))}
      </div>
      <div className="h-64 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
}

export default TabsSkeleton;