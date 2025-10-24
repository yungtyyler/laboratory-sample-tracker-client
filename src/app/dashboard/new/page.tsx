"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://laboratory-sample-tracker-api.onrender.com";

const NewSample = () => {
  const [sampleId, setSampleId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to create a sample.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/samples/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          sample_id: sampleId,
          name: name,
        }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to create sample.";
        try {
          // Try to parse the error as JSON (the expected DRF response)
          const data = await response.json();
          errorMsg =
            data.sample_id?.[0] || data.name?.[0] || "Failed to create sample.";
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (jsonError) {
          // If JSON parsing fails, it's HTML. Get the response as text.
          const errorText = await response.text();
          console.error("Server returned non-JSON error:", errorText);
          errorMsg = "Server returned an unexpected error. Check the console.";
        }
        throw new Error(errorMsg);
      }

      router.push("/dashboard");
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
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register New Sample
        </h2>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="sampleId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Sample ID (e.g., &quot;BATCH-001A&quot;)
          </label>
          <input
            id="sampleId"
            type="text"
            value={sampleId}
            onChange={(e) => setSampleId(e.target.value)}
            required
            className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Sample Name (e.g., &quot;BHQ-1 Synthesis&quot;)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark rounded-md px-6 py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register Sample"}
          </button>
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewSample;
