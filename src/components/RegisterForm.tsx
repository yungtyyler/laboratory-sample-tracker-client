"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMsg =
          data.username?.[0] || data.email?.[0] || "Registration failed.";
        throw new Error(errorMsg);
      }

      alert("Registration successful! Please log in.");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md md:p-8"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Register Account
      </h2>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-dark w-full rounded-md p-3 text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
