export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbf8f2]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e0d9d1] border-t-[#5c473b]" />

      <p className="mt-4 text-sm font-medium text-[#4a3a2f]">
        Loading...
      </p>
    </div>
  );
}
