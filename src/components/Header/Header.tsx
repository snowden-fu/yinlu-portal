'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">高考志愿数据平台</h1>
      {session && (
        <Link
          href="/profile"
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          个人信息
        </Link>
      )}
    </header>
  );
}