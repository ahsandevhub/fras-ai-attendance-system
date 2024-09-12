import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
