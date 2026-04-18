import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-white">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-slate-400 mb-8">Could not find requested resource</p>
      <Link href="/" className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500">
        Return Home
      </Link>
    </div>
  );
}
