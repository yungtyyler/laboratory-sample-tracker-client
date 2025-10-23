"use client";

import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { Sample } from "../page";

const API_URL = "https://laboratory-sample-tracker-api.onrender.com";
const STATUS_CHOICES = ["Received", "Processing", "Analyzed", "Complete"];

export default function SampleDetailPage() {
  const { token } = useAuth();
  const params = useParams();
  const { id } = params;

  const [sample, setSample] = useState<Sample | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/api/samples/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sample details");
        return res.json();
      })
      .then((data: Sample) => {
        setSample(data);
        setCurrentStatus(data.status);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleStatusUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !sample) return;

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/samples/${sample.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          status: currentStatus,
          name: sample.name,
          sample_id: sample.sample_id,
        }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updatedSample = await response.json();
      setSample(updatedSample);
      alert("Status updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading sample details...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }
  if (!sample) {
    return <div className="p-8">Sample not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-6">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {sample.sample_id}
          </h1>
          <p className="mb-6 text-xl text-gray-700">{sample.name}</p>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-lg text-gray-900">
                {sample.owner_username}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Registered</dt>
              <dd className="mt-1 text-lg text-gray-900">
                {new Date(sample.created_at).toLocaleDateString()}
              </dd>
            </div>
          </div>

          <form onSubmit={handleStatusUpdate}>
            <h3 className="mb-3 text-lg font-semibold">Update Status</h3>
            <div className="flex items-end space-x-4">
              <div className="grow">
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {STATUS_CHOICES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-md bg-blue-600 px-5 py-3 text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Status"}
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </form>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Audit Log</h2>
          <ul className="space-y-4">
            {sample.audit_logs && sample.audit_logs.length > 0 ? (
              sample.audit_logs
                .slice()
                .reverse()
                .map((log) => (
                  <li key={log.id} className="border-b pb-2">
                    <p className="font-medium text-gray-800">{log.action}</p>
                    <p className="text-sm text-gray-500">
                      by {log.actor_username || "System"} on{" "}
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))
            ) : (
              <p className="text-gray-500">No history found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
