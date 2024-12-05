'use client';

import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import FavoriteColleges from '@/components/FavoriteColleges';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">个人信息</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">基本信息</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                用户名：{session?.user?.username || '未知用户'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">收藏的志愿</h3>
            <FavoriteColleges />
          </div>
        </div>
      </main>
    </div>
  );
}
