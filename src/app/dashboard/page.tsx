'use client';

import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import  CollegeTable from '@/components/CollegeTable';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">高校志愿数据</h2>
        <CollegeTable />
      </main>
    </div>
  );
}