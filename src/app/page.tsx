import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <LoginForm />
    </div>
  );
}
