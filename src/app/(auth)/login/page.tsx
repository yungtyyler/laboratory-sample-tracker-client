"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://laboratory-sample-tracker-api.onrender.com";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const tokenResponse = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Login failed. Check username or password.");
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.token;

      const userResponse = await fetch(`${API_URL}/api/user/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details after login.");
      }

      const userData = await userResponse.json();

      setToken(token);
      setUser(userData);

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md md:p-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Scientist Login
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
            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          No account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
