"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { StatusPieChart } from "@/components/charts/StatusPieChart";

export interface Sample {
  id: number;
  sample_id: string;
  name: string;
  owner_username: string;
  status: "Received" | "Processing" | "Analyzed" | "Complete";
  created_at: string;
  updated_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audit_logs: any[]; // type this better later
}

const API_URL = "https://laboratory-sample-tracker-api.onrender.com";

async function fetchSamples(token: string): Promise<Sample[]> {
  return await fetch(`${API_URL}/api/samples`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch samples.");
    }
    return res.json();
  });
}

const Dashboard = () => {
  const { token, user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [samples, setSamples] = useState<Sample[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!token) {
      router.push("/login");
      return;
    }

    fetchSamples(token)
      .then((data) => {
        setSamples(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [token, router, authLoading]);

  // We use 'useMemo' so this only recalculates when 'samples' changes
  const statusChartData = useMemo(() => {
    const counts = samples.reduce(
      (acc, sample) => {
        acc[sample.status] = (acc[sample.status] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [samples]);

  if (authLoading || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sample Dashboard</h1>
          <p className="text-lg text-gray-600">
            Welcome, {user?.username || "Scientist"}!
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <div className="mb-6 flex justify-end">
        <Link
          href="/dashboard/new"
          className="rounded-md bg-green-600 px-5 py-2.5 text-white shadow-sm transition hover:bg-green-700"
        >
          + Register New Sample
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Sample Throughput (Coming Soon)
          </h2>
          {/* Add the bar chart here later */}
          <div className="flex h-full items-center justify-center text-gray-400">
            Bar chart will go here.
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Status Breakdown
          </h2>
          {statusChartData.length > 0 ? (
            <StatusPieChart data={statusChartData} />
          ) : (
            <p className="text-gray-500">No sample data to display.</p>
          )}
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Sample ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {samples.length > 0 ? (
              samples.map((sample) => (
                <tr key={sample.id}>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {sample.sample_id}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {sample.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {/* TODO: Add status badge */}
                    {sample.status}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {new Date(sample.updated_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <Link
                      href={`/dashboard/${sample.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View/Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No samples found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
