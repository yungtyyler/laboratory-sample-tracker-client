/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext"; // Use @/ alias
import { Test } from "@/types"; // Use @/ alias
import Spinner from "@/components/Spinner"; // Use @/ alias

interface EditTestModalProps {
  test: Test | null;
  onClose: () => void;
  onSave: (updatedTest: Test) => void;
  sampleId: number; // We need this to know which sample the test belongs to
}

const TEST_STATUS_CHOICES = [
  "Pending",
  "In Progress",
  "In Review",
  "Completed",
];
// Make sure NEXT_PUBLIC_API_URL is set in your .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditTestModal = ({
  test,
  onClose,
  onSave,
  sampleId,
}: EditTestModalProps) => {
  const { token } = useAuth();

  // Initialize state as empty/default, NOT derived from props.
  const [status, setStatus] = useState("Pending");
  const [resultText, setResultText] = useState("");
  const [resultNumeric, setResultNumeric] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the effect ONLY to populate the form when the `test` prop changes.
  useEffect(() => {
    if (test) {
      setStatus(test.status);
      setResultText(test.result_text || "");
      setResultNumeric(test.result_numeric?.toString() || "");
      setError(null);
    }
  }, [test]); // This effect now correctly derives state from props

  if (!test) return null; // The modal is hidden if no test is selected

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !sampleId) return;

    setIsSaving(true);
    setError(null);

    const payload = {
      name: test.name, // Name is not editable in this modal, but required by API
      status: status,
      result_text: resultText || null,
      result_numeric: resultNumeric ? parseFloat(resultNumeric) : null,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/samples/${sampleId}/tests/${test.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.detail || "Failed to update test. Check all fields."
        );
      }

      const updatedTest = await response.json();
      onSave(updatedTest); // Pass data back to parent
      onClose(); // Close modal
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose} // Close modal when clicking backdrop
    >
      {/* Modal Content */}
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Test: {test.name}
          </h2>
          <hr />

          {/* Test Status */}
          <div>
            <label
              htmlFor="test-status"
              className="block text-sm font-medium text-gray-700"
            >
              Test Status
            </label>
            <select
              id="test-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
            >
              {TEST_STATUS_CHOICES.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>

          {/* Result (Text) */}
          <div>
            <label
              htmlFor="result-text"
              className="block text-sm font-medium text-gray-700"
            >
              Text Result (e.g., &quot;Pass&quot;, &quot;Conforms&quot;)
            </label>
            <input
              id="result-text"
              type="text"
              value={resultText}
              onChange={(e) => setResultText(e.target.value)}
              className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
            />
          </div>

          {/* Result (Numeric) */}
          <div>
            <label
              htmlFor="result-numeric"
              className="block text-sm font-medium text-gray-700"
            >
              Numeric Result (e.g., &quot;99.5&quot;)
            </label>
            <input
              id="result-numeric"
              type="number"
              step="any"
              value={resultNumeric}
              onChange={(e) => setResultNumeric(e.target.value)}
              className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm"
            />
          </div>

          {error && (
            <p className="rounded bg-red-100 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-primary-dark flex items-center rounded-md border border-transparent px-6 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving && <Spinner className="mr-2 h-4 w-4" />}
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTestModal;
