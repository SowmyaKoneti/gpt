import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black-50 text-center">
      <h1 className="text-3xl font-bold mb-4">Please login to continue</h1>
      <a
        href="/login"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Login
      </a>
    </main>
  );
}
