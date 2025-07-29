"use client"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from '@/components/Spinner';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      router.replace("/dashboard");
    } else {
      router.replace("/Signup");
    }
  }, [router]);

  return <Spinner />
}