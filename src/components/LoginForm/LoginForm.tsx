'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('用户名或密码错误');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('登录过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="用户名"
        className="w-full p-2 border rounded"
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
        className="w-full p-2 border rounded"
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}