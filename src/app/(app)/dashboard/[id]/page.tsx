/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { Sample, Task } from "@/types";
import EditTaskModal from "@/components/EditTaskModal";
import Spinner from "@/components/Spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STATUS_CHOICES = ["Received", "Processing", "Analyzed", "Complete"];

export default function SampleDetailPage() {
  const { token, user } = useAuth();
  const params = useParams();
  const { id } = params;

  const [sample, setSample] = useState<Sample | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchSampleData = async () => {
    if (!id || !token) return;
    if (!sample) setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/samples/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch sample details");
      const data: Sample = await res.json();
      setSample(data);
      setCurrentStatus(data.status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSampleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const handleStatusUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!sample) return;

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
          // We must send all required fields for the serializer
          status: currentStatus,
          name: sample.name,
          sample_id: sample.sample_id,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to update status");
      }

      const updatedSample = await response.json();
      setSample(updatedSample);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!sample || !newTaskName.trim() || !user) return;

    setIsAddingTask(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/samples/${sample.id}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            name: newTaskName,
            status: "Pending",
            due_date: newTaskDueDate || null,
            analyst: user.id,
          }),
        }
      );
      console.log(newTaskDueDate);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.name?.[0] || err.detail || "Failed to add task");
      }

      setNewTaskName("");
      await fetchSampleData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    if (!sample) return;

    const updatedTasks = sample.tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );

    setSample({
      ...sample,
      tasks: updatedTasks,
    });
  };

  if (loading && !sample) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }
  if (!sample) {
    return <div className="p-8 text-center">Sample not found.</div>;
  }

  // Define status colors for tasks
  const taskStatusColors: { [key: string]: string } = {
    Pending: "bg-gray-200 text-gray-800",
    "In Progress": "bg-blue-200 text-blue-800",
    "In Review": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-800",
  };

  return (
    <div className="space-y-8">
      {/* Top section: Sample Details & Status */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column: Sample Info & Status Update */}
        <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {sample.sample_id}
          </h1>
          <p className="mb-6 text-xl text-gray-700">{sample.name}</p>

          {/* Sample Metadata */}
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

          {/* Sample Status Update Form */}
          <form onSubmit={handleStatusUpdate}>
            <h3 className="mb-3 text-lg font-semibold">Update Sample Status</h3>
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
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
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
                className="bg-primary hover:bg-primary-dark h-[46px] rounded-md px-5 py-3 text-white shadow-sm transition disabled:opacity-50"
              >
                {isUpdating ? <Spinner /> : "Save Status"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Audit Log */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Audit Log</h2>
          <ul className="h-64 space-y-4 overflow-y-auto">
            {sample.audit_logs && sample.audit_logs.length > 0 ? (
              [...sample.audit_logs].reverse().map((log) => (
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

      {/* --- SECTION: TASK MANAGEMENT --- */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Task Management</h2>
        <form
          onSubmit={handleAddTask}
          className="mb-6 flex items-end space-x-4"
        >
          <div className="grow">
            <label
              htmlFor="taskName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Task Name
            </label>
            <input
              id="taskName"
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="e.g., 'HPLC Potency', 'Water Content'"
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
            />
          </div>
          <div className="grow">
            <label
              htmlFor="taskDueDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Task Name
            </label>
            <input
              id="taskDueDate"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              placeholder="e.g., 'HPLC Potency', 'Water Content'"
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isAddingTask || !newTaskName.trim()}
            className="bg-primary hover:not-disabled:bg-primary-dark h-[46px] rounded-md px-5 py-3 text-white shadow-sm transition hover:not-disabled:cursor-pointer disabled:opacity-50"
          >
            {isAddingTask ? <Spinner /> : "Add Task"}
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Task Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Analyst
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Due Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sample.tasks.length > 0 ? (
                sample.tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {task.name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${taskStatusColors[task.status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {task.result_numeric !== null
                        ? task.result_numeric
                        : task.result_text || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {sample.owner_username}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {new Date(task.due_date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="text-primary hover:text-primary-dark cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No tasks have been added to this sample.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          sampleId={sample.id}
          onClose={() => setEditingTask(null)}
          onSave={handleTaskUpdate}
        />
      )}
    </div>
  );
}
