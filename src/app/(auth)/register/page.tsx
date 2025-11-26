import RegisterForm from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Register",
  },
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
}
