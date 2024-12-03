import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <LoginForm />
    </div>
  );
}
