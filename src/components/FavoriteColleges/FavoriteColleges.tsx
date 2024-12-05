'use client';

import { useState, useEffect } from 'react';

type College = {
  id: string;
  name: string;
  location: string;
  type: string;
  minScore: number;
  maxScore: number;
};

export default function FavoriteColleges() {
  const [favorites, setFavorites] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: 从API获取收藏数据
  useEffect(() => {
    // 模拟数据
    setFavorites([
      {
        id: '1',
        name: '清华大学',
        location: '北京',
        type: '综合类',
        minScore: 680,
        maxScore: 700,
      },
      // 更多模拟数据...
    ]);
    setLoading(false);
  }, []);

  const handleRemove = async (collegeId: string) => {
    // TODO: 实现删除收藏功能
    setFavorites(favorites.filter(college => college.id !== collegeId));
  };

  if (loading) {
    return <div className="text-gray-500">加载中...</div>;
  }

  if (favorites.length === 0) {
    return <div className="text-gray-500">暂无收藏的志愿</div>;
  }

  return (
    <div className="space-y-4">
      {favorites.map(college => (
        <div
          key={college.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h4 className="font-semibold">{college.name}</h4>
            <div className="text-sm text-gray-600 mt-1">
              <span>{college.location}</span>
              <span className="mx-2">·</span>
              <span>{college.type}</span>
              <span className="mx-2">·</span>
              <span>分数线: {college.minScore}-{college.maxScore}</span>
            </div>
          </div>
          <button
            onClick={() => handleRemove(college.id)}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
          >
            删除
          </button>
        </div>
      ))}
    </div>
  );
}