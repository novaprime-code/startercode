import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Task Management App</h1>
        <nav className="space-x-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </main>
  );
}